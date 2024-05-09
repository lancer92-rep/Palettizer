import { createStore, compose, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { paletteReducer } from "./reducers";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  paletteReducer,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
