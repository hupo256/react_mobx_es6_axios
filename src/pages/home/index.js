import React, { Component } from "react";
import { Link } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { Button, Table, Modal } from "antd";

// import styles from '../page.less';
// import styles from "../page.css";
import styles from "../page.scss";

@inject("ProductStore")
@observer
export default class App extends Component {
  dataColumns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "ManufactureDate",
      dataIndex: "manufactureDate",
      key: "manufactureDate",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, rec) => {
        return (
          <p>
            <Link to={`/details/${rec.id}`}>details</Link>
            <Button size="small" onClick={(e) => this.delItem(e, rec.id)}>
              delete
            </Button>
          </p>
        );
      },
    },
  ];

  componentDidMount() {
    this.props.ProductStore.getList();
  }

  delItem = (e, id) => {
    e.preventDefault();
    const { deleteItem, getList } = this.props.ProductStore;
    Modal.confirm({
      title: "TIPS",
      content: "Delete ?",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => {
        deleteItem(id).then(() => getList());
      },
      onCancel: () => {
        console.log("Cancel");
      },
    });
  };

  render() {
    const { list, loading } = this.props.ProductStore.data;
    return (
      <div className={styles.homebox}>
        <Link className={styles.newItem} to={`/creatItem/`}>
          Create New Item
        </Link>
        {list && list.length > 0 && (
          <Table
            dataSource={list.slice()}
            loading={loading}
            size="small"
            columns={this.dataColumns}
            pagination={false}
            rowKey={(rec) => rec.id}
          />
        )}
      </div>
    );
  }
}
