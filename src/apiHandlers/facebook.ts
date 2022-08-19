import {
  IFbAccessToken,
  IFbPages,
  IIg,
  IIgMedia,
  IMediaFbid,
  IPagePost,
} from "interfaces/facebook";
import ApiRoutes from "constants/apiRoutes";
import FbApiInstance from "./FbApiInstance";

const getFbLongAccessToken = async (payload: {
  grant_type: string;
  client_id: string;
  client_secret: string;
  fb_exchange_token: string;
}) => {
  const { data } = await FbApiInstance.get<IFbAccessToken>(
    ApiRoutes.FACEBOOK_ROUTES.GET_LONG_LIVED_USER_ACCESS_TOKEN,
    {
      params: { ...payload },
    }
  );
  return data;
};

const getFbPages = async (userId: string, access_token: string) => {
  const { data } = await FbApiInstance.get<IFbPages>(`/${userId}/accounts`, {
    params: {
      access_token,
    },
  });
  return data;
};

const fbPublishContent = async (
  pageId: string,
  payload: {
    access_token: string;
    message: string | null;
    published: boolean | null;
    attached_media: IMediaFbid[] | null;
    link: string | null;
  }
) => {
  const { data } = await FbApiInstance.post<IPagePost>(
    `/${pageId}/feed`,
    null,
    {
      params: { ...payload },
    }
  );
  return data;
};

const getImageId = async (
  pageId: string,
  payload: {
    access_token: string;
    url: string;
    published: boolean;
    message: string | null;
  }
) => {
  const { data } = await FbApiInstance.post<IPagePost>(
    `/${pageId}/photos`,
    null,
    {
      params: { ...payload },
    }
  );
  return data;
};

const getIgId = async (pageId: string, accessToken: string) => {
  const { data } = await FbApiInstance.get<IIg>(`/${pageId}`, {
    params: { fields: "instagram_business_account", access_token: accessToken },
  });
  return data;
};

const IgMedia = async (
  userIgId: string,
  payload: {
    access_token: string;
    image_url: string;
    is_carousel_item?: boolean;
  }
) => {
  const { data } = await FbApiInstance.post<IIgMedia>(
    `/${userIgId}/media`,
    null,
    {
      params: { ...payload },
    }
  );
  return data;
};

const IgMediaContainer = async (
  userIgId: string,
  payload: {
    access_token: string;
    caption: string | null;
    media_type: string;
    children: string[];
  }
) => {
  const { data } = await FbApiInstance.post<IIgMedia>(
    `/${userIgId}/media`,
    null,
    {
      params: {
        ...payload,
      },
    }
  );
  return data;
};

const PublishIgMediaContainer = async (
  userIgId: string,
  payload: {
    access_token: string;
    creation_id: string;
  }
) => {
  const { data } = await FbApiInstance.post<IIgMedia>(
    `/${userIgId}/media_publish`,
    null,
    {
      params: { ...payload },
    }
  );
  return data;
};

const facebookApi = {
  getFbLongAccessToken,
  getFbPages,
  fbPublishContent,
  getImageId,
  getIgId,
  IgMedia,
  IgMediaContainer,
  PublishIgMediaContainer,
};

export default facebookApi;
