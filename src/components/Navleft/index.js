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
              前端知识点
            </span>
          }
        >
          <Menu.Item key="/admin/article1">
            <Link to="/admin/article1">
              <Icon type="book" />
              Vue相关知识点
            </Link>
          </Menu.Item>
          <Menu.Item key="/admin/article2">
            <Link to="/admin/article2">
              <Icon type="book" />
              Vuex
            </Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    )
  }
}
export default withRouter(Navleft)
