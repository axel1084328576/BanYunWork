import React from 'react';
import { Table, Input, Popconfirm, Form, Modal,
  Card,Switch,Select,TreeSelect, Divider,
  Radio,Button,Checkbox,Spin} from 'antd';
import styles from './UserEditTable.less';
import { connect } from "dva/index";

const {Option} = Select;
const FormItem = Form.Item;
const {TextArea} = Input;
const {TreeNode} = TreeSelect;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

const userType = [{
  label:'管理员',
  value:'1',
},{
  label:'普通用户',
  value:'2',
}];

@connect(({ usermanage,loading}) => {
  const {chnName,highValue,arr}=usermanage;
  return{
    chnName,highValue,arr,
    loading: loading.effects['usermanage/roleMenus'],
  }
})

@Form.create()
class UserEditTable extends React.Component {
  state={
    modifykey:'',
    authoritykey: '',
    roleValues: [],
    isDisable: false,
    defaultRole:[],
    show:false,
    arr:this.props.arr
  };


  // setValue=()=>{
  //   this.setState({
  //     selectedRowKeys:[]
  //   })
  // };

  delete = (key) => {
    this.props.dispatch({
      type:'usermanage/deleteUser',
      payload:{
        key,
      }
    });
    if(this.props.setSelectedRowKeys){
      this.props.setSelectedRowKeys()
    }
  };

  resetPassword = (key) =>{
    this.props.dispatch({
      type:'usermanage/resetPassword',
      payload:{
        userId:key,
      }
    })
    if(this.props.setSelectedRowKeys){
      this.props.setSelectedRowKeys()
    }
  };

  openModifyModal = (payload) => {
    const form = this.props.form;
    this.setState({
      modifykey:payload.key,
    });

    form.setFieldsValue({
      mname: payload.name,
      mdescription: payload.description,
      morgId: payload.orgId,
      mstype: payload.stype,
      mislock: payload.islock,
      account:payload.account,
    });

    this.props.dispatch({
      type:'usermanage/setModifyModalVisible',
      payload:{
        modifyModalVisible:true,
      }
    });
  }

  modifyUser = (key) => {
    const form = this.props.form;
    form.validateFields((err, values) => {
      // console.log("values",values);
      if (!err) {
        if(values.mislock==true){
          values.mislock=0
        }else if(values.mislock==false){
          values.mislock=1
        }
        this.props.dispatch({
          type:'usermanage/modifyUser',
          payload:{
            sid: key,
            description: values.mdescription,
            chnName: values.mname,
            password: typeof values.mpassword !== 'undefined' ? values.mpassword : undefined,
            orgId: values.morgId,
            stype: values.mstype,
            islock: values.mislock,
          },
        });
        if(this.props.setSelectedRowKeys){
          this.props.setSelectedRowKeys()
        }
      }
    });
  }

  cancelModifyUser = () => {
    this.setState({modifykey:''});
    this.props.dispatch({
      type:'usermanage/setModifyModalVisible',
      payload:{
        modifyModalVisible:false,
      }
    });
  }

  // 用户角色
  openAuthority = (e,record) => {
    // console.log("record",record);
    this.setState({authoritykey: record.key});
    const {dispatch} = this.props;
    setTimeout(()=>{
      dispatch({
        type:'usermanage/setAuthorityModalVisible',
        payload:{
          roleValues: [record.role],
        }
      });
    },500);
    dispatch({
      type:'usermanage/roleMenus',
      payload:{
        userId:record.key
      },
      callback:(arr)=>{
        this.setState({
          arr:arr
        })
      }
    });
    this.setState({isDisable:true})
  };

  changeRoleValues = (checkedValue)=>{
    this.setState({
      arr:checkedValue,
    });
  };

  setAuthority = () => {
    const {dispatch} = this.props;
    const {authoritykey,arr} = this.state;
    // console.log("arr",arr);
    dispatch({
      type:'usermanage/setUserAuthority',
      payload:{
        userId: authoritykey,
        roleIds: arr.join(','),
      }
    });
  }

  cancelModifyAuthority = () => {
    this.changeRoleValues([]);
    this.setState({isDisable:false})
  };

