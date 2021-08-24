import { createStore, applyMiddleware, compose } from "redux";
//import { composeWithDevTools } from "remote-redux-devtools";
import thunk from "redux-thunk";

// let composeEnhancers = "";
// if (process.env.NODE_ENV === "development") {
//   composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// } else {
//   composeEnhancers = compose;
// }

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

//const composeEnhancers = composeWithDevTools({ port: 8080 });

// export default function configStore(initialState) {
//   return createStore(initialState, composeEnhancers(applyMiddleware(thunk)));
// }

export default function configStore(initialState) {
  return createStore(initialState, composeEnhancers(applyMiddleware(thunk)));
}
