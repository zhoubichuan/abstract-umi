import { Tabs } from 'antd';
import ViewDetail from './View/Detail';
import EditDetail from './Edit/Detail';
import CreateDetail from './Create/Detail';
import React, { useState, Fragment, useEffect } from 'react';
import ThemeContext from './ThemeContext';
const App: React.FC = (props) => {
    const [tabsItem, setState] = useState({
        '0001': {
            type: "create",
            title: "创建",
            key: "0001",
            item: { key: "create" },
        },
        '0002': {
            type: "view",
            title: "创建",
            key: "0002",
            item: { key: "create" },
        },
        '0003': {
            type: "edit",
            title: "创建",
            key: "0003",
            item: { key: "create" },
        }
    })
    const [cur, setCur] = useState({
        type: "create",
        title: "创建",
        key: "create",
        item: { key: "create" },
    })
    const onChange = (activeKey) => {
        setCur(tabsItem[activeKey])
    };
    const handleCloseTabs = () => {
        this.props.handleCloseTabs();
    };
    const remove = (targetKey) => {
        const { panes, activeKey } = this.state;
        let newActiveKey = activeKey;
        let lastIndex;
        panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const newPanes = panes.filter(pane => pane.key !== targetKey);
        if (newPanes.length && newActiveKey === targetKey) {
            if (lastIndex >= 0) {
                newActiveKey = newPanes[lastIndex].key;
            } else {
                newActiveKey = newPanes[0].key;
            }
        }
        this.setState({
            panes: newPanes,
            activeKey: newActiveKey,
        });
    };
    const onEdit = (targetKey, action) => {
    };
    return (
        <Fragment>
            <div
                className="global-slider"
                style={{
                    display: Object.values(tabsItem).length ? 'block' : 'none',
                }}
            >
                <Tabs
                    onChange={onChange}
                    activeKey={
                        cur.key
                    }
                    onEdit={onEdit}
                    className="slider-tabs"
                >
                    {Object.keys(tabsItem).map(key => {
                        const item = tabsItem[key];
                        if (item.type.includes('view')) {
                            return (
                                <Tabs.TabPane
                                    className="slider-tabpane"
                                    tab={item.title || 'ssss'}
                                    key={item.key}
                                >
                                    <ViewDetail
                                        item={item.item}
                                    />
                                </Tabs.TabPane>
                            );
                        }
                        if (item.type.includes('edit')) {
                            return (
                                <Tabs.TabPane
                                    className="slider-tabpane"
                                    tab={item.title}
                                    key={item.key}
                                >
                                    <EditDetail
                                        item={item.item}
                                    />
                                </Tabs.TabPane>
                            );
                        }
                        if (item.type.includes('create')) {
                            return (
                                <Tabs.TabPane
                                    className="slider-tabpane"
                                    tab={'创建模型'}
                                    key={item.key}
                                >
                                    <CreateDetail
                                        item={item.item}
                                    />
                                </Tabs.TabPane>
                            );
                        }
                    })}
                </Tabs>
            </div>
        </Fragment>
    );
}

export default App;