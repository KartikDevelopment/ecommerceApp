// In App.js in a new project

import * as React from "react";
import MainStack from "./MainStack";
import { Provider } from "react-redux";
import Store from "./Store";
function App() {
  return (
    <Provider store={Store}>
      <MainStack />
    </Provider>
  );
}

export default App;
