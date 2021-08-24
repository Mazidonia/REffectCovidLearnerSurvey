//import axios from "../../axios/axios-graduate";
import axios from "../../axios/axios-api";
import * as actionTypes from "./actionTypes";
import jwtDecode from "jwt-decode";
import store from "../store";

let timerLogout = null;
let timerNotificationLogout = null;
let timerRenewAccessToken = null;
let timerTick = null;

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (accessToken, refreshToken, teacherData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    teacherData: teacherData,
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const authClearError = () => {
  return {
    type: actionTypes.AUTH_CLEAR_ERROR,
  };
};

export const logout = () => {
  localStorage.removeItem("teacherData");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("expirationAccessToken");
  localStorage.removeItem("expirationRefreshToken");
  clearInterval(timerTick);
  clearTimeout(timerLogout);
  clearTimeout(timerNotificationLogout);
  clearTimeout(timerRenewAccessToken);
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const renewAccessTokenCountDown = (expirationTimeAccessToken, type) => {
  return (dispatch) => {
    try {
      //เวลาที่ renew access Token จะ renew ก่อน access token จะหมดอายุ 10 วินาที
      const refreshToken = localStorage.getItem("refreshToken");
      const accessTokenTimeoutReq = expirationTimeAccessToken * 1000 - 10000;
      //const accessTokenTimeoutReq = expirationTimeAccessToken * 1000 - 5000;

      if (type === "refreshAccessToken") clearTimeout(timerRenewAccessToken);
      //getAccessTokenFromServer จะก่อน accessToken จะหมดอายุ 1 นาที
      timerRenewAccessToken = setTimeout(() => {
        refreshToken ? dispatch(getAccessTokenFromServer()) : null;
      }, accessTokenTimeoutReq);
    } catch (err) {
      dispatch(logout());
    }
  };
};

export const getAccessTokenFromServer = () => {
  return (dispatch, getState) => {
    const refreshToken = getState().auth.refreshToken;
    // get refreshToken จาก localStorage เพื่อที่จะขอ accessToken ใหม่โดยแนบ refreshToken ไป
    //const refreshToken = localStorage.getItem("refreshToken");
    return axios
      .get("questionnaire/auth/renew-access-token", {
        headers: { "x-refresh-token": refreshToken },
      })
      .then((res) => {
        //เมื่อได้ accessToken กลับมา ทำการ decode token เพื่อจะgetข้อมูลใน payload
        const decodedAccessToken = jwtDecode(res.data.accessToken);
        //กำหนดเวลาหมดอายุของ accessToken เพื่อที่จะบันทึกลงใน localStorage
        const expirationAccessToken = new Date(
          new Date().getTime() + decodedAccessToken.expiresIn * 1000
        );
        //บันทึก เวลาหมดอายุของ accessToken และ accessToken ลงใน localStorage
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("expirationAccessToken", expirationAccessToken);

        //store accessToken redux
        dispatch(
          renewAccessTokenFromServerSuccess(
            res.data.accessToken,
            decodedAccessToken.user_type
          )
        );
        //นับเวลาถอยหลัง เพื่อที่จะขอ accessToken ใหม่
        dispatch(
          renewAccessTokenCountDown(
            decodedAccessToken.expiresIn,
            "refreshAccessToken"
          )
        );
      })
      .catch((err) => {
        dispatch(logout());
      });
  };
};

export const renewAccessTokenFromServerSuccess = (accessToken) => {
  return {
    type: actionTypes.REFRESH_ACCESS_TOKEN_FROM_SERVER_SUCCESS,
    accessToken: accessToken,
  };
};

export const auth = (endPoint, authData) => {
  return (dispatch) => {
    dispatch(authStart());
    return new Promise((resolve, reject) => {
      return axios
        .post(endPoint, authData)
        .then((res) => {
          const { accessToken, refreshToken, teacherData } = res.data;
          const decodedAccessToken = jwtDecode(accessToken);
          const decodedRefreshToken = jwtDecode(refreshToken);

          const expirationAccessToken = new Date(
            //new Date().getTime() + 60 * 1000 * 60
            new Date().getTime() + (decodedAccessToken.expiresIn - 5) * 1000
          );
          const expirationRefreshToken = new Date(
            //new Date().getTime() + 60 * 1000 * 60
            new Date().getTime() + (decodedRefreshToken.expiresIn - 5) * 1000
          );

          localStorage.setItem("teacherData", JSON.stringify(teacherData));
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          localStorage.setItem("expirationAccessToken", expirationAccessToken);
          localStorage.setItem(
            "expirationRefreshToken",
            expirationRefreshToken
          );

          dispatch(authSuccess(accessToken, refreshToken, teacherData));

          //นับเวลาถอยหลัง ขอ accessToken ทุกๆ 5 นาที ก่อนหมดอายุ 5 วินาที
          dispatch(
            renewAccessTokenCountDown(decodedAccessToken.expiresIn, "login")
          );
          resolve();
        })
        .catch((err) => {
          dispatch(
            authFail(
              err.response ? err.response.data : JSON.stringify(err.message)
            )
          );
        });
    });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      dispatch(logout());
      return Promise.reject("logout");
    } else {
      const expirationAccessToken = localStorage.getItem(
        "expirationAccessToken"
      );
      const expirationRefreshToken = localStorage.getItem(
        "expirationRefreshToken"
      );
      const expirationDateAccessToken = new Date(expirationAccessToken);
      const expirationDateRefreshToken = new Date(expirationRefreshToken);

      if (expirationDateRefreshToken <= new Date()) {
        dispatch(logout());
        return Promise.reject("logout");
      } else {
        const teacherData = localStorage.getItem("teacherData");
        dispatch(
          authSuccess(accessToken, refreshToken, JSON.parse(teacherData))
        );
        dispatch(
          renewAccessTokenCountDown(
            (expirationDateAccessToken.getTime() - new Date().getTime()) / 1000,
            "refreshAccessToken"
          )
        );
        return Promise.resolve("login");
      }
    }
  };
};