  // 表格分页切换
  tableOnShowSizeChange=(page, pageSize)=>{
      this.props.dispatch({
        type:'usermanage/getUserData',
        payload:{
          page,
          pageSize,
          ...this.props.values,
        }
      });
      if(this.props.setSelectedRowKeys){
        this.props.setSelectedRowKeys()
      }
  };

  tableOnChange=(current, size)=>{
      this.props.dispatch({
        type:'usermanage/getUserData',
        payload:{
          page:current,
          pageSize:size,
          ...this.props.values,
        }
      });
      if(this.props.setSelectedRowKeys){
        this.props.setSelectedRowKeys()
      }
  };

  selectRow = (record) => {
    const selectedRowKeys = [...this.props.selectedRowKeys];
    if (selectedRowKeys.indexOf(record.key) >= 0) {
      selectedRowKeys.splice(selectedRowKeys.indexOf(record.key), 1);
    } else {
      selectedRowKeys.push(record.key);
    }
    if(this.props.setValue){
      this.props.setValue(selectedRowKeys)
    }
  }
  onSelectedRowKeysChange = (selectedRowKeys) => {
    if(this.props.setValue){
      this.props.setValue(selectedRowKeys)
    }
  }

  render() {
    // const {selectedRowKeys}=this.state;
    const {
      authorityModalVisible,
      modifyBtnLoading,
      organizationTree,
      roleSelect,
      selectedRowKeys,
      authorityBtnLoading,
      modifyModalVisible,
      tableLoading,
      userData,
      pageSize,
      current,
      total,
      dispatch,
      value
    } = this.props;


    const columns = [
      {
        title: '用户名称',
        dataIndex: 'name',
        // sorter: (a, b) => a.name.length - b.name.length,
      },
      {
        title: '用户账号',
        dataIndex: 'account',
      },
      {
        title: '用户描述',
        dataIndex: 'description',
      },
      {
        title: '组织',
        dataIndex: 'orgId',
      },
      {
        title: '角色',
        dataIndex: 'role',
        render:(text,record)=>{
          return (
            <span>
              {this.props.controlList.user_auz?<a onClick={(e)=>{this.openAuthority(e,record);}}>授权</a>:null}
            </span>
          );
        }
      },
      {
        title: '锁定',
        dataIndex: 'islock',
        render: text=>text? "是":"否",
      },
      {
        title: '',
        dataIndex: 'operation',
        // fixed: 'right',
        // width:200,
        render: (text, record) => {
          // console.log("this.props.controlList[3].menuCode",this.props.controlList[3].menuCode)
          return (
            <span>
              {this.props.controlList.user_mod?<a onClick={() => this.openModifyModal(record)}>修改</a>:null}
              {this.props.controlList.user_mod && this.props.controlList.user_resetpasswd?<Divider type="vertical" />:null}
              {this.props.controlList.user_resetpasswd?<Popconfirm
                title="是否重置该用户密码？"
                onConfirm={() => {this.resetPassword(record.key)}}
              >
                <a className={styles.userReset}>重置密码</a>
              </Popconfirm>:null}
              {this.props.controlList.user_del && this.props.controlList.user_resetpasswd?<Divider type="vertical" />:null}
              {
                this.props.controlList.user_del?
                    <Popconfirm
                      title="是否删除该用户？"
                      onConfirm={() => {this.delete(record.key)}}
                    >
                      <a className={styles.userDelete}>删除</a>
                    </Popconfirm> :null
              }
            </span>
          );
        },
      },
    ];

    const {isDisable,authoritykey,modifykey,roleValues} = this.state;

    const formItemLayout = {
      labelCol: {
        span:4,
        offset:4,
      },
      wrapperCol: {
        span:12,
      },
    };

    const { getFieldDecorator } = this.props.form;
    // 修改模态框
    const modifyModalForm=(
      <Modal
        confirmLoading={modifyBtnLoading}
        title="修改用户信息"
        visible={modifyModalVisible}
        onOk={()=>{this.modifyUser(modifykey)}}
        onCancel={this.cancelModifyUser}
      >
        <Form>
          <FormItem {...formItemLayout} label="用户名称">
            {getFieldDecorator('mname', {
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
            {getFieldDecorator('mpassword', {
              rules: [{
                min:6,
                message:'账号密码至少6位',
              },{
                max:24,
                message:'账号密码最多24位',
              }]
            })(
              <Input placeholder="请输入新密码" />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="用户描述">
            {getFieldDecorator('mdescription', {

            })(
              <TextArea row={3} placeholder="请输入用户描述" />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="组织单元">
            {getFieldDecorator('morgId', {
              rules: [{
                required: true,
                message: '组织单元不能为空！',
              }],
            })(
              <TreeSelect
                allowClear={true}
                dropdownStyle={{ maxHeight: 360, overflow: 'auto' }}
                treeData={organizationTree}
                placeholder="请选择组织单元"
              />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="用户身份">
            {getFieldDecorator('mstype', {
              rules:[{
                required:true,
                message: '用户身份不能为空!',
              }],
            })(
              <RadioGroup options={userType} />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="锁定">
            {getFieldDecorator('mislock', {
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

    const options = [];
    for(let i=0;i<roleSelect.length;i++){
      options[i]={};
      options[i].label=roleSelect[i].label;
      options[i].value=roleSelect[i].value;
    }
    // const options1 = [];
    // console.log("this.props.arr",this.props.arr);
    // 授权模态框
    const authorityModal=(
      <Modal
        confirmLoading={authorityBtnLoading}
        title="用户角色"
        visible={this.state.isDisable}
        maskClosable={false}
        onCancel={this.cancelModifyAuthority}
        footer={
          <div>
            <Button
              onClick={this.cancelModifyAuthority}
            >取消</Button>
            <Button
              type="primary"
              onClick={this.setAuthority}
            >保存</Button>
          </div>
        }
      >
        {/*this.state.defaultRole*/}
        <Spin spinning={this.props.loading}>
          <CheckboxGroup options={options}  value={this.state.arr}  onChange={this.changeRoleValues}/>
        </Spin>
      </Modal>
    );
    // 选择框

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectedRowKeysChange,
    };
    // const rowSelection = {
    //   selectedRowKeys:this.state.selectedRowKeys,
    //   onChange: this.onSelectChange,
    //   // hideDefaultSelections: true,
    //   // selections: [{
    //   //   key: 'all-data',
    //   //   text: '全选',
    //   //   onSelect: (changableRowKeys) => {
    //   //     dispatch({
    //   //       type:'usermanage/setSelectedRowKeys',
    //   //       payload:{ selectedRowKeys: changableRowKeys }
    //   //     });
    //   //   },
    //   // }, {
    //   //   key: 'odd',
    //   //   text: '奇数行',
    //   //   onSelect: (changableRowKeys) => {
    //   //     let newSelectedRowKeys = [];
    //   //     newSelectedRowKeys = changableRowKeys.filter((key, index) => {
    //   //       if (index % 2 !== 0) {
    //   //         return false;
    //   //       }
    //   //       return true;
    //   //     });
    //   //     dispatch({
    //   //       type:'usermanage/setSelectedRowKeys',
    //   //       payload:{ selectedRowKeys: newSelectedRowKeys }
    //   //     });
    //   //   },
    //   // }, {
    //   //   key: 'even',
    //   //   text: '偶数行',
    //   //   onSelect: (changableRowKeys) => {
    //   //     let newSelectedRowKeys = [];
    //   //     newSelectedRowKeys = changableRowKeys.filter((key, index) => {
    //   //       if (index % 2 !== 0) {
    //   //         return true;
    //   //       }
    //   //       return false;
    //   //     });
    //   //     dispatch({
    //   //       type:'usermanage/setSelectedRowKeys',
    //   //       payload:{ selectedRowKeys: newSelectedRowKeys }
    //   //     });
    //   //   },
    //   // }],
    //   // onSelection: this.onSelection,
    // };
    // 分页
    const pagination={
      pageSize,
      current,
      total,
      showSizeChanger:true,
      showTotal:(total,range)=>`共${total}条记录`,
      onChange:this.tableOnChange,
      onShowSizeChange:this.tableOnShowSizeChange,
      // pageSizeOptions:['1','5','10'],
    }


    return (
      <div className={styles.usersTable}>
        {modifyModalForm}
        {authorityModal}
        <Table
          loading={tableLoading}
          onRow={(record) => ({
            onClick: () => {
              this.selectRow(record);
            },
          })}
          dataSource={userData}
          columns={columns}
          rowSelection={rowSelection}
          bordered={false}
          pagination={pagination}
          scroll={{x:"100%"}}
        />
      </div>
    );
  }
}

export default UserEditTable;
