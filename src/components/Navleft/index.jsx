import React, { Component } from "react"
import { Menu, Icon } from "antd"
import { withRouter, Link } from "react-router-dom"
const { SubMenu } = Menu

class Navleft extends Component {
  render() {
    return (
      <Menu
        mode="inline"
        theme="light"
        onClick={this.handleClick}
        defaultSelectedKeys={[window.location.hash.slice(1)]}
      >
        <Menu.Item key="/admin" title="首页">
          <Link to="/admin">
            <Icon type="home" />
            首页
          </Link>
        </Menu.Item>
        <Menu.Item key="/admin/category" title="数据模型项目">
          <Link to="/admin/category">
            <Icon type="bars" />
            数据模型项目
          </Link>
        </Menu.Item>
        <Menu.Item key="/admin/article" title="文章管理">
          <Link to="/admin/article">
            <Icon type="book" />
            文章管理
          </Link>
        </Menu.Item>
        <Menu.Item key="/admin/TagManager" title="标签管理">
          <Link to="/admin/TagManager">
            <Icon type="book" />
            标签管理
          </Link>
        </Menu.Item>
        <SubMenu
          title={
            <span className="submenu-title-wrapper">
              <Icon type="setting" />
              全量数据实例管理
            </span>
          }
        >
          <Menu.Item key="/admin/dataModeManager">
            <Link to="/admin/dataModeManager">
              <Icon type="book" />
              数据模型项目
            </Link>
          </Menu.Item>
          <Menu.Item key="/admin/relationShip">
            <Link to="/admin/relationShip">
              <Icon type="book" />
              关系实体
            </Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    )
  }
}
export default withRouter(Navleft)
