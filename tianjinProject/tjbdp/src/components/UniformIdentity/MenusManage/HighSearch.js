import React, { Component } from "react";
import { Modal, Form, Button, Input, Icon, message, Row, Col, Switch, Select } from "antd";
import styles from "./Unifor.less";
import { connect } from "dva/index";

@connect(({ menusmanage, loading }) => {
  return {
    listLoading: loading.effects["menusmanage/List"]
  };
})

@Form.create()
export default class EditModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nameEditValue: "",
      sortEditValue: "",
      codeEditValue: ""
    };
  }

  emptyCode = () => {
    this.setState({ codeEditValue: "" });
  };

  codeValueChange = (value) => {
    this.setState({ codeEditValue: value.target.value });
  };

  emptyName = () => {
    this.setState({ nameEditValue: "" });
  };

  nameValueChange = (value) => {
    this.setState({ nameEditValue: value.target.value });
  };

  emptySort = () => {
    this.setState({ sortEditValue: "" });
  };

  sortValueChangec = (value) => {
    this.setState({ sortEditValue: value.target.value });
  };

  handleSearch = (e) => {
    const { dispatch, menusAddVisible } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if(this.props.getHighSearch){
          this.props.getHighSearch(values)
        }
        // console.log("Received values of form: ", values);
        values.opType = "add";
        values.token = sessionStorage.getItem("sys-token");
        dispatch({
          type: "menusmanage/List",
          payload: {
            page: 1,
            pageSize:10,
            ...values,
          },
          callback: () => {
            if (menusAddVisible) {
              menusAddVisible(false);
            }
            message.success("添加成功");
          }
        });
        if (this.props.showSearch) {
          this.props.showSearch(false);
        }
      }
    });
  };

  handleEditCancel = () => {
    if (this.props.menusAddVisible) {
      this.props.menusAddVisible(false);
    }
  };

  highSearch = () => {
    // const { dispatch } = this.props;
    // dispatch({
    //   type: "menusmanage/List",
    //   payload: {
    //     token: sessionStorage.getItem("sys-token")
    //   }
    // });
    if (this.props.showSearch) {
      this.props.showSearch(false);
    }
  };

  render() {
    const { AddData, listLoading } = this.props;
    const { sortEditValue, nameEditValue, codeEditValue } = this.state;
    const FormItem = Form.Item;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
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
              label="名称"
            >
              {getFieldDecorator("menuName", {
                rules: [{
                  required: false, message: "请输入名称!"
                }]
              })(
                <Input
                  style={{ width: 260 }}
                  placeholder="请输入名称"
                  // suffix={nameEditValue ? <Icon type="close" onClick={this.emptyName} /> : null}
                  onChange={this.nameValueChange}
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="编码"
            >
              {getFieldDecorator("menuCode", {
                rules: [{
                  required: false, message: "请输入编码!"
                }]
              })(
                <Input
                  style={{ width: 260 }}
                  placeholder="请输入编码!"
                  // suffix={codeEditValue ? <Icon type="close" onClick={this.emptyCode} /> : null}
                  onChange={this.codeValueChange}
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="菜单"
            >
              {getFieldDecorator("menuType", {
                rules: [{
                  required: false, message: "请选择菜单/功能!"
                }]
              })(
                <Select defaultValue="菜单" style={{ width: 260 }}>
                  <Option value="菜单">菜单</Option>
                  <Option value="功能">功能</Option>
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="地址"
            >
              {getFieldDecorator("url", {
                rules: [{
                  required: false
                }]
              })(
                <Input
                  style={{ width: 260 }}
                  placeholder="请输入地址"
                  // suffix={nameEditValue ? <Icon type="close" onClick={this.emptyName} /> : null}
                  onChange={this.urlValueChange}
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="图标"
            >
              {getFieldDecorator("icon", {
                rules: [{
                  required: false
                }]
              })(
                <Input
                  style={{ width: 260 }}
                  placeholder="请输入图标"
                  // suffix={nameEditValue ? <Icon type="close" onClick={this.emptyName} /> : null}
                  onChange={this.iconValueChange}
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="是否显示"
            >
              {getFieldDecorator("showFlag", {
                rules: [{
                  required: false, message: "请输入是否显示"
                }]
              })(
                <Select defaultValue="1" style={{ width: 260 }}>
                  <Option value="1">显示</Option>
                  <Option value="0">不显示</Option>
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="排序"
            >
              {getFieldDecorator("menuOrder", {
                rules: [{
                  required: false, message: "请输入排序"
                }]
              })(
                <Input
                  style={{ width: 260 }}
                  placeholder="请输入排序"
                  // suffix={sortEditValue  ? <Icon type="close" onClick={this.emptySort} /> : null}
                  onChange={this.sortValueChangec}
                />
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