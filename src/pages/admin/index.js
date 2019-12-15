import React, { Component } from 'react'
import { Row, Col } from 'antd'
import Header from '../../components/Header'
import Navleft from '../../components/Navleft'
import { Route } from 'react-router-dom'
import Welcome from '../welcome'
import Category from '../category'
import Article from '../article'
import Article1 from '../article/article1'
import Article2 from '../article/article2'
import Articleaa from '../article/articleaa'

export default class Admin extends Component {
  render() {
    return (
      <Row className="admin-page">
        <Col span="24">
          <Header />
          <Row>
            <Col span="3">
              <Navleft />
            </Col>
            <Col span="21">
              <Route exact path="/admin" component={Welcome} />
              <Route path="/admin/category" component={Category} />
              <Route path="/admin/article" component={Article} />
              <Route path="/admin/article1" component={Article1} />
              <Route path="/admin/article2" component={Article2} />
              <Route path="/admin/articleaa/:id" component={Articleaa} />
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
}
