import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RefreshToken, User } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';
import { DefaultResponseDto } from '../../src/common/dto/defaultResponse.dto';
import { FastifyRequestWithUser } from '../../src/common/interfaces/customFastifyRequest';
import { RefreshTokenService } from '../../src/common/services/refreshToken.service';
import { AuthService } from './auth.service';
import { PostTokenRevokeDto } from './dto/postTokenRevoke.dto';
import { UserLoginRequestDto } from './dto/userLoginRequest.dto';
import { UserLoginResponseDto } from './dto/userLoginResponse.dto';
import { JwtRefreshTokenAuthGuard } from './jwt-refresh-token.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  @Post('/login')
  @ApiTags('auth')
  @ApiOperation({ summary: 'Login returns an access token valid for 30 days' })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    type: UserLoginRequestDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
    type: DefaultResponseDto,
  })
  async login(
    @Request() request: FastifyRequest,
    @Response({ passthrough: true }) response: FastifyReply,
    @Body() body: UserLoginRequestDto,
  ): Promise<UserLoginResponseDto> {
    const user: User = await this.authService.validateUser(
      body.email,
      body.password,
    );
    if (user) {
      const accessToken: string = await this.authService.generateAccessToken(
        user,
      );

      // Generate a refresh token for the user.
      const refreshToken: string = await this.authService.generateRefreshToken(
        user,
        request.hostname,
        request.headers['user-agent'],
      );
      response.setCookie('refreshToken', refreshToken, {});

      return {
        success: true,
        message: 'Login successful',
        data: { access_token: accessToken },
      };
    }
    throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
  }

  @Post('/token/refresh')
  @UseGuards(JwtRefreshTokenAuthGuard)
  @ApiCookieAuth()
  @ApiTags('auth')
  @ApiOperation({ summary: 'Returns a new access token, valid for 30 days.' })
  @ApiResponse({
    description: 'New access token generated successfully.',
    status: 200,
    type: UserLoginResponseDto,
  })
  @ApiResponse({
    description: 'Bad request.',
    status: 400,
    type: DefaultResponseDto,
  })
  @ApiResponse({
    description: 'Invalid credentials.',
    status: 401,
    type: DefaultResponseDto,
  })
  async tokenRefresh(
    @Request() request: FastifyRequestWithUser,
  ): Promise<UserLoginResponseDto> {
    // Generate a JWT for the user.
    const token: string = await this.authService.generateAccessToken(
      request.user,
    );

    return {
      success: true,
      message: 'New access token generated successfully.',
      data: {
        access_token: token,
      },
    };
  }

  @Post('/token/revoke')
  @UseGuards(JwtRefreshTokenAuthGuard)
  @ApiCookieAuth()
  @ApiTags('auth')
  @ApiOperation({
    summary: 'Revokes a refresh token, leaving it blacklisted.',
    description:
      'Revokes a refresh token. The refresh token to be revoked can be sent through' +
      " a cookie or the request's body. Priority is given to the token on the" +
      " request's body. Either way, it is necessary to have a valid refreshToken" +
      ' cookie sent along with the request.',
  })
  @ApiResponse({
    status: 200,
    description: 'Refresh token revoked successfully.',
    type: UserLoginResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
    type: DefaultResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials.',
    type: DefaultResponseDto,
  })
  @ApiResponse({
    status: 403,
    description: 'You dont have permission to perform this action.',
    type: DefaultResponseDto,
  })
  async tokenRevoke(
    @Request() request: FastifyRequestWithUser,
    @Response({ passthrough: true }) response: FastifyReply,
    @Body() body: PostTokenRevokeDto,
  ): Promise<UserLoginResponseDto> {
    // Retrieve the refresh token from the request's body or cookie.
    const refreshTokenStr: string =
      body.refreshToken || request.cookies.refreshToken;

    // Find the refresh token with this value.
    const refreshToken: RefreshToken = await this.refreshTokenService.findToken(
      refreshTokenStr,
    );

    // Check if the refresh token to be revoked is owned by the user or if the user's role
    // allows him to revoke the refresh token.
    if (refreshToken && refreshToken.userId === request.user.id) {
      // Revoke the refresh token.
      await this.refreshTokenService.revokeRefreshTokenByValue(refreshTokenStr);
    } else {
      throw new HttpException(
        'You dont have permission to perform this action.',
        HttpStatus.FORBIDDEN,
      );
    }

    // Delete the refresh token cookie.
    response.clearCookie('refreshToken');

    return {
      success: true,
      message: 'Refresh token revoked successfully.',
      data: null,
    };
  }

  @Post('/logout')
  @ApiTags('auth')
  @ApiOperation({ summary: 'Logout' })
  @ApiResponse({
    status: 200,
    description: 'Logout successful',
    type: DefaultResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
    type: DefaultResponseDto,
  })
  async logoutUser(
    @Request() request: FastifyRequest,
    @Response({ passthrough: true }) response: FastifyReply,
  ): Promise<DefaultResponseDto> {
    response.clearCookie('refreshToken');
    await this.refreshTokenService.revokeRefreshTokenByValue(
      request.cookies.refreshToken,
    );
    return {
      success: true,
      message: 'Logout successful',
      data: {},
    };
  }
}
