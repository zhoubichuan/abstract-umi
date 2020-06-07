import React, { Fragment, Component } from "react"
import { Collapse, Form, Col, Row } from "antd"
import moment from "moment"
import ThemeContext from "../../ThemeContext.js"
class BaseInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      item: this.props.item,
    }
  }
  render() {
    const baseInfoConfig = [
      { header: "中文名称", name: "name" },
      { header: "英文名称", name: "nameEn" },
      { header: "中文描述", name: "descript" },
      { header: "英文描述", name: "descriptEn" },
    ]
    const editConfig = [
      { header: "更新者", name: "updater" },
      { header: "创建者", name: "creater" },
      { header: "更新时间", name: "updateTime" },
      { header: "创建时间", name: "creatTime" },
    ]
    let { item } = this.state
    return (
      <Fragment>
        <Row gutter={24} key={moment.locale()}>
          <Collapse defaultActiveKey={["base", "edit"]}>
            <Collapse.Panel header="基本信息" key="base">
              {baseInfoConfig.map((config, index) => {
                console.log(config.name, item[config.name])
                return (
                  <Col span={12} key={index}>
                    <Form.Item label={config.header} name={config.name}>
                      <span>
                        {["tag", "category"].includes(config.name)
                          ? item[config.name].name
                          : item[config.name]}
                      </span>
                    </Form.Item>
                  </Col>
                )
              })}
            </Collapse.Panel>
            <Collapse.Panel header="编辑信息" key="edit">
              {editConfig.map((config, index) => (
                <Col span={12} key={index}>
                  <Form.Item label={config.header} name={config.name}>
                    <span>
                      {["updateTime", "creatTime"].includes(config.name)
                        ? moment(item[config.name]).format(
                            "YYYY-MM-DD HH:mm:ss"
                          )
                        : item[config.name]}
                    </span>
                  </Form.Item>
                </Col>
              ))}
            </Collapse.Panel>
          </Collapse>
        </Row>
      </Fragment>
    )
  }
}
export default BaseInfo
