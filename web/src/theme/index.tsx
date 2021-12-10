import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";

export const MuiThemeProvider: React.FC = ({ children }) => {
  return (
    <>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </>
  );
};
