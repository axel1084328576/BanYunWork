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
export default class EditModal extends Component{
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
        const { dispatch,setEditModal,rowData } = this.props;
        // console.log('Received values of form: ', values);
        values.opType="edit";
        values.wybs=rowData.wybs;
        values.token=sessionStorage.getItem('sys-token');
        dispatch({
          type: 'dangerousEnterprises/AddOrEdit',
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
            if(setEditModal){
              setEditModal(false)
            }
            message.success("修改成功");
          }
        });
      }
    });
  };

  handleEditCancel = () => {
    if(this.props.setEditModal){
      this.props.setEditModal(false)
    }
  };

  render(){
    const {rowData, loading,editVisible}=this.props;
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
        title="修改危化品名录信息"
        visible={editVisible}
        centered={true}
        destroyOnClose={true}
        maskClosable={true}
        onOk={this.handleSearch}
        onCancel={this.handleEditCancel}
        footer={[
          <Button key="back" onClick={this.handleEditCancel}>取消</Button>,
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
                initialValue:rowData.qymc,
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
                initialValue:rowData.qyshtyxy,
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
                initialValue:rowData.qydz,
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
                initialValue:rowData.jjwhp,
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
                initialValue:rowData.lxr,
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
                initialValue:rowData.lxdh,
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
                initialValue:rowData.lxsj,
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