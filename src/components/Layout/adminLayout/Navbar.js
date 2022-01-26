import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import InputIcon from "@material-ui/icons/Input";
import logo from "../../../assets/logo.png";
const useStyles = makeStyles((theme) => ({
  logo: {
    maxWidth: "100%",
    height: "80%",
  },
}));

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
  const styles = useStyles();
  const [notifications] = useState([]);

  return (
    <AppBar elevation={0} {...rest}>
      <Toolbar>
        <RouterLink to="/effect-covid-learner-survey">
          <img src={logo} />
        </RouterLink>

        <Box sx={{ flexGrow: 1 }} />

        {/* <IconButton color="inherit">
          <Badge
            badgeContent={notifications.length}
            color="primary"
            variant="dot"
          >
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton color="inherit">
          <InputIcon />
        </IconButton> */}

        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func,
};

export default DashboardNavbar;
