import React,{Component} from 'react';
import {Button, Input,Form, Icon, Row, Col, Popconfirm, Modal} from 'antd';
import styles from './RoleSearchOrAdd.less';
import { connect } from "dva/index";

const FormItem = Form.Item;
const {TextArea} = Input;

@Form.create()
class RoleSearchOrAdd extends Component{
  constructor(props){
    super(props);
    this.state={
      nameValue:'',
    }
  }

  componentDidMount(){
    if(this.props.getValue){
      this.props.getValue({roleName:this.state.nameValue})
    }
  }

  nameValueChange = (e) => {
    this.setState({nameValue:e.target.value});
  }

  emptyNameValue = () => {
    this.setState({nameValue:''});

    const {pageSize,dispatch} = this.props;
    dispatch({
      type:'rolemanage/getRoles',
      payload:{
        pageSize:pageSize,
        current:1,
      },
    });
  };

  partDelete = () => {
    const {selectedRowKeys}=this.state;
    this.props.dispatch({
      type:'rolemanage/deletePartRoles',
      payload:{
        ids:selectedRowKeys.join(','),
        opType:'del',
        token:sessionStorage.getItem('sys-token')
      },
    });
    if(this.props.setSelectedRowKeys){
      this.props.setSelectedRowKeys()
    }
  };

  searchRole=()=>{
    const {nameValue} = this.state;
    const {dispatch,pageSize} = this.props;
    dispatch({
      type:'rolemanage/searchRole',
      payload:{
        roleName:nameValue,
        pageSize:10,
        page:1,
      },
    });
    if(this.props.setSelectedRowKeys){
      this.props.setSelectedRowKeys()
    }
  };

  openAddModal = () => {
    const form = this.props.form;

    form.setFieldsValue({
      name: '',
      order: '',
      comments: '',
    });

    this.props.dispatch({
      type:'rolemanage/setAddModalVisible',
      payload:{
        addModalVisible:true,
      }
    });
  };

  addRole = () => {
    const form = this.props.form;
    form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type:'rolemanage/addRole',
          payload:{
            roleName: values.name,
            roleOrder: parseInt(values.order),
            roleNote: values.comments,
          },
        });
        if(this.props.setSelectedRowKeys){
          this.props.setSelectedRowKeys()
        }
      }
    });
  };

  cancelAddRole = () => {
    this.props.dispatch({
      type:'rolemanage/setAddModalVisible',
      payload:{
        addModalVisible:false,
      }
    })
  };

  render(){
    const {
      addModalVisible,
      selectedRowKeys,
      searchLoading,
      partDeleteLoading,
      addBtnLoading,
    } = this.props;

    const formItemLayout = {
      labelCol: {
        span:6,
        offset:1,
      },
      wrapperCol: {
        span:16,
      },
    };
    const { getFieldDecorator } = this.props.form;
    const addModalForm=(
      <Modal
        confirmLoading={addBtnLoading}
        title="添加角色信息"
        visible={addModalVisible}
        onOk={this.addRole}
        onCancel={this.cancelAddRole}
      >
        <Form>
          <FormItem {...formItemLayout} label="角色名称">
            {getFieldDecorator('name', {
              rules: [{
                required: true,
                message: '角色名称不能为空！',
              }],
            })(
              <Input placeholder="请输入角色名称" />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="角色排序">
            {getFieldDecorator('order', {
              rules: [{
                required: true,
                message: '角色排序不能为空！',
              }],
            })(
              <Input placeholder="请输入角色排序" />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="备注">
            {getFieldDecorator('comments', {

            })(
              <TextArea row={4} placeholder="请输入角色备注" />
            )}
          </FormItem>
        </Form>
      </Modal>
    );
    const formItemLayout1 = {
      labelCol: {
        sm: { span: 24 },
        md: { span: 24 },
        lg: { span: 8 },
        xl: { span: 5 }
      },
      wrapperCol: {
        sm: { span: 24 },
        md: { span: 24 },
        lg: { span: 15 },
        xl: { span: 18 }
      }
    };
    const mainSearchOrAdd=(
      <div className={styles.searchRow}>
        <Form layout="inline">
          <Row>
            <Col sm={{ span: 24 }} lg={{ span: 8 }}>
              <FormItem
                label="角色名称"
                {...formItemLayout1}
                style={{ width: "100%" }}
              >
                {getFieldDecorator("roleName", {
                  rules: [{ required: false }]
                })(
                  <Input
                    className={styles.formItemWidth1}
                    placeholder="请输入用户名称"
                    // value={this.state.nameValue}
                    // suffix={this.state.nameValue ? <Icon type="close" onClick={this.emptyNameValue} /> : null}
                    onChange={this.nameValueChange}
                  />
                )}
              </FormItem>
            </Col>
            <Col xs={{ span: 12 }} sm={{ span: 12 }} lg={{ span: 8 }}>
              <span className={styles.unSpan}>
                  <Button
                    loading={searchLoading}
                    onClick={this.searchRole}
                    type="primary"
                    icon="search"
                  >
                    搜索
                  </Button>
                </span>
            </Col>
            <Col xs={{ span: 12 }} sm={{ span: 12 }} lg={{ span: 8 }}>
              <Row type="flex" justify="end">
                <span className={styles.unSpan1}>
                  {
                    this.props.controlList.role_del?
                      (selectedRowKeys.length > 0 ?
                        <Popconfirm
                          okText="确定"
                          cancelText="取消"
                          title="是否要删除选中的角色信息?"
                          placement="bottomRight"
                          onConfirm={this.partDelete}
                        >
                          <Button
                            className={styles.allDelete}
                            type="primary"
                            loading={partDeleteLoading}
                          >
                            删除
                          </Button>
                        </Popconfirm>
                        :
                        null):null
                  }
                  {this.props.controlList.role_add?<Button
                    type="primary"
                    icon="plus"
                    onClick={this.openAddModal}
                    style={{ marginLeft: 10 }}
                  >
                    添加
                  </Button>:null}

                </span>
              </Row>
            </Col>
          </Row>
        </Form>
      </div>
    );

    return(
      <div className={styles.header}>
        {addModalForm}
        {mainSearchOrAdd}
      </div>
    );
  }
}

export default RoleSearchOrAdd;
