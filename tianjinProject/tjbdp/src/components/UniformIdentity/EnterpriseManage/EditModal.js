import React, { Component } from "react";
import { Modal, Form, Button, Input, Icon, message, Switch, Select } from "antd";
import styles from './HighSearch.less';
import { connect } from "dva/index";

const FormItem = Form.Item;

@connect(({ loading}) => {
  return{
    addOrEditLoading: loading.effects['enterprise/AddOrEdit'],
  }
})

@Form.create()
export default class EditModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      enterVisible:props.showEnterEditModal,
    };
  }

  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        values.opType="mod";
        values.compNo=this.props.rowData.compNo;
        values.token=sessionStorage.getItem('sys-token');
        const { dispatch,enterEditVisible } = this.props;
        dispatch({
          type: 'enterprise/AddOrEdit',
          payload:values,
          callback:()=>{
            if(enterEditVisible){
              enterEditVisible(false)
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
    if(this.props.enterEditVisible){
      this.props.enterEditVisible(false)
    }
  };

  render() {
    const {enterVisible}=this.state;
    const {addOrEditLoading,rowData}=this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 9 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 15},
      },
    };


    return (
      <Modal
        title="修改企业信息"
        visible={enterVisible}
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
              label="名称"
            >
              {getFieldDecorator("compName", {
                initialValue:rowData.compName,
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
              label="类型"
            >
              {getFieldDecorator("compType", {
                initialValue:rowData.compType,
                rules: [{
                  required: false, message: "请输入类型!"
                }]
              })(
                <Input
                  className={styles.formItemWidth1}
                  placeholder="请输入类型!"
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="排序"
            >
              {getFieldDecorator("compOrder", {
                initialValue:rowData.compOrder,
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
