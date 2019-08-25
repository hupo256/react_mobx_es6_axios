import React, {Component} from 'react'
import { observer, inject } from 'mobx-react';
import { Button, Form } from 'antd';
import InpList from './InpList';

const Attr = ['model', 'brand', 'weight', 'manufactureDate'];
const formItemBtn = {
  wrapperCol: { span: 8, offset: 4, },
};

@inject('ProductStore')
@observer
@Form.create()
class CreatItem extends Component {
  toCreate = () => {
    const { history, form:{validateFields},  ProductStore:{creatItem, data}} = this.props;
    validateFields(Attr, (errors, values) => {
      if(!errors) {
        creatItem(data.currItem).then(rs => {
          console.log(rs);
          return;
          history.push(`/details/${rs.data.id}`)
        });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="horizontal">
        <InpList {...this.props} />

        <Form.Item {...formItemBtn} label="">
          <Button type="primary" onClick={this.toCreate}>
            Create
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default CreatItem;