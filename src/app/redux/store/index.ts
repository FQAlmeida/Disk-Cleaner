import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { expression_reducer } from "../reducers/expression/expression.reducer";

export const reducer = combineReducers({
    expressions: expression_reducer,
});

export type RootState = ReturnType<typeof reducer>

const enhancer = process.env.NODE_ENV === "production" ? applyMiddleware(thunk) : composeWithDevTools(applyMiddleware(thunk));

export const store = createStore(reducer, enhancer);
