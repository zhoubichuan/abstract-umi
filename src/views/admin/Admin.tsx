import React, { Component } from "react"
import { Row, Col } from "antd"
import Header from "../../components/Header/index.jsx"
import Navleft from "../../components/Navleft/index.jsx"
// import { Route } from "react-router-dom"
// import Welcome from "../welcome/index.jsx"
// import Category from "../category/index.jsx"
// import DataModeManager from "../DataModeManager/DataModel.jsx"
// import Article1 from "../article/article1.jsx"
// import Article2 from "../article/article2.jsx"
// import article from "../article/article.jsx"
// import TagManager from "../TagManager/tagManager.jsx"

export default class Admin extends Component {
  render() {
    return (
      <Row>
        <Col span={24} className="admin-page">
          <Header className="admin-header" />
          <Row className="admin-content">
            <Col span={3} className="admin-nav">
              <Navleft />
            </Col>
            <Col span={21} className="admin-page">
              {/* <Route exact path="/admin" component={Welcome} />
              <Route path="/admin/category" component={Category} />
              <Route
                path="/admin/dataModeManager"
                component={DataModeManager}
              /> */}
              {/* <Route path="/admin/article1" component={Article1} />
              <Route path="/admin/article2" component={Article2} />
              <Route path="/admin/article/:id" component={article} /> */}
              {/* <Route path="/admin/TagManager" component={TagManager} /> */}
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
}
