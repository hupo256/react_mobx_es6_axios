import React, {Component} from 'react';
import { inject, observer } from 'mobx-react';
import { Form, Input } from 'antd';

const Attr = ['model', 'brand', 'weight', 'manufactureDate'];
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
};

@inject('ProductStore')
@observer
class InpList extends Component {
  inpOnChange = (e, key) => {
    const val = e.target.value;
    const newPara = {[key]: val};
    const { updateCurrItem } = this.props.ProductStore;
    updateCurrItem(newPara);
  }

  inpValidator = (rule, value, callback) => {
    if (value && value.length > 5) {
      callback('不符合规范')
    }
    callback()
  }

  render() {
    const { form:{getFieldDecorator}, theItem } = this.props;
    return (
      <>
        {Attr.map((key) => {
          const required = (key === 'model' || key === 'brand') ? true : false;
          const rules = [{
            required,
            message: `Please input your name ${key}`,
          }];
          let initialValue = '';
          if (key === 'brand') {
            rules.push({
              validator: this.inpValidator
            })
          }
          if(theItem) initialValue = theItem[key];
          return <Form.Item {...formItemLayout} label={key} key={key}>
            {getFieldDecorator(key, {
              rules,
              initialValue,
            })( <Input onChange={(e) => this.inpOnChange(e, key) } />)}
          </Form.Item>
        })}
      </>
    );
  }
}

export default InpList;