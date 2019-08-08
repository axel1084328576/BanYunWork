import React,{Component} from 'react';
import {Card,Table,Button,Row,Col,Input,Icon,Popconfirm,Select,Form,Upload,Divider,message,Modal} from 'antd';
import {connect} from 'dva';
import ExpHighSearch from '../../components/ConvenientService/ExpressNetwork/HighSearch';
import ExpAddModal from '../../components/ConvenientService/ExpressNetwork/AddModal';
import ExpEditModal from '../../components/ConvenientService/ExpressNetwork/EditModal';
import ImportModal from '../../components/ConvenientService/ExpressNetwork/ExImportModal';
import styles from './allStyles.less';

const Option = Select.Option;
const FormItem = Form.Item;

@connect(({ expressNetwork,loading,businessinfo,getPagePage }) => {
  const {expressList,pageSize,total,controlList,page}=expressNetwork;
  const {pagePath}=getPagePage;
  const {companyList}=businessinfo;
  return{
    page,
    pagePath,
    expressList,
    pageSize,
    total,
    companyList,
    controlList,
    expressLoading: loading.effects['expressNetwork/List'],
    delLoading: loading.effects['expressNetwork/Del'],
  }
})

@Form.create()
export default class ExpressNetwork extends Component{
  state={
    showSearch:false,
    nameValue:'',
    infoVisible:false,
    editVisible:false,
    loading:false,
    selectedRows:"",
    rowData:"",
    importVisible:false,
    highSearchValue:{},
    selectedRowKeys:[],
    openHighSearch:false,

    columns:[{
      title: '网点编号',
      dataIndex: 'statCode',
      key:'statCode',
      // width:100,
    },{
      title: '网点名称',
      dataIndex: 'statName',
      key:'staName',
      // width:260,
    }, {
      title: '网点地址',
      dataIndex: 'address',
      key: 'address',
      // width:420,
    },{
      title: '企业编码',
      dataIndex: 'compNo',
      key: 'compNo',
      // width:100,
    },{
      title: '企业名称',
      dataIndex: 'compNa',
      key: 'compNa',
      // width:100,
    },{
      title: '经营管理企业',
      dataIndex: 'enterprise',
      key: 'enterprise',
      // width:140,
    }, {
      title: '网点经纬度',
      children:[{
        title:'经度',
        dataIndex: 'longitude',
        key: 'longitude',
        // width:120,
      },{
        title:'纬度',
        dataIndex: 'latitude',
        key: 'latitude',
        // width:120,
      }]
    }, {
      title: '网点联系人',
      dataIndex: 'contact',
      key: 'contact',
      // width:120,
    }, {
      title: '联系人电话',
      dataIndex: 'tel',
      key: 'tel',
      // width:140,
    }, {
      title: '排序',
      dataIndex: 'norder',
      key: 'norder',
      // width:100,
    }, {
      title: '备注',
      dataIndex: 'notes',
      key: 'notes',
    },{
      title: '',
      dataIndex: 'operation',
      key:'operation',
      // width:110,
      // fixed: 'right',
      // width:110,
      render: (text, record) => {
        return (
          <span>
            {this.props.controlList.exp_mod?<a href="javascript:" onClick={()=>{this.showEditModal(record)}}>修改</a>:null}
            {this.props.controlList.exp_mod && this.props.controlList.exp_del?<Divider type="vertical" />:null}
            {
              this.props.controlList.exp_del?
                (this.props.expressList.length>= 1
                  ?(
                    <Popconfirm title="是否要删除选中的用户信息?" placement="bottomRight" onConfirm={() => {this.rowDel(record)}}>
                      <a href="javascript:;" style={{color:"#f5222d"}}>删除</a>
                    </Popconfirm>
                  ):null):null
            }
          </span>
        );
      },
    }],
  };

  componentWillMount(){
    // console.log("this.props.pagePath",this.props.pagePath);
    const { dispatch } = this.props;
    dispatch({
      type:"expressNetwork/Control",
      payload:{
        menuCode:this.props.pagePath
      }
    })
  }

