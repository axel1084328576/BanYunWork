import React,{Component} from 'react';
import {Card,Table,Button,Row,Col,Input,Icon,Popconfirm,Select,Form,Upload,Divider} from 'antd';
import {connect} from 'dva';
import ExpHighSearch from '../../components/ConvenientService/PostboxManage/HighSearch';
import PostboxAddModal from '../../components/ConvenientService/PostboxManage/AddModal';
import ExpEditModal from '../../components/ConvenientService/PostboxManage/EditModal';
import ImportModal from '../../components/ConvenientService/PostboxManage/ImportModal';
import styles from './allStyles.less';

const Option = Select.Option;

@connect(({ postboxManage,loading,businessinfo,getPagePage}) => {
  const {mailList,pageSize,total,controlList,page}=postboxManage;
  const {pagePath}=getPagePage;
  const {companyList}=businessinfo;
  return{
    page,
    pagePath,
    mailList,
    pageSize,
    total,
    companyList,
    controlList,
    getLoading: loading.effects['postboxManage/List'],
    delLoading: loading.effects['postboxManage/Del'],
  }
})

@Form.create()
export default class PostboxManage extends Component{
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
      title: '信筒信箱编号',
      dataIndex: 'boxNo',
      key:'boxNo',
    }, {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: '网点经纬度',
      children:[{
        title:'经度',
        dataIndex: 'longitude',
        key: 'longitude',
      },{
        title:'纬度',
        dataIndex: 'latitude',
        key: 'latitude',
      }]
    }, {
      title: '收信时间',
      dataIndex: 'collectionTime',
      key: 'collectionTime',
    }, {
      title: '维护人信息',
      dataIndex: 'contact',
      key: 'contact',
    }, {
      title: '类别',
      dataIndex: 'category',
      key: 'category',
    },{
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },{
      title:'',
      dataIndex: 'sid',
      key: 'sid',
      // width:110,
      // fixed: 'right',
      render: (text,record) => {
        return (
          <span>
            {this.props.controlList.pbox_mod?<a href="javascript:" onClick={()=>{this.showEditModal(record)}}>修改</a>:null}
            {this.props.controlList.pbox_mod && this.props.controlList.pbox_del?<Divider type="vertical" />:null}
            {
              this.props.controlList.pbox_del?
                (this.props.mailList.length>= 1
                  ?(
                    <Popconfirm title="是否要删除选中的用户信息?" placement="bottomRight" onConfirm={()=>{this.rowDel(record)}}>
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
      type:"postboxManage/Control",
      payload:{
        menuCode:this.props.pagePath
      }
    })
  }

  componentDidMount(){
    const { dispatch} = this.props;
    const form = this.props.form;
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'postboxManage/List',
          payload:{
            ...values,
            page: 1,
            pageSize:10,
            token:sessionStorage.getItem('sys-token'),
          }
        });
      }
    })
    this.props.dispatch({
      type:'businessinfo/companyList',
      callback:(value)=>{
        if(value.length==1){
          this.setState({compNo:value[0].compNo})
        }
      }
    });
  }

  rowDel=(key) => {
    let searchItem;
    if(this.props.getSearch){
      searchItem=this.props.getSearch()
    }
    let data={
      opType:"del",
      ids:key.sid,
      token:sessionStorage.getItem('sys-token'),
    };
    const {dispatch}=this.props;
    dispatch({
      type:'postboxManage/Del',
      payload:{
        data:data,
        searchItem:searchItem,
      },
    });
    this.setSelectedRowKeys();
  };

  moreRowDel = () => {
    const {selectedRows,selectedRowKeys}=this.state;
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
      type:'postboxManage/Del',
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
    // let oInput = document.querySelector('#mailId');
    // let onInput = oInput.value.trim();
    const {nameValue}=this.state;
    const { dispatch } = this.props;
    const form = this.props.form;
    form.validateFields((err, values) => {
      if (!err) {
        if(values.status==null){
          values.status=undefined
        }
        if(values.boxNo==""){
          values.boxNo=undefined
        }
        dispatch({
          type: 'postboxManage/List',
          payload:{
            ...values,
            page: 1,
            pageSize:10,
            token:sessionStorage.getItem('sys-token'),
          },
        });
        this.setSelectedRowKeys();
      }
    })
  };

  getSearch=()=>{
    let data;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if(values.status==null){
          values.status=undefined
        }
        if(values.boxNo==""){
          values.boxNo=undefined
        }
        data=values
      }
    });
    return data;
  };

  setSelectedRowKeys=()=>{
    this.setState({selectedRowKeys:[]})
  };

  postboxVisible=(value)=>{
    this.setState({
      infoVisible: value,
    });
  };

  postboxEditVisible=(value)=>{
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
      if (!err) {
        if(values.status==null){
          values.status=undefined
        }
        if(values.boxNo==""){
          values.boxNo=undefined
        }
        this.props.dispatch({
          type:'postboxManage/List',
          payload:{
            page:current,
            pageSize:size,
            ...values,
            token:sessionStorage.getItem('sys-token'),
          }
        });
        this.setSelectedRowKeys();
      }
    })
  };

  tableOnShowSizeChange=(page, pageSize)=>{
    const form = this.props.form;
    form.validateFields((err, values) => {
      if (!err) {
        if(values.status==null){
          values.status=undefined
        }
        if(values.boxNo==""){
          values.boxNo=undefined
        }
        this.props.dispatch({
          type:'postboxManage/List',
          payload:{
            page,
            pageSize,
            ...values,
            token:sessionStorage.getItem('sys-token'),
          }
        });
        this.setSelectedRowKeys();
      }
    })
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
    const {columns,showSearch,nameValue,infoVisible,loading,selectedRows,rowData,editVisible,selectedRowKeys}=this.state;
    const { mailList,getLoading,dataSource,delLoading,searchLoading,pageSize,total}=this.props;
    const { getFieldDecorator } = this.props.form;
    const FormItem = Form.Item;
    mailList.map((item)=>{item.key=item.sid});
    const rowSelection = {
      selectedRowKeys:selectedRowKeys,
      onChange: this.onChanged,
    };
    const uploadProps = {
      name: 'file',
      action: '//jsonplaceholder.typicode.com/posts/',
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          // console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
    const pagination={
      current:this.props.page,
      pageSize,
      total,
      showSizeChanger:true,
      showTotal:(total,range)=>`共${total}条记录`,
      onChange:this.tableOnChange,
      onShowSizeChange:this.tableOnShowSizeChange,
      // pageSizeOptions:['1','5','10'],
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
                label="信筒信箱编号"
                {...formItemLayout}
                style={{ width: "100%" }}
              >
                {getFieldDecorator("boxNo", {
                  rules: [{ required: false }]
                })(
                  <Input
                    id="mailId"
                    placeholder="请输入信筒信箱编号"
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
            <Col xs={{ span: 12 }} sm={{ span: 12 }} lg={{ span: 6,offset:6 }}>
              <Row type="flex" justify="end">
                <span className={styles.unSpan1}>
                   {this.props.controlList.pbox_imp?<Button onClick={this.handleImportVisible}><Icon type="upload" /> 导入</Button>:null}
                </span>
                <span className={styles.unSpan1}>
                  {
                    this.props.controlList.pbox_del?
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
                  {this.props.controlList.pbox_add?<Button type="primary" icon="plus" onClick={this.showInfoModal} style={{ marginLeft: 10 }}>添加</Button>:null}
                </span>
              </Row>
            </Col>
          </Row>
          {this.state.openHighSearch?<Row>
            <Row>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <FormItem
                  {...formItemLayout}
                  label="地址"
                  style={{ width: "100%" }}
                >
                  {getFieldDecorator('address', {
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
                  label="收信时间"
                  style={{ width: "100%" }}
                >
                  {getFieldDecorator('collectionTime', {
                    rules: [{
                      required: false, message: '请输入收信时间!',
                    }],
                  })(
                    <Input
                      style={{ width: "100%" }}
                      placeholder="请输入收信时间"
                      // suffix={dotContactsValue ? <Icon type="close" onClick={this.emptyDotContacts} /> : null}
                      // onChange={this.dotContactsValueChange}
                    />
                  )}
                </FormItem>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <FormItem
                  {...formItemLayout}
                  label="维护人信息"
                  style={{ width: "100%" }}
                >
                  {getFieldDecorator('contact', {
                    rules: [{
                      required: false, message: '请输入维护人信息!',
                    }],
                  })(
                    <Input
                      style={{ width: "100%" }}
                      placeholder="请输入维护人信息"
                      // suffix={dotTelValue ? <Icon type="close" onClick={this.emptyDotTel} /> : null}
                      // onChange={this.dotTelValueChange}
                    />
                  )}
                </FormItem>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <FormItem
                  {...formItemLayout}
                  label="类别"
                  style={{ width: "100%" }}
                >
                  {getFieldDecorator('category', {
                    rules: [{
                      required: false, message: '请输入类别!',
                    }],
                  })(
                    <Input
                      style={{ width: "100%" }}
                      placeholder="请输入类别"
                      // suffix={dotTelValue ? <Icon type="close" onClick={this.emptyDotTel} /> : null}
                      // onChange={this.dotTelValueChange}
                    />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <FormItem
                  {...formItemLayout}
                  label="状态"
                  style={{ width: "100%" }}
                >
                  {getFieldDecorator('status', {
                    initialValue:null,
                    rules: [{
                      required:false, message: '请输入状态!',
                    }],
                  })(
                    <Select style={{ width: "100%" }}>
                      <Option value={null}>全部</Option>
                      <Option value="1">在用</Option>
                      <Option value="2">停用</Option>
                      <Option value="3">报修</Option>
                      <Option value="4">报废</Option>
                    </Select>
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
          this.state.importVisible?<ImportModal visible={this.state.importVisible} changeVisible={this.handleCloseVisible} getSearch={this.getSearch} setSelectedRowKeys={this.setSelectedRowKeys}/>:null
        }
        {
          infoVisible?<PostboxAddModal postboxVisible={this.postboxVisible} showPostboxModal={infoVisible} getSearch={this.getSearch} setSelectedRowKeys={this.setSelectedRowKeys}/>:null
        }
        {
          !showSearch?normalSearch:<ExpHighSearch showSearch={this.highSearch} getHighSearch={this.getHighSearch}/>
        }
        {
          editVisible?<ExpEditModal postboxEditVisible={this.postboxEditVisible}  showPostboxEditModal={this.state.editVisible} rowData={rowData} getSearch={this.getSearch} setSelectedRowKeys={this.setSelectedRowKeys}/>:null
        }
        <Table
          bordered
          dataSource={mailList}
          columns={columns}
          rowSelection={rowSelection}
          loading={getLoading}
          rowKey="sid"
          pagination={pagination}
          scroll={{x:true}}
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

