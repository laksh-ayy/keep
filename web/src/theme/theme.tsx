import "@emotion/react";
import { createTheme } from "@mui/material";
import { color } from "./color";

export const theme = createTheme({
  palette: {
    divider: color.yellow_l,
  },
  typography: {
    fontFamily: "Roboto",
  },
});
