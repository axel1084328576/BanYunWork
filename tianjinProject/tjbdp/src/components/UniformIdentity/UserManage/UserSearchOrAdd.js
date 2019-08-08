import React,{Component} from 'react';
import {Button, Input, Select,Switch, TreeSelect, Form,
  Icon, Row, Col,Radio, Popconfirm, Modal} from 'antd';
import UserHighSearch from './UserHighSearch';
import styles from './UserSearchOrAdd.less';
import { connect } from "dva/index";

const FormItem = Form.Item;
const {Option} = Select;
const TreeNode = TreeSelect.TreeNode;
const TextArea = Input.TextArea;
const RadioGroup = Radio.Group;
const userType = [{
  label:'管理员',
  value:'1',
},{
  label:'普通用户',
  value:'2',
}];

@Form.create()
class UserSearchOrAdd extends Component{
  constructor(props){
    super(props);
    this.state={
      nameValue:'',
      openHighSearch:false,
    }
  }

  componentDidMount(){
    const form = this.props.form;
    form.validateFields((err, values) => {
      if(this.props.getValues){
        this.props.getValues({chnName:this.state.nameValue})
      }
    })
  }

  nameValueChange = (e) => {
    this.setState({nameValue:e.target.value});
  };

  emptyNameValue = () => {
    this.setState({nameValue:''});
    const {dispatch,pageSize} = this.props;
    this.props.dispatch({
      type:'usermanage/getUserData',
      payload:{
        page:1,
        pageSize:pageSize,
      }
    });
  }

  partDelete = () => {
    const {selectedRowKeys}=this.props;
    this.props.dispatch({
      type:'usermanage/deletePartUser',
      payload:{
        userIds:selectedRowKeys.join(','),
        opType:'del',
        token:sessionStorage.getItem('sys-token')
      },
    });
    if(this.props.setSelectedRowKeys){
      this.props.setSelectedRowKeys()
    }
  };

  openHighSearch = () => {
    this.setState({nameValue:''});
    this.props.dispatch({
      type:"usermanage/setShowHighSearch",
      payload:{
        showHighSearch:true,
      }
    });
  };

  openAddModal = () => {
    const form = this.props.form;

    form.setFieldsValue({
      name: '',
      account: '',
      password: '',
      description: '',
      organization: this.props.selectOrganizationKeys[0],
      islock: false,
      stype: '2',
    });

    this.props.dispatch({
      type:'usermanage/setAddModalVisible',
      payload:{
        addModalVisible:true,
      }
    });
  }

  addUser = () => {
    const form = this.props.form;
    form.validateFields((err, values) => {
      if(values.islock==true){
        values.islock=0
      }else if(values.islock==false){
        values.islock=1
      }
      if (!err) {
        this.props.dispatch({
          type:'usermanage/addUser',
          payload:{
            chnName: values.name,
            userName: values.account,
            description: values.description,
            password: values.password,
            orgId: values.organization,
            stype: values.stype,
            islock: values.islock,
          },
        });
        if(this.props.setSelectedRowKeys){
          this.props.setSelectedRowKeys()
        }
      }
    });
  };

  simpleSearch = () => {
    const {nameValue} = this.state;
    const {pageSize,dispatch} = this.props;
    const form = this.props.form;
    form.validateFields((err, values) => {
      // console.log("values",values);
      let value={};
      this.state.openHighSearch?value={
        chnName: values.chnName,
        userName: values.userName,
        description: values.description,
        orgId: values.orgId,
      }:value={
        chnName: values.chnName,
      };

      if(this.props.getValues){
        this.props.getValues(value)
      }
      dispatch({
        type:'usermanage/simpleSearchUser',
        payload:{
          pageSize:10,
          page:1,
          ...value,
          token:sessionStorage.getItem('sys-token'),
        }
      })
      if(this.props.setSelectedRowKeys){
        this.props.setSelectedRowKeys()
      }
    })
  };

  cancelAddUser = () => {
    this.props.dispatch({
      type:'usermanage/setAddModalVisible',
      payload:{
        addModalVisible:false,
      }
    })
  }

  hanldeHighSearch = () => {
    this.setState({
      openHighSearch:!this.state.openHighSearch
    })
  };


