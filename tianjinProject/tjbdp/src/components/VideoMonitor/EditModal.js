import React,{Component} from 'react';
import {Row,Col,Input,Select,InputNumber,Button,Icon,Form,Modal,message} from 'antd';
import styles from './HighSearch.less'
import { connect } from "dva/index";

const FormItem = Form.Item;
const Option = Select.Option;

@connect(({ videoReplay,expressNetwork,loading}) => {
  const {videoAddOrEdit}=videoReplay;
  const {expressList}=expressNetwork;
  return{
    expressList,
    addOrEditLoading:loading.effects['videoReplay/AddOrEdit'],
  }
})


@Form.create()
export default class EditModal extends Component{
  constructor(props){
    super(props);
    this.state={
      editVisible:props.showVideoEditModal,
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

  emptyAddress = () => {
    this.setState({address:''});
  };

  addressValueChangec = (value) => {
    this.setState({address:value.target.value});
  };

  emptyLongitudec = () => {
    this.setState({cameraLongitudeValue:''});
  };

  longitudeValueChangec = (value) => {
    this.setState({cameraLongitudeValue:value.target.value});
  };

  emptyLatitudec = () => {
    this.setState({cameraLatitudeValue:''});
  };

  latitudeValueChangec = (value) => {
    this.setState({cameraLatitudeValue:value.target.value});
  };

  emptyCameraId = () => {
    this.setState({cameraId:''});
  };

  cameraIdValueChange = (value) => {
    this.setState({cameraId:value.target.value});
  };

  emptyCameraBrand = () => {
    this.setState({cameraBrandValue:''});
  };

  cameraBrandValueChange = (value) => {
    this.setState({cameraBrandValue:value.target.value});
  };

  emptyCameraManufactor = () => {
    this.setState({cameraManufactorValue:''});
  };

  cameraManufactorValueChange = (value) => {
    this.setState({cameraManufactorValue:value.target.value});
  };

  emptyManufactorContacts = () => {
    this.setState({ manufactorContactsValue:''});
  };

  manufactorContactsValueChange = (value) => {
    this.setState({ manufactorContactsValue:value.target.value});
  };

  emptyManufactorTel = () => {
    this.setState({manufactorTelValue:''});
  };

  manufactorTelValueChange = (value) => {
    this.setState({manufactorTelValue:value.target.value});
  };

  emptyDotName = () => {
    this.setState({dotName:''});
  };

  dotNameValueChange = (value) => {
    this.setState({dotName:value.target.value});
  };


  highSearch = () => {
    if(this.props.showSearch){
      this.props.showSearch(false)
    }
  };

  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { dispatch,videoEditVisible,rowData } = this.props;
        // console.log('Received values of form: ', values);
        values.opType="mod";
        values.sid=rowData.sid;
        values.token=sessionStorage.getItem('sys-token');
        dispatch({
          type: 'videoReplay/AddOrEdit',
          payload:values,
          callback: ()=>{
            if(videoEditVisible){
              videoEditVisible(false)
            }
            message.success("修改成功");
          }
        });
      }
    });
  };

  handleEditCancel = () => {
    if(this.props.videoEditVisible){
      this.props.videoEditVisible(false)
    }
  };

  render(){
    const {address,cameraId,cameraBrandValue,cameraManufactorValue,cameraLongitudeValue,cameraLatitudeValue,manufactorContactsValue,manufactorTelValue,dotName}=this.state;
    const {rowData,addOrEditLoading,expressList}=this.props;
    const { getFieldDecorator } = this.props.form;
    const children = expressList.map((item) => {
      return <Option key={item.sid} value={item.sid}>{item.statName}</Option>;
    });
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
        title="修改视频监控信息"
        visible={this.state.editVisible}
        style={{top:40}}
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
            <FormItem
              {...formItemLayout}
              label="摄像头编号"
            >
              {getFieldDecorator('videoNo', {
                initialValue:rowData.videoNo,
                rules: [{
                  required: true, message: '请输入摄像头编号!',
                }],
              })(
                <Input
                  className={styles.formItemWidth1}
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
                initialValue:rowData.brand,
                rules: [{
                  required: false, message: '请输入摄像头品牌!',
                }],
              })(
                <Input
                  className={styles.formItemWidth1}
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
                initialValue:rowData.producter,
                rules: [{
                  required: false, message: '请输入摄像头厂家!',
                }],
              })(
                <Input
                  className={styles.formItemWidth1}
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
                initialValue:rowData.contact,
                rules: [{
                  required: false, message: '请输入厂家联系人!',
                }],
              })(
                <Input
                  className={styles.formItemWidth1}
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
                initialValue:rowData.tel,
                rules: [{
                  required: false, message: '请输入厂家联系方式!',
                }],
              })(
                <Input
                  className={styles.formItemWidth1}
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
                initialValue:rowData.longitude,
                rules: [{
                  required: false, message: '请输入经度!',
                }],
              })(
                <Input
                  className={styles.formItemWidth1}
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
                initialValue:rowData.latitude,
                rules: [{
                  required: false, message: '请输入纬度!',
                }],
              })(
                <Input
                  className={styles.formItemWidth1}
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
                initialValue:rowData.address,
                rules: [{
                  required: true, message: '请输入地址!',
                }],
              })(
                <Input
                  className={styles.formItemWidth1}
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
                initialValue:rowData.workStation.statName,
                rules: [{
                  required: true, message: '请输入归属网点!',
                }],
              })(
                <Select
                  className={styles.formItemWidth1}
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {children}
                </Select>
              )}
            </FormItem>
          </Form>
        </div>
      </Modal>
    )
  }
}