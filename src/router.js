import React, { Component } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/home";
function Admin() {
  return <div>Admin</div>;
}
export default class Routers extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/admin" component={Admin} />
        </Switch>
      </Router>
    );
  }
}
