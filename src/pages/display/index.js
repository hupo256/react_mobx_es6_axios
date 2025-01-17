/*
 * @file: Display
 * @author: beichensky
 * @description: 用来展示 mobx 同步/异步操作数据的界面
 */

import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Button, Table } from 'antd';
import DisplayModel from './model';

const model = new DisplayModel();

// Table 的 columns 值
const columns = [
    {
        title: '名称',
        dataIndex: 'name'
    },
    {
        title: '地址',
        dataIndex: 'address'
    },
    {
        title: '数量',
        dataIndex: 'number'
    },
    {
        title: '星级',
        dataIndex: 'string'
    }
]

@observer
export default class Display extends Component {

    componentDidMount() {
        model.getListData();
    }

    render() {
        const tableTitle = () => <span>展示 Mobx 异步操作获取数据的 Table</span>;
        const { count, changeCount, loading, listData } = model;
        return (
            <div>
                <h2>Display 界面：展示 Mobx 同步、异步修改数据</h2>
                <div style={{ marginTop: 20, marginBottom: 50 }}>
                    <span>counter 计数器次数：<span style={{ background: 'pink' }}>{ count }</span></span>
                    <br />
                    <Button onClick={ changeCount.bind(model, 'increment') }>+</Button>
                    <Button onClick={ changeCount.bind(model, 'decrement') } style={{ marginLeft: 30 }}>-</Button>
                </div>
                <Button style={{ marginBottom: 20 }} type="primary" onClick={ () => model.getListData() }>重新查询</Button>
                <Button style={{ marginLeft: 30, marginBottom: 20 }} onClick={ () => this.props.history.goBack() }>返回</Button>
                <Table
                    title={ tableTitle }
                    columns={ columns }
                    dataSource={ listData.slice() }
                    loading={ loading }
                    bordered
                    rowKey={ ({ address, number }) => address + number }
                />
            </div>
        )
    }
}