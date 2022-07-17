import React, { Component } from "react"
import { Row, Col, message } from "antd"
import articleService from "../../service/article"

export default class Article extends Component {
  state = {
    item: {},
  }
  componentDidMount() {
    articleService.addPv(this.props.match.params.id).then((res) => {
      if (res?.code == 0) {
        this.setState({}, this.getList)
      } else {
        message.error(res?.data)
      }
    })
  }
  render() {
    return (
      <Row>
        <Col style={{ "text-align": "center" }} span={24}>
          {"asdfasd"}
        </Col>
      </Row>
    )
  }
}
