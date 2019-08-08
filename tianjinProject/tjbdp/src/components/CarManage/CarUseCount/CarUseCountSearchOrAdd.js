import React, { Component } from "react";
import { Button, Input, Form, Icon, Row, Col, Popconfirm, Modal } from "antd";
import CarUseCountHighSearch from "./CarUseCountHighSearch";
import styles from "./CarUseCountSearchOrAdd.less";

const FormItem = Form.Item;

@Form.create()

class CarUseCountSearchOrAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      licenceNumberValue: "",
      openHighSearch:false,
    };
  }

  componentDidMount(){
    if(this.props.getValue) {
      this.props.getValue({carNo:this.state.licenceNumberValue})
    }
  }

  licenceNumberValueChange = (e) => {
    this.setState({ licenceNumberValue: e.target.value });
  };

  // emptyLicenceNumberValue = () => {
  //   this.setState({licenceNumberValue:''});
  // }

  partDelete = () => {
    this.props.dispatch({
      type: "carusecount/deletePartCarUseCount",
      payload: {}
    });
  };

  openHighSearch = () => {
    this.setState({ licenceNumberValue: "" });
    this.props.dispatch({
      type: "carusecount/setShowHighSearch",
      payload: {
        showHighSearch: true
      }
    });
  };

  openAddModal = () => {
    const form = this.props.form;

    form.setFieldsValue({
      licenceNumber: "",
      totalMileage: "",
      convey: "",
      reportInfo: "",
      operate: "",
      enterprises: "",
      ownership: "",
      scope: ""
    });

    this.props.dispatch({
      type: "carusecount/setAddModalVisible",
      payload: {
        addModalVisible: true
      }
    });
  };

  addCarUseCount = () => {
    const form = this.props.form;
    form.validateFields((err, values) => {
      // console.log(values);
      if (!err) {
        this.props.dispatch({
          type: "carusecount/addCarUseCount",
          payload: values
        });
      }
    });
  };

  cancelAddCarUseCount = () => {
    this.props.dispatch({
      type: "carusecount/setAddModalVisible",
      payload: {
        addModalVisible: false
      }
    });
  };

  searchCar = () => {
    const { dispatch, pageSize } = this.props;
    const form = this.props.form;
    form.validateFields((err, values) => {
      // let value={};
      // this.state.openHighSearch?value={
      //   carNo: values.carNo,
      //   carType :values.carTypeValue,
      //   brand:values.carBrandValue,
      //   driver:values.carDriverValue,
      //   stationId:values.stationIdValue
      // }:value={
      //   carNo:values.carNo,
      // };
      // if(this.props.getValues){
      //   this.props.getValues(value)
      // }
     dispatch({
        type:'carusecount/getCarUseCount',
        payload:{
          page:1,
          pageSize:pageSize,
          carNo:values.carNo,
          token:sessionStorage.getItem('sys-token'),
        },
      });
    });

  };

  hanldeHighSearch = () => {
    this.setState({
      openHighSearch:!this.state.openHighSearch
    })
  };

  render() {

    const formItemLayout = {
      labelCol: {
        span: 6,
        offset: 1
      },
      wrapperCol: {
        span: 16
      }
    };

    const { getFieldDecorator } = this.props.form;

    const addModalForm = (
      <Modal
        confirmLoading={false}
        title="添加车辆统计信息"
        visible={this.props.addModalVisible}
        onOk={this.addCarUseCount}
        onCancel={this.cancelAddCarUseCount}
      >
        <Form>
          <FormItem {...formItemLayout} label="车辆号码">
            {getFieldDecorator("licenceNumber", {
              rules: [{
                required: true,
                message: "车辆号码不能为空！"
              }]
            })(
              <Input placeholder="请输入车辆号码"/>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="累计里程数">
            {getFieldDecorator("totalMileage", {
              rules: [{
                required: true,
                message: "累计里程数不能为空！"
              }]
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="货物运载量">
            {getFieldDecorator("convey", {
              rules: [{
                required: true,
                message: "货物运载量不能为空！"
              }]
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="报警信息">
            {getFieldDecorator("reportInfo", {
              rules: [{
                required: true,
                message: "报警信息不能为空！"
              }]
            })(
              <Input placeholder="请输入报警信息"/>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="运营证">
            {getFieldDecorator("operate", {
              rules: [{
                required: true,
                message: "运营证不能为空！"
              }]
            })(
              <Input placeholder="请输入运营证"/>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="所属企业">
            {getFieldDecorator("enterprises", {
              rules: [{
                required: true,
                message: "所属企业不能为空！"
              }]
            })(
              <Input placeholder="请选择所属企业"/>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="车辆归属">
            {getFieldDecorator("ownership", {
              rules: [{
                required: true,
                message: "车辆归属不能为空！"
              }]
            })(
              <Input placeholder="请输入车辆归属"/>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="车辆运营范围">
            {getFieldDecorator("scope", {
              rules: [{
                required: true,
                message: "运营范围不能为空！"
              }]
            })(
              <Input placeholder="请输入运营范围"/>
            )}
          </FormItem>
        </Form>
      </Modal>
    );

    const highSearchProps = {
      dispatch: this.props.dispatch,
      showHighSearch: this.props.showHighSearch
    };

    const HighSearch = (<CarUseCountHighSearch {...highSearchProps} />);

    const formItemLayout1 = {
      labelCol: {
        sm: { span: 24 },
        md: { span: 24 },
        lg: { span: 11},
        xl: { span: 9 }
      },
      wrapperCol: {
        sm: { span: 24 },
        md: { span: 24 },
        lg: { span: 12 },
        xl: { span: 14 }
      }
    };
    const mainSearchOrAdd = (
      <div>
        <Form layout="inline">
          <Row>
            <Col sm={{ span: 24 }} lg={{ span: 6 }}>
              <FormItem
                label="车辆号码"
                {...formItemLayout1}
                style={{ width: "100%" }}
              >
                {getFieldDecorator("carNo", {
                  rules: [{ required: false }]
                })(
                  <Input
                    className={styles.formItemWidth}
                    placeholder="请输入车辆号码"
                    // value={this.state.licenceNumberValue}
                    // suffix={this.state.licenceNumberValue ? <Icon type="close" onClick={this.emptyLicenceNumberValue} /> : null}
                    onChange={this.licenceNumberValueChange}
                  />
                )}
              </FormItem>
            </Col>
            <Col xs={{ span: 12 }} sm={{ span: 12 }} lg={{ span: 6 }}>
              <span className={styles.unSpan}>
                {/*<a onClick={this.hanldeHighSearch} style={{ marginRight: 20 }}>{this.state.openHighSearch?"收起":"展开"}</a>*/}
                <Button type="primary" icon="search"  onClick={this.searchCar}>搜索</Button>
                {/*<a onClick={this.openHighSearch} style={{ marginLeft: 20 }}>高级搜索</a>*/}
              </span>
            </Col>
            <Col xs={{ span: 12 }} sm={{ span: 12 }} lg={{offset:6,span: 6}}>
              <Row type="flex" justify="end">
                <span className={styles.unSpan1}>
                   {
                     this.props.controlList.cuse_del?
                       (this.props.selectedRowKeys.length > 0 ?
                         <Popconfirm
                           okText="确定"
                           cancelText="取消"
                           title="是否要删除选中的用户信息?"
                           placement="bottomRight"
                           onConfirm={this.partDelete}
                         >
                           <Button
                             type="danger"
                             className={styles.allDelete}
                           >
                             删除
                           </Button>
                         </Popconfirm>
                         :
                         null):null
                   }
                  {this.props.controlList.cuse_add?<Button
                    style={{ marginLeft: 10 }}
                    type="primary"
                    icon="plus"
                    onClick={this.openAddModal}
                  >
                    添加
                  </Button>:null}
                </span>
              </Row>
            </Col>
          </Row>
          {/*{this.state.openHighSearch? <Row>*/}
            {/*<Row>*/}
              {/*<Col sm={{ span: 24 }} lg={{ span:6}}>*/}
                {/*<FormItem*/}
                  {/*{...formItemLayout1}*/}
                  {/*label="累计里程数"*/}
                  {/*style={{ width: "100%" }}*/}
                {/*>*/}
                  {/*{getFieldDecorator("carTypeValue", {*/}
                    {/*rules: [{*/}
                      {/*required: false, message: "请输入累计里程数!"*/}
                    {/*}]*/}
                  {/*})(*/}
                    {/*<Input*/}
                      {/*style={{ width: "100%" }}*/}
                      {/*placeholder="请输入累计里程数"*/}
                    {/*/>*/}
                  {/*)}*/}
                {/*</FormItem>*/}
              {/*</Col>*/}
              {/*<Col sm={{ span: 24 }} lg={{ span:6}}>*/}
                {/*<FormItem*/}
                  {/*{...formItemLayout1}*/}
                  {/*label="货物运载量"*/}
                  {/*style={{ width: "100%" }}*/}
                {/*>*/}
                  {/*{getFieldDecorator("carBrandValue", {*/}
                    {/*rules: [{*/}
                      {/*required: false, message: "请输入货物运载量!"*/}
                    {/*}]*/}
                  {/*})(*/}
                    {/*<Input*/}
                      {/*style={{ width: "100%" }}*/}
                      {/*placeholder="请输入货物运载量"*/}
                    {/*/>*/}
                  {/*)}*/}
                {/*</FormItem>*/}
              {/*</Col>*/}
              {/*<Col sm={{ span: 24 }} lg={{ span:6}}>*/}
                {/*<FormItem*/}
                  {/*{...formItemLayout1}*/}
                  {/*label="报警信息"*/}
                  {/*style={{ width: "100%" }}*/}
                {/*>*/}
                  {/*{getFieldDecorator("carDriverValue", {*/}
                    {/*rules: [{*/}
                      {/*required: false, message: "请输入报警信息!"*/}
                    {/*}]*/}
                  {/*})(*/}
                    {/*<Input*/}
                      {/*style={{ width: "100%" }}*/}
                      {/*placeholder="请输入报警信息"*/}
                    {/*/>*/}
                  {/*)}*/}
                {/*</FormItem>*/}
              {/*</Col>*/}
              {/*<Col sm={{ span: 24 }} lg={{ span:6}}>*/}
                {/*<FormItem*/}
                  {/*{...formItemLayout1}*/}
                  {/*label="营运证"*/}
                  {/*style={{ width: "100%" }}*/}
                {/*>*/}
                  {/*{getFieldDecorator("stationIdValue", {*/}
                    {/*rules: [{*/}
                      {/*required: false, message: "请输入营运证!"*/}
                    {/*}]*/}
                  {/*})(*/}
                    {/*<Input*/}
                      {/*style={{ width: "100%" }}*/}
                      {/*placeholder="请输入营运证"*/}
                    {/*/>*/}
                  {/*)}*/}
                {/*</FormItem>*/}
              {/*</Col>*/}
            {/*</Row>*/}
            {/*<Row>*/}
              {/*<Col sm={{ span: 24 }} lg={{ span:6}}>*/}
                {/*<FormItem*/}
                  {/*{...formItemLayout1}*/}
                  {/*label="所属企业"*/}
                  {/*style={{ width: "100%" }}*/}
                {/*>*/}
                  {/*{getFieldDecorator("carTypeValue1", {*/}
                    {/*rules: [{*/}
                      {/*required: false, message: "请输入所属企业!"*/}
                    {/*}]*/}
                  {/*})(*/}
                    {/*<Input*/}
                      {/*style={{ width: "100%" }}*/}
                      {/*placeholder="请输入所属企业"*/}
                    {/*/>*/}
                  {/*)}*/}
                {/*</FormItem>*/}
              {/*</Col>*/}
              {/*<Col sm={{ span: 24 }} lg={{ span:6}}>*/}
                {/*<FormItem*/}
                  {/*{...formItemLayout1}*/}
                  {/*label="车辆归属"*/}
                  {/*style={{ width: "100%" }}*/}
                {/*>*/}
                  {/*{getFieldDecorator("carBrandValue1", {*/}
                    {/*rules: [{*/}
                      {/*required: false, message: "请输入车辆归属!"*/}
                    {/*}]*/}
                  {/*})(*/}
                    {/*<Input*/}
                      {/*style={{ width: "100%" }}*/}
                      {/*placeholder="请输入车辆归属"*/}
                    {/*/>*/}
                  {/*)}*/}
                {/*</FormItem>*/}
              {/*</Col>*/}
              {/*<Col sm={{ span: 24 }} lg={{ span:6}}>*/}
                {/*<FormItem*/}
                  {/*{...formItemLayout1}*/}
                  {/*label="车辆运营范围"*/}
                  {/*style={{ width: "100%" }}*/}
                {/*>*/}
                  {/*{getFieldDecorator("carDriverValue1", {*/}
                    {/*rules: [{*/}
                      {/*required: false, message: "请输入车辆运营范围!"*/}
                    {/*}]*/}
                  {/*})(*/}
                    {/*<Input*/}
                      {/*style={{ width: "100%" }}*/}
                      {/*placeholder="请输入车辆运营范围"*/}
                    {/*/>*/}
                  {/*)}*/}
                {/*</FormItem>*/}
              {/*</Col>*/}
              {/*<Col sm={{ span: 24 }} lg={{ span:6}}>*/}
                {/*<FormItem*/}
                  {/*{...formItemLayout1}*/}
                  {/*label="车辆信息"*/}
                  {/*style={{ width: "100%" }}*/}
                {/*>*/}
                  {/*{getFieldDecorator("stationIdValue1", {*/}
                    {/*rules: [{*/}
                      {/*required: false, message: "请输入车辆信息!"*/}
                    {/*}]*/}
                  {/*})(*/}
                    {/*<Input*/}
                      {/*style={{ width: "100%" }}*/}
                      {/*placeholder="请输入车辆信息"*/}
                    {/*/>*/}
                  {/*)}*/}
                {/*</FormItem>*/}
              {/*</Col>*/}
            {/*</Row>*/}
          {/*</Row>:null}*/}
        </Form>
      </div>
    );

    return (
      <div className={styles.header}>
        {addModalForm}
        {!this.props.showHighSearch ? mainSearchOrAdd : HighSearch}
      </div>
    );
  }
}

export default CarUseCountSearchOrAdd;
