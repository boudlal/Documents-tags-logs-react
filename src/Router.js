import React, { useEffect } from "react";
import { Switch, Route, BrowserRouter, useLocation, Redirect } from "react-router-dom";
import Header from "./components/Header";
import Documents from "./pages/Documents";
import Logs from "./pages/Logs";
import Tags from "./pages/Tags";



function Router(props) {

  return (
    <BrowserRouter>
    <Header />
      <Switch>
        <Route exact path={"/tags"} component={Tags} />
        <Route exact path={"/logs"} component={Logs} />
        <Route exact path={"/documents"} component={Documents} />
        <Route exact path="/">
          <Redirect to="/documents" />
      </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;