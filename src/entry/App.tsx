import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import GlobalContext from '@common/global-context';
import { renderAllRoutes } from '@routes/route-loader';
import { connect } from 'react-redux';
// import * as utils from "@src/utils";
import { Row, Col } from 'antd';
import { withRouter, Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import './App.less';
const { SubMenu } = Menu;

const { Header, Sider, Content } = Layout;
interface AppProps {
    routes?: any;
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.globalContext = {};
        super(props);
        localStorage.setItem('token', 'login');
    }
    state = {
        collapsed: false,
    };
    globalContext;

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    handleLinkToRegisterBtnClick = route => {
        this.props.history.push(`/${route}`);
    };
    render() {
        const routes = renderAllRoutes(this.props.routes);
        return (
            <Layout>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="inline"
                        theme="light"
                        // onClick={this.handleClick}
                        defaultSelectedKeys={[window.location.hash.slice(1)]}
                    >
                        <Menu.Item
                            key="/admin"
                            title="首页"
                            icon={<UserOutlined />}
                            onClick={() => this.handleLinkToRegisterBtnClick('admin')}
                        >
                            首页
                        </Menu.Item>
                        <Menu.Item
                            key="/category"
                            title="数据模型项目"
                            icon={<VideoCameraOutlined />}
                            onClick={() => this.handleLinkToRegisterBtnClick('category')}
                        >
                            数据模型项目
                        </Menu.Item>
                        <SubMenu
                            icon={<UploadOutlined />}
                            title={
                                <span className="submenu-title-wrapper">
                                    <Icon type="setting" />
                                    全量数据实例管理
                                </span>
                            }
                        >
                            <Menu.Item
                                key="/dataModeManager"
                                title="数据模型"
                                onClick={() => this.handleLinkToRegisterBtnClick('dataModeManager')}
                            >
                                <Link to="/dataModeManager">
                                    <Icon type="book" />
                                    数据模型
                                </Link>
                            </Menu.Item>
                            <Menu.Item
                                key="/relationShip"
                                title="关系实体"
                                onClick={() => this.handleLinkToRegisterBtnClick('relationShip')}
                            >
                                <Link to="/relationShip">
                                    <Icon type="book" />
                                    关系实体
                                </Link>
                            </Menu.Item>
                            <Menu.Item
                                key="/dataInstance"
                                title="数据实例"
                                onClick={() => this.handleLinkToRegisterBtnClick('dataInstance')}
                            >
                                <Link to="/dataInstance">
                                    <Icon type="book" />
                                    数据实例
                                </Link>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu
                            title={
                                <span className="submenu-title-wrapper">
                                    <Icon type="setting" />
                                    系统详情管理
                                </span>
                            }
                        >
                            <Menu.Item key="/TagManager" title="标签管理">
                                <Link to="/TagManager">
                                    <Icon type="book" />
                                    标签管理
                                </Link>
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                        {React.createElement(
                            this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                            {
                                className: 'trigger',
                                onClick: this.toggle,
                            },
                        )}
                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                        <GlobalContext.Provider value={this.globalContext}>
                            <Switch>{routes}</Switch>
                        </GlobalContext.Provider>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default App;
