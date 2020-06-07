import React, { Component } from "react"
import { HashRouter as Router, Route, Switch } from "react-router-dom"
import Home from "./pages/home/index.jsx"
import Admin from "./pages/admin/index.jsx"
export default class Routers extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/admin" component={Admin} />
        </Switch>
      </Router>
    )
  }
}
