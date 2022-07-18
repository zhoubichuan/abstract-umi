import React, { Component } from 'react';
import { Row, Col, Icon, message, Popconfirm } from 'antd';
// import user from '@/services/user.ts';

class Header extends Component {
    state = {
        username: '',
    };
    componentWillMount() {
        const username = sessionStorage.getItem('username');
        this.setState({ username });
    }
    logout = () => {
        // user.signout().then(data => {
        //     if (data.code == 0) {
        //         sessionStorage.removeItem('username');
        //     } else {
        //         message.error(data.error);
        //     }
        // });
    };
    cancel = e => {
        message.error('Click on No');
    };
    render() {
        return (
            <Row className="admin-header" style={{ padding: '0 20px' }}>
                <Col span={6}>数据管理系统</Col>
                <Col span={18}>
                    <div style={{ float: 'right', fontSize: 16 }}>
                        <Icon type="smile" />
                        欢迎{this.state.username}
                        <Popconfirm
                            title="Are you sure delete this task?"
                            onConfirm={this.logout}
                            onCancel={this.cancelcancel}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Icon type="logout" />
                            退出
                        </Popconfirm>
                    </div>
                </Col>
            </Row>
        );
    }
}

export default Header
