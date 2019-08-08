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
        values.id=rowData.id;
        values.token=sessionStorage.getItem('sys-token');
        dispatch({
          type: 'starRating/AddOrEdit',
          payload:values,
          callback: ()=>{
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
        title="修改星级评定信息"
        visible={editVisible}
        width={720}
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
            <Row>
              <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                <Form.Item
                  label="企业代码"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("enterpriseCode", {
                    initialValue:rowData.enterpriseCode,
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
                    initialValue:rowData.enterpriseName,
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
                    initialValue:rowData.declarationUnit,
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
                    initialValue:rowData.star,
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
                    initialValue:rowData.address,
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
                    initialValue:rowData.statCode,
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
                    initialValue:rowData.scutcheonCode,
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
                    initialValue:rowData.checkGrade,
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
                    initialValue:rowData.declarationTime,
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
                    initialValue:rowData.checkTime,
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