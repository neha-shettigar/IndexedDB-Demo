import { legacy_createStore as createStore, applyMiddleware, compose } from "redux";
import {reducer} from "./reducer"


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create a Redux store that holds the state tree.
const store = createStore(reducer, composeEnhancers(applyMiddleware()));
console.log(store.getState());
store.subscribe(() => {
  console.log("Action Dispatched: ", store.getState());
});


export default store;

