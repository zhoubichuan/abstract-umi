import React, { Fragment, useEffect, useState } from 'react';
import { Tabs, Button, Col } from 'antd';
import BaseInfo from './tabs/BaseInfo';
import Attribute from './tabs/Attribute';
import Editor from './tabs/Editor';
import History from './tabs/History';
import File from './tabs/File';

/**
 * TreeData 详情容器：
 * 承载基本信息、属性、编辑、历史、上传下载等子模块。
 */
const Detail: React.FC<any> = (props) => {
    const [viewVisible, setViewVisible] = useState(props?.viewVisible);
    const [editVisible, setEditVisible] = useState(props?.editVisible);
    const [item, setItem] = useState(props?.item);
    const [isCreate, setIsCreate] = useState(props?.isCreate);

    useEffect(() => {
        setViewVisible(props?.viewVisible);
        setIsCreate(props?.isCreate);
        setEditVisible(props?.editVisible);
        setItem(props?.item);
    }, [props?.viewVisible, props?.isCreate, props?.editVisible, props?.item]);

    return (
        <Fragment>
            <Tabs className="common-tabs">
                <Tabs.TabPane className="common-tabpane" tab="基本信息" key="baseInfo" closable={false}>
                    <BaseInfo viewVisible={viewVisible} editVisible={editVisible} isCreate={isCreate} item={item} />
                </Tabs.TabPane>
                <Tabs.TabPane className="common-tabpane" tab="数据模型项属性" key="attribute" closable={true}>
                    <Attribute />
                </Tabs.TabPane>
                <Tabs.TabPane className="common-tabpane" tab="内容编辑" key="content" closable={true}>
                    <Editor />
                </Tabs.TabPane>
                <Tabs.TabPane className="common-tabpane" tab="历史记录" key="history" closable={true}>
                    <History />
                </Tabs.TabPane>
                <Tabs.TabPane className="common-tabpane" tab="上传下载" key="down" closable={true}>
                    <File />
                </Tabs.TabPane>
            </Tabs>
            <Col className="tabs-button">
                <Button type="primary">编辑</Button>
                <Button style={{ marginLeft: '20px' }}>修改</Button>
            </Col>
        </Fragment>
    );
};
export default Detail;
