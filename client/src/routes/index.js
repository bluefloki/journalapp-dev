import React from "react";
import { Switch } from "react-router-dom";
import Route from "./RouteWrapper";
import Journal from "../views/Journal";
import Register from "../views/Register";
import Home from "../views/Home";
import Entries from "../views/Entries";
import Achievements from "../views/Achievements";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/register" component={Register} />

      <Route path="/journal/:id" component={Journal} isPrivate />
      <Route path="/achievements" component={Achievements} isPrivate />
      <Route path="/entries" component={Entries} isPrivate />

      {/* redirect user to SignIn page if route does not exist and user is not authenticated */}
      <Route component={Register} />
    </Switch>
  );
};

export default Routes;
