import React, { Fragment, Component } from 'react';
import { Tabs } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import ViewDetail from './View/Detail';
import EditDetail from './Edit/Detail';
import CreateDetail from './Create/Detail';
import ThemeContext from './ThemeContext';

export class GlobalTheSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeKey: '',
            tabsItem: this.context,
            move: this.props.move,
        };
        this.renderChild = this.renderChild.bind(this);
    }
    static contextType = ThemeContext;
    onChange = activeKey => {
        this.setState({ activeKey });
    };
    handleCloseTabs = () => {
        this.props.handleCloseTabs();
    };
    remove = targetKey => {
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
    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };
    render() {
        const tabsItem = this.context;
        return (
            <Fragment>
                <div
                    className="global-slider"
                    style={{
                        display: Object.values(tabsItem).length ? 'block' : 'none',
                    }}
                >
                    <CloseOutlined className="slider-ico" onClick={this.handleCloseTabs} />
                    <Tabs
                        onChange={this.onChange}
                        activeKey={
                            this.state.activeKey ||
                            (Object.values(tabsItem)[0] &&
                                Object.values(tabsItem)[Object.values(tabsItem).length - 1].key)
                        }
                        type="editable-card"
                        onEdit={this.onEdit}
                        className="slider-tabs"
                    >
                        {Object.keys(tabsItem).map(key => {
                            const item = tabsItem[key];
                            if (item.type.includes('view')) {
                                return (
                                    <Tabs.TabPane
                                        className="slider-tabpane"
                                        tab={item.title}
                                        key={item.key}
                                    >
                                        <ViewDetail
                                            item={item.item}
                                            categories={item.categories}
                                            tags={item.tags}
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
                                            save={this.save}
                                            item={item.item}
                                            categories={item.categories}
                                            tags={item.tags}
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
                                            save={this.save}
                                            item={item.item}
                                            categories={item.categories}
                                            tags={item.tags}
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

    renderChild(child, key) {
        return (
            <Tabs.TabPane
                className="slider-tabpane"
                tab={(this.state.item && this.state.item.name) || '创建模型'}
                key={key}
            >
                {child}
            </Tabs.TabPane>
        );
    }
}
