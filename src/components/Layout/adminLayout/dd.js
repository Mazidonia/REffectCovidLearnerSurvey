import React, { useEffect, useReducer } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import DialogConfirm from "../../../components/UI/Dialog/DialogConfirm";
import * as actions from "../../../store/actions/index";
import axios from "../../../axios/axios-api";

import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
} from "@material-ui/core";
import {
  Logout as LogoutIcon,
  Timeline as TimelineIcon,
} from "@material-ui/icons";

import NavItem from "./NavItem";

const reducer = (state, action) => {
  switch (action.type) {
    case "ON_OPEN_FORM_LOGOUT":
      return { ...state, ...{ openLogoutForm: true } };
    case "ON_CLOSE_FORM_LOGOUT":
      return { ...state, ...{ openLogoutForm: false } };
    default:
      return state;
  }
};

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  let initState = {
    openLogoutForm: false,
  };
  const location = useLocation();
  const [state, dispatchState] = useReducer(reducer, initState);
  //const studentData = useSelector((state) => state.auth.studentData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const onLogoutHandler = async () => {
    try {
      const endPoint = "effect-covid-learner-survey/logout";
      const res = await axios.put(endPoint);
      if (res) {
        dispatch(actions.logout());
      }
    } catch (err) {
      console.log(err);
    }
  };

  const openFormLogoutHandler = () => {
    dispatchState({
      type: "ON_OPEN_FORM_LOGOUT",
    });
  };

  const closeFormLogoutHandler = () => {
    dispatchState({
      type: "ON_CLOSE_FORM_LOGOUT",
    });
  };

  const dialogLogout = (
    <DialogConfirm
      open={state.openLogoutForm}
      handleClose={closeFormLogoutHandler}
      handleConfirm={() => {
        onLogoutHandler();
      }}
      title={"ยืนยันการออกจากระบบ"}
      msg={""}
    />
  );

  const content = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          p: 2,
        }}
      >
        <Avatar
          sx={{
            cursor: "pointer",
            width: 56,
            height: 56,
          }}
        />
        {/* <Typography color="textPrimary" variant="h5">
          {studentData.STD_CODE}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {studentData.FULL_NAME}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {studentData.GRP_NAME}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {studentData.MAJOR_NAME}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {studentData.FAC_NAME}
        </Typography> */}
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          <NavItem
            href={"/effect-covid-learner-survey/servey"}
            key={"ds"}
            title={"ตอบแบบสอบถาม"}
            icon={TimelineIcon}
          />
          <NavItem
            handler={openFormLogoutHandler}
            key={"dd"}
            title={"ออกจากระบบ"}
            icon={LogoutIcon}
          />
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Box
        sx={{
          backgroundColor: "background.default",
          m: 2,
          p: 2,
        }}
      >
        <Typography align="center" gutterBottom variant="h4">
          Version
        </Typography>
        <Typography align="center" variant="body2">
          1.0.0
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256,
            },
          }}
        >
          {dialogLogout}
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: "calc(100% - 64px)",
            },
          }}
        >
          {dialogLogout}
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
};

export default DashboardSidebar;
