import React from 'react';
import { render } from 'react-dom';

import App from "./App"

function app_render() {
  render(<App />, document.getElementById("app"));
}

export default app_render;
