export type AdGroupFacebookOut = {
  adset_id: string;
  adset_name: string;
  campaign_id: string;
  objective: string;
  date_start: string;
  date_stop: string;
};

export class AdGroupFacebook {
  data: AdGroupFacebookOut[];
  paging: {
    cursors: {
      before: string;
      after: string;
    };
    next?: string;
    before?: string;
  };
}
