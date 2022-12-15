import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { User } from "@prisma/client";
import { DefaultResponseDto } from "src/common/dto/defaultResponse.dto";
import { PostUserRequestDto } from "./dto/postUserRequest.dto";
import { PostUserResponseDto } from "./dto/postUserResponse.dto";
import { UserOutDto } from "./dto/userOut.dto";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("/")
  @ApiTags("users")
  @ApiOperation({ summary: "Create a new user" })
  @ApiCreatedResponse({
    description: "User created",
    type: PostUserResponseDto,
  })
  @ApiBadRequestResponse({
    description: "Invalid data",
    type: DefaultResponseDto,
  })
  @ApiConflictResponse({
    description: "Email already in use",
    type: DefaultResponseDto,
  })
  async postUser(
    @Body() body: PostUserRequestDto,
  ): Promise<PostUserResponseDto> {
    const existingUser = await this.usersService.findUserByEmail(body.email);
    if (existingUser) {
      throw new HttpException("Email already in use", HttpStatus.CONFLICT);
    }
    const saltAndHash: { salt: string; hash: string } =
      await this.usersService.saltAndHashPassword(body.password);

    const user: User = await this.usersService.createUser(
      body.name,
      body.email,
      saltAndHash.hash,
      saltAndHash.salt,
    );

    const userOut: UserOutDto = this.usersService.mapUserToUserOut(user);

    return {
      success: true,
      message: "User created",
      data: userOut,
    };
  }
}
