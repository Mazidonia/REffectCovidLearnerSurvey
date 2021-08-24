import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { AppBar, Toolbar } from "@material-ui/core";
import logo from "../../../assets/logo.png";
const MainNavbar = (props) => (
  <AppBar elevation={0} {...props}>
    <Toolbar sx={{ height: 64 }}>
      <RouterLink to="/questionnaire/teacher">
        <img src={logo} />
      </RouterLink>
    </Toolbar>
  </AppBar>
);

export default MainNavbar;
