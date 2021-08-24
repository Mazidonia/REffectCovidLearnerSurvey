import { combineReducers } from "redux";
import configStore from "./configStore";
import authReducer from "./reducers/authReducer";

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = configStore(rootReducer);

export default store;
