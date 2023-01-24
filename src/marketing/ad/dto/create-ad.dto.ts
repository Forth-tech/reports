export class CreateAdDto {
  networkId: string;
  networkName: string;
  startDate: Date;
  endDate: Date;
  id_adGroup: number;
  clicks: number;
  reach: number;
  impressions: number;
  investedValue: number;
  likes?: number;
  shares?: number;
  saves?: number;
}
