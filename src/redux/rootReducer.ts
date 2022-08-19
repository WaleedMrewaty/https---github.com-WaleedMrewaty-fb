import { combineReducers } from "@reduxjs/toolkit";
import { fbUserInfoReducer } from "./slices/FbUserInfo/FbUserInfoSlice";

const rootReducer = combineReducers({
  fbUserInfo: fbUserInfoReducer,
});

export default rootReducer;
