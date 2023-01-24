import { Format } from '@prisma/client';

export class CreatePublicationDto {
  id_network: number;
  url: string;
  networkId: string;
  format: Format;
  date: Date;
  likes: number;
  comments: number;
  impressions: number;
  saves: number;
  reach: number;
  shares?: number;
  profileAccess?: number;
  gainedFollowers?: number;
  videoViews?: number;
}
