import React, { Component } from 'react';
import { Calendar, Badge } from 'antd';

function getListData(value) {
    let listData;
    switch (value.date()) {
        case 8:
            listData = [{ type: '读书', content: 'javascript开发数据' }];
            break;
        case 10:
            listData = [{ type: '读书', content: 'javascript开发数据' }];
            break;
        case 15:
            listData = [{ type: '读书', content: 'javascript开发数据' }];
            break;
        default:
    }
    return listData || [];
}

function dateCellRender(value) {
    const listData = getListData(value);
    return (
        <ul className="events">
            {listData.map(item => (
                <li key={item.content}>
                    <Badge status={item.type} text={item.content} />
                </li>
            ))}
        </ul>
    );
}

function getMonthData(value) {
    if (value.month() === 8) {
        return 1394;
    }
}

function monthCellRender(value) {
    const num = getMonthData(value);
    return num ? (
        <div className="notes-month">
            <section>{num}</section>
            <span>Backlog number</span>
        </div>
    ) : null;
}

export default class Welcome extends Component {
    render() {
        return (
            <div>
                <h1>我的工作记录</h1>
                {/* <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} /> */}
            </div>
        );
    }
}
