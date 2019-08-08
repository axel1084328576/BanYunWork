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
      dictVisible:props.showDictModal,
      dictOrder:null,
    };
  }

  handleSearch = (e) => {
    e.preventDefault();
    const { dispatch,treeId,updataTreeData} = this.props;
    if(this.props.form.getFieldValue("dictOrder")!=null || undefined){
      let reg = /^[0-9]+$/;
      let oInput = document.querySelector('#dictOrder');
      let onInput = oInput.value.trim();
      if (onInput) {
        if (!reg.test(onInput)) {
          message.warning('字典排序只能使用数字');
        }else{
          // console.log('aaaaaaa');
          this.props.form.validateFields((err, values) => {
            if (!err) {
              // console.log('Received values of form: ', values);
              values.opType="add";
              values.token=sessionStorage.getItem('sys-token');
              if(treeId!=null || undefined){
                values.pid=treeId
              }
              dispatch({
                type: 'dictionaries/AddOrEdit',
                payload:values,
                callback:()=>{
                  dispatch({
                    type: "dictionaries/Tree",
                    payload: {
                      token: sessionStorage.getItem("sys-token")
                    },
                    callback:(values)=>{
                      if(updataTreeData){
                        // console.log("15432632",values);
                        updataTreeData(values)
                      }
                    }
                  });
                  message.success("添加成功");
                  this.props.form.getFieldValue("dictOrder");
                  if(this.props.form.getFieldValue("dictOrder")!=null || undefined){
                    this.props.form.setFieldsValue({
                      dictCode:undefined,
                      dictName:undefined,
                      dictOrder:parseInt(this.props.form.getFieldValue("dictOrder"))+10
                    });
                  }else{
                    this.props.form.setFieldsValue({
                      dictCode:undefined,
                      dictName:undefined,
                      dictOrder:undefined,
                    });
                  }
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
          values.opType="add";
          values.token=sessionStorage.getItem('sys-token');
          if(treeId!=null || undefined){
            values.pid=treeId
          }
          dispatch({
            type: 'dictionaries/AddOrEdit',
            payload:values,
            callback:()=>{
              dispatch({
                type: "dictionaries/Tree",
                payload: {
                  token: sessionStorage.getItem("sys-token")
                },
                callback:(values)=>{
                  if(updataTreeData){
                    // console.log("123456",values);
                    updataTreeData(values)
                  }
                }
              });
              message.success("添加成功");
              this.props.form.getFieldValue("dictOrder");
              if(this.props.form.getFieldValue("dictOrder")!=null || undefined){
                this.props.form.setFieldsValue({
                  dictCode:undefined,
                  dictName:undefined,
                  dictOrder:parseInt(this.props.form.getFieldValue("dictOrder"))+10
                });
              }else{
                this.props.form.setFieldsValue({
                  dictCode:undefined,
                  dictName:undefined,
                  dictOrder:undefined,
                });
              }
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
    if(this.props.dictVisible){
      this.props.dictVisible(false)
    }
  };


  render() {
    const {dictVisible}=this.state;
    const {addOrEditLoading}=this.props;
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
        title="添加字典信息"
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
                rules: [{
                  required: false, message: "请输入字典排序!"
                }]
              })(
                <Input
                  id="dictOrder"
                  className={styles.formItemWidth1}
                  placeholder="请输入字典排序"
                  onChange={this.getValue}
                />
              )}
            </FormItem>
          </Form>
        </div>
      </Modal>
    );
  }
}
