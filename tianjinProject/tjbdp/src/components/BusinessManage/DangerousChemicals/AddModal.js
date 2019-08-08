import React,{Component} from 'react';
import {Row,Col,Input,Select,InputNumber,Button,Icon,Form,Modal,message} from 'antd';
import styles from './HighSearch.less'
import { connect } from "dva/index";

const FormItem = Form.Item;
const Option = Select.Option;

@connect(({dangerousChemicals,loading}) => {
  const {pageSize,page}=dangerousChemicals;
  return{
    pageSize,page,
    loading:loading.effects['dangerousChemicals/AddOrEdit'],
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
          type:'dangerousChemicals/AddOrEdit',
          payload:values,
          callback:()=>{
            dispatch({
              type:'dangerousChemicals/List',
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
              label="危化品名称"
              {...formItemLayout}
            >
              {getFieldDecorator("whpmc", {
                rules: [{ required: true,message:'请输入危化品名称!' }]
              })(
                <Input
                  id="cameraId"
                  className={styles.formItemWidth}
                  placeholder="请输入危化品名称"
                />
              )}
            </Form.Item>
            <Form.Item
              label="别名"
              {...formItemLayout}
            >
              {getFieldDecorator("bm", {
                rules: [{ required:true,message:'请输入别名!' }]
              })(
                <Input
                  id="cameraId"
                  className={styles.formItemWidth}
                  placeholder="请输入别名"
                />
              )}
            </Form.Item>
            <Form.Item
              label="cas号码"
              {...formItemLayout}
            >
              {getFieldDecorator("casshm", {
                rules: [{ required:true,message:'请输入cas号码!' }]
              })(
                <Input
                  id="cameraId"
                  className={styles.formItemWidth}
                  placeholder="请输入cas号码"
                />
              )}
            </Form.Item>
            <Form.Item
              label="备注"
              {...formItemLayout}
            >
              {getFieldDecorator("bz", {
                rules: [{ required: false }]
              })(
                <Input
                  id="cameraId"
                  className={styles.formItemWidth}
                  placeholder="请输入备注"
                />
              )}
            </Form.Item>
          </Form>
        </div>
      </Modal>

    )
  }
}