  componentDidMount(){
    const { dispatch } = this.props;
    const form = this.props.form;
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'expressNetwork/List',
          payload:{
            page: 1,
            pageSize:10,
            ...values,
            token:sessionStorage.getItem('sys-token'),
          }
        });
      }
    });
    this.props.dispatch({
      type:'businessinfo/companyList',
      callback:(value)=>{
        if(value.length==1){
          this.setState({compNo:value[0].compNo})
        }
      }
    });
  }

  rowDel = (key) => {
    let searchItem;
    if(this.props.getSearch){
      searchItem=this.props.getSearch()
    }
    let data={
      opType:"del",
      ids:key.sid,
      token:sessionStorage.getItem('sys-token'),
    };
    this.props.dispatch({
      type:'expressNetwork/Del',
      payload:{
        data:data,
        searchItem:searchItem,
      },
    });
    this.setSelectedRowKeys();
  };

  moreRowDel = () => {
    const {selectedRows,selectedRowKeys}=this.state;
    // const delMoreRows=[];
    // selectedRows.map((item)=>{
    //   delMoreRows.push(item.sid)
    // });
    let searchItem;
    if(this.props.getSearch){
      searchItem=this.props.getSearch()
    }
    let data={
      ids:selectedRowKeys.join(","),
      opType:"del",
      token:sessionStorage.getItem('sys-token'),
    };
    const {dispatch}=this.props;
    dispatch({
      type:'expressNetwork/Del',
      payload:{
        data:data,
        searchItem:searchItem,
      },
    });
    this.setSelectedRowKeys();
  };

  emptyNameValue = () => {
    this.setState({nameValue:''});
  };

  nameValueChange = (value) => {
    this.setState({nameValue:value.target.value});
  };

  openHighSearch = () => {
    this.setState({ showSearch:!this.state.showSearch});
  };

  highSearch = (value) => {
    this.setState({ showSearch:value});
  };

  showEditModal=(record)=>{
    this.setState({
      editVisible: true,
      rowData:record,
    });
  };

  showInfoModal=()=>{
    this.setState({
      infoVisible: true,
    });
  };

  handleSearch = () => {
    // let oInput = document.querySelector('#dotName');
    // let onInput = oInput.value.trim();
    const {nameValue}=this.state;
    const { dispatch } = this.props;
    const form = this.props.form;
    form.validateFields((err, values) => {
      if (!err) {
        if(values.statName==""){
          values.statName=undefined
        }
        if(values.compNo==null || values.compNo==""){
          values.compNo=undefined
        }
        dispatch({
          type: 'expressNetwork/List',
          payload: {
            ...values,
            page: 1,
            pageSize:10,
            token:sessionStorage.getItem('sys-token'),
          }
        });
        this.setSelectedRowKeys();
      }
    })
  };

  getSearch=()=>{
    let data;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if(values.statName==""){
          values.statName=undefined
        }
        if(values.compNo==null || values.compNo==""){
          values.compNo=undefined
        }
        data=values
      }
    });
    return data;
  };

  setSelectedRowKeys=()=>{
    this.setState({selectedRowKeys:[]})
  };

  expressVisible=(value)=>{
    this.setState({
      infoVisible: value,
    });
  };

  expressEditVisible=(value)=>{
    this.setState({
      editVisible: value,
    });
  };

  getHighSearch=(value)=>{
    this.setState({highSearchValue:value})
  };

  tableOnChange=(current, size)=>{
    const form = this.props.form;
    form.validateFields((err, values) => {
      if(values.statName==""){
        values.statName=undefined
      }
      if(values.compNo==null || values.compNo==""){
        values.compNo=undefined
      }
      if (!err) {
        this.props.dispatch({
          type: 'expressNetwork/List',
          payload: {
            page: current,
            pageSize: size,
            ...values,
            token: sessionStorage.getItem('sys-token'),
          }
        });
        this.setSelectedRowKeys();
      }
    })
  };

  tableOnShowSizeChange=(page, pageSize)=>{
    const form = this.props.form;
    form.validateFields((err, values) => {
      // if(values.)
      if (!err) {
        if(values.statName==""){
          values.statName=undefined
        }
        if(values.compNo==null || values.compNo==""){
          values.compNo=undefined
        }
        this.props.dispatch({
          type:'expressNetwork/List',
          payload:{
            page,
            pageSize,
            ...values,
            token:sessionStorage.getItem('sys-token'),
          }
        });
        this.setSelectedRowKeys();
      }
    });
  };

  handleImportVisible=()=>{
    this.setState({
      importVisible:true
    })
  };

  handleCloseVisible=(value)=>{
    this.setState({
      importVisible:value
    })
  };

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
    const {dataSource,columns,showSearch,nameValue,infoVisible,loading,selectedRows,rowData,selectedRowKeys}=this.state;
    const {expressList,expressLoading,searchLoading,delLoading,pageSize,total}=this.props;
    const { getFieldDecorator } = this.props.form;
    const rowSelection = {
      selectedRowKeys:selectedRowKeys,
      onChange: this.onChanged,
    };
    const pagination={
      current:this.props.page,
      pageSize,
      total,
      showSizeChanger:true,
      showTotal:(total,range)=>`共${total}条记录`,
      onChange:this.tableOnChange,
      onShowSizeChange:this.tableOnShowSizeChange,
      // pageSizeOptions:['3','5','10'],
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

    const companyList=this.props.companyList.map((item)=>{
      return <Option key={item.compNo} value={item.compNo}>{item.companyName}</Option>;
    });
    const normalSearch=(
      <div className={styles.searchRow}>
        <Form layout="inline">
          <Row>
            <Col sm={{ span: 24 }} lg={{ span: 6 }}>
              <FormItem
                label="网点名称"
                {...formItemLayout}
                style={{ width: "100%" }}
              >
                {getFieldDecorator("statName", {
                  rules: [{ required: false }]
                })(
                  <Input
                    id="dotName"
                    placeholder="请输入网点名称"
                    // value={this.state.nameValue}
                    // suffix={this.state.nameValue ? <Icon type="close" onClick={this.emptyNameValue} /> : null}
                    onChange={this.nameValueChange}
                  />
                )}
              </FormItem>
            </Col>
            <Col sm={{ span: 24 }} lg={{ span: 6 }}>
              <FormItem
                label="企业"
                {...formItemLayout}
                style={{ width: "100%" }}
              >
                {getFieldDecorator("compNo", {
                  initialValue:this.props.companyList.length==1?this.props.companyList[0].compNo:null,
                  rules: [{ required: false }]
                })(
                  this.props.companyList.length==1?<Select>
                      {companyList}
                    </Select>:
                  <Select>
                    <Option key={null} value={null}>全部</Option>
                    {companyList}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 6 }}>
              <span className={styles.unSpan}>
                <a onClick={this.hanldeHighSearch} style={{ marginRight: 20 }}>{this.state.openHighSearch?"收起":"展开"}</a>
                <Button  type="primary" icon="search" onClick={this.handleSearch}>搜索</Button>
                {/*<a onClick={this.openHighSearch}  style={{ marginLeft: 20 }}>高级搜索</a>*/}
              </span>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 6 }}>
              <Row type="flex" justify="end">
                <span className={styles.unSpan1}>
                  {this.props.controlList.exp_imp? <Button onClick={this.handleImportVisible}><Icon type="upload" /> 导入</Button>:null}
                </span>
                <span className={styles.unSpan1}>
                  {
                    this.props.controlList.exp_del?
                      (selectedRowKeys.length>0? <Popconfirm
                        okText="确定"
                        cancelText="取消"
                        title="是否要删除选中的用户信息?"
                        placement="bottomRight"
                        onConfirm={this.moreRowDel}
                      >
                        <Button type="primary" className={styles.allDelete} loading={delLoading} style={{ marginLeft: 10 }}>删除</Button>
                      </Popconfirm>:null):null
                  }
                  {this.props.controlList.exp_add? <Button type="primary" icon="plus" onClick={this.showInfoModal} style={{ marginLeft: 10 }}>添加</Button>:null}
                </span>
              </Row>
            </Col>
          </Row>
          {this.state.openHighSearch?<Row>
            <Row>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <FormItem
                  {...formItemLayout}
                  label="网点编号"
                  style={{ width: "100%" }}
                >
                  {getFieldDecorator('statCode', {
                    rules: [{
                      required: false, message: '请输入网点编号!',
                    }],
                  })(
                    <Input
                      style={{width:"100%"}}
                      placeholder="请输入网点编号"
                      // suffix={dotName ? <Icon type="close" onClick={this.emptyDotName} /> : null}
                      // onChange={this.dotNameValueChange}
                    />
                  )}
                </FormItem>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <FormItem
                  {...formItemLayout}
                  label="网点地址"
                  style={{ width: "100%" }}
                >
                  {getFieldDecorator('address', {
                    rules: [{
                      required: false, message: '请输入网点地址!',
                    }],
                  })(
                    <Input
                      style={{width:"100%"}}
                      placeholder="请输入网点地址"
                      // suffix={dotAddressValue ? <Icon type="close" onClick={this.emptyDotAddress} /> : null}
                      // onChange={this.dotAddressValueChange}
                    />
                  )}
                </FormItem>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <FormItem
                  {...formItemLayout}
                  label="经营管理企业"
                  style={{ width: "100%" }}
                >
                  {getFieldDecorator('enterprise', {
                    rules: [{
                      required: false, message: '请输入经营管理企业!',
                    }],
                  })(
                    <Input
                      style={{width:"100%"}}
                      placeholder="请输入经营管理企业"
                      // suffix={dotAddressValue ? <Icon type="close" onClick={this.emptyDotAddress} /> : null}
                      // onChange={this.dotAddressValueChange}
                    />
                  )}
                </FormItem>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <FormItem
                  {...formItemLayout}
                  label="网点联系人"
                  style={{ width: "100%" }}
                >
                  {getFieldDecorator('contact', {
                    rules:[{
                      required:  false, message:'请输入网点联系人!',
                    }],
                  })(
                    <Input
                      style={{width:"100%"}}
                      placeholder="请输入网点联系人"
                      // suffix={dotContactsValue ? <Icon type="close" onClick={this.emptyDotContacts} /> : null}
                      // onChange={this.dotContactsValueChange}
                    />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>

              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <FormItem
                  {...formItemLayout}
                  label="联系人电话"
                  style={{ width: "100%" }}
                >
                  {getFieldDecorator('tel', {
                    rules: [{
                      required: false, message: '请输入联系人电话!',
                    }],
                  })(
                    <Input
                      style={{width:"100%"}}
                      placeholder="请输入联系人电话"
                      // suffix={dotTelValue ? <Icon type="close" onClick={this.emptyDotTel} /> : null}
                      // onChange={this.dotTelValueChange}
                    />
                  )}
                </FormItem>
              </Col>
            </Row>
          </Row>:null}
        </Form>
      </div>
    );
    return (
      <Card className={styles.content}>
        {
          this.state.importVisible?<ImportModal visible={this.state.importVisible} changeVisible={this.handleCloseVisible } setSelectedRowKeys={this.setSelectedRowKeys} getSearch={this.getSearch}/>:null
        }
        {
          infoVisible?<ExpAddModal expressVisible={this.expressVisible} ExpressModal={infoVisible} setSelectedRowKeys={this.setSelectedRowKeys} getSearch={this.getSearch}/>:null
        }
        {
          !showSearch?normalSearch:<ExpHighSearch showSearch={this.highSearch} getHighSearch={this.getHighSearch}/>
        }
        {
          this.state.editVisible?<ExpEditModal expressEditVisible={this.expressEditVisible} showExpressEditModal={this.state.editVisible} rowData={rowData} getSearch={this.getSearch} setSelectedRowKeys={this.setSelectedRowKeys}/>:null
        }
        <Table
          dataSource={expressList}
          bordered
          columns={columns}
          rowSelection={rowSelection}
          loading={expressLoading}
          rowKey="sid"
          scroll={{x:true}}
          pagination={pagination}
          onRow={(record) => {
            return { onClick: (event) => {
                // console.log("record",record);
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
        />
      </Card>
    );
  }
}

