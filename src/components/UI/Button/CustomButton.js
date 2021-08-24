import * as React from "react";
import { styled } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { red, orange, green, blue, grey } from "@material-ui/core/colors";

export const DangerButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(red[600]),
  backgroundColor: red[600],
  "&:hover": {
    backgroundColor: red[800],
  },
}));

export const WarningButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(orange[600]),
  backgroundColor: orange[600],
  "&:hover": {
    backgroundColor: orange[800],
  },
}));

export const SuccessButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(green[600]),
  backgroundColor: green[600],
  "&:hover": {
    backgroundColor: green[800],
  },
}));

export const InfoButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(blue[600]),
  backgroundColor: blue[600],
  "&:hover": {
    backgroundColor: blue[800],
  },
}));

export const DarkButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(grey[600]),
  backgroundColor: grey[600],
  "&:hover": {
    backgroundColor: grey[800],
  },
}));
