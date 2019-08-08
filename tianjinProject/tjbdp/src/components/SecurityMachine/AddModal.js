import React,{Component} from 'react';
import {Row,Col,Input,Select,InputNumber,Button,Icon,Form,Modal,message,DatePicker} from 'antd';
import {connect} from 'dva';
import styles from './HighSearch.less'
import moment from "moment/moment";
import SelectExpree from './SelectExpree';

const FormItem = Form.Item;
const Option = Select.Option;

@connect(({ replayCheck,expressNetwork,loading }) => {
  const {checkList}=replayCheck;
  const {expressList}=expressNetwork;
  return{
    expressList,
    checkList,
    addOrEditLoading: loading.effects['replayCheck/AddOrEdit'],
  }
})

@Form.create()
export default class HighSearch extends Component{
  constructor(props){
    super(props);
    this.state={
      smVisible:props.showSmboxModal,
      scId:'',
      longitudeValue:"",
      latitudeValue:"",
      address:'',
      contact:'',
      tel:'',
      expVisible:false,
      stationId:null,
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
  emptyTel = () => {
    this.setState({tel:''});
  };

  handleSearch = (e) => {
    e.preventDefault();
    let searchItem;
    if(this.props.getSearch){
      searchItem=this.props.getSearch()
    }
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form:', values);
        values.opType="add";
        values.token=sessionStorage.getItem('sys-token');
        values.stationId=this.state.stationId;
        if(values.buyDate!=undefined && values.buyDate!=null){
          values.buyDate=moment( values.buyDate).format("YYYY-MM-DD");
        }
        const { dispatch,smVisible } = this.props;
        dispatch({
          type: 'replayCheck/AddOrEdit',
          payload:{
            data:values,
            searchItem:searchItem,
          },
          callback:()=>{
            if(smVisible){
              smVisible(false)
            }
            message.success("添加成功");
          },
        });
        if(this.props.setSelectedRowKeys){
          this.props.setSelectedRowKeys()
        }
      }
    });
  };


  handleCancel=()=>{
    if(this.props.smVisible){
      this.props.smVisible(false)
    }
  };

  inputHandle=()=>{
    this.setState({expVisible:true})
  };

  setExpVisible=(value,value1)=>{
    // console.log("value1",value1);
    this.setState({
      expVisible:value
    });
    if(value1!=undefined && value!=null){
      this.props.form.setFieldsValue({
        stationId:value1.statName,
      });
      this.setState({
        stationId:value1.sid,
      })
    }
  };

  render(){
    const {idValue, scId,longitudeValue,latitudeValue,smVisible,address,contact,tel}=this.state;
    const {addOrEditLoading,expressList}=this.props;
    const children = expressList.map((item) => {
      return <Option key={item.sid} value={item.sid}>{item.statName}</Option>;
    });
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
      <div>
        {this.state.expVisible?<SelectExpree setExpVisible={this.setExpVisible}  expVisible={this.state.expVisible} />:null}
        <Modal
          title="添加安检机信息"
          visible={smVisible}
          style={{top:40}}
          onOk={this.handleSearch}
          onCancel={this.handleCancel}
          width={720}
          footer={[
            <Button key="back" onClick={this.handleCancel}>取消</Button>,
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
                    label="安检机编号"
                  >
                    {getFieldDecorator('machNo', {
                      rules: [{
                        required: true, message: '请输入安检机编号!',
                      }],
                    })(
                      <Input
                        className={styles.formItemWidth1}
                        placeholder="请输入安检机编号"
                        // suffix={ scId ? <Icon type="close" onClick={this.emptyScId} /> : null}
                        // onChange={this.scIdValueChange}
                      />
                    )}
                  </FormItem>
                </Col>
                <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                  <FormItem
                    {...formItemLayout}
                    label="安检机厂家"
                  >
                    {getFieldDecorator('producter', {
                      rules: [{
                        required: true, message: '请选择安检机厂家',
                      }],
                    })(
                      <Input
                        className={styles.formItemWidth1}
                        placeholder="请输入安检机厂家"
                      />
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                  <FormItem
                    {...formItemLayout}
                    label="安检数量"
                  >
                    {getFieldDecorator('amount',{
                      rules: [{
                        required: false, message: '请输入安检数量',
                      }],
                    })(
                      <InputNumber
                        className={styles.formItemWidth1}
                        min={1}
                        max={10}
                        onChange={this.numberValueChange}
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
                      rules: [{
                        required: false, message: '请输入地址!',
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
                </Col>
              </Row>
              <Row>
                <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                  <FormItem
                    {...formItemLayout}
                    label="经度"
                  >
                    {getFieldDecorator('longitude', {
                      rules: [{
                        required: true, message: '请输入经度!',
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
                      rules: [{
                        required:true, message: '请输入纬度!',
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
                    label="安检机品牌"
                  >
                    {getFieldDecorator('brand', {
                      rules: [{
                        required: true, message: '请输入安检机品牌!',
                      }],
                    })(
                      <Input
                        className={styles.formItemWidth1}
                        placeholder="请输入安检机品牌"
                        // suffix={contact? <Icon type="close" onClick={this.emptyContact} /> : null}
                        // onChange={this.contactValueChangec }
                      />
                    )}
                  </FormItem>
                </Col>
                <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                  <FormItem
                    {...formItemLayout}
                    label="购买时间"
                  >
                    {getFieldDecorator('buyDate', {
                      rules: [{
                        required: false, message: '请输入购买时间!',
                      }],
                    })(
                      <DatePicker
                        className={styles.formItemWidth1}
                        format="YYYY-MM-DD"
                        placeholder="请输入购买时间"
                      />
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                  <FormItem
                    {...formItemLayout}
                    label="快递企业"
                  >
                    {getFieldDecorator('compNo', {
                      rules: [{
                        required: true, message: '请输入快递企业!',
                      }],
                    })(
                      <Input
                        className={styles.formItemWidth1}
                        placeholder="请输入快递企业"
                        // suffix={contact? <Icon type="close" onClick={this.emptyContact} /> : null}
                        // onChange={this.contactValueChangec }
                      />
                    )}
                  </FormItem>
                </Col>
                <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                  <FormItem
                    {...formItemLayout}
                    label="公司名称"
                  >
                    {getFieldDecorator('enterpriseName', {
                      rules: [{
                        required: true, message: '请输入公司名称!',
                      }],
                    })(
                      <Input
                        className={styles.formItemWidth1}
                        placeholder="请输入公司名称"
                        // suffix={contact? <Icon type="close" onClick={this.emptyContact} /> : null}
                        // onChange={this.contactValueChangec }
                      />
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                  <FormItem
                    {...formItemLayout}
                    label="牌照"
                  >
                    {getFieldDecorator('licencePlate', {
                      rules: [{
                        required: false, message: '请输入牌照!',
                      }],
                    })(
                      <Input
                        className={styles.formItemWidth1}
                        placeholder="请输入牌照"
                        // suffix={contact? <Icon type="close" onClick={this.emptyContact} /> : null}
                        // onChange={this.contactValueChangec }
                      />
                    )}
                  </FormItem>
                </Col>
                <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                  <FormItem
                    {...formItemLayout}
                    label="使用年限"
                  >
                    {getFieldDecorator('serviceLife', {
                      rules: [{
                        required: false, message: '请输入使用年限!',
                      }],
                    })(
                      <Input
                        className={styles.formItemWidth1}
                        placeholder="请输入使用年限"
                        // suffix={contact? <Icon type="close" onClick={this.emptyContact} /> : null}
                        // onChange={this.contactValueChangec }
                      />
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                  <FormItem
                    {...formItemLayout}
                    label="安检机名称"
                  >
                    {getFieldDecorator('machName', {
                      rules: [{
                        required: true, message: '请输入安检机名称!',
                      }],
                    })(
                      <Input
                        className={styles.formItemWidth1}
                        placeholder="请输入安检机名称"
                        // suffix={contact? <Icon type="close" onClick={this.emptyContact} /> : null}
                        // onChange={this.contactValueChangec }
                      />
                    )}
                  </FormItem>
                </Col>
                <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                  <FormItem
                    {...formItemLayout}
                    label="安检机型号"
                  >
                    {getFieldDecorator('model', {
                      rules: [{
                        required: true, message: '请输入安检机型号!',
                      }],
                    })(
                      <Input
                        className={styles.formItemWidth1}
                        placeholder="请输入安检机型号"
                        // suffix={contact? <Icon type="close" onClick={this.emptyContact} /> : null}
                        // onChange={this.contactValueChangec }
                      />
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                  <FormItem
                    {...formItemLayout}
                    label="联系电话"
                  >
                    {getFieldDecorator('tel', {
                      rules: [{
                        required: false, message: '请输入联系电话!',
                      }],
                    })(
                      <Input
                        className={styles.formItemWidth1}
                        placeholder="请输入联系电话"
                        // suffix={contact? <Icon type="close" onClick={this.emptyContact} /> : null}
                        // onChange={this.contactValueChangec }
                      />
                    )}
                  </FormItem>
                </Col>
                <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                  <FormItem
                    {...formItemLayout}
                    label="联系人"
                  >
                    {getFieldDecorator('contact', {
                      rules: [{
                        required: false, message: '请输入联系人!',
                      }],
                    })(
                      <Input
                        className={styles.formItemWidth1}
                        placeholder="请输入联系人"
                        // suffix={contact? <Icon type="close" onClick={this.emptyContact} /> : null}
                        // onChange={this.contactValueChangec }
                      />
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                  <FormItem
                    {...formItemLayout}
                    label="状态"
                  >
                    {getFieldDecorator('status', {
                      rules: [{
                        required: true, message: '请输入状态!',
                      }],
                    })(
                      <Select
                        showSearch
                        className={styles.formItemWidth1}
                        placeholder="请选择"
                      >
                        <Option value={1}>在用</Option>
                        <Option value={2}>停用</Option>
                        <Option value={3}>报修</Option>
                        <Option value={4}>报废</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                  <FormItem
                    {...formItemLayout}
                    label="归属网点"
                  >
                    {getFieldDecorator('stationId', {
                      rules: [{
                        required: true, message: '请输入归属网点!',
                      }],
                    })(
                      <Input style={{width:'100%'}} placeholder="请输入快递企业" onClick={this.inputHandle} readOnly={true} />
                    )}
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </div>
        </Modal>
      </div>

    )
  }
}