import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { FacebookService } from 'src/common/services/facebook.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import {
  PostMetricsOut,
  PublicationFacebook,
  PublicationFacebookOut,
} from './entities/publication-facebook.entity';
import { Publication } from '@prisma/client';
import { AuditService } from 'src/common/services/audit.service';
import { AuditEventEnum } from 'src/common/enums/auditEventEnum';

@Controller('publications')
export class PublicationsController {
  constructor(
    private readonly publicationsService: PublicationsService,
    private readonly facebookService: FacebookService,
    private readonly auditService: AuditService,
  ) {}

  @Post()
  create(@Body() createPublicationDto: CreatePublicationDto) {
    return this.publicationsService.create(createPublicationDto);
  }

  @Get()
  findAll() {
    return this.publicationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.publicationsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publicationsService.remove(+id);
  }

  @Cron(CronExpression.EVERY_DAY_AT_2AM)
  async updateIgPublications() {
    const publicationsFacebook: PublicationFacebookOut =
      await this.facebookService.getAllIgObjects('17841410886204793/media', [
        'media_url',
        'media_type',
        'thumbnail_url',
        'timestamp',
      ]);

    publicationsFacebook.data.forEach(
      async (publication: PublicationFacebook) => {
        let metrics: string[] = ['saved', 'reach', 'impressions'];
        switch (publication.media_type) {
          case 'CAROUSEL_ALBUM':
            metrics = metrics.concat([]);
            break;
          case 'IMAGE':
            metrics = metrics.concat(['profile_visits', 'shares', 'follows']);
            break;
          case 'VIDEO':
            metrics = metrics.concat(['comments', 'shares', 'video_views']);
            break;
        }

        const publicationMetrics: PostMetricsOut =
          await this.facebookService.getIgMediaMetrics(publication.id, metrics);

        const publicationDto: CreatePublicationDto =
          this.facebookService.mapToPublication(
            publication,
            publicationMetrics,
            1,
          );

        const createdPublication: Publication | null =
          await this.publicationsService.create(publicationDto);

        if (createdPublication) {
          this.auditService.createAuditLog(
            1,
            AuditEventEnum.CreatePublication,
            createdPublication.id,
            '',
          );
        } else {
          const updatedPublication: Publication | null =
            await this.publicationsService.updateByNetworkId(
              publicationDto.networkId,
              publicationDto,
            );

          this.auditService.createAuditLog(
            1,
            AuditEventEnum.UpdatePublication,
            updatedPublication.id,
            '',
          );
        }
      },
    );
  }
}
