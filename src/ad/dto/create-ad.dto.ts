export class CreateAdDto {
  networkId: string;
  networkName: string;
  startDate: Date;
  endDate: Date;
  id_adGroup: number;
  clicks: number;
  reach: number;
  impressions: number;
  spend: number;
  likes?: number;
  shares?: number;
  saves?: number;
}
