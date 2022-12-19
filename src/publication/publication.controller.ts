import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Publication } from '@prisma/client';
import { JwtAccessTokenAuthGuard } from '../../src/auth/jwt-access-token.guard';
import { DefaultResponseDto } from '../../src/common/dto/defaultResponse.dto';
import { PostPublicationRequestDto } from './dto/postPublicationRequest.dto';
import { PostPublicationResponDto } from './dto/postPublicationResponse.dto';
import { PatchPublicationRequestDto } from './dto/patchPublicationRequest.dto';
import { PublicationOut } from './entities/publication.entity';
import { PublicationService } from './publication.service';
import { GetPublicationsResponseDto } from './dto/getPublicationsResponse.dto';
import { GetPublicationsQueryDto } from './dto/getPublicationsQuery.dto';

@Controller('publication')
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  @Post('/')
  @UseGuards(JwtAccessTokenAuthGuard)
  @ApiCookieAuth()
  @ApiTags('publication')
  @ApiCreatedResponse({
    description: 'Publication created',
    type: PostPublicationResponDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid data',
    type: DefaultResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: DefaultResponseDto,
  })
  async create(
    @Body() createPublicationDto: PostPublicationRequestDto,
  ): Promise<PostPublicationResponDto> {
    const publication: Publication | null =
      await this.publicationService.create(createPublicationDto);

    if (!publication) {
      throw new HttpException(
        'Publication not created',
        HttpStatus.BAD_REQUEST,
      );
    }

    const publicationOut: PublicationOut =
      this.publicationService.mapPublicationToPublicationOut(publication);

    return {
      success: true,
      message: 'Publication created successfully.',
      data: publicationOut,
    };
  }

  @Get('/')
  @UseGuards(JwtAccessTokenAuthGuard)
  @ApiCookieAuth()
  @ApiTags('publication')
  @ApiOperation({ summary: 'Find all publications' })
  @ApiCreatedResponse({
    description: 'Publications found',
    type: GetPublicationsResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid data',
    type: DefaultResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Publication not found',
    type: DefaultResponseDto,
  })
  async findAll(
    @Query() query?: GetPublicationsQueryDto,
  ): Promise<GetPublicationsResponseDto> {
    const publications: Publication[] | null =
      await this.publicationService.findAll(query);

    if (!publications) {
      throw new HttpException('Publications not found', HttpStatus.NOT_FOUND);
    }

    const publicationsOut: PublicationOut[] = publications.map(
      (publication: Publication) =>
        this.publicationService.mapPublicationToPublicationOut(publication),
    );
    return {
      success: true,
      message: 'Publications found successfully.',
      data: publicationsOut,
    };
  }

  @Get('/:id')
  @UseGuards(JwtAccessTokenAuthGuard)
  @ApiCookieAuth()
  @ApiTags('publication')
  @ApiOperation({ summary: 'Find one publication by id' })
  @ApiCreatedResponse({
    description: 'Publication found',
    type: PostPublicationResponDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid data',
    type: DefaultResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Publication not found',
    type: DefaultResponseDto,
  })
  async findOne(@Param('id') id: string): Promise<PostPublicationResponDto> {
    const publication: Publication | null =
      await this.publicationService.findPublicationById(+id);
    if (!publication) {
      throw new HttpException('Publication not found', HttpStatus.NOT_FOUND);
    }

    const publicationOut: PublicationOut =
      this.publicationService.mapPublicationToPublicationOut(publication);

    return {
      success: true,
      message: 'Publication found successfully.',
      data: publicationOut,
    };
  }

  @Patch('/:id')
  @UseGuards(JwtAccessTokenAuthGuard)
  @ApiCookieAuth()
  @ApiTags('publication')
  @ApiOperation({ summary: 'Update one publication by id' })
  @ApiCreatedResponse({
    description: 'Publication updated',
    type: PostPublicationResponDto,
  })
  async update(
    @Param('id') id: string,
    @Body() updatePublicationDto: PatchPublicationRequestDto,
  ): Promise<PostPublicationResponDto> {
    const publication: Publication | null =
      await this.publicationService.findPublicationById(+id);

    if (!publication) {
      throw new HttpException('Publication not found', HttpStatus.NOT_FOUND);
    }

    const updatedPublication: Publication | null =
      await this.publicationService.update(+id, updatePublicationDto);

    if (!updatedPublication) {
      throw new HttpException(
        'Publication not updated',
        HttpStatus.BAD_REQUEST,
      );
    }

    const publicationOut: PublicationOut =
      this.publicationService.mapPublicationToPublicationOut(
        updatedPublication,
      );

    return {
      success: true,
      message: 'Publication updated successfully.',
      data: publicationOut,
    };
  }

  @Delete(':id')
  @UseGuards(JwtAccessTokenAuthGuard)
  @ApiCookieAuth()
  @ApiTags('publication')
  @ApiOperation({ summary: 'Delete one publication by id' })
  @ApiCreatedResponse({
    description: 'Publication deleted',
    type: DefaultResponseDto,
  })
  async remove(@Param('id') id: string): Promise<DefaultResponseDto> {
    const publication: Publication | null =
      await this.publicationService.remove(+id);
    if (!publication) {
      throw new HttpException('Publication not found', HttpStatus.NOT_FOUND);
    }

    return {
      success: true,
      message: 'Publication deleted successfully.',
      data: null,
    };
  }
}
