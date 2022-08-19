/* eslint-disable no-console */
import { themeVariable } from "theme/themevariable";
import FacebookLogin, { ReactFacebookLoginInfo } from "react-facebook-login";
import { memo } from "react";
import { showError, showSuccess } from "libs/react.toastify";
import { useAppDispatch } from "@redux/hooks";
import { fbUserInfoActions } from "@redux/slices/FbUserInfo/FbUserInfoSlice";
import facebookApi from "@api/facebook";

const clientId = "372818994835000";
const clientSecret = "b848c0c3c0dca00d9442affa11eda22f";

const FacebookLoginComponent = () => {
  const dispatch = useAppDispatch();

  const responseFacebook = async (response: ReactFacebookLoginInfo) => {
    const payload = {
      grant_type: "fb_exchange_token",
      client_id: clientId,
      client_secret: clientSecret,
      fb_exchange_token: response.accessToken,
    };

    try {
      const { access_token } = await facebookApi.getFbLongAccessToken(payload);
      const fbUserInfo = response;
      fbUserInfo.accessToken = access_token;
      dispatch(fbUserInfoActions.setFbUserInfo(fbUserInfo));
      showSuccess("Store Facebook Access Token Done");
    } catch (error: any) {
      showError(error.message);
    }
  };

  const BIG_BUTTON = {
    background: themeVariable.primary,
    borderRadius: "5px",
    fontSize: "9px",
    padding: "12px 17px",
  };

  return (
    <div>
      <FacebookLogin
        appId="372818994835000"
        callback={responseFacebook}
        fields="accessToken"
        buttonStyle={BIG_BUTTON}
        size="small"
        icon="fa-facebook"
        textButton="Sign in"
      />
    </div>
  );
};
export default memo(FacebookLoginComponent);
