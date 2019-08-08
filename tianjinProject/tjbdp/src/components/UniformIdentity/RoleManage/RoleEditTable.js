import React,{Component} from 'react';
import { Table, Input, Popconfirm, Modal, Form, Divider,Tree,Drawer, Button,Col,Row,Spin} from 'antd';
import styles from './RoleEditTable.less';
import { connect } from "dva/index";

const FormItem = Form.Item;
const {TextArea} = Input;
const {TreeNode} = Tree;


@connect(({ rolemanage,loading}) => {
  const {chnName}=rolemanage;
  return{
    chnName,
    videoLoading: loading.effects['rolemanage/roleMenus'],
  }
})

@Form.create()
class RoleEditTable extends Component {
  state = {
    modifykey: '',
    visible: false,
    order:"",
    checkedArr:[],
    selectedKeys:undefined,
    pmenuId:undefined,
    partCheckedKeys:[],
    loading:false,
    expandedKeys:[],
    valueArr:[]
  };

  onSelectChange = (selectedRowKeys) => {
    this.props.dispatch({
      type:'rolemanage/setSelectedRowKeys',
      payload:{
        selectedRowKeys
      },
    });
  };

  delete = (key) => {
    this.props.dispatch({
      type:'rolemanage/deleteRole',
      payload:{
        key,
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
      order:payload.order,
      mcomments: payload.comments,
    });

    this.props.dispatch({
      type:'rolemanage/setModifyModalVisible',
      payload:{
        modifyModalVisible:true,
      }
    });
  };

  modifyRole = (key) => {
    const form = this.props.form;
    form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type:'rolemanage/modifyRole',
          payload:{
            sid:key,
            roleName:values.mname,
            roleOrder:values.order,
            roleNote:values.mcomments,
            token:sessionStorage.getItem('sys-token'),
          },
        });
        if(this.props.setSelectedRowKeys){
          this.props.setSelectedRowKeys()
        }
      }
    });
  };

  cancelModifyRole = () => {
    this.setState({modifykey:''});
    this.props.dispatch({
      type:'rolemanage/setModifyModalVisible',
      payload:{
        modifyModalVisible:false,
      }
    })
  };

  tableOnShowSizeChange=(page, pageSize)=>{
    this.props.dispatch({
      type:'rolemanage/getRoles',
      payload:{
        page,
        pageSize,
        roleName:this.props.value,
      }
    });
    if(this.props.setSelectedRowKeys){
      this.props.setSelectedRowKeys()
    }
  };

  tableOnChange=(current, size)=>{
    this.props.dispatch({
      type:'rolemanage/getRoles',
      payload:{
        page:current,
        pageSize:size,
        roleName:this.props.value,
      }
    });
    if(this.props.setSelectedRowKeys){
      this.props.setSelectedRowKeys()
    }
  };


  //菜单授权抽屉
  showDrawer = (record) => {
    // console.log("record",record);
    this.setState({
      visible: true,
      order:record.key,
    });
  };

  getParentTree=(currentNode,currentId,parentIds=[])=>{
    if(currentNode.id ===currentId){
      //返回所有父id
      return parentIds
    }else if(currentNode.children) {
      // 有子节点,存储当前id到父亲id列表中，并继续处理下一层
      // console.log("currentNode.children",currentNode.children);
      for (let i = 0; i < currentNode.children.length; i++) {
        parentIds.push(currentNode.id);
        let result = this.getParentTree(currentNode.children[i], currentId, parentIds)
        if (result && result.length > 0) {
          return parentIds
        }else {
          parentIds=[]
        }
      }
    }else {
      //无子节点，返回空数组
      return []
    }
  };

  unique1=(array)=>{
    let n = []; //一个新的临时数组
    //遍历当前数组
    for(let i = 0; i < array.length; i++){
      //如果当前数组的第i已经保存进了临时数组，那么跳过，
      //否则把当前项push到临时数组里面
      if (n.indexOf(array[i]) == -1) n.push(array[i]);
    }
    return n;
  };

  getChilren=(tree, nodeId)=>{
    for (let i = 0; i < tree.length; i++) {
      // console.log(tree[i].text)
      if(tree[i].id != nodeId && tree[i].children){
        let result = this.getChilren(tree[i].children,nodeId)
        if(result&&result.length>0){
          return result
        }
      } else if(tree[i].id == nodeId && tree[i].children){
        // console.log("tree[i].children",tree[i].children)
        return tree[i].children
      }
    }
    return []
  }


  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.text} key={item.id} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode title={item.text} key={item.id} dataRef={item} />;
    });
  };

  renderTreeNodes1 = (data) => {
    return data.map((item) => {
      return <TreeNode title={item.text} key={item.id} dataRef={item} />;
    });
  };

  onSelect = (selectedKeys) =>{
    // console.log("selectedKeys",selectedKeys);
    //取得当前树
    let arr=[],arr1=[];
    const {order,checkedArr}=this.state;
    if(this.state.selectedKeys!=selectedKeys && selectedKeys.length>=1){
      this.props.menuTree.map((item)=>{
        selectedKeys.map((item1)=>{
          if(item.id==item1){
            arr.push(item)
          }
        })
      });
      this.setState({checkedArr:arr});

      //获取树的展开节点
      arr.map((item)=>{
        arr1.push(item.id);
        if(item.children){
          item.children.map((item1)=>{
            arr1.push(item1.id)
            if(item1.children){
              item1.children.map((item2)=>{
                arr1.push(item2.id)
              })
            }
          })
        }
      });
      this.setState({expandedKeys:arr1});
      // console.log("当前树",arr);

      let sKeys=[],sKeys1=[];
      this.setState({selectedKeys:selectedKeys,loading:true});
      this.props.dispatch({
        type:'rolemanage/roleMenus',
        payload:{
          pmenuId:selectedKeys[0],
          roleId:order,
        },
        callback:(partCheckedKeys)=>{
          partCheckedKeys.map((item)=>{
            sKeys=this.getParentTree(arr[0],item)
            sKeys1.push(...sKeys)
          });
          sKeys1.push(...partCheckedKeys);
          sKeys1=this.unique1(sKeys1);
          this.setState({
            partCheckedKeys:sKeys1,
            loading:false,
          })
        }
      });
    }

    // console.log("arr1",arr1);
    // console.log("expandedKeys",this.state.expandedKeys)
  };

  ergodicTree=(tree,childrens)=>{
    for (let i = 0; i < tree.length; i++) {
      childrens.push(tree[i].id)
      if(tree[i].children){
        this.ergodicTree(tree[i].children,childrens)
      }
    }
    return childrens
  };

  // getChilren=(value,value1)=>{
  //   let arr=[];
  //   value.map((item)=>{
  //     if(item.id==value1){
  //       if(item.children){
  //         item.children.map((item1)=>{
  //           arr.push(item1.id);
  //           if(item1.children){
  //             item1.children.map(item2=>{
  //               arr.push(item2.id);
  //             })
  //             // this.getChilren(item1.children,value1)
  //           }
  //         });
  //       }
  //     }else{
  //       if(item.children){
  //         this.getChilren(item.children,value1)
  //       }
  //     }
  //   });
  //   return arr;
  // }

  onShowCheck=(checkedKeys,e)=>{
    // console.log("asd",e);
    // console.log("checkedKeys",checkedKeys);
    const {checkedArr,selectedKeys}=this.state;
    let arr=[],arr1=[];
    let result=this.getParentTree(checkedArr[0],e.node.props.dataRef.id);
    // console.log("result",result);
    arr=[...checkedKeys.checked,...result];
    arr=this.unique1(arr);
    if(arr.indexOf(e.node.props.eventKey)==-1){
     arr1=this.getChilren(checkedArr,e.node.props.eventKey)
     // console.log("arr1",arr1);
    }
    let childrens = [];
    childrens=this.ergodicTree(arr1,childrens);
    // console.log("childrens",childrens);
    childrens.map((item)=>{
      if(arr.indexOf(item)!=-1){
        let index=arr.indexOf(item);
        arr.splice(index,1)
      }
    });
    if(arr.indexOf(selectedKeys[0])>=0){
      // alert("执行了");
      this.setState({
        pmenuId:selectedKeys[0]
      })
    }
    // console.log("afarar",arr);
    this.setState({
      partCheckedKeys:arr
    })

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
  };

  onSelectedRowKeysChange = (selectedRowKeys) => {
    if(this.props.setValue){
      this.props.setValue(selectedRowKeys)
    }
  };

  onCancel=()=>{
    this.onSelect([]);
    // this.onShowCheck(checkedKeys={});
    this.setState({selectedKeys:[]});
    this.setState({partCheckedKeys:[]});
    this.setState({visible:false})
  };

  onOk=()=>{
    const {partCheckedKeys,order,pmenuId}=this.state;
    this.props.dispatch({
      type:'rolemanage/roleMenu',
      payload:{
        menuIds:partCheckedKeys.join(','),
        roleId:order,
        pmenuId:pmenuId,
      }
    });
    if(this.props.setSelectedRowKeys){
      this.props.setSelectedRowKeys()
    }
  };

  onExpand=(expandedKeys)=>{
    this.setState({
      expandedKeys:expandedKeys
    })
  }

  render() {
    const { selectedRowKeys}=this.props;
    const columns = [
      {
        title: '角色编号',
        dataIndex: 'order',
        editable: true,
        // sorter: (a, b) => a.order- b.order,
      },
      {
        title: '角色名称',
        dataIndex: 'name',
        editable: true,
        // sorter: (a, b) => a.name.length - b.name.length,
      },
      {
        title: '备注',
        dataIndex: 'comments',
        editable: true,
      },
      {
        title: '菜单',
        dataIndex: 'menu',
        editable: true,
        render: (text, record) => {
          return (
            this.props.controlList.role_auz?<a onClick={() => this.showDrawer(record)}>授权</a>:null
          );
        },
      },
      {
        title: '',
        dataIndex: 'operation',
        // fixed: 'right',
        // width:110,
        render: (text, record) => {
          return (
            <span>
              {this.props.controlList.role_mod?<a onClick={() => this.openModifyModal(record)}>修改</a>:null}
              {this.props.controlList.role_mod && this.props.controlList.role_del?<Divider type="vertical" />:null}
              {
                this.props.controlList.role_del?
                  <Popconfirm
                    title="是否删除该角色？"
                    onConfirm={() => {this.delete(record.key)}}
                  >
                    <a style={{color:"#f5222d"}}>删除</a>
                  </Popconfirm>:null
              }
            </span>
          );
        },
      },
    ];

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

    const modifyModalForm=(
      <Modal
        confirmLoading={this.props.modifyBtnLoading}
        title="修改角色信息"
        visible={this.props.modifyModalVisible}
        onOk={()=>{this.modifyRole(this.state.modifykey)}}
        onCancel={this.cancelModifyRole}
      >
        <Form>
          <FormItem {...formItemLayout} label="角色名称">
            {getFieldDecorator('mname', {
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
            {getFieldDecorator('mcomments', {

            })(
              <TextArea row={4} placeholder="请输入角色备注" />
            )}
          </FormItem>
        </Form>
      </Modal>
    );
    // 选择配置项

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectedRowKeysChange,
      // selections: [{
      //   key: 'all-data',
      //   text: '全选',
      //   oype:'rolemanage/setSelectedRowKeys',
      //   payloadnSelect: (changableRowKeys) => {
      //     dispatch({
      //       t:{ selectedRowKeys: changableRowKeys }
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
      //       type:'rolemanage/setSelectedRowKeys',
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
      //       type:'rolemanage/setSelectedRowKeys',
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
    // console.log("this.state.selectedKeys",this.state.selectedKeys);
    return (
      <div className={styles.rolesTable}>
        {modifyModalForm}
        <Table
          loading={this.props.tableLoading}
          dataSource={this.props.roles}
          columns={columns}
          rowSelection={rowSelection}
          bordered={false}
          onRow={(record) => ({
            onClick: () => {
              this.selectRow(record);
            },
          })}
          pagination={pagination}
          scroll={{x:"100%"}}
        />
        <Modal
          visible={this.state.visible}
          onCancel={this.onCancel}
          onOk={this.onOk}
          okText="保存"
        >
          <Spin spinning={this.state.loading}>
            <Row>
              <Col sm={{ span: 12 }} lg={{ span: 12 }}>
                <Tree
                  selectedKeys={this.state.selectedKeys}
                  onSelect={this.onSelect}
                >
                  {this.renderTreeNodes1(this.props.menuTree)}
                </Tree>
              </Col >
              <Col sm={{ span: 12 }} lg={{ span: 12 }}>
                <Tree
                  checkable={true}
                  onCheck={this.onShowCheck}
                  checkedKeys={this.state.partCheckedKeys}
                  onExpand={this.onExpand}
                  checkStrictly
                  expandedKeys={this.state.expandedKeys}
                >
                  {this.renderTreeNodes(this.state.checkedArr)}
                </Tree>
              </Col >
            </Row>
          </Spin>
        </Modal>
      </div>
    );
  }
}

export default RoleEditTable;
