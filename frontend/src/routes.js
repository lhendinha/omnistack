import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Main from "./Pages/Main";
import Box from "./Pages/Box";

const Routes = () => (
  // eslint-disable-next-line no-unused-expressions
  <Router>
    <Switch>
      <Route path="/" exact={true} component={Main} />
      <Route path="/box/:id" component={Box} />
    </Switch>
  </Router>
);

export default Routes;
