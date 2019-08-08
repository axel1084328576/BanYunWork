import React,{Component} from 'react';
import {Button, Input,Form,TreeSelect, Icon, Row, Col, Popconfirm, Modal} from 'antd';
import styles from '../RoleManage/RoleSearchOrAdd.less';
import { connect } from "dva/index";

const FormItem = Form.Item;
const {TextArea} = Input;
const TreeNode = TreeSelect.TreeNode;

@Form.create()
class OrganizationSearchOrAdd extends Component{
  constructor(props){
    super(props);
    this.state={
      nameValue:'',
      higherLevelValue:'',
    }
  }

  componentDidMount(){
   if(this.props.getValue){
     this.props.getValue({orgName:this.state.nameValue})
   }
  }

  nameValueChange = (e) => {
    this.setState({nameValue:e.target.value});
  };

  emptyNameValue = () => {
    this.setState({nameValue:''});
    const {pageSize,dispatch} = this.props;
    dispatch({
      type:'organizationmanage/selectOrganization',
      payload:{
        pageSize,
        current:1,
      },
    });
  };

  partDelete = () => {
    const {selectedRowKeys}=this.props;
    this.props.dispatch({
      type:'organizationmanage/deletePartOrganization',
      payload:{
        opType:'del',
        ids:selectedRowKeys.join(','),
        token:sessionStorage.getItem('sys-token')
      },
    });
    if(this.props.setSelectedRowKeys){
      this.props.setSelectedRowKeys()
    }
  };

  openAddModal = () => {
    this.props.dispatch({
      type:'organizationmanage/getAddModifyOrganizationTree',
      payload:{},
    });

    const form = this.props.form;

    form.setFieldsValue({
      orgName: '',
      orgNo: '',
      orgType: '',
      orgOrder: '',
      pid: typeof this.props.selectOrganizationKeys[0] === 'undefined' ? undefined : this.props.selectOrganizationKeys[0],
    });

    this.props.dispatch({
      type:'organizationmanage/setAddModalVisible',
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
          type:'organizationmanage/addOrganization',
          payload:{
            pid: values.pid,
            orgName: values.orgName,
            orgNo: values.orgNo,
            stype: values.orgType,
            orgOrder: values.orgOrder,
          },
        });
        if(this.props.setSelectedRowKeys){
          this.props.setSelectedRowKeys()
        }
      }
    });
  }

  cancelAddRole = () => {
    this.props.dispatch({
      type:'organizationmanage/setAddModalVisible',
      payload:{
        addModalVisible:false,
      }
    })
  }

  searchOrganization = ()=>{
    const {nameValue} = this.state;
    const {dispatch,pageSize} = this.props;
    dispatch({
      type:'organizationmanage/searchOrganization',
      payload:{
        pageSize:10,
        page:1,
        orgName:nameValue,
      }
    });
    if(this.props.setSelectedRowKeys){
      this.props.setSelectedRowKeys()
    }
  }

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
    const { getFieldDecorator } = this.props.form;
    const {
      addModalVisible,
      selectedRowKeys,
      selectOrganizationKeys,
      addModifyOrganizationTree,
      searchBtnLoading,
      addBtnLoading,
      partDeleteLoading,
    } = this.props;
    const addModalForm=(
      <Modal
        confirmLoading={addBtnLoading}
        title="添加组织信息"
        visible={addModalVisible}
        onOk={this.addRole}
        onCancel={this.cancelAddRole}
      >
        <Form>
          <FormItem {...formItemLayout} label="上级组织">
            {getFieldDecorator('pid', {
              
            })(
              <TreeSelect 
                allowClear={true}
                treeDefaultExpandAll
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                treeData={addModifyOrganizationTree}
                placeholder="请选择上级组织单元"
              />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="组织名称">
            {getFieldDecorator('orgName', {
              rules: [{
                required: true,
                message: '组织名称不能为空！',
              }],
            })(
              <Input placeholder="请输入组织名称" />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="组织简称">
            {getFieldDecorator('orgNo', {

            })(
              <Input placeholder="请输入组织简称" />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="组织类型">
            {getFieldDecorator('orgType', {
              rules: [{
                required: true,
                message: '组织类型！',
              }],
            })(
              <Input placeholder="请输入组织类型" />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="组织排序">
            {getFieldDecorator('orgOrder', {
              rules: [{
                required: true,
                message: '组织排序不能为空！',
              }],
            })(
              <Input placeholder="请输入组织排序" />
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
        xl: { span: 6 }
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
                label="组织名称"
                {...formItemLayout1}
                style={{ width: "100%" }}
              >
                {getFieldDecorator("orgName", {
                  rules: [{ required: false }]
                })(
                  <Input
                    className={styles.formItemWidth1}
                    placeholder="请输入组织名称"
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
                    loading={searchBtnLoading}
                    onClick={this.searchOrganization}
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
                     this.props.controlList.org_del?
                       (selectedRowKeys.length > 0 ?
                         <Popconfirm
                           okText="确定"
                           cancelText="取消"
                           title="是否要删除选中的组织信息?"
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
                  {this.props.controlList.org_add? <Button
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

export default OrganizationSearchOrAdd;
