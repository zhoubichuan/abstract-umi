import React, { Component } from "react";
import { Menu, Icon } from "antd";
import { withRouter, Link } from "react-router-dom";

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
      </Menu>
    );
  }
}
export default withRouter(Navleft);
