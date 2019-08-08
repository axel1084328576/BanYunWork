import React,{Component} from 'react';
import {Row,Col,Input,Select,InputNumber,Button,Icon,Form} from 'antd';
import styles from './HighSearch.less'
import { connect } from "dva/index";

const FormItem = Form.Item;
const Option = Select.Option;

@connect(({ videoReplay,expressNetwork,loading}) => {
  const {videoList}=videoReplay;
  const {expressList}=expressNetwork;
  return{
    expressList,
    searchLoading: loading.effects['postboxManage/List'],
  }
})

@Form.create()
export default class HighSearch extends Component{
  constructor(props){
    super(props);
    this.state={
      cameraId:'',
      cameraBrandValue:'',
      cameraManufactorValue:'',
      manufactorContactsValue:'',
      manufactorTelValue:'',
      cameraLongitudeValue:"",
      cameraLatitudeValue:"",
      dotName:'',
      address:'',
    };
  }

  componentDidMount(){
    const {dispatch}=this.props;
    dispatch({
      type: 'expressNetwork/List',
      payload:{
        token:sessionStorage.getItem('sys-token'),
      }
    });
  }

  emptyDotName = () => {
    this.setState({dotName:''});
  };

  dotNameValueChange = (value) => {
    this.setState({dotName:value.target.value});
  };

  highSearch = () => {
    // const { dispatch } = this.props;
    // dispatch({
    //   type: 'videoReplay/List',
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
        console.log('Received values of form: ', values);
        const { dispatch} = this.props;
        values.token=sessionStorage.getItem('sys-token');
        dispatch({
          type: 'videoReplay/List',
          payload:{
            page: 1,
            pageSize:10,
            ...values,
          }
        });
      }
    });
  };

  render(){
    const {address,cameraId,cameraBrandValue,cameraManufactorValue,cameraLongitudeValue,cameraLatitudeValue,manufactorContactsValue,manufactorTelValue,dotName}=this.state;
    const {searchLoading,expressList}=this.props;
    const { getFieldDecorator } = this.props.form;
    const children = expressList.map((item) => {
      return <Option key={item.sid} value={item.sid}>{item.statName}</Option>;
    });
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 4},
      },
    };
    return(
      <Row type="flex" justify="center" style={{ marginBottom: 14 }}>
        <div className={styles.wrap}>
          <Form onSubmit={this.handleSearch}>
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
            <FormItem
              {...formItemLayout}
              label="摄像头编号"
            >
              {getFieldDecorator('videoNo', {
                rules: [{
                  required: false, message: '请输入摄像头编号!',
                }],
              })(
                <Input
                  style={{ width: 260 }}
                  placeholder="请输入摄像头编号"
                  // suffix={cameraId ? <Icon type="close" onClick={this.emptyCameraId} /> : null}
                  // onChange={this.cameraIdValueChange}
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="摄像头品牌"
            >
              {getFieldDecorator('brand', {
                rules: [{
                  required: false, message: '请输入摄像头品牌!',
                }],
              })(
                <Input
                  style={{ width: 260 }}
                  placeholder="请输入摄像头品牌"
                  // suffix={cameraBrandValue ? <Icon type="close" onClick={this.emptyCameraBrand} /> : null}
                  // onChange={this.cameraBrandValueChange}
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="摄像头厂家"
            >
              {getFieldDecorator('producter', {
                rules: [{
                  required: false, message: '请输入摄像头厂家!',
                }],
              })(
                <Input
                  style={{ width: 260 }}
                  placeholder="请输入摄像头厂家"
                  // suffix={cameraManufactorValue ? <Icon type="close" onClick={this.emptyCameraManufactor} /> : null}
                  // onChange={this.cameraManufactorValueChange}
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="厂家联系人"
            >
              {getFieldDecorator('contact', {
                rules: [{
                  required: false, message: '请输入厂家联系人!',
                }],
              })(
                <Input
                  style={{ width: 260 }}
                  placeholder="请输入厂家联系人"
                  // suffix={manufactorContactsValue ? <Icon type="close" onClick={this.emptyManufactorContacts} /> : null}
                  // onChange={this.manufactorContactsValueChange}
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="厂家联系方式"
            >
              {getFieldDecorator('tel', {
                rules: [{
                  required: false, message: '请输入厂家联系方式!',
                }],
              })(
                <Input
                  style={{ width: 260 }}
                  placeholder="请输入厂家联系方式"
                  // suffix={manufactorTelValue ? <Icon type="close" onClick={this.emptyManufactorTel} /> : null}
                  // onChange={this.manufactorTelValueChange}
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
                  // suffix={cameraLongitudeValue ? <Icon type="close" onClick={this.emptyLongitudec} /> : null}
                  // onChange={this.longitudeValueChangec}
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
                  // suffix={cameraLatitudeValue ? <Icon type="close" onClick={this.emptyLatitudec} /> : null}
                  // onChange={this.latitudeValueChangec }
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
                  // suffix={address? <Icon type="close" onClick={this.emptyAddress} /> : null}
                  // onChange={this.addressValueChangec }
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="归属网点"
            >
              {getFieldDecorator('stationId', {
                rules: [{
                  required: false, message: '请输入归属网点!',
                }],
              })(
                <Select
                  style={{ width: 260 }}
                >
                  {children}
                </Select>
              )}
            </FormItem>
            <Row type="flex" justify="center" align="middle">
              <span>
                <Button type="primary" htmlType="submit">搜索</Button>
                <Button onClick={this.highSearch} style={{ marginLeft: 20 }}>退出搜索</Button>
              </span>
            </Row>
          </Form>
        </div>
      </Row>
    )
  }
}