import React, { Component } from "react";
import { Row, Col, Input, Select, InputNumber, Button, Icon, Form } from "antd";
import styles from "./HighSearch.less";
import { connect } from "dva/index";

const FormItem = Form.Item;
const Option = Select.Option;

@connect(({ infoSafeGuard, expressNetwork, loading }) => {
  const { infoSafeList, List } = infoSafeGuard;
  const { expressList } = expressNetwork;
  return {
    expressList,
    searchLoading: loading.effects["infoSafeGuard/List"]
  };
})

@Form.create()
export default class HighSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeIdValue: "",
      nameValue: "",
      birthVale: "",
      addressValue: "",
      levelValue: "",
      identityTypeValue: "",
      identityIdValue: "",
      telValue: ""
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

  nameValueChange = (value) => {
    this.setState({ nameValue: value });
  };


  highSearch = () => {
    // const { dispatch } = this.props;
    // dispatch({
    //   type: "infoSafeGuard/List",
    //   payload: {
    //     token: sessionStorage.getItem("sys-token")
    //   }
    // });
    if (this.props.showSearch) {
      this.props.showSearch(false);
    }
  };


  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log("Received values of form: ", values);
        if(this.props.getHighSearch){
          this.props.getHighSearch(values)
        }
        const { dispatch, showSearch } = this.props;
        values.token = sessionStorage.getItem("sys-token");
        dispatch({
          type: "infoSafeGuard/List",
          payload: {
            page: 1,
            pageSize:10,
            ...values,
          }
        });
      }
    });
  };

  render() {
    const { cameraIdValue, nameValue, birthVale, addressValue, levelValue, identityTypeValue, identityIdValue, telValue } = this.state;
    const { searchLoading, expressList } = this.props;
    const { getFieldDecorator } = this.props.form;
    const children = expressList.map((item) => {
      return <Option key={item.sid} value={item.sid}>{item.statName}</Option>;
    });
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
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
            }}
            >
              <Col span={24}>
                高级搜索
              </Col>
            </Row>
            <FormItem
              {...formItemLayout}
              label="从业人员编号"
            >
              {getFieldDecorator("emplNo", {
                rules: [{
                  required: false, message: "请输入从业人员编号!"
                }]
              })(
                <Input
                  style={{ width: 260 }}
                  placeholder="请输入从业人员编号"
                  // suffix={cameraIdValue ? <Icon type="close" onClick={this.emptyEmployeeId} /> : null}
                  // onChange={this.employeeIdValueChange}
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="姓名"
            >
              {getFieldDecorator("emplName", {
                rules: [{
                  required: false, message: "请输入姓名!"
                }]
              })(
                <Input
                  style={{ width: 260 }}
                  placeholder="请输入姓名"
                  // suffix={nameValue ? <Icon type="close" onClick={this.emptyName} /> : null}
                  // onChange={this.nameValueChange}
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="籍贯"
            >
              {getFieldDecorator("nativePlace", {
                rules: [{
                  required: false, message: "请输入籍贯!"
                }]
              })(
                <Input
                  style={{ width: 260 }}
                  placeholder="请输入籍贯"
                  // suffix={birthVale ? <Icon type="close" onClick={this.emptyBirth} /> : null}
                  // onChange={this.birthValueChange}
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="住址"
            >
              {getFieldDecorator("address", {
                rules: [{
                  required: false, message: "请输入住址!"
                }]
              })(
                <Input
                  style={{ width: 260 }}
                  placeholder="请输入住址"
                  // suffix={addressValue ? <Icon type="close" onClick={this.emptyAddress} /> : null}
                  // onChange={this.addressValueChange}
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="从业资格级别"
            >
              {getFieldDecorator("level", {
                rules: [{
                  required: false, message: "请输入从业资格级别!"
                }]
              })(
                <Input
                  style={{ width: 260 }}
                  placeholder="请输入从业资格级别"
                  // suffix={levelValue ? <Icon type="close" onClick={this.emptyLevel} /> : null}
                  // onChange={this.levelValueChange}
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="身份证件类型"
            >
              {getFieldDecorator("idType", {
                rules: [{
                  required: false, message: "请输入身份证件类型!"
                }]
              })(
                <Input
                  style={{ width: 260 }}
                  placeholder="请输入身份证件类型"
                  // suffix={identityTypeValue ? <Icon type="close" onClick={this.emptyIdentityType} /> : null}
                  // onChange={this.identityTypeValueChange}
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="身份证件编号"
            >
              {getFieldDecorator("cardId", {
                rules: [{
                  required: false, message: "请输入身份证件编号!"
                }]
              })(
                <Input
                  style={{ width: 260 }}
                  placeholder="请输入身份证件编号"
                  // suffix={identityIdValue ? <Icon type="close" onClick={this.emptyIdentityId} /> : null}
                  // onChange={this.identityIdValueChange}
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="联系电话"
            >
              {getFieldDecorator("mobile", {
                rules: [{
                  required: false, message: "请输入联系电话!"
                }]
              })(
                <Input
                  style={{ width: 260 }}
                  placeholder="请输入联系电话"
                  // suffix={telValue ? <Icon type="close" onClick={this.emptyTel} /> : null}
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
                  required: false, message: "请输入归属网点!"
                }]
              })(
                <Select  style={{ width: 260 }}>
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