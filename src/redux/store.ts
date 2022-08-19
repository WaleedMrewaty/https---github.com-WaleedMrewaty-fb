import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import { saveToLocalStorage, getFromLocalStorage } from "../helpers";

import rootReducer from "./rootReducer";
import { fbUserInfo } from "./slices/FbUserInfo/FbUserInfoSlice";

const logger = createLogger();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      ...(process.env.NODE_ENV === "development" ? [logger] : [])
    ),
  preloadedState: {
    fbUserInfo: getFromLocalStorage("facebook-user-info") || fbUserInfo,
  },
});

store.subscribe(() => {
  saveToLocalStorage("facebook-user-info", store.getState().fbUserInfo);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
