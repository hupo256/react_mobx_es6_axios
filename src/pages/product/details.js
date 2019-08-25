import React, {Component} from 'react'
import { observer, inject } from 'mobx-react';
import { Button, Form, Input } from 'antd';
import InpList from './InpList';

const Attr = ['model', 'brand', 'weight', 'manufactureDate'];
@inject('ProductStore')
@observer
@Form.create()
class Details extends Component {
  state = {
    editItem: false,
  }

  componentDidMount() {
    const id = window.location.href.split('details/')[1];
    this.props.ProductStore.getItem(id);
  }

  componentDidUpdate() {
    console.log(22);
  }

  toEdit = () => {
    this.setState({
      editItem: true
    });
  }

  toUpdate = () => {
    const { ProductStore: {data, updateItem}, history, form:{validateFields} } = this.props;
    validateFields((errors, values) => {
      if(!errors) {
        updateItem(data.currItem).then(rs => {
          history.push(`/`)
        });
      }
    });
  }

  render(){
    const { currItem } = this.props.ProductStore.data;
    const { editItem } = this.state;
    return(
      <>
        {!editItem && Attr.map((key) => {
          // console.log(key, currItem[key]);
          const val = currItem ? (currItem[key] ? currItem[key] : '') : '';
          return <p key={key}>{`${key}: ${val}`}</p>
        })}

        {editItem && <InpList theItem={currItem} {...this.props} />}
       
        {!editItem ? <Button type="primary" onClick={this.toEdit}>Edit</Button> :
          <Button type="primary" onClick={this.toUpdate}>Update</Button>
        }
      </>
  	);
  }
}

export default Details;