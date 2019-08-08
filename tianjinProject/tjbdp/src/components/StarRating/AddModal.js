import React,{Component} from 'react';
import {Row,Col,Input,Select,InputNumber,Button,Icon,Form,Modal,message} from 'antd';
import styles from './HighSearch.less'
import { connect } from "dva/index";

const FormItem = Form.Item;
const Option = Select.Option;

@connect(({starRating,loading}) => {
  const {pageSize,page}=starRating;
  return{
    pageSize,page,
    loading:loading.effects['starRating/AddOrEdit'],
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
          type:'starRating/AddOrEdit',
          payload:values,
          callback:()=>{
            dispatch({
              type:'starRating/List',
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
        title="添加星级评定信息"
        visible={addVisible}
        width={720}
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
            <Row>
              <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                <Form.Item
                  label="企业代码"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("enterpriseCode", {
                    rules: [{ required: true,message:"请输入企业代码" }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入企业代码"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                <Form.Item
                  label="企业名称"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("enterpriseName", {
                    rules: [{ required: true,message:"请输入企业名称" }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入企业名称"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                <Form.Item
                  label="申报单位"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("declarationUnit", {
                    rules: [{ required:true,message:"请输入申报单位"  }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入申报单位"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                <Form.Item
                  label="星级"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("star", {
                    rules: [{ required:true,message:"请输入星级"  }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入星级"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                <Form.Item
                  label="地址"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("address", {
                    rules: [{ required:true,message:"请输入地址"}]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入地址"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                <Form.Item
                  label="网点编码"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("statCode", {
                    rules: [{ required:true,message:"请输入网点编码"}]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入网点编码"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                <Form.Item
                  label="标牌编号"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("scutcheonCode", {
                    rules: [{ required:true,message:"请输入标牌编号"}]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入标牌编号"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                <Form.Item
                  label="审核成绩"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("checkGrade", {
                    rules: [{ required:true,message:"请输入审核成绩" }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入审核成绩"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                <Form.Item
                  label="申报时间"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("declarationTime", {
                    rules: [{ required:true,message:"请输入申报时间" }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入申报时间"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                <Form.Item
                  label="审核时间"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("checkTime", {
                    rules: [{ required:true,message:"请输入审核时间" }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入审核时间"
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