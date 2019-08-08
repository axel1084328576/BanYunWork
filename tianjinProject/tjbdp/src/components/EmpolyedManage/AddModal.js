import React, { Component } from 'react';
import { Input, Select, Icon, Form, Modal, Button, message, Row, Col, DatePicker } from 'antd';
import styles from './HighSearch.less'
import { connect } from 'dva';
import moment from "moment/moment";
import SelectExpree from './SelectExpree';

const FormItem = Form.Item;
const Option = Select.Option;

@connect(({ infoSafeGuard, expressNetwork, loading, businessinfo }) => {
  const { infoSafeAddOrEdit, pageSize, page, jobTypeList } = infoSafeGuard;
  const { expressList } = expressNetwork;
  const { companyList } = businessinfo;
  return {
    pageSize, page,
    expressList,
    companyList,
    jobTypeList,
    addOrEditLoading: loading.effects['infoSafeGuard/AddOrEdit'],
  }
})

@Form.create()
export default class AddModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infoVisible: props.showInfoModal,
      jobTypeList: props.jobTypeList,
      employeeIdValue: '',
      nameValue: '',
      birthVale: '',
      addressValue: '',
      levelValue: '',
      identityTypeValue: '',
      identityIdValue: '',
      telValue: '',
      expVisible: false,
      stationId: null,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'expressNetwork/List',
      payload: {
        token: sessionStorage.getItem('sys-token'),
      }
    });

    dispatch({
      type: "infoSafeGuard/getJobType",
      payload: {
        token: sessionStorage.getItem("sys-token")
      },
      callback(res) {

      }
    });
  }

  highSearch = () => {
    if (this.props.showSearch) {
      this.props.showSearch(false)
    }
  };

  handleSearch = (e) => {
    e.preventDefault();
    let searchItem;
    if (this.props.getSearch) {
      searchItem = this.props.getSearch()
    }
    const { page, pageSize } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loading: true });
        // console.log('Received values of form: ', values);
        //分割线
        values.opType = "add";
        values.token = sessionStorage.getItem('sys-token');
        values.stationId = this.state.stationId;
        if (values.departureTime != undefined && values.departureTime != null) {
          values.departureTime = moment(values.departureTime).format("YYYY-MM-DD");
        }
        if (values.entryTime != undefined && values.entryTime != null) {
          values.entryTime = moment(values.entryTime).format("YYYY-MM-DD");
        }
        const { dispatch, infoVisible } = this.props;
        dispatch({
          type: 'infoSafeGuard/AddOrEdit',
          payload: {
            data: values,
          },
          callback: () => {
            this.props.dispatch({
              type: "infoSafeGuard/List",
              payload: {
                ...searchItem,
                page: page,
                pageSize: pageSize,
              },
            });
            if (infoVisible) {
              infoVisible(false)
            }
            message.success("添加成功");
          }
        });
        if (this.props.setSelectedRowKeys) {
          this.props.setSelectedRowKeys()
        }
      }
    });
  };

  handleCancel = () => {
    if (this.props.infoVisible) {
      this.props.infoVisible(false)
    }
  };

  inputHandle = () => {
    this.setState({ expVisible: true })
  };

  setExpVisible = (value, value1) => {
    // console.log("value1",value1);
    this.setState({
      expVisible: value
    });
    if (value1 != undefined && value != null) {
      this.props.form.setFieldsValue({
        stationId: value1.statName,
      });
      this.setState({
        stationId: value1.sid,
      })
    }
  };

  render() {
    const { cameraIdValue, nameValue, birthVale, addressValue, levelValue, identityTypeValue, identityIdValue, telValue, infoVisible, loading } = this.state;
    const { addOrEditLoading, expressList } = this.props;
    const { getFieldDecorator } = this.props.form;
    const companyList = this.props.companyList.map((item) => {
      return <Option key={item.compNo} value={item.compNo}>{item.companyName}</Option>;
    });

    const jobTypeList = this.props.jobTypeList.map((item) => {
      return <Option key={item} value={item}>{item}</Option>;
    });
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    return (
      <div>
        {this.state.expVisible ? <SelectExpree setExpVisible={this.setExpVisible} expVisible={this.state.expVisible} /> : null}
        <Modal
          title="添加从业人员信息"
          visible={infoVisible}
          width={720}
          centered={true}
          destroyOnClose={true}
          maskClosable={true}
          onOk={this.handleSearch}
          onCancel={this.handleCancel}
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
                    label="快递企业代码"
                    {...formItemLayout}
                    style={{ width: "100%" }}
                  >
                    {getFieldDecorator("expressNo", {
                      rules: [{ required: true, message: "请输入快递企业代码" }]
                    })(
                      <Select lassName={styles.formItemWidth} onChange={this.selectOnChange}>
                        <Option key={null} value={null}>全部</Option>
                        {companyList}
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                  <FormItem
                    {...formItemLayout}
                    label="网点编码"
                    style={{ width: "100%" }}
                  >
                    {getFieldDecorator("networkNo", {
                      rules: [{
                        required: true, message: "请输入网点编码!"
                      }]
                    })(
                      <Input
                        style={{ width: "100%" }}
                        placeholder="请输入网点编码"
                      // suffix={addressValue ? <Icon type="close" onClick={this.emptyAddress} /> : null}
                      // onChange={this.addressValueChange}
                      />
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                  <FormItem
                    {...formItemLayout}
                    label="姓名"
                    style={{ width: "100%" }}
                  >
                    {getFieldDecorator("emplName", {
                      rules: [{
                        required: true, message: "请输入姓名!"
                      }]
                    })(
                      <Input
                        style={{ width: "100%" }}
                        placeholder="请输入姓名"
                      // suffix={nameValue ? <Icon type="close" onClick={this.emptyName} /> : null}
                      // onChange={this.nameValueChange}
                      />
                    )}
                  </FormItem>
                </Col>
                <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                  <FormItem
                    {...formItemLayout}
                    label="电话"
                    style={{ width: "100%" }}
                  >
                    {getFieldDecorator("mobile", {
                      rules: [{
                        required: true, message: "请输入电话!"
                      }]
                    })(
                      <Input
                        style={{ width: "100%" }}
                        placeholder="请输入电话"
                      // suffix={addressValue ? <Icon type="close" onClick={this.emptyAddress} /> : null}
                      // onChange={this.addressValueChange}
                      />
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                  <FormItem
                    {...formItemLayout}
                    label="居住地址"
                    style={{ width: "100%" }}
                  >
                    {getFieldDecorator("address", {
                      initialValue: null,
                      rules: [{
                        required: true, message: "请输入居住地址!"
                      }]
                    })(
                      <Input
                        style={{ width: "100%" }}
                        placeholder="请输入居住地址"
                      />
                    )}
                  </FormItem>
                </Col>
                <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                  <FormItem
                    {...formItemLayout}
                    label="证件号码"
                    style={{ width: "100%" }}
                  >
                    {getFieldDecorator("idcard", {
                      rules: [{
                        required: true, message: "请输入证件号码!"
                      }]
                    })(
                      <Input
                        style={{ width: "100%" }}
                        placeholder="请输入证件号码"
                      // suffix={identityIdValue ? <Icon type="close" onClick={this.emptyIdentityId} /> : null}
                      // onChange={this.identityIdValueChange}
                      />
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                  <FormItem
                    {...formItemLayout}
                    label="岗位类型"
                    style={{ width: "100%" }}
                  >
                    {getFieldDecorator("level", {
                      rules: [{
                        required: true, message: "请选择岗位类型"
                      }]
                    })(
                      <Select
                        style={{ width: "100%" }}
                        placeholder="请选择岗位类型"
                      >
                        <Option key={null} value={null}>全部</Option>
                        {jobTypeList}
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col sm={{ span: 24 }} lg={{ span: 12 }}>

                </Col>
              </Row>
            </Form>
          </div>
        </Modal>
      </div>
    )
  }
}

{/*<FormItem*/ }
{/*  label="从业人员编号"*/ }
{/*  {...formItemLayout}*/ }
{/*  style={{ width: "100%" }}*/ }
{/*>*/ }
{/*  {getFieldDecorator("emplNo", {*/ }
{/*    rules: [{ required: true,message:"请输入从业人员编号" }]*/ }
{/*  })(*/ }
{/*    <Input*/ }
{/*      id="employeeId"*/ }
{/*      placeholder="请输入从业人员编号"*/ }
{/*      // value={this.state.nameValue}*/ }
{/*      // suffix={this.state.nameValue ? <Icon type="close" onClick={this.emptyNameValue}/> : null}*/ }
{/*      onChange={this.nameValueChange}*/ }
{/*    />*/ }
{/*  )}*/ }
{/*</FormItem>*/ }