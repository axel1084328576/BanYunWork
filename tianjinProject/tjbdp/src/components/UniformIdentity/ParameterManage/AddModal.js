import React, { Component } from "react";
import { Modal, Form, Button, Input, Icon, message, Switch, Select } from "antd";
import styles from './HighSearch.less';
import { connect } from "dva/index";

const FormItem = Form.Item;

@connect(({ loading}) => {
  return{
    addOrEditLoading: loading.effects['dictionaries/AddOrEdit'],
  }
})

@Form.create()
export default class EditModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paraVisible:props.showParaModal,
    };
  }

  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        values.opType="add";
        values.token=sessionStorage.getItem('sys-token');
        const { dispatch,paraVisible } = this.props;
        dispatch({
          type: 'parameter/AddOrEdit',
          payload:values,
          callback:()=>{
            if(paraVisible){
              paraVisible(false)
            }
            message.success("添加成功");
          }
        });
        if(this.props.setSelectedRowKeys){
          this.props.setSelectedRowKeys()
        }
      }
    });
  };

  handleEditCancel = () => {
    if(this.props.paraVisible){
      this.props.paraVisible(false)
    }
  };

  render() {
    const {paraVisible}=this.state;
    const {addOrEditLoading}=this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 9 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14},
      },
    };


    return (
      <Modal
        title="添加参数信息"
        visible={paraVisible}
        onCancel={this.handleEditCancel}
        footer={[
          <Button key="back" onClick={this.handleEditCancel}>取消</Button>,
          <Button key="submit" type="primary" loading={addOrEditLoading} onClick={this.handleSearch}>
            确定
          </Button>
        ]}
      >
        <div className={styles.wrap}>
          <Form onSubmit={this.handleSearch}>
            <FormItem
              {...formItemLayout}
              label="代码"
            >
              {getFieldDecorator("paraCode", {
                rules: [{
                  required: false, message: "请输入代码！"
                }]
              })(
                <Input
                  className={styles.formItemWidth1}
                  placeholder="请输入字典编码"
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="名称"
            >
              {getFieldDecorator("paraName", {
                rules: [{
                  required: false, message: "请输入名称!"
                }]
              })(
                <Input
                  className={styles.formItemWidth1}
                  placeholder="请输入名称!"
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="参数值"
            >
              {getFieldDecorator("paraValue", {
                rules: [{
                  required: false, message: "请输入参数值!"
                }]
              })(
                <Input
                  className={styles.formItemWidth1}
                  placeholder="请输入参数值!"
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="类别"
            >
              {getFieldDecorator("Type", {
                rules: [{
                  required: false, message: "请输入类别!"
                }]
              })(
                <Input
                  className={styles.formItemWidth1}
                  placeholder="请输入类别"
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="排序"
            >
              {getFieldDecorator("paraOrder", {
                rules: [{
                  required: false, message: "请输入排序!"
                }]
              })(
                <Input
                  className={styles.formItemWidth1}
                  placeholder="请输入排序!"
                />
              )}
            </FormItem>
          </Form>
        </div>
      </Modal>
    );
  }
}
