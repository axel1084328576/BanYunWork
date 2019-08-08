import React,{Component} from 'react';
import {Row,Col,Input,Select,InputNumber,Button,Icon,Form} from 'antd';
import styles from './HighSearch.less'
import { connect } from "dva/index";

const FormItem = Form.Item;
const Option = Select.Option;

@connect(({ postboxManage,loading}) => {
  const {mailList}=postboxManage;
  return{
    mailList,
    searchLoading: loading.effects['postboxManage/List'],
  }
})

@Form.create()
export default class HighSearch extends Component{
  constructor(props){
    super(props);
    this.state={
      dotName:'',
      dotAddressValue:'',
      dotLalValue:'',
      dotContactsValue:'',
      dotTelValue:'',
      longitudeValue:"",
      latitudeValue:"",
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


  highSearch = () => {
    // const { dispatch} = this.props;
    // dispatch({
    //   type: 'postboxManage/List',
    //   payload:{
    //     token:sessionStorage.getItem('sys-token'),
    //   }
    // });
    if(this.props.showSearch){
      this.props.showSearch(false)
    }
  };

  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if(this.props.getHighSearch){
          this.props.getHighSearch(values)
        }
        // console.log('Received values of form: ', values);
        const { dispatch,dataList,showSearch } = this.props;
        values.token=sessionStorage.getItem('sys-token');
        dispatch({
          type: 'postboxManage/List',
          payload:{
            page: 1,
            pageSize:10,
            ...values,
          }
        });
        if(this.props.showSearch){
          this.props.showSearch(false)
        }
      }
    });
  };

  render(){
    const {dotName,dotAddressValue,latitudeValue,longitudeValue,dotContactsValue,dotTelValue}=this.state;
    const {searchLoading}=this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 4},
      },
    };
    return(
      <Row type="flex" justify="center" style={{ marginBottom: 14 }}>
        <div className={styles.wrap}>
          <Row style={{
              borderBottom: "2px solid #fafafa",
              textAlign: "center",
              marginBottom: "12px",
              padding: "8px",
              fontSize: "18px"
            }}
          >
            <Col span={24}>
              高级搜索
            </Col>
          </Row>
          <Form onSubmit={this.handleSearch}>
            <FormItem
              {...formItemLayout}
              label="信筒信箱编号"
            >
              {getFieldDecorator('boxNo', {
                rules: [{
                  required:false, message: '请输入信筒信箱编号!',
                }],
              })(
                <Input
                  style={{ width: 260 }}
                  placeholder="请输入信筒信箱编号"
                  // suffix={dotName ? <Icon type="close" onClick={this.emptyDotName} /> : null}
                  // onChange={this.dotNameValueChange}
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="地址"
            >
              {getFieldDecorator('address', {
                rules: [{
                  required: false, message: '请输入地址!',
                }],
              })(
                <Input
                  style={{ width: 260 }}
                  placeholder="请输入地址"
                  // suffix={dotAddressValue ? <Icon type="close" onClick={this.emptyDotAddress} /> : null}
                  // onChange={this.dotAddressValueChange}
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="经度"
            >
              {getFieldDecorator('longitude', {
                rules: [{
                  required: false, message: '请输入经度!',
                }],
              })(
                <Input
                  style={{ width: 260 }}
                  placeholder="请输入经度"
                  // suffix={longitudeValue ? <Icon type="close" onClick={this.emptyLongitude} /> : null}
                  // onChange={this.longitudeValueChange}
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="纬度"
            >
              {getFieldDecorator('latitude', {
                rules: [{
                  required: false, message: '请输入纬度!',
                }],
              })(
                <Input
                  style={{ width: 260 }}
                  placeholder="请输入纬度"
                  // suffix={latitudeValue ? <Icon type="close" onClick={this.emptyLatitude} /> : null}
                  // onChange={this.latitudeValueChange}
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="收信时间"
            >
              {getFieldDecorator('collectionTime', {
                rules: [{
                  required: false, message: '请输入收信时间!',
                }],
              })(
                <Input
                  style={{ width: 260 }}
                  placeholder="请输入收信时间"
                  // suffix={dotContactsValue ? <Icon type="close" onClick={this.emptyDotContacts} /> : null}
                  // onChange={this.dotContactsValueChange}
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="维护人信息"
            >
              {getFieldDecorator('contact', {
                rules: [{
                  required: false, message: '请输入维护人信息!',
                }],
              })(
                <Input
                  style={{ width: 260 }}
                  placeholder="请输入维护人信息"
                  // suffix={dotTelValue ? <Icon type="close" onClick={this.emptyDotTel} /> : null}
                  // onChange={this.dotTelValueChange}
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="类别"
            >
              {getFieldDecorator('category', {
                rules: [{
                  required: false, message: '请输入类别!',
                }],
              })(
                <Input
                  style={{ width: 260 }}
                  placeholder="请输入类别"
                  // suffix={dotTelValue ? <Icon type="close" onClick={this.emptyDotTel} /> : null}
                  // onChange={this.dotTelValueChange}
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="状态"
            >
              {getFieldDecorator('status', {
                rules: [{
                  required:false, message: '请输入状态!',
                }],
              })(
                <Select style={{ width: 260 }} >
                  <Option value="在用">在用</Option>
                  <Option value="停用">停用</Option>
                  <Option value="报修">报修</Option>
                  <Option value="报废">报废</Option>
                </Select>
              )}
            </FormItem>
            <Row type="flex" justify="center" align="middle">
              <span>
                <Button  type="primary" htmlType="submit">搜索</Button>
                <Button onClick={this.highSearch} style={{ marginLeft: 20 }}>退出搜索</Button>
              </span>
            </Row>
          </Form>
        </div>
      </Row>
    )
  }
}