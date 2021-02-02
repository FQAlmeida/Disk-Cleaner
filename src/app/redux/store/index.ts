import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { expression_finder_reducer } from "../reducers/expressions_finder/expression_finder.reducer";

export const reducer = combineReducers({
    expression_finder: expression_finder_reducer
});

export type rootState = ReturnType<typeof reducer>

const enhancer = process.env.NODE_ENV === "production" ? applyMiddleware(thunk) : composeWithDevTools(applyMiddleware(thunk));

export const store = createStore(reducer, enhancer);