  render(){

    const formItemLayout = {
      labelCol: {
        span:6,
        offset:1,
      },
      wrapperCol: {
        span:16,
      },
    };
    const {
      organizationTree,
      userData,
      roleSelect,
      addModalVisible,
      showHighSearch,
      addBtnLoading,
      partDeleteLoading,
      highSearchLoading,
      simpleSearchLoading,
      pageSize,
      dispatch
    } = this.props;

    const { getFieldDecorator } = this.props.form;
    const addModalForm=(
      <Modal
        confirmLoading={addBtnLoading}
        title="添加用户信息"
        visible={addModalVisible}
        onOk={this.addUser}
        onCancel={this.cancelAddUser}
      >
        <Form>
          <FormItem {...formItemLayout} label="用户名称">
            {getFieldDecorator('name', {
              rules: [{
                required: true,
                message: '用户名称不能为空！',
              }],
            })(
              <Input placeholder="请输入用户名称" />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="用户账号">
            {getFieldDecorator('account', {
              rules: [{
                required: true,
                message: '用户账号不能为空！',
              }],
            })(
              <Input placeholder="请输入用户账号" />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="用户密码">
            {getFieldDecorator('password', {
              rules: [{
                min:6,
                message:'账号密码至少6位',
              },{
                max:24,
                message:'账号密码最多24位',
              }]
            })(
              <Input placeholder="请输入账号密码" />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="用户描述">
            {getFieldDecorator('description', {

            })(
              <TextArea row={3} placeholder="请输入用户描述" />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="组织单元">
            {getFieldDecorator('organization', {
              rules: [{
                required: true,
                message: '组织单元不能为空！',
              }],
            })(
              <TreeSelect
                dropdownStyle={{maxHeight:'200px'}}
                allowClear={true}
                treeDefaultExpandAll
                treeData={organizationTree}
                placeholder="请选择组织单元"
              />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="用户身份">
            {getFieldDecorator('stype', {
              rules:[{
                required:true,
                message: '用户身份不能为空!',
              }],
            })(
              <RadioGroup options={userType} />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="锁定">
            {getFieldDecorator('islock', {
              valuePropName: 'checked',
            })(
              <Switch
                checkedChildren="解锁"
                unCheckedChildren="锁定"
              />
            )}
          </FormItem>
        </Form>
      </Modal>
    );

    const highSearchProps={
      roleSelect,
      dispatch,
      showHighSearch,
      highSearchLoading,
      organizationTree,
      pageSize,
    };

    const HighSearch=(<UserHighSearch {...highSearchProps} />);

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

    const isLockRadio=[{
      label:'已锁定',
      value:true,
    },{
      label:'未锁定',
      value:false,
    }];

    const mainSearchOrAdd=(
      <div className={styles.searchRow}>
        <Form layout="inline">
          <Row>
            <Col sm={{ span: 24 }} lg={{ span: 6 }}>
              <FormItem
                label="用户名称"
                {...formItemLayout1}
                style={{ width: "100%" }}
              >
                {getFieldDecorator("chnName", {
                  rules: [{
                    required: false,
                  }],
                })(
                  <Input
                    style={{ width: "100%" }}
                    placeholder="请输入用户名称"
                    // value={this.state.nameValue}
                    // suffix={this.state.nameValue ? <Icon type="close" onClick={this.emptyNameValue} /> : null}
                    onChange={this.nameValueChange}
                  />
                )}
              </FormItem>
            </Col>
            <Col xs={{ span: 12 }} sm={{ span: 12 }} lg={{ span: 6 }}>
              <span className={styles.unSpan}>
                  <a onClick={this.hanldeHighSearch} style={{ marginRight: 20 }}>{this.state.openHighSearch?"收起":"展开"}</a>
                  <Button
                    loading={simpleSearchLoading}
                    onClick={this.simpleSearch}
                    type="primary"
                    icon="search"
                  >
                    搜索
                  </Button>
                  {/*<a onClick={this.openHighSearch} style={{ marginLeft: 20 }}>高级搜索</a>*/}
              </span>
            </Col>
            <Col xs={{ span: 12 }} sm={{ span: 12 }} lg={{ offset:6,span: 6 }}>
              <Row type="flex" justify="end">
                <span className={styles.unSpan}>
                  {
                    this.props.controlList.user_del?
                      (this.props.selectedRowKeys.length > 0 ?
                        <Popconfirm
                          okText="确定"
                          cancelText="取消"
                          title="是否要删除选中的用户信息?"
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
                        </Popconfirm>:null):null
                  }
                  {this.props.controlList.user_add? <Button
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
          {this.state.openHighSearch?<Row>
            <Row>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <FormItem {...formItemLayout1} label="用户账号" style={{ width: "100%" }}>
                  {getFieldDecorator('userName', {
                    rules: [{
                      required: false,
                    }],
                  })(
                    <Input placeholder="请输入用户账号"  onChange={this.account} style={{ width: "100%" }}/>
                  )}
                </FormItem>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <FormItem {...formItemLayout1} label="用户描述" style={{ width: "100%" }}>
                  {getFieldDecorator('description', {
                    rules: [{
                      required: false,
                    }],
                  })(
                    <Input placeholder="请输入用户描述"  style={{ width: "100%" }}/>
                  )}
                </FormItem>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <FormItem
                  {...formItemLayout1}
                  label="组织"
                  style={{ width: "100%" }}
                >
                  {getFieldDecorator('orgId',{
                    rules: [{
                      required: false,
                    }],
                  })(
                    <Input
                      style={{ width: "100%" }}
                      placeholder="请输入组织"
                      // suffix={dotAddressValue ? <Icon type="close" onClick={this.emptyDotAddress} /> : null}
                      // onChange={this.dotAddressValueChange}
                    />
                  )}
                </FormItem>
              </Col>
            </Row>
          </Row>:null}
        </Form>
      </div>
    );

    return(
      <div className={styles.header}>
        {addModalForm}
        {!showHighSearch ? mainSearchOrAdd : HighSearch}
      </div>
    );
  }
}

export default UserSearchOrAdd;
