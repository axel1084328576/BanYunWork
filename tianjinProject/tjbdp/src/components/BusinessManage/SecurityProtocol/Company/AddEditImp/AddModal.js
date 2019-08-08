import React,{Component} from 'react';
import {Row,Col,Input,Select,InputNumber,Button,Icon,Form,Modal,message} from 'antd';
import styles from './HighSearch.less'
import { connect } from "dva/index";

const FormItem = Form.Item;
const Option = Select.Option;

@connect(({company,loading}) => {
  const {pageSize,page}=company;
  return{
    pageSize,page,
    loading:loading.effects['company/AddOrEdit'],
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
          type:'company/AddOrEdit',
          payload:values,
          callback:()=>{
            dispatch({
              type:'company/List',
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
        sm: { span: 10 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13},
      },
    };
    return(
      <Modal
        title="添加企业信息"
        visible={addVisible}
        centered={true}
        destroyOnClose={true}
        maskClosable={true}
        width={1100}
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
              <Col sm={{ span: 24 }} lg={{ span: 8 }}>
                <Form.Item
                  label="企业名称"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("qymc", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入企业名称"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 8 }}>
                <Form.Item
                  label="统一信用代码"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("shtyxydm", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入统一信用代码"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 8 }}>
                <Form.Item
                  label="企业控股"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("qykg", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入企业控股(所有权)"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 8 }}>
                <Form.Item
                  label="企业成立日期"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("qyclrq", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入企业成立日期"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 8 }}>
                <Form.Item
                  label="执照有效期"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("zzyxq", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入执照有效期"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 8 }}>
                <Form.Item
                  label="注册资金"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("zczj", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入注册资金"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 8 }}>
                <Form.Item
                  label="电话"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("dh", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入电话"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 8 }}>
                <Form.Item
                  label="传真"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("cz", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入传真"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 8 }}>
                <Form.Item
                  label="法人代表"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("frdb", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入法人代表"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 8 }}>
                <Form.Item
                  label="法人电话"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("frdh", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入法人电话"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 8 }}>
                <Form.Item
                  label="注册地址"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("zcdz", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入注册地址"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 8 }}>
                <Form.Item
                  label="经营地址"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("jydz", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入经营地址"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 8 }}>
                <Form.Item
                  label="企业邮编"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("qyyb", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入企业邮编"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 8 }}>
                <Form.Item
                  label="联系人"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("lxr", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入联系人"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 8 }}>
                <Form.Item
                  label="联系人电话"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("lxrdh", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入联系人电话"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 8 }}>
                <Form.Item
                  label="联系人手机"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("lxrsj", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入联系人手机"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 8 }}>
                <Form.Item
                  label="联系人地址"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("lxrdz", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入联系人地址"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 8 }}>
                <Form.Item
                  label="业务范围"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("ywfw", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入业务范围"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 8 }}>
                <Form.Item
                  label="企业性质"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("qyxz", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入企业性质"
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