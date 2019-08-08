import React,{Component} from 'react';
import {Row,Col,Input,Select,InputNumber,Button,Icon,Form,Modal,message} from 'antd';
import styles from './HighSearch.less'
import { connect } from "dva/index";

const FormItem = Form.Item;
const Option = Select.Option;

@connect(({ postboxManage,loading}) => {
  const {mailAddOrEdit}=postboxManage;
  return{
    addOrEditLoading:loading.effects['postboxManage/AddOrEdit'],
  }
})

@Form.create()
export default class EditModal extends Component{
  constructor(props){
    super(props);
    this.state={
      editVisible:props.showPostboxEditModal,
      dotName:'',
      dotAddressValue:'',
      dotLalValue:'',
      dotContactsValue:'',
      dotTelValue:'',
      longitudeValue:"",
      latitudeValue:"",
      loading:false,
    };
  }

  emptyLongitude = () => {
    this.setState({longitudeValue:''});
  };

  longitudeValueChange = (value) => {
    this.setState({longitudeValue:value});
  };

  emptyLatitude = () => {
    this.setState({latitudeValue:''});
  };

  latitudeValueChange = (value) => {
    this.setState({latitudeValue:value});
  };

  emptyDotName = () => {
    this.setState({dotName:''});
  };

  dotNameValueChange = (value) => {
    this.setState({dotName:value});
  };

  emptyDotAddress = () => {
    this.setState({dotAddressValue:''});
  };

  dotAddressValueChange = (value) => {
    this.setState({dotAddressValue:value});
  };

  emptyDotLal = () => {
    this.setState({dotLalValue:''});
  };

  dotLalValueChange = (value) => {
    this.setState({dotLalValue:value});
  };

  emptyDotContacts = () => {
    this.setState({ dotContactsValue:''});
  };

  dotContactsValueChange = (value) => {
    this.setState({ dotContactsValue:value});
  };

  emptyDotTel = () => {
    this.setState({dotTelValue:''});
  };

  dotTelValueChange = (value) => {
    this.setState({dotTelValue:value});
  };

  highSearch = () => {
    if(this.props.showSearch){
      this.props.showSearch(false)
    }
  };


