import React,{Component} from 'react';
import {Row,Col,Input,Select,InputNumber,Button,Icon,Form,Modal,message} from 'antd';
import styles from './HighSearch.less'
import { connect } from "dva/index";

const FormItem = Form.Item;
const Option = Select.Option;

@connect(({carInfoManage,loading}) => {
  const {pageSize,page}=carInfoManage;
  return{
    pageSize,page,
    loading:loading.effects['carInfoManage/AddOrEdit'],
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
        values.opType="mod";
        values.sid=rowData.sid;
        values.token=sessionStorage.getItem('sys-token');
        dispatch({
          type: 'carInfoManage/AddOrEdit',
          payload:values,
          callback: ()=>{
            dispatch({
              type:'carInfoManage/List',
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
        sm: { span: 13},
      },
    };
    return(
      <Modal
        title="修改执法检查备案信息"
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
              label="车辆号码"
              {...formItemLayout}
              style={{ width:"100%"}}
            >
              {getFieldDecorator("carNo", {
                initialValue:rowData.carNo,
                rules: [{ required:true,message:"请输入车辆号码" }]
              })(
                <Input
                  className={styles.formItemWidth}
                  placeholder="请输入车辆号码"
                />
              )}
            </Form.Item>
            <Form.Item
              label="车辆类型"
              {...formItemLayout}
              style={{ width:"100%"}}
            >
              {getFieldDecorator("carType", {
                initialValue:rowData.carType,
                rules: [{ required:true,message:"请输入车辆类型"  }]
              })(
                <Select
                  className={styles.formItemWidth}
                  placeholder="请选择车辆类型"
                >
                  <Select.Option value="干线">干线</Select.Option>
                  <Select.Option value="直线">直线</Select.Option>
                  <Select.Option value="大货">大货</Select.Option>
                  <Select.Option value="新能源">新能源</Select.Option>
                  <Select.Option value="新能源">新能源</Select.Option>
                  <Select.Option value="电动三轮">电动三轮</Select.Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item
              label="车辆品牌"
              {...formItemLayout}
              style={{ width:"100%"}}
            >
              {getFieldDecorator("brand", {
                initialValue:rowData.brand,
                rules: [{ required:true,message:"请输入车辆品牌" }]
              })(
                <Input
                  className={styles.formItemWidth}
                  placeholder="请输入车辆品牌"
                />
              )}
            </Form.Item>
            <Form.Item
              label="牌照"
              {...formItemLayout}
              style={{ width:"100%"}}
            >
              {getFieldDecorator("licencePlate", {
                initialValue:rowData.licencePlate,
                rules: [{ required:true,message:"请输入牌照"}]
              })(
                <Input
                  className={styles.formItemWidth}
                  placeholder="请输入牌照"
                />
              )}
            </Form.Item>
          </Form>
        </div>
      </Modal>
    )
  }
}