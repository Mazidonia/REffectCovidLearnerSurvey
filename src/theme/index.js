import { createTheme, colors } from "@material-ui/core/styles";
import shadows from "./shadows";
import typography from "./typography";
import {
  red,
  lightBlue,
  deepPurple,
  deepOrange,
} from "@material-ui/core/colors";

export const theme = {
  overrides: {
    MuiButton: {
      root: {
        margin: "10px",
      },
    },
  },
  typography: {
    fontFamily: ["Sarabun", "sans-serif"].join(","),
    subtitle1: {
      fontSize: 13,
    },
    subtitle2: {
      fontSize: 14,
    },
    h1: {
      fontWeight: 500,
      fontSize: 35,
      letterSpacing: "-0.24px",
    },
    h2: {
      fontWeight: 500,
      fontSize: 29,
      letterSpacing: "-0.24px",
    },
    h3: {
      fontWeight: 500,
      fontSize: 24,
      letterSpacing: "-0.06px",
    },
    h4: {
      fontWeight: 500,
      fontSize: 20,
      letterSpacing: "-0.06px",
    },
    h5: {
      fontWeight: 500,
      fontSize: 16,
      letterSpacing: "-0.05px",
    },
    h6: {
      fontWeight: 500,
      fontSize: 14,
      letterSpacing: "-0.05px",
    },
    overline: {
      fontWeight: 500,
    },
  },
  palette: {
    footer: { bg: "#393e46", text: "#eeeeee" },
    common: { black: "#000", white: "#FFF" },
    white: "#FFF",
    black: "#000",
    background: { paper: "#FFF", default: "#fafafa" },
    primary: {
      light: "#CBB2FF",
      main: "#553C8B",
      dark: "#25006B",
      contrastText: "#FFF",
    },
    secondary: {
      light: "#FDC7C8",
      main: "#F76466",
      dark: "#7C1A1B",
      contrastText: "#FFF",
    },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "#FFF",
    },
    success: {
      light: "#B0E0A8",
      main: "#45D42E",
      dark: "#309020",
      contrastText: "#FFF",
    },
    warning: {
      light: "#FFD19A",
      main: "#FCAF54",
      dark: "#DF7B05",
      contrastText: "#FFF",
    },
    danger: {
      light: "#FCAC9F",
      main: "#EF6C57",
      dark: "#C1260D",
      contrastText: "#FFF",
    },
    info: {
      light: "#BFDFFF",
      main: "#57A3EF",
      dark: "#0458AC",
      contrastText: "#FFF",
    },
    text: {
      primary: "#343D4B",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)",
    },
    action: {
      selected: "#E3D7FD",
    },
  },
  shadows,
};
