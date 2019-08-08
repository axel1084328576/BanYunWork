import React,{Component} from 'react';
import {Row,Col,Input,Select,InputNumber,Button,Icon,Form,Modal,message} from 'antd';
import styles from './HighSearch.less'
import { connect } from "dva/index";

const FormItem = Form.Item;
const Option = Select.Option;

@connect(({kioskInfo,loading}) => {
  const {pageSize,page}=kioskInfo;
  return{
    pageSize,page,
    loading:loading.effects['kioskInfo/AddOrEdit'],
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
          type:'kioskInfo/AddOrEdit',
          payload:values,
          callback:()=>{
            dispatch({
              type:'kioskInfo/List',
              payload:{
                ...data,
                type:1,
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
        title="添加报刊亭信息"
        visible={addVisible}
        centered={true}
        destroyOnClose={true}
        maskClosable={true}
        width={720}
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
            <Row>
              <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                <Form.Item
                  label="报刊亭编号"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("bktbh", {
                    rules: [{ required: true,message:"请输入报刊亭编号"}]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入报刊亭编号"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                <Form.Item
                  label="报刊亭名称"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("bktmc", {
                    rules: [{ required:true,message:"请输入报刊亭名称"}]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入报刊亭名称"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                <Form.Item
                  label="报刊亭地址"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("bktdz", {
                    rules: [{ required:true,message:"请输入报刊亭地址"}]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入报刊亭地址"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                <Form.Item
                  label="经度"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("jd", {
                    rules: [{ required:true,message:"请输入经度"}]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入经度"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                <Form.Item
                  label="纬度"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("wd", {
                    rules: [{ required:true,message:"请输入纬度"}]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入纬度"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                <Form.Item
                  label="联系人"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("lxr", {
                    rules: [{ required:true,message:"请输入联系人"}]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入联系人"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                <Form.Item
                  label="联系人电话"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("lxrdh", {
                    rules: [{ required:true,message:"请输入联系人电话"}]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入联系人电话"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                <Form.Item
                  label="备注"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("bz", {
                    rules: [{ required:true,message:"请输入备注"}]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入备注"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>

    )
  }
}