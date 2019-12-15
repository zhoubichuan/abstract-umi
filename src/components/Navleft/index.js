import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import { withRouter, Link } from 'react-router-dom'
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
        <Menu.Item key="/admin/category" title="分类管理">
          <Link to="/admin/category">
            <Icon type="bars" />
            分类管理
          </Link>
        </Menu.Item>
        <Menu.Item key="/admin/article" title="文章管理">
          <Link to="/admin/article">
            <Icon type="book" />
            文章管理
          </Link>
        </Menu.Item>

        <SubMenu
          title={
            <span className="submenu-title-wrapper">
              <Icon type="setting" />
              类别管理
            </span>
          }
        >
          <Menu.ItemGroup title="前端知识点">
            <Menu.Item key="setting:1">Vue知识点</Menu.Item>
            <Menu.Item key="setting:2">React知识点</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="后端知识点">
            <Menu.Item key="setting:3">node</Menu.Item>
            <Menu.Item key="setting:4">算法</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
      </Menu>
    )
  }
}
export default withRouter(Navleft)
