export interface IFbAccessToken {
  access_token: string;
  token_type: string;
  expires_in: string;
}

export interface IPage {
  name: string;
  access_token: string;
  id: string;
}

export interface IFbPages {
  data: IPage[];
}

export interface IPagePost {
  id: string;
  post_id: string;
}

export interface IMediaFbid {
  media_fbid: string;
}
export interface IIg {
  instagram_business_account: {
    id: string; // Connected IG User ID
  };
  id: string; // Facebook Page ID
}

export interface IIgMedia {
  id: string;
}
