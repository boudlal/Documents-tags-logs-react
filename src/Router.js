import React, { useEffect } from "react";
import { Switch, Route, BrowserRouter, useLocation } from "react-router-dom";
import Documents from "./pages/Documents";
import Logs from "./pages/Logs";
import Tags from "./pages/Tags";



function Router(props) {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={"/tags"} component={Tags} />
        <Route exact path={"/logs"} component={Logs} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;