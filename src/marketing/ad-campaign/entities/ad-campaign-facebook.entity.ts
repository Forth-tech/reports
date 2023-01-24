export type AdCampaignFacebookOut = {
  campaign_id: string;
  campaign_name: string;
  date_start: string;
  date_stop: string;
  objective: string;
};

export class AdCampaignFacebookRequestOut {
  data: AdCampaignFacebookOut[];
}
