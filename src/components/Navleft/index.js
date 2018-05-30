import React, { Component } from "react";
import { Menu, Icon } from "antd";

export default class Navleft extends Component {
  render() {
    return (
      <Menu mode="inline" theme="light" defaultSelectedKeys={["/admin"]}>
        <Menu.Item key="/admin" title="首页">
          <Icon type="lock" />
          首页
        </Menu.Item>
        <Menu.Item key="/admin/category" title="分类管理">
          <Icon type="lock" />
          分类管理
        </Menu.Item>
        <Menu.Item key="/admin/article" title="文章管理">
          <Icon type="user" />
          文章管理
        </Menu.Item>
      </Menu>
    );
  }
}