  handleSearch = (e) => {
    const { dispatch,postboxEditVisible,rowData,dataList} = this.props;
    let searchItem;
    if(this.props.getSearch){
      searchItem=this.props.getSearch()
    }
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        values.opType="mod";
        values.sid=rowData.sid;
        values.token=sessionStorage.getItem('sys-token');
        dispatch({
          type: 'postboxManage/AddOrEdit',
          payload:{
            data:values,
            searchItem:searchItem,
          },
          callback: ()=>{
            if(postboxEditVisible){
              postboxEditVisible(false)
            }
            message.success("修改成功");
          }
        });
        if(this.props.setSelectedRowKeys){
          this.props.setSelectedRowKeys()
        }
      }
    });
  };

  handleEditCancel = () => {
    if(this.props.postboxEditVisible){
      this.props.postboxEditVisible(false)
    }
  };

  render(){
    const {dotName,dotAddressValue,latitudeValue,longitudeValue,dotContactsValue,dotTelValue}=this.state;
    const {rowData,addOrEditLoading}=this.props;
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
        title="修改信筒信箱信息"
        visible={this.state.editVisible}
        width={720}
        onOk={this.handleSearch}
        onCancel={this.handleEditCancel}
        footer={[
          <Button key="back" onClick={this.handleEditCancel}>取消</Button>,
          <Button key="submit" type="primary" loading={addOrEditLoading} onClick={this.handleSearch}>
            确定
          </Button>,
        ]}
      >
        <div className={styles.wrap}>
          <Form onSubmit={this.handleSearch}>
            <Row>
              <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                <FormItem
                  {...formItemLayout}
                  label="信筒信箱编号"
                >
                  {getFieldDecorator('boxNo', {
                    initialValue:rowData.boxNo,
                    rules: [{
                      required: true, message: '请输入信筒信箱编号!',
                    }],
                  })(
                    <Input
                      className={styles.formItemWidth1}
                      placeholder="请输入信筒信箱编号"
                      // suffix={dotName ? <Icon type="close" onClick={this.emptyDotName} /> : null}
                      // onChange={this.dotNameValueChange}
                    />
                  )}
                </FormItem>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                <FormItem
                  {...formItemLayout}
                  label="地址"
                >
                  {getFieldDecorator('address', {
                    initialValue:rowData.address,
                    rules: [{
                      required: true, message: '请输入地址!',
                    }],
                  })(
                    <Input
                      className={styles.formItemWidth1}
                      placeholder="请输入地址"
                      // suffix={dotAddressValue ? <Icon type="close" onClick={this.emptyDotAddress} /> : null}
                      // onChange={this.dotAddressValueChange}
                    />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                <FormItem
                  {...formItemLayout}
                  label="经度"
                >
                  {getFieldDecorator('longitude', {
                    initialValue:rowData.longitude,
                    rules: [{
                      required: false, message: '请输入经度!',
                    }],
                  })(
                    <Input
                      className={styles.formItemWidth1}
                      placeholder="请输入经度"
                      // suffix={longitudeValue ? <Icon type="close" onClick={this.emptyLongitude} /> : null}
                      // onChange={this.longitudeValueChange}
                    />
                  )}
                </FormItem>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                <FormItem
                  {...formItemLayout}
                  label="纬度"
                >
                  {getFieldDecorator('latitude', {
                    initialValue:rowData.latitude,
                    rules: [{
                      required: false, message: '请输入纬度!',
                    }],
                  })(
                    <Input
                      className={styles.formItemWidth1}
                      placeholder="请输入纬度"
                      // suffix={latitudeValue ? <Icon type="close" onClick={this.emptyLatitude} /> : null}
                      // onChange={this.latitudeValueChange}
                    />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                <FormItem
                  {...formItemLayout}
                  label="收信时间"
                >
                  {getFieldDecorator('collectionTime', {
                    initialValue:rowData.collectionTime,
                    rules: [{
                      required: false, message: '请输入收信时间!',
                    }],
                  })(
                    <Input
                      className={styles.formItemWidth1}
                      placeholder="请输入收信时间"
                      // suffix={dotContactsValue ? <Icon type="close" onClick={this.emptyDotContacts} /> : null}
                      // onChange={this.dotContactsValueChange}
                    />
                  )}
                </FormItem>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                <FormItem
                  {...formItemLayout}
                  label="维护人信息"
                >
                  {getFieldDecorator('contact', {
                    initialValue:rowData.contact,
                    rules: [{
                      required: false, message: '请输入维护人信息!',
                    }],
                  })(
                    <Input
                      className={styles.formItemWidth1}
                      placeholder="请输入维护人信息"
                      // suffix={dotTelValue ? <Icon type="close" onClick={this.emptyDotTel} /> : null}
                      // onChange={this.dotTelValueChange}
                    />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                <FormItem
                  {...formItemLayout}
                  label="类别"
                >
                  {getFieldDecorator('category', {
                    initialValue:rowData.category,
                    rules: [{
                      required: false, message: '请输入类别!',
                    }],
                  })(
                    <Input
                      className={styles.formItemWidth1}
                      placeholder="请输入类别"
                      // suffix={dotTelValue ? <Icon type="close" onClick={this.emptyDotTel} /> : null}
                      // onChange={this.dotTelValueChange}
                    />
                  )}
                </FormItem>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                <FormItem
                  {...formItemLayout}
                  label="状态"
                >
                  {getFieldDecorator('status', {
                    initialValue:rowData.status,
                    rules: [{
                      required: true, message: '请输入状态!',
                    }],
                  })(
                    <Select className={styles.formItemWidth1}>
                      <Option value="1">在用</Option>
                      <Option value="2">停用</Option>
                      <Option value="3">报修</Option>
                      <Option value="4">报废</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>
    )
  }
}