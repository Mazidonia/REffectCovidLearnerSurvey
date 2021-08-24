import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  language: "th"
};

const setLanguage = (state, action) => {
  return updateObject(state, { language: action.payload });
};

const resetLanguage = (state, action) => {
  return updateObject(state, { language: "th" });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LANGUAGE:
      return setLanguage(state, action);
    case actionTypes.RESET_LANGUAGE:
      return resetLanguage(state, action);
    default:
      return state;
  }
};

export default reducer;
