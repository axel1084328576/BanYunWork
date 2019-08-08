import React,{Component} from 'react';
import {Row,Col,Input,Select,InputNumber,Button,Icon,Form,Modal,message} from 'antd';
import styles from './HighSearch.less'
import { connect } from "dva/index";

const FormItem = Form.Item;
const Option = Select.Option;

@connect(({dangerousEnterprises,loading}) => {
  const {pageSize,page}=dangerousEnterprises;
  return{
    pageSize,page,
    loading:loading.effects['dangerousEnterprises/AddOrEdit'],
  }
})

@Form.create()
export default class AddModal extends Component{
  constructor(props){
    super(props);
  }

  handleSearch = (e) => {
    let data;
    if(this.props.getSearch){
      data=this.props.getSearch();
    }
    const {page,pageSize}=this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        values.opType="add";
        values.token=sessionStorage.getItem('sys-token');
        const { dispatch,setAddModal} = this.props;
        dispatch({
          type:'dangerousEnterprises/AddOrEdit',
          payload:values,
          callback:()=>{
            dispatch({
              type:'dangerousEnterprises/List',
              payload:{
                ...data,
                page:page,
                pageSize:pageSize
              }
            });
            if(this.props.setSelectedRowKeys){
              this.props.setSelectedRowKeys()
            }
            if(setAddModal){
              setAddModal(false)
            }
            message.success("添加成功");
          }
        });
      }
    });
  };

  handleCancel = () => {
    if(this.props.setAddModal){
      this.props.setAddModal(false)
    }
  };

  render(){
    const { loading,addVisible}=this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14},
      },
    };
    return(
      <Modal
        title="添加危化品名录信息"
        visible={addVisible}
        centered={true}
        destroyOnClose={true}
        maskClosable={true}
        onOk={this.handleSearch}
        onCancel={this.handleCancel}
        footer={[
          <Button key="back" onClick={this.handleCancel}>取消</Button>,
          <Button key="submit" type="primary" loading={loading} onClick={this.handleSearch}>
            确定
          </Button>,
        ]}
      >
        <div className={styles.wrap}>
          <Form onSubmit={this.handleSearch}>
            <Form.Item
              label="企业名称"
              {...formItemLayout}
              style={{ width:"100%"}}
            >
              {getFieldDecorator("qymc", {
                rules: [{ required: true,message:"请输入危化品名称" }]
              })(
                <Input
                  className={styles.formItemWidth}
                  placeholder="请输入危化品名称"
                />
              )}
            </Form.Item>
            <Form.Item
              label="信用代码"
              {...formItemLayout}
              style={{ width:"100%"}}
            >
              {getFieldDecorator("qyshtyxy", {
                rules: [{ required: true,message:"请输入信用代码"}]
              })(
                <Input
                  className={styles.formItemWidth}
                  placeholder="请输入信用代码"
                />
              )}
            </Form.Item>
            <Form.Item
              label="企业地址"
              {...formItemLayout}
              style={{ width:"100%"}}
            >
              {getFieldDecorator("qydz", {
                rules: [{ required: true,message:"请输入企业地址" }]
              })(
                <Input
                  className={styles.formItemWidth}
                  placeholder="请输入企业地址"
                />
              )}
            </Form.Item>
            <Form.Item
              label="经营危化品"
              {...formItemLayout}
              style={{ width:"100%"}}
            >
              {getFieldDecorator("jjwhp", {
                rules: [{ required:true,message:"请输入经营危化品" }]
              })(
                <Input
                  className={styles.formItemWidth}
                  placeholder="请输入经营危化品"
                />
              )}
            </Form.Item>
            <Form.Item
              label="联系人"
              {...formItemLayout}
              style={{ width:"100%"}}
            >
              {getFieldDecorator("lxr", {
                rules: [{ required:true,message:"请输入联系人" }]
              })(
                <Input
                  className={styles.formItemWidth}
                  placeholder="请输入联系人"
                />
              )}
            </Form.Item>
            <Form.Item
              label="联系电话"
              {...formItemLayout}
              style={{ width:"100%"}}
            >
              {getFieldDecorator("lxdh", {
                rules: [{ required: true,message:"请输入联系电话" }]
              })(
                <Input
                  className={styles.formItemWidth}
                  placeholder="请输入联系电话"
                />
              )}
            </Form.Item>
            <Form.Item
              label="联系人手机号"
              {...formItemLayout}
              style={{ width:"100%"}}
            >
              {getFieldDecorator("lxsj", {
                rules: [{ required: true,message:"请输入联系人手机号"}]
              })(
                <Input
                  className={styles.formItemWidth}
                  placeholder="请输入联系人手机号"
                />
              )}
            </Form.Item>
          </Form>
        </div>
      </Modal>

    )
  }
}