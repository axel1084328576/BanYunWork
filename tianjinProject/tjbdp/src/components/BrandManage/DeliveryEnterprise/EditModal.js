import React,{Component} from 'react';
import {Row,Col,Input,Select,InputNumber,Button,Icon,Form,Modal,message} from 'antd';
import styles from './HighSearch.less'
import { connect } from "dva/index";

const FormItem = Form.Item;
const Option = Select.Option;

@connect(({deliveryEnterprise,loading}) => {
  const {pageSize,page}=deliveryEnterprise;
  return{
    pageSize,page,
    loading:loading.effects['deliveryEnterprise/AddOrEdit'],
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
          type: 'deliveryEnterprise/AddOrEdit',
          payload:values,
          callback: ()=>{
            dispatch({
              type:'deliveryEnterprise/List',
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
        title="修改寄递企业信息"
        visible={editVisible}
        centered={true}
        destroyOnClose={true}
        maskClosable={true}
        onOk={this.handleSearch}
        onCancel={this.handleEditCancel}
        footer={[
          <Button key="back" onClick={this.handleEditCancel}>取消</Button>,
          <Button key="submit" type="primary" onClick={this.handleSearch}>
            确定
          </Button>,
        ]}
      >
        <div className={styles.wrap}>
          <Form onSubmit={this.handleSearch}>
            <Form.Item
              label="企业代码"
              {...formItemLayout}
              style={{ width:"100%"}}
            >
              {getFieldDecorator("qydm", {
                initialValue:rowData.qydm,
                rules: [{ required: true,message:"请输入企业代码" }]
              })(
                <Input
                  className={styles.formItemWidth}
                  placeholder="请输入企业代码"
                />
              )}
            </Form.Item>
            <Form.Item
              label="企业名称"
              {...formItemLayout}
              style={{ width:"100%"}}
            >
              {getFieldDecorator("qymc", {
                initialValue:rowData.qymc,
                rules: [{ required: true,message:"请输入企业名称" }]
              })(
                <Input
                  className={styles.formItemWidth}
                  placeholder="请输入企业名称"
                />
              )}
            </Form.Item>
            <Form.Item
              label="处理场所面积"
              {...formItemLayout}
              style={{ width:"100%"}}
            >
              {getFieldDecorator("clcsmj", {
                initialValue:rowData.clcsmj,
                rules: [{ required: true,message:"请输入处理场所面积" }]
              })(
                <InputNumber  placeholder="请输入处理场所面积"  className={styles.formItemWidth}/>
              )}
            </Form.Item>
            <Form.Item
              label="处理能力"
              {...formItemLayout}
              style={{ width:"100%"}}
            >
              {getFieldDecorator("clnl", {
                initialValue:rowData.clnl,
                rules: [{ required: true,message:"请输入处理能力" }]
              })(
                <InputNumber  placeholder="请输入处理能力"  className={styles.formItemWidth}/>
              )}
            </Form.Item>
            <Form.Item
              label="网点数量"
              {...formItemLayout}
              style={{ width:"100%"}}
            >
              {getFieldDecorator("wdsl", {
                initialValue:rowData.wdsl,
                rules: [{ required: true,message:"请输入网点数量" }]
              })(
                <InputNumber  placeholder="请输入网点数量"  className={styles.formItemWidth}/>
              )}
            </Form.Item>
            <Form.Item
              label="人员数量"
              {...formItemLayout}
              style={{ width:"100%"}}
            >
              {getFieldDecorator("rysl", {
                initialValue:rowData.rysl,
                rules: [{ required: true,message:"请输入人员数量"  }]
              })(
                <InputNumber  placeholder="请输入人员数量"  className={styles.formItemWidth}/>
              )}
            </Form.Item>
            <Form.Item
              label="分拣设备数量"
              {...formItemLayout}
              style={{ width:"100%"}}
            >
              {getFieldDecorator("sjsbsl", {
                initialValue:rowData.sjsbsl,
                rules: [{ required: false,message:"请输入分拣设备数量"  }]
              })(
                <InputNumber  placeholder="请输入分拣设备数量"  className={styles.formItemWidth}/>
              )}
            </Form.Item>
            <Form.Item
              label="车辆数量"
              {...formItemLayout}
              style={{ width:"100%"}}
            >
              {getFieldDecorator("clsl", {
                initialValue:rowData.clsl,
                rules: [{ required: true,message:"请输入车辆数量" }]
              })(
                <InputNumber  placeholder="请输入车辆数量"  className={styles.formItemWidth}/>
              )}
            </Form.Item>
          </Form>
        </div>
      </Modal>
    )
  }
}