import React,{Component} from 'react';
import { Table, Input, Popconfirm,TreeSelect,Modal, Form, Divider } from 'antd';
import styles from './OrganizationEditTable.less';
import { connect } from "dva/index";

// const {Option} = Select;
const FormItem = Form.Item;
const TreeNode = TreeSelect.TreeNode;
const {TextArea} = Input;

@connect(({ organizationmanage}) => {
  const {chnName}=organizationmanage;
  return{
    chnName
  }
})

@Form.create()
class OrganizationEditTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modifykey: '',
    };
  } 

  onSelectChange = (selectedRowKeys) => {
    this.props.dispatch({
      type:'organizationmanage/setSelectedRowKeys',
      payload:{
        selectedRowKeys
      },
    });
  }

  delete = (key) => {
    this.props.dispatch({
      type:'organizationmanage/deleteOrganization',
      payload:{
        key,
      }
    })
    if(this.props.setSelectedRowKeys){
      this.props.setSelectedRowKeys()
    }
  }

  openModifyModal = (payload) => {
    // console.log(payload);
    this.props.dispatch({
      type:'organizationmanage/getAddModifyOrganizationTree',
      payload:{},
    });

    const form = this.props.form;
    this.setState({
      modifykey:payload.key,
    });

    form.setFieldsValue({
      mpid: payload.pid,
      morgName: payload.orgName,
      morgType: payload.orgType,
      morgNo: payload.orgNo,
      morgOrder: payload.orgOrder,
    });

    this.props.dispatch({
      type:'organizationmanage/setAddModalVisible',
      payload:{
        modifyModalVisible:true,
      }
    });

  }

  modifyOrganization = (key) => {
    const form = this.props.form;
    form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type:'organizationmanage/modifyOrganization',
          payload:{
            sid: key,
            pid: values.mpid,
            orgOrder: values.morgOrder,
            orgName: values.morgName,
            orgNo: values.morgNo,
            stype: values.morgType,
          },
        });
        if(this.props.setSelectedRowKeys){
          this.props.setSelectedRowKeys()
        }
      }
    });
  };

  cancelModifyOrganization = () => {
    this.setState({modifykey:''});
    this.props.dispatch({
      type:'organizationmanage/setModifyModalVisible',
      payload:{
        modifyModalVisible:false,
      }
    })
  };

  tableOnShowSizeChange=(page, pageSize)=>{
    this.props.dispatch({
      type:'organizationmanage/selectOrganization',
      payload:{
        ...this.props.value,
        page,
        pageSize,
      }
    });
    if(this.props.setSelectedRowKeys){
      this.props.setSelectedRowKeys()
    }
  };

  tableOnChange=(current, size)=>{
    this.props.dispatch({
      type:'organizationmanage/selectOrganization',
      payload:{
        ...this.props.value,
        page:current,
        pageSize:size,
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
   const columns = [
      {
        title: '组织名称',
        dataIndex: 'orgName',
        editable: true,
        width:'15%'
        // sorter: (a, b) => a.name.length - b.name.length,
      },
      {
        title: '组织简称',
        dataIndex: 'orgNo',
        width:'15%'
      },
      {
        title: '组织编码',
        dataIndex: 'orgCode',
        width:'15%'
      },
      {
        title: '组织类型',
        dataIndex: 'orgType',
        width:'15%'
      },
      {
        title: '组织排序',
        dataIndex: 'orgOrder',
        width:'15%'
        // sorter:(a,b) => a.orgOrder - b.orgOrder,
      },
      {
        title: '',
        dataIndex: 'operation',
        // fixed: 'right',
        // width:110,
        render: (text, record) => {
          return (
            <span>
              {this.props.controlList.org_mod?<a onClick={() => this.openModifyModal(record)}>修改</a>:null}
              {this.props.controlList.org_mod && this.props.controlList.org_del?<Divider type="vertical" />:null}
              {
                this.props.controlList.org_del?
                  <Popconfirm
                    title="是否删除该组织？"
                    onConfirm={() => {this.delete(record.key)}}
                  >
                    <a className={styles.organizationDelete}>删除</a>
                  </Popconfirm>:null
              }
            </span>
          );
        },
      },
    ];

    const formItemLayout = {
      labelCol: {
        span:6,
        offset:2,
      },
      wrapperCol: {
        span:12,
      },
    };

    const { getFieldDecorator } = this.props.form;

    const modifyModalForm=(
      <Modal
        confirmLoading={this.props.modifyBtnLoading}
        title="修改组织信息"
        visible={this.props.modifyModalVisible}
        onOk={()=>{this.modifyOrganization(this.state.modifykey)}}
        onCancel={this.cancelModifyOrganization}
      >
        <Form>
          <FormItem {...formItemLayout} label="上级组织">
            {getFieldDecorator('mpid', {
              
            })(
              <TreeSelect 
                allowClear={true}
                treeDefaultExpandAll
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                treeData={this.props.addModifyOrganizationTree}
                placeholder="请选择上级组织单元"
              />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="组织名称">
            {getFieldDecorator('morgName', {
              rules: [{
                required: true,
                message: '组织名称不能为空！',
              }],
            })(
              <Input placeholder="请输入组织名称" />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="组织简称">
            {getFieldDecorator('morgNo', {
              
            })(
              <Input placeholder="请输入组织简称" />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="组织类型">
            {getFieldDecorator('morgType', {
              rules: [{
                required: true,
                message: '组织类型不能为空！',
              }],
            })(
              <Input placeholder="请输入组织类型" />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="组织排序">
            {getFieldDecorator('morgOrder', {
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

    // 选择配置项
    const { selectedRowKeys,dispatch } = this.props;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectedRowKeysChange,
      // selections: [{
      //   key: 'all-data',
      //   text: '全选',
      //   onSelect: (changableRowKeys) => {
      //     dispatch({
      //       type:'organizationmanage/setSelectedRowKeys',
      //       payload:{ selectedRowKeys: changableRowKeys }
      //     });
      //   },
      // }, {
      //   key: 'odd',
      //   text: '奇数行',
      //   onSelect: (changableRowKeys) => {
      //     let newSelectedRowKeys = [];
      //     newSelectedRowKeys = changableRowKeys.filter((key, index) => {
      //       if (index % 2 !== 0) {
      //         return false;
      //       }
      //       return true;
      //     });
      //     dispatch({
      //       type:'organizationmanage/setSelectedRowKeys',
      //       payload:{ selectedRowKeys: newSelectedRowKeys }
      //     });
      //   },
      // }, {
      //   key: 'even',
      //   text: '偶数行',
      //   onSelect: (changableRowKeys) => {
      //     let newSelectedRowKeys = [];
      //     newSelectedRowKeys = changableRowKeys.filter((key, index) => {
      //       if (index % 2 !== 0) {
      //         return true;
      //       }
      //       return false;
      //     });
      //     dispatch({
      //       type:'organizationmanage/setSelectedRowKeys',
      //       payload:{ selectedRowKeys: newSelectedRowKeys }
      //     });
      //   },
      // }],
      onSelection: this.onSelection,
    };

    const pagination={
      pageSize:this.props.pageSize,
      current:this.props.current,
      total:this.props.total,
      showSizeChanger:true,
      showTotal:(total,range)=>`共${total}条记录`,
      onChange:this.tableOnChange,
      onShowSizeChange:this.tableOnShowSizeChange,
      // pageSizeOptions:['1','5','10'],
    };

    return (
      <div className={styles.organizationTable}>
        {modifyModalForm}
        <Table
          defaultExpandAllRows={true}
          loading={this.props.tableLoading}
          dataSource={this.props.organization}
          onRow={(record) => ({
            onClick: () => {
              this.selectRow(record);
            },
          })}
          columns={columns}
          rowSelection={rowSelection}
          bordered={false}
          indentSize={10}
          pagination={pagination}
          scroll={{x:true}}
        />
      </div>
    );
  }
}

export default OrganizationEditTable;

