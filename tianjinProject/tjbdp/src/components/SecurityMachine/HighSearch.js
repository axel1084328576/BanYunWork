import React, { Component } from "react";
import { Row, Col, Input, Select, InputNumber, Button, Icon, Form } from "antd";
import { connect } from "dva";
import styles from "./HighSearch.less";

const FormItem = Form.Item;
const Option = Select.Option;

@connect(({ replayCheck, loading, expressNetwork }) => {
  const { checkList } = replayCheck;
  const { expressList } = expressNetwork;
  return {
    checkList,
    expressList,
    listLoading: loading.effects["replayCheck/List"]
  };
})

@Form.create()
export default class HighSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scId: "",
      longitudeValue: "",
      latitudeValue: "",
      address: "",
      contact: "",
      tel: ""
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: "expressNetwork/List",
      payload: {
        token: sessionStorage.getItem("sys-token")
      }
    });
  }

  emptyLongitude = () => {
    this.setState({ longitudeValue: "" });
  };

  longitudeValueChange = (value) => {
    this.setState({ longitudeValue: value });
  };

  emptyLatitude = () => {
    this.setState({ latitudeValue: "" });
  };

  latitudeValueChange = (value) => {
    this.setState({ latitudeValue: value });
  };

  emptyScId = () => {
    this.setState({ scId: "" });
  };

  scIdValueChange = (value) => {
    this.setState({ scId: value });
  };

  numberValueChange = (value) => {
    // console.log("changed", value);
  };

  highSearch = () => {
    // const { dispatch } = this.props;
    // dispatch({
    //   type: "replayCheck/replayList",
    //   payload: {
    //     token: sessionStorage.getItem("sys-token")
    //   }
    // });
    if (this.props.showSearch) {
      this.props.showSearch(false);
    }
  };

  positionChange = (value) => {
    // console.log(`selected ${value}`);
  };

  manufactorChange = (value) => {
    // console.log(`selected ${value}`);
  };

  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if(this.props.getHighSearch){
          this.props.getHighSearch(values)
        }
        // console.log("Received values of form:", values);
        const { dispatch } = this.props;
        values.token = sessionStorage.getItem("sys-token");
        dispatch({
          type: "replayCheck/List",
          payload: {
            page: 1,
            pageSize:10,
            ...values
          }
        });
      }
    });
  };

  render() {
    const { idValue, scId, longitudeValue, latitudeValue, address, contact, tel } = this.state;
    const { listLoading, rowData, expressList } = this.props;
    const children = expressList.map((item) => {
      return <Option key={item.sid} value={item.sid}>{item.statName}</Option>;
    });
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      }
    };
    return (
      <Row type="flex" justify="center" style={{ marginBottom: 14 }}>
        <div className={styles.wrap}>
          <Form onSubmit={this.handleSearch}>
            <Row style={{
              borderBottom: "2px solid #fafafa",
              textAlign: "center",
              marginBottom: "12px",
              padding: "8px",
              fontSize: "18px"
            }}>
              <Col span={24}>
                高级搜索
              </Col>
            </Row>
            <FormItem
              {...formItemLayout}
              label="安检机编号"
            >
              {getFieldDecorator("machNo", {
                rules: [{
                  required: false, message: "请输入安检机编号!"
                }]
              })(
                <Input
                  style={{ width: 260 }}
                  placeholder="请输入安检机编号"
                  // suffix={ scId ? <Icon type="close" onClick={this.emptyScId} /> : null}
                  // onChange={this.scIdValueChange}
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="经度"
            >
              {getFieldDecorator("longitude", {
                rules: [{
                  required: false, message: "请输入经度!"
                }]
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
              {getFieldDecorator("latitude", {
                rules: [{
                  required: false, message: "请输入纬度!"
                }]
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
              label="安检机厂家"
            >
              {getFieldDecorator("producter", {
                rules: [{
                  required: false, message: "请选择安检机厂家"
                }]
              })(
                <Select
                  style={{ width: 260 }}
                  allowClear={true}
                  onChange={this.manufactorChange}
                  placeholder="请选择安检机厂家"
                >
                  <Option value="杭州机械制造厂">杭州机械制造厂</Option>
                  <Option value="厦门机械制造厂">厦门机械制造厂</Option>
                  <Option value="福州机械制造厂">福州机械制造厂</Option>
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="安检数量"
            >
              {getFieldDecorator("amount", {
                rules: [{
                  required: false, message: "请输入安检数量"
                }]
              })(
                <InputNumber
                  style={{ width: 260 }}
                  min={1}
                  max={10}
                  onChange={this.numberValueChange}
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="地址"
            >
              {getFieldDecorator("address", {
                rules: [{
                  required: true, message: "请输入地址!"
                }]
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
              label="联系人"
            >
              {getFieldDecorator("contact", {
                rules: [{
                  required: false, message: "请输入联系人!"
                }]
              })(
                <Input
                  style={{ width: 260 }}
                  placeholder="请输入联系人"
                  // suffix={contact? <Icon type="close" onClick={this.emptyContact} /> : null}
                  // onChange={this.contactValueChangec }
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="联系电话"
            >
              {getFieldDecorator("tel", {
                rules: [{
                  required: false, message: "请输入联系电话!"
                }]
              })(
                <Input
                  style={{ width: 260 }}
                  placeholder="请输入联系电话"
                  // suffix={tel? <Icon type="close" onClick={this.emptyTel} /> : null}
                  // onChange={this.telValueChange}
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="归属网点"
            >
              {getFieldDecorator("stationId", {
                rules: [{
                  required: true, message: "请输入归属网点!"
                }]
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
    );
  }
}