/* eslint-disable import/no-named-as-default */
import { CssBaseline } from "@mui/material";
import { FC, PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { store } from "@redux/store";
import MaterialThemeProvider from "theme/ThemeContext";
import "react-toastify/dist/ReactToastify.css";

const Wrapper: FC<PropsWithChildren<{}>> = ({ children }) => (
  <Provider store={store}>
    <MaterialThemeProvider>
      <ToastContainer />
      <CssBaseline />
      {children}
    </MaterialThemeProvider>
  </Provider>
);

export default Wrapper;
