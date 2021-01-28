import React from 'react';
import { render } from 'react-dom';

function app_render() {
  render(<h2>Hello from React!</h2>, document.getElementById("app"));
}

export default app_render;
