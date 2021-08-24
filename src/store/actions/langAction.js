import * as actionTypes from "./actionTypes";
import store from "../store";

export const langChange = () => {
  return dispatch => {
    if (store.getState().lang.language === "eng") {
      dispatch(langSet("th"));
    } else {
      dispatch(langSet("eng"));
    }
  };
};

export const langSet = lang => {
  const expirationLang = new Date(
    new Date().getTime() + 60 * 60 * 24 * 7 * 1000
  );
  localStorage.setItem("lang", lang);
  localStorage.setItem("expirationLang", expirationLang);
  return {
    type: actionTypes.SET_LANGUAGE,
    payload: lang
  };
};

export const langReset = () => {
  localStorage.removeItem("lang");
  localStorage.removeItem("expirationLang");
  return {
    type: actionTypes.RESET_LANGUAGE
  };
};

export const langCheckState = () => {
  return dispatch => {
    const lang = localStorage.getItem("lang");
    if (!lang) {
      dispatch(langReset());
    } else {
      const expirationLang = new Date(localStorage.getItem("expirationLang"));
      if (expirationLang <= new Date()) {
        dispatch(langReset());
      } else {
        dispatch(langSet(lang));
      }
    }
  };
};
