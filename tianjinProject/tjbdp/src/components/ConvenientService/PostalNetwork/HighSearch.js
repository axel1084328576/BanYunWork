import React,{Component} from 'react';
import {Row,Col,Input,Select,InputNumber,Button,Icon,Form} from 'antd';
import styles from './HighSearch.less'
import { connect } from "dva/index";

const FormItem = Form.Item;
const Option = Select.Option;

@connect(({ postalNetwork,loading}) => {
  const {postList}=postalNetwork;
  return {
    postList,
    searchLoading: loading.effects['postalNetwork/List'],
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
    // const { dispatch } = this.props;
    // dispatch({
    //   type: 'postalNetwork/List',
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
        const { dispatch,showSearch } = this.props;
        values.token=sessionStorage.getItem('sys-token');
        dispatch({
          type: 'postalNetwork/Select',
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
    const { TextArea } = Input;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 17},
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
              label="网点编号"
            >
              {getFieldDecorator('statCode', {
                rules: [{
                  required: false, message: '请输入网点编号!',
                }],
              })(
                <Input
                  style={{width:260}}
                  placeholder="请输入网点编号"
                  // suffix={dotName ? <Icon type="close" onClick={this.emptyDotName} /> : null}
                  // onChange={this.dotNameValueChange}
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="网点名称"
            >
              {getFieldDecorator('statName', {
                rules: [{
                  required: false, message: '请输入网点名称!',
                }],
              })(
                <Input
                  style={{ width: 260 }}
                  placeholder="请输入网点名称"
                  // suffix={dotName ? <Icon type="close" onClick={this.emptyDotName} /> : null}
                  // onChange={this.dotNameValueChange}
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="网点地址"
            >
              {getFieldDecorator('address', {
                rules: [{
                  required: false, message: '请输入网点地址!',
                }],
              })(
                <Input
                  style={{ width: 260 }}
                  placeholder="请输入网点地址"
                  // suffix={dotAddressValue ? <Icon type="close" onClick={this.emptyDotAddress} /> : null}
                  // onChange={this.dotAddressValueChange}
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="经营管理企业"
            >
              {getFieldDecorator('enterprise', {
                rules: [{
                  required: false, message: '请输入经营管理企业!',
                }],
              })(
                <Input
                  style={{width:260}}
                  placeholder="请输入经营管理企业"
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
              label="网点联系人"
            >
              {getFieldDecorator('contact', {
                rules: [{
                  required: false, message: '请输入网点联系人!',
                }],
              })(
                <Input
                  style={{ width: 260 }}
                  placeholder="请输入网点联系人"
                  // suffix={dotContactsValue ? <Icon type="close" onClick={this.emptyDotContacts} /> : null}
                  // onChange={this.dotContactsValueChange}
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="联系人电话"
            >
              {getFieldDecorator('tel', {
                rules: [{
                  required: false, message: '请输入联系人电话!',
                }],
              })(
                <Input
                  style={{ width: 260 }}
                  placeholder="请输入联系人电话"
                  // suffix={dotTelValue ? <Icon type="close" onClick={this.emptyDotTel} /> : null}
                  // onChange={this.dotTelValueChange}
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="备注"
            >
              {getFieldDecorator('notes', {
                rules: [{
                  required: false, message: '请输入备注!',
                }],
              })(
                <TextArea  style={{width:260}} rows={4}  />
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