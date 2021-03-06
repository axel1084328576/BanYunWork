import React,{Component} from 'react';
import {Row,Col,Input,Select,InputNumber,Button,Icon,Form,Modal,message} from 'antd';
import styles from './HighSearch.less'
import { connect } from "dva/index";

const FormItem = Form.Item;
const Option = Select.Option;

@connect(({networkManage,loading}) => {
  const {pageSize,page}=networkManage;
  return{
    pageSize,page,
    loading:loading.effects['networkManage/AddOrEdit'],
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
        values.wybs=rowData.wybs;
        values.token=sessionStorage.getItem('sys-token');
        dispatch({
          type: 'networkManage/AddOrEdit',
          payload:values,
          callback: ()=>{
            dispatch({
              type:'networkManage/List',
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
        title="修改网点管理信息"
        visible={editVisible}
        centered={true}
        width={720}
        destroyOnClose={true}
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
                  label="品牌编码"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("compNo", {
                    initialValue:rowData.compNo,
                    rules: [{ required:true,message:"请输入品牌编码" }]
                  })(
                    <Input
                      id="cameraId"
                      className={styles.formItemWidth}
                      placeholder="请输入品牌编码"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                <Form.Item
                  label="品牌名称"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("compNa", {
                    initialValue:rowData.compNa,
                    rules: [{ required: true,message:"请输入品牌名称"  }]
                  })(
                    <Input  placeholder="请输入品牌名称"  className={styles.formItemWidth}/>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                <Form.Item
                  label="网点代码"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("statCode", {
                    initialValue:rowData.statCode,
                    rules: [{ required:true,message:"请输入网点代码"}]
                  })(
                    <Input placeholder="请输入网点代码"  className={styles.formItemWidth}/>
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                <Form.Item
                  label="网点名称"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("statName", {
                    initialValue:rowData.statName,
                    rules: [{ required:true,message:"请输入网点代码"}]
                  })(
                    <Input  placeholder="请输入网点名称"  className={styles.formItemWidth}/>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                <Form.Item
                  label="类型"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("statType", {
                    initialValue:rowData.statType,
                    rules: [{ required: true,message:"请选择类型" }]
                  })(
                    <Select className={styles.formItemWidth}>
                      <Option value={1}>快递</Option>
                      <Option value={2}>邮政</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                <Form.Item
                  label="许可备案名称"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("websiteLicenseName", {
                    initialValue:rowData.websiteLicenseName,
                    rules: [{ required:false,message:"请输入许可备案名称" }]
                  })(
                    <Input  placeholder="请输入许可备案名称"  className={styles.formItemWidth}/>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                <Form.Item
                  label="网点地址"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("address", {
                    initialValue:rowData.address,
                    rules: [{ required:true,message:"请输入网点地址" }]
                  })(
                    <Input  placeholder="请输入网点地址"  className={styles.formItemWidth}/>
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                <Form.Item
                  label="所属行政区代码"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("administrativeCode", {
                    initialValue:rowData.administrativeCode,
                    rules: [{ required:false,message:"请输入所属行政区代码" }]
                  })(
                    <Input  placeholder="请输入所属行政区代码"  className={styles.formItemWidth}/>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                <Form.Item
                  label="经度"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("longitude", {
                    initialValue:rowData.longitude,
                    rules: [{ required:true,message:"请输入经度"}]
                  })(
                    <Input  placeholder="请输入经度"  className={styles.formItemWidth}/>
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                <Form.Item
                  label="纬度"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("latitude", {
                    initialValue:rowData.latitude,
                    rules: [{ required:true,message:"请输入经度" }]
                  })(
                    <Input  placeholder="请输入经度"  className={styles.formItemWidth}/>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                <Form.Item
                  label="网点负责人"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("contact", {
                    initialValue:rowData.contact,
                    rules: [{ required:true,message:"请输入经度"}]
                  })(
                    <Input  placeholder="请输入经度"  className={styles.formItemWidth}/>
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                <Form.Item
                  label="电话"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("tel", {
                    initialValue:rowData.tel,
                    rules: [{ required:true,message:"请输入电话" }]
                  })(
                    <Input  placeholder="请输入电话"  className={styles.formItemWidth}/>
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