import React,{Component} from 'react';
import {Row,Col,Card,Form,Button,Divider,Popconfirm,Table,Input,Icon,Select} from 'antd';
import {connect} from 'dva';
import MenusTree from '../../components/UniformIdentity/MenusManage/MenusTree'
import EditModal from '../../components/UniformIdentity/MenusManage/EditModal'
import AddModal from '../../components/UniformIdentity/MenusManage/AddModal'
import HighSearh from '../../components/UniformIdentity/MenusManage/HighSearch'
import styles from './MenusManage.less'

const {Option}=Select;

@connect(({ menusmanage,loading,getPagePage }) => {
  const {menusList,menuTree,pageSize,total,controlList}=menusmanage;
  const {pagePath}=getPagePage;
  return{
    menusList,
    menuTree,
    pageSize,
    total,
    controlList,
    pagePath,
    listLoading: loading.effects['menusmanage/List'],
    delLoading: loading.effects['menusmanage/Del'],
    addOrEditLoading: loading.effects['menusmanage/AddOrEdit'],
  }
})

@Form.create()
class MenusManage extends Component{
  state={
    rowData:'',
    nameValue:'',
    selectedRows:'',
    editVisible:false,
    addVisible:false,
    showSearch:false,
    selectKeys:null,
    selectedRowKeys:[],
    highSearchValue:{},
    openHighSearch:false,

    column:[{
      title: '名称',
      dataIndex: 'menuName',
    },{
      title: '编码',
      dataIndex: 'menuCode',
    },{
      title: '菜单',
      dataIndex: 'menuType',
    },{
      title: '地址',
      dataIndex: 'url',
    },{
      title: '图标',
      dataIndex: 'icon',
    },{
      title: '是否显示',
      dataIndex: 'showFlag',
    },{
      title: '排序',
      dataIndex: 'menuOrder',
    },{
      title: '',
      dataIndex: 'operation',
      key:'operation',
      // fixed: 'right',
      // width:110,
      render: (text, record) => {
        return (
          <span>
            {this.props.controlList.menu_mod?<a href="javascript:" onClick={()=>{this.showEditModal(record)}}>修改</a>:null}
            {this.props.controlList.menu_mod && this.props.controlList.menu_del? <Divider type="vertical"/>:null}
            {
              this.props.controlList.menu_del?
                (this.props.menusList.length >= 1
                  ? (
                    <Popconfirm title="是否要删除选中的用户信息?" placement="bottomRight" onConfirm={() => {this.rowDel(record)}}>
                      <a href="javascript:;" style={{color:"#f5222d"}}>删除</a>
                    </Popconfirm>
                  ) : null):null
            }
          </span>
        );
      }
    }]
  };

  componentWillMount(){
    // console.log("this.props.pagePath",this.props.pagePath);
    const { dispatch } = this.props;
    dispatch({
      type:"menusmanage/Control",
      payload:{
        menuCode:this.props.pagePath,
        token:sessionStorage.getItem('sys-token'),
      }
    })
  }

