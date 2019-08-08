import React, { Component } from "react";
import { Modal, Form, Button, Input, Icon, message, Switch, Select } from "antd";
import styles from "./Unifor.less";
import { connect } from "dva/index";

@connect(({ menusmanage, loading }) => {
  return {
    addOrEditLoading: loading.effects["menusmanage/AddOrEdit"]
  };
})

@Form.create()
export default class EditModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editVisible: props.EditData.editVisible,
      nameEditValue: "",
      sortEditValue: "",
      codeEditValue: "",
      urlEditValue: "",
      iconEditValue: ""
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

  urlValueChange = (value) => {
    this.setState({ urlEditValue: value.target.value });
  };

  iconValueChange = (value) => {
    this.setState({ iconEditValue: value.target.value });
  };

  emptySort = () => {
    this.setState({ sortEditValue: "" });
  };

  sortValueChangec = (value) => {
    this.setState({ sortEditValue: value.target.value });
  };

  handleSearch = (e) => {
    const { dispatch, menusEditVisible, EditData, selectKeys } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log("Received values of form: ", values);
        values.opType = "mod";
        values.sid = EditData.rowData.sid;
        values.pid = selectKeys;
        values.token = sessionStorage.getItem("sys-token");
        dispatch({
          type: "menusmanage/AddOrEdit",
          payload: values,
          callback: () => {
            dispatch({
              type: 'dynamicmenu/getDynamicmenu',
            });
            if (menusEditVisible) {
              menusEditVisible(false);
            }
            message.success("修改成功");
            // 请求动态菜单
          }
        });
        if(this.props.setSelectedRowKeys){
          this.props.setSelectedRowKeys()
        }
      }
    });
  };

  handleEditCancel = () => {
    if (this.props.menusEditVisible) {
      this.props.menusEditVisible(false);
    }
  };

  render() {
    const { EditData } = this.props;
    const { editVisible, sortEditValue, nameEditValue, codeEditValue } = this.state;
    const FormItem = Form.Item;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 9 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      }
    };
    return (
      <Modal
        title="修改菜单信息"
        visible={editVisible}
        maskClosable={false}
        onCancel={this.handleEditCancel}
        footer={[
          <Button key="back" onClick={this.handleEditCancel}>取消</Button>,
          <Button key="submit" type="primary" loading={EditData.addOrEditLoading} onClick={this.handleSearch}>
            确定
          </Button>
        ]}
      >
        <div className={styles.wrap}>
          <Form onSubmit={this.handleSearch}>
            <FormItem
              {...formItemLayout}
              label="名称"
            >
              {getFieldDecorator("menuName", {
                initialValue: EditData.rowData.menuName,
                rules: [{
                  required: false, message: "请输入名称!"
                }]
              })(
                <Input
                  className={styles.formItemWidth1}
                  placeholder="请输入名称"
                  // suffix={nameEditValue ? <Icon type="close" onClick={this.emptyName} /> : null}
                  // onChange={this.nameValueChange}
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="编码"
            >
              {getFieldDecorator("menuCode", {
                initialValue: EditData.rowData.menuCode,
                rules: [{
                  required: false, message: "请输入编码!"
                }]
              })(
                <Input
                  className={styles.formItemWidth1}
                  placeholder="请输入编码!"
                  // suffix={codeEditValue ? <Icon type="close" onClick={this.emptyCode} /> : null}
                  // onChange={this.codeValueChange}
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="菜单"
            >
              {getFieldDecorator("menuType", {
                initialValue: EditData.rowData.menuType,
                rules: [{
                  required: false, message: "请选择菜单/功能!"
                }]
              })(
                <Select className={styles.formItemWidth1}>
                  <Select.Option value="菜单">菜单</Select.Option>
                  <Select.Option value="功能">功能</Select.Option>
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="地址"
            >
              {getFieldDecorator("url", {
                initialValue: EditData.rowData.url,
                rules: [{
                  required: false
                }]
              })(
                <Input
                  className={styles.formItemWidth1}
                  placeholder="请输入地址"
                  // suffix={nameEditValue ? <Icon type="close" onClick={this.emptyName} /> : null}
                  // onChange={this.urlValueChange}
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="图标"
            >
              {getFieldDecorator("icon", {
                initialValue: EditData.rowData.icon,
                rules: [{
                  required: false
                }]
              })(
                <Input
                  className={styles.formItemWidth1}
                  placeholder="请输入图标"
                  // suffix={nameEditValue ? <Icon type="close" onClick={this.emptyName} /> : null}
                  // onChange={this.iconValueChange}
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="是否显示"
            >
              {getFieldDecorator("showFlag", {
                initialValue: EditData.rowData.showFlag,
                rules: [{
                  required: false, message: "请输入是否显示"
                }]
              })(
                <Select className={styles.formItemWidth1}>
                  <Select.Option value="1">显示</Select.Option>
                  <Select.Option value="0">不显示</Select.Option>
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="排序"
            >
              {getFieldDecorator("menuOrder", {
                initialValue: EditData.rowData.menuOrder,
                rules: [{
                  required: false, message: "请输入排序"
                }]
              })(
                <Input
                  className={styles.formItemWidth1}
                  placeholder="请输入排序"
                  // suffix={sortEditValue  ? <Icon type="close" onClick={this.emptySort} /> : null}
                  // onChange={this.sortValueChangec}
                />
              )}
            </FormItem>
          </Form>
        </div>
      </Modal>
    );
  }
}