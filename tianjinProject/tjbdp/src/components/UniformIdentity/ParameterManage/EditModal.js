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
      paraVisible:props.showParaEditModal,
    };
  }

  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        values.opType="mod";
        values.sid=this.props.rowData.sid;
        values.token=sessionStorage.getItem('sys-token');
        const { dispatch,paraEditVisible } = this.props;
        dispatch({
          type: 'parameter/AddOrEdit',
          payload:values,
          callback:()=>{
            if(paraEditVisible){
              paraEditVisible(false)
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
    if(this.props.paraEditVisible){
      this.props.paraEditVisible(false)
    }
  };

  render() {
    const {paraVisible}=this.state;
    const {addOrEditLoading,rowData}=this.props;
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
        title="修改参数信息"
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
                initialValue:rowData.paraCode,
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
                initialValue:rowData.paraName,
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
                initialValue:rowData.paraValue,
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
                initialValue:rowData.TypeId,
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
                initialValue:rowData.paraOrder,
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
