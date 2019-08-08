import React, { Component } from "react";
import { Modal, Form, Button, Input, Icon, message, Switch, Select } from "antd";
import styles from './HighSearch.less';
import { connect } from "dva/index";

const FormItem = Form.Item;

@connect(({ loading,dictionaries}) => {
  const {treeId}=dictionaries;
  return{
    addOrEditLoading: loading.effects['dictionaries/AddOrEdit'],
    treeId,
  }
})

@Form.create()
export default class EditModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dictVisible:props.showDictEditModal,
    };
  }

  handleSearch = (e) => {
    e.preventDefault();
    if(this.props.form.getFieldValue("dictOrder")!=null || undefined){
      let reg = /^[0-9]+$/;
      let oInput = document.querySelector('#dictOrder');
      let onInput = oInput.value.trim();
      if (onInput) {
        if (!reg.test(onInput)) {
          message.warning('字典排序只能使用数字');
        }else{
          this.props.form.validateFields((err, values) => {
            if (!err) {
              // console.log('Received values of form: ', values);
              const { dispatch,treeId ,dictEditVisible } = this.props;
              if(treeId!=null || undefined){
                values.pid=treeId
              }
              values.opType="mod";
              values.sid=this.props.rowData.sid;
              values.token=sessionStorage.getItem('sys-token');
              dispatch({
                type: 'dictionaries/AddOrEdit',
                payload:values,
                callback:()=>{
                  if(dictEditVisible){
                    dictEditVisible(false)
                  }
                  message.success("添加成功");
                }
              });
              if(this.props.setSelectedRowKeys){
                this.props.setSelectedRowKeys()
              }
            }
          });
        }
      }
    }else{
      this.props.form.validateFields((err, values) => {
        if (!err) {
          // console.log('Received values of form: ', values);
          const { dispatch,treeId ,dictEditVisible } = this.props;
          if(treeId!=null || undefined){
            values.pid=treeId
          }
          values.opType="mod";
          values.sid=this.props.rowData.sid;
          values.token=sessionStorage.getItem('sys-token');
          dispatch({
            type: 'dictionaries/AddOrEdit',
            payload:values,
            callback:()=>{
              if(dictEditVisible){
                dictEditVisible(false)
              }
              message.success("添加成功");
            }
          });
          if(this.props.setSelectedRowKeys){
            this.props.setSelectedRowKeys()
          }
        }
      });
    }
  };

  handleEditCancel = () => {
    if(this.props.dictEditVisible){
      this.props.dictEditVisible(false)
    }
  };

  render() {
    const {dictVisible}=this.state;
    const {rowData,addOrEditLoading}=this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 4},
      },
    };


    return (
      <Modal
        title="编辑字典信息"
        visible={dictVisible}
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
              label="字典编码"
            >
              {getFieldDecorator("dictCode", {
                initialValue:rowData.dictCode,
                rules: [{
                  required: false, message: "请输入字典编码!"
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
              label="字典名称"
            >
              {getFieldDecorator("dictName", {
                initialValue:rowData.dictName,
                rules: [{
                  required: false, message: "请输入字典名称!"
                }]
              })(
                <Input
                  className={styles.formItemWidth1}
                  placeholder="请输入字典名称"
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="字典排序"
            >
              {getFieldDecorator("dictOrder", {
                initialValue:rowData.dictOrder,
                rules: [{
                  required: false, message: "请输入字典排序!"
                }]
              })(
                <Input
                  id="dictOrder1"
                  className={styles.formItemWidth1}
                  placeholder="请输入字典排序"
                />
              )}
            </FormItem>
          </Form>
        </div>
      </Modal>
    );
  }
}
