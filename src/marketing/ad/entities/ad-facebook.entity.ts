interface actionType {
  action_type: string;
  value: string;
}

export type AdFacebookOut = {
  adset_id: string;
  ad_name: string;
  ad_id: string;
  clicks: string;
  reach: string;
  impressions: string;
  spend: string;
  date_start: string;
  date_stop: string;
  actions: actionType[];
};

export class AdFacebookRequestOut {
  data: AdFacebookOut[];
  paging: {
    cursors: {
      before: string;
      after: string;
    };
    next?: string;
    before?: string;
  };
}
