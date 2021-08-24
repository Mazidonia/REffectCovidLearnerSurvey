import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  accessToken: null,
  refreshToken: null,
  error: false,
  errorMsg: null,
  loading: false,
  teacherData: null,
};

const authStart = (state) => {
  return updateObject(state, { error: false, loading: true });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    teacherData: action.teacherData,
    accessToken: action.accessToken,
    refreshToken: action.refreshToken,
    loading: false,
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: true,
    errorMsg: action.error,
    loading: false,
  });
};

const authClearError = (state) => {
  return updateObject(state, initialState);
};

const renewAccessTokenFromServerSuccess = (state, action) => {
  return updateObject(state, {
    accessToken: action.accessToken,
  });
};

const authLogout = (state) => {
  return updateObject(state, initialState);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.AUTH_CLEAR_ERROR:
      return authClearError(state);
    case actionTypes.REFRESH_ACCESS_TOKEN_FROM_SERVER_SUCCESS:
      return renewAccessTokenFromServerSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