  componentDidMount(){
    const { dispatch} = this.props;
    const form = this.props.form;
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'menusmanage/List',
          payload:{
            ...values,
            page: 1,
            pageSize:10,
            token:sessionStorage.getItem('sys-token'),
          }
        });
      }
    });

    dispatch({
      type:'menusmanage/getPartTree',
      payload:{
        token:sessionStorage.getItem('sys-token'),
      },
    });
  }

  setSelectedRowKeys=()=>{
    this.setState({selectedRowKeys:[]})
  };

  rowDel = (key) => {
    let searchItem=this.getSearch();
    let data={
      opType:"del",
      ids:key.sid,
      pid:this.state.selectKeys,
      token:sessionStorage.getItem('sys-token'),
    };
    const {dispatch}=this.props;
    dispatch({
      type:'menusmanage/Del',
      payload:data,
    });
    if(this.props.setSelectedRowKeys){
      this.props.setSelectedRowKeys()
    }
  };

  moreRowDel = () => {
    const {selectedRows,selectKeys,selectedRowKeys}=this.state;
    // const delMoreRows=[];
    // selectedRows.map((item)=>{
    //   delMoreRows.push(item.sid)
    // });
    const {dispatch}=this.props;
    dispatch({
      type:'menusmanage/Del',
      payload:{
        ids:selectedRowKeys.join(","),
        opType:"del",
        pid:this.state.selectKeys,
        token:sessionStorage.getItem('sys-token'),
      },
    });
    if(this.props.setSelectedRowKeys){
      this.props.setSelectedRowKeys()
    }
  };

  //高级搜索
  openHighSearch = () => {
    this.setState({ showSearch:!this.state.showSearch});
  };

  highSearch = (value) => {
    this.setState({ showSearch:value});
  };

  //搜索
  handleSearch = () => {
    // let oInput = document.querySelector('#menu');
    // let onInput = oInput.value.trim();
    const { dispatch } = this.props;
    const form = this.props.form;
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'menusmanage/List',
          payload:{
            ...values,
            page: 1,
            pageSize:10,
            token:sessionStorage.getItem('sys-token'),
          },
        });
        if(this.props.setSelectedRowKeys){
          this.props.setSelectedRowKeys()
        }
      }
    })
  };

  getSearch=()=>{
    let data;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        data=values
      }
    });
    return data;
  };


  emptyNameValue = () => {
    this.setState({nameValue:''});
  };

  nameValueChange = (value) => {
    this.setState({nameValue:value.target.value});
  };

  //修改模态框
  showEditModal=(record)=>{
    this.setState({
      editVisible: true,
      rowData:record
    });
  };

  menusEditVisible=(value)=>{
    this.setState({
      editVisible: value,
    });
  };

  //添加模态框
  showAddModal=()=>{
    this.setState({
      addVisible:true,
    });
  };

  menusAddVisible=(value)=>{
    this.setState({
      addVisible: value,
    });
  };


  selectKey=(value)=>{
    this.setState({
      selectKeys:value,
    })
  };

  getHighSearch=(value)=>{
    this.setState({highSearchValue:value})
  };

  tableOnChange=(current, size)=>{
    const form = this.props.form;
    form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type:'menusmanage/List',
          payload:{
            page:current,
            pageSize:size,
            ...values,
            token:sessionStorage.getItem('sys-token'),
          }
        });
        if(this.props.setSelectedRowKeys){
          this.props.setSelectedRowKeys()
        }
      }
    });
  };

  tableOnShowSizeChange=(page, pageSize)=>{
    const form = this.props.form;
    form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type:'menusmanage/List',
          payload:{
            page:page,
            pageSize:pageSize,
            ...values,
            token:sessionStorage.getItem('sys-token'),
          }
        });
        if(this.props.setSelectedRowKeys){
          this.props.setSelectedRowKeys()
        }
      }
    })
  };

  // onSelectChange=(selectedRowKeys, selectedRows) => {
  //   console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
  //   this.setState({selectedRowKeys:selectedRowKeys, selectedRows: selectedRows})
  // };

  onChanged=(selectedRowKeys, selectedRows) => {
    // console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
    this.setState({ selectedRows: selectedRows,selectedRowKeys:selectedRowKeys})
  };

  hanldeHighSearch = () => {
    this.setState({
      openHighSearch:!this.state.openHighSearch
    })
  };

  render(){
    const {menusList,listLoading,delLoading,addOrEditLoading,menuTree,dispatch,pageSize,total}=this.props;
    const {column,rowData,editVisible,dataSource,selectedRows,addVisible,showSearch,nameValue,selectKeys,selectedRowKeys}=this.state;
    const { getFieldDecorator } = this.props.form;
    const FormItem = Form.Item;

    const rowSelection = {
      selectedRowKeys:selectedRowKeys,
      onChange: this.onChanged,
    };

    const EditData={
      rowData,
      editVisible,
      addOrEditLoading,
    };
    const AddData={
      addVisible,
      addOrEditLoading,
    };

    const formItemLayout = {
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
    const normalSearch=(
      <div className={styles.searchRow}>
        <Form layout="inline">
          <Row>
            <Col sm={{ span: 24 }} lg={{ span: 6 }}>
              <FormItem
                label="名称"
                {...formItemLayout}
                style={{ width: "100%" }}
              >
                {getFieldDecorator("menuName", {
                  rules: [{ required: false }]
                })(
                  <Input
                    id="menu"
                    placeholder="请输入名称"
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
                <Button  type="primary" icon="search"  onClick={this.handleSearch}>搜索</Button>
                {/*<a onClick={this.openHighSearch} style={{ marginLeft: 20 }}>高级搜索</a>*/}
              </span>
            </Col>
            <Col xs={{ span: 12 }} sm={{ span: 12 }} lg={{ offset:6,span: 6 }}>
              <Row type="flex" justify="end">
                <span className={styles.unSpan1}>
                    {
                      this.props.controlList.menu_del?
                        ( selectedRowKeys.length>0? <Popconfirm
                          okText="确定"
                          cancelText="取消"
                          title="是否要删除选中的用户信息?"
                          placement="bottomRight"
                          onConfirm={this.moreRowDel}
                        >
                          <Button type="primary" className={styles.allDelete} loading={delLoading}>删除</Button>
                        </Popconfirm>:null):null
                    }
                   {
                     this.props.controlList.menu_add? <Button type="primary" icon="plus" onClick={this.showAddModal} style={{ marginLeft: 10 }}>添加</Button>:null
                   }
                </span>
              </Row>
            </Col>
          </Row>
          {this.state.openHighSearch?<Row>
            <Row>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <FormItem
                  {...formItemLayout}
                  label="编码"
                  style={{ width: "100%" }}
                >
                  {getFieldDecorator("menuCode", {
                    rules: [{
                      required: false, message: "请输入编码!"
                    }]
                  })(
                    <Input
                      style={{ width: "100%" }}
                      placeholder="请输入编码"
                      // suffix={codeEditValue ? <Icon type="close" onClick={this.emptyCode} /> : null}
                      onChange={this.codeValueChange}
                    />
                  )}
                </FormItem>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <FormItem
                  {...formItemLayout}
                  label="菜单"
                  style={{ width: "100%" }}
                >
                  {getFieldDecorator("menuType", {
                    rules: [{
                      required: false, message: "请选择菜单/功能!"
                    }]
                  })(
                    <Select  style={{ width: "100%" }}   placeholder="请选择">
                      <Option value="菜单">菜单</Option>
                      <Option value="功能">功能</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <FormItem
                  {...formItemLayout}
                  label="地址"
                  style={{ width: "100%" }}
                >
                  {getFieldDecorator('url', {
                    rules: [{
                      required: false, message: '请输入地址!',
                    }],
                  })(
                    <Input
                      style={{ width: "100%" }}
                      placeholder="请输入地址"
                      // suffix={dotAddressValue ? <Icon type="close" onClick={this.emptyDotAddress} /> : null}
                      // onChange={this.dotAddressValueChange}
                    />
                  )}
                </FormItem>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <FormItem
                  {...formItemLayout}
                  label="图标"
                  style={{ width: "100%" }}
                >
                  {getFieldDecorator("icon", {
                    rules: [{
                      required: false
                    }]
                  })(
                    <Input
                      style={{ width: "100%" }}
                      placeholder="请输入图标"
                      // suffix={nameEditValue ? <Icon type="close" onClick={this.emptyName} /> : null}
                      onChange={this.iconValueChange}
                    />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <FormItem
                  {...formItemLayout}
                  label="是否显示"
                  style={{ width: "100%" }}
                >
                  {getFieldDecorator("showFlag", {
                    rules: [{
                      required: false, message: "请输入是否显示"
                    }]
                  })(
                    <Select style={{ width: "100%" }}  placeholder="请选择">
                      <Option value="1">显示</Option>
                      <Option value="0">不显示</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
          </Row>:null}
        </Form>
      </div>
    );
    const pagination={
      pageSize,
      total,
      showSizeChanger:true,
      showTotal:(total,range)=>`共${total}条记录`,
      onChange:this.tableOnChange,
      onShowSizeChange:this.tableOnShowSizeChange,
      // pageSizeOptions:['1','5','10'],
    };

    const menuTreeProps = {
      menuTree,
      dispatch,
    };
    return (
      <Card>
        <Row className={styles.wrap}>
          <Col xs={{span: 24}} sm={{ span: 24 }} lg={{ span: 4 }}>
            <MenusTree {...menuTreeProps}  selectKey={this.selectKey} onChange={this.onChanged}/>
          </Col>
          <Col
            xs={{span: 24}} sm={{ span: 24 }} lg={{ span: 20 }}
            className={styles.allLine}
          >
            {
              addVisible?<AddModal menusAddVisible={this.menusAddVisible}  AddData={AddData} selectKeys={selectKeys}  setSelectedRowKeys={this.setSelectedRowKeys}/>:null
            }
            {
              !showSearch?normalSearch:<HighSearh  showSearch={this.highSearch} getHighSearch={this.getHighSearch}/>
            }
            {
              editVisible?<EditModal menusEditVisible={this.menusEditVisible} EditData={EditData}  selectKeys={selectKeys} setSelectedRowKeys={this.setSelectedRowKeys}/>:null
            }
            <Table
              columns={column}
              onRow={(record) => {
                return { onClick: (event) => {
                    if(selectedRowKeys.indexOf(record.sid) > -1){
                      let index=selectedRowKeys.indexOf(record.sid);
                      selectedRowKeys.splice(index, 1);
                      this.setState({
                        selectedRowKeys
                      })
                    }else{
                      selectedRowKeys.push(record.sid);
                      this.setState({
                        selectedRowKeys
                      })
                    }
                    // console.log("selectedRowKeys",selectedRowKeys);
                  }};
              }}
              dataSource={menusList}
              loading={listLoading}
              rowSelection={rowSelection}
              rowKey="sid"
              pagination={pagination}
              scroll={{x: "100%"}}
            />
          </Col>
        </Row>
      </Card>
    );
  }
}

export default MenusManage;


