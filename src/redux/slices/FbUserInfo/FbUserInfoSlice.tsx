import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReactFacebookLoginInfo } from 'react-facebook-login';

export const fbUserInfo: ReactFacebookLoginInfo = {
  id: '',
  accessToken: '',
  email: '',
  name: '',
  userID: '',
};

const FbUserInfoSlice = createSlice({
  name: 'fbUserInfo',
  initialState: fbUserInfo,
  reducers: {
    setFbUserInfo: (state, action: PayloadAction<ReactFacebookLoginInfo>) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.accessToken = action.payload.accessToken;
      state.userID = action.payload.userID;
      state.picture = action.payload.picture;
    },
  },
});

export const fbUserInfoReducer = FbUserInfoSlice.reducer;

export const fbUserInfoActions = FbUserInfoSlice.actions;
