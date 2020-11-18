import './App.css';
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import GlobalContext from '@common/global-context';
import { renderAllRoutes } from '@routes/route-loader';
import { connect } from 'react-redux';
// import * as utils from "@src/utils";
import { Row, Col } from "antd"
import Header from "@src/components/Header/index.jsx"
import Navleft from "@src/components/Navleft/index.jsx"

interface AppProps {
    routes?: any;
}
class App extends React.PureComponent<AppProps> {
    globalContext;

    constructor(props) {
        super(props);
        this.globalContext = {};
    }

    render() {
        const routes = renderAllRoutes(this.props.routes);
        return (
          <Row>
            <Col span={24} className="admin-page">
              {/* <Header className="admin-header" />
              <Row className="admin-content">
                <Col span={3} className="admin-nav">
                  <Navleft />
                </Col>
                <Col span={21} className="admin-page">
                <GlobalContext.Provider value={this.globalContext}>
                    <Switch>{routes}</Switch>
                </GlobalContext.Provider>
                </Col>
              </Row> */}
            </Col>
          </Row>
        );
    }
}

export default App;
