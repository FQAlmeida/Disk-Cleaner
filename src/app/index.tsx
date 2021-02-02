import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./redux/store";

const app = (
    <Provider store={store}>
        <App />
    </Provider>
);

function app_render(): void {
    render(app, document.getElementById("app"));
}

export default app_render;
