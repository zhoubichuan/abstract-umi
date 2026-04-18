import React, { useEffect, useState } from 'react';
import { Row, Col, message, Popconfirm } from 'antd';
// import user from '@/services/user.ts';

const Header: React.FC = () => {
    const [username, setUsername] = useState('');

    useEffect(() => {
        const username = sessionStorage.getItem('username');
        setUsername(username || '');
    }, []);

    const logout = () => {
        // user.signout().then(data => {
        //     if (data.code == 0) {
        //         sessionStorage.removeItem('username');
        //     } else {
        //         message.error(data.error);
        //     }
        // });
    };

    const cancel = () => {
        message.error('Click on No');
    };

    return (
        <Row className="admin-header" style={{ padding: '0 20px' }}>
            <Col span={6}>数据管理系统</Col>
            <Col span={18}>
                <div style={{ float: 'right', fontSize: 16 }}>
                    <div type="smile" />
                    欢迎{username}
                    <Popconfirm
                        title="Are you sure delete this task?"
                        onConfirm={logout}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <div type="logout" />
                        退出
                    </Popconfirm>
                </div>
            </Col>
        </Row>
    );
};

export default Header
