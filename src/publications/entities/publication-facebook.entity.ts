export type PostMetrics = {
  name: string;
  period: string;
  values: [{ value: number }];
  title: string;
  description: string;
  id: string;
};

export type PostMetricsOut = {
  data: PostMetrics[];
};

export type PublicationFacebook = {
  media_url: string;
  media_type: 'CAROUSEL_ALBUM' | 'VIDEO' | 'IMAGE';
  timestamp: string;
  id: string;
  comments_count: number;
  likes_count: number;
};

export class PublicationFacebookOut {
  data: PublicationFacebook[];
}
