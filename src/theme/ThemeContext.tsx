import { ThemeProvider, createTheme } from "@mui/material";
import {
  FC,
  useState,
  createContext,
  useCallback,
  useContext,
  PropsWithChildren,
  useMemo,
} from "react";
// import RTL from './RTL';
import { themeVariable } from "./themevariable";

const MaterialThemeContext = createContext({
  toggleDarkMode: () => {},
  isDarkMode: true,
});
const MaterialThemeProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const toggleDarkMode = useCallback(() => {
    setDarkMode((p) => !p);
  }, []);

  const theme = createTheme({
    typography: {
      fontFamily: "Vazirmatn",
    },
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: themeVariable.primary,
      },
      secondary: {
        main: themeVariable.secondary,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          contained: {
            color: "white",
          },
        },
        defaultProps: {
          size: "small",
          disableElevation: true,
          variant: "contained",
        },
      },
    },
  });

  const contextValue = useMemo(
    () => ({ toggleDarkMode, isDarkMode: !!darkMode }),
    [darkMode, toggleDarkMode]
  );

  return (
    // <RTL enabled={i18n.language !== 'en'}>
    <ThemeProvider theme={theme}>
      <MaterialThemeContext.Provider value={contextValue}>
        {children}
      </MaterialThemeContext.Provider>
    </ThemeProvider>
    // </RTL>
  );
};
export default MaterialThemeProvider;

export const useThemeContext = () => useContext(MaterialThemeContext);
