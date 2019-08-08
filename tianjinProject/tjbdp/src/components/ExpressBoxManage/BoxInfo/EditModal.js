import React,{Component} from 'react';
import {Row,Col,Input,Select,InputNumber,Button,Icon,Form,Modal,message} from 'antd';
import styles from './HighSearch.less'
import { connect } from "dva/index";

const FormItem = Form.Item;
const Option = Select.Option;

@connect(({expressBox,loading}) => {
  const {pageSize,page}=expressBox;
  return{
    pageSize,page,
    loading:loading.effects['expressBox/AddOrEdit'],
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
          type: 'expressBox/AddOrEdit',
          payload:values,
          callback: ()=>{
            dispatch({
              type:'expressBox/List',
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
        title="修改快件箱信息"
        visible={editVisible}
        style={{top:20}}
        centered={true}
        destroyOnClose={true}
        maskClosable={true}
        width={720}
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
                  label="企业编号"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("compNo", {
                    initialValue:rowData.compNo,
                    rules: [{ required:true,message:"请输入企业编号" }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入企业编号"
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
                  {getFieldDecorator("compNa", {
                    initialValue:rowData.compNa,
                    rules: [{ required:true,message:"请输入企业名称"}]
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
                  label="编号"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("boxNo", {
                    initialValue:rowData.boxNo,
                    rules: [{ required:true,message:"请输入编号" }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入编号"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                <Form.Item
                  label="名称"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("boxName", {
                    initialValue:rowData.boxName,
                    rules: [{ required:true,message:"请输入名称" }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入名称"
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
                  label="经度"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("longitude", {
                    initialValue:rowData.longitude,
                    rules: [{ required:true,message:"请输入经度" }]
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
                  {getFieldDecorator("latitude", {
                    initialValue:rowData.latitude,
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
                  label="维护人"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("contact", {
                    initialValue:rowData.contact,
                    rules: [{ required:true,message:"请输入维护人" }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入维护人"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                <Form.Item
                  label="维护人电话"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("tel", {
                    initialValue:rowData.tel,
                    rules: [{ required:true,message:"请输入维护人电话"}]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入维护人电话"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                <Form.Item
                  label="经营管理企业"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("enterprise", {
                    initialValue:rowData.enterprise,
                    rules: [{ required:true,message:"请输入经营管理企业"}]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入经营管理企业"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                <Form.Item
                  label="格口数量"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("gksl", {
                    initialValue:rowData.gksl,
                    rules: [{ required:true,message:"请输入格口数量"}]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入格口数量"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                <Form.Item
                  label="数据上传时间"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("sjscsj", {
                    initialValue:rowData.sjscsj,
                    rules: [{ required:true,message:"请输入数据上传时间" }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入数据上传时间"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                <Form.Item
                  label="操作编码"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("czbm", {
                    initialValue:rowData.czbm,
                    rules: [{ required:true,message:"请输入操作编码" }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入操作编码"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                <Form.Item
                  label="柜体箱子类型"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("gtxzlx", {
                    initialValue:rowData.gtxzlx,
                    rules: [{ required:true,message:"请输入柜体箱子类型"}]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入柜体箱子类型"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                <Form.Item
                  label="快件箱编号"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("gtmcmmkjxbh", {
                    initialValue:rowData.gtmcmmkjxbh,
                    rules: [{ required:true,message:"请输入快件箱编号" }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入快件箱编号"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                <Form.Item
                  label="批次"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("pc", {
                    initialValue:rowData.pc,
                    rules: [{ required:true,message:"请输入批次" }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入批次"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                <Form.Item
                  label="所属企业"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("ssqy", {
                    initialValue:rowData.ssqy,
                    rules: [{ required:true,message:"请输入所属企业" }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入所属企业"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 12 }}>

              </Col>
            </Row>
          </Form>
        </div>
      </Modal>
    )
  }
}