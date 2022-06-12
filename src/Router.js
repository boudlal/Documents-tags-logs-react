import React, { useEffect } from "react";
import { Switch, Route, BrowserRouter, useLocation } from "react-router-dom";
import Tags from "./pages/Tags";



function Router(props) {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={"/tags"} component={Tags} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;