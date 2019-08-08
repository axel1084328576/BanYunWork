import React,{Component} from 'react';
import {Card,Table,Button,Row,Col,Input,Icon,Popconfirm,Select,Form,Upload,Divider} from 'antd';
import {connect} from 'dva';
import ExpHighSearch from '../../components/ConvenientService/PostalNetwork/HighSearch';
import PostalAddModal from '../../components/ConvenientService/PostalNetwork/AddModal';
import ExpEditModal from '../../components/ConvenientService/PostalNetwork/EditModal';
import ImportModal from '../../components/ConvenientService/PostalNetwork/ImportModal';
import styles from './allStyles.less';

const Option = Select.Option;

@connect(({ postalNetwork,loading,getPagePage}) => {
  const {postList,pageSize,total,controlList,page}=postalNetwork;
  const {pagePath}=getPagePage;
  return{
    page,
    postList,
    pageSize,
    total,
    controlList,
    pagePath,
    postalNetworkLoading: loading.effects['postalNetwork/List'],
    delLoading: loading.effects['postalNetwork/Del'],
  }
})

@Form.create()
export default class PostalNetwork extends Component{
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
      // width:140,
    },{
      title: '网点名称',
      dataIndex: 'statName',
      key:'statName',
      // width:200,
    }, {
      title: '网点地址',
      dataIndex: 'address',
      key: 'address',
      // width:400,
    },{
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
    },{
      title: '网点联系人',
      dataIndex: 'contact',
      key: 'contact',
      // width:120,
    },{
      title: '联系人电话',
      dataIndex: 'tel',
      key: 'tel',
      // width:140,
    }, {
      title: '排序',
      dataIndex: 'norder',
      key: 'boxOrder',
      // width:100,
    },{
      title: '备注',
      dataIndex: 'notes',
      key: 'notes',
    },{
      title: '',
      dataIndex: 'operation',
      key:'operation',
      // width:110,
      // fixed: 'right',
      render: (text, record) => {
        return (
          <span>
            {this.props.controlList.post_mod?<a href="javascript:" onClick={()=>{this.showEditModal(record)}}>修改</a>:null}
            {this.props.controlList.post_mod && this.props.controlList.post_del?<Divider type="vertical" />:null}
            {
              this.props.controlList.post_del?
              (this.props.postList.length>= 1
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
      type:"postalNetwork/Control",
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
          type: 'postalNetwork/List',
          payload:{
            page: 1,
            pageSize:10,
            ...values,
            token:sessionStorage.getItem('sys-token'),
          }
        });
      }
    })

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
    const {dispatch}=this.props;
    dispatch({
      type:'postalNetwork/Del',
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
      type:'postalNetwork/Del',
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

  handleEditOk = () => {
    this.setState({  editVisible: false });
  };

  handleEditCancel = () => {
    this.setState({ editVisible: false});
  };

  showInfoModal=()=>{
    this.setState({
      infoVisible: true,
    });
  };

  handleSearch = () => {
    // let oInput = document.querySelector('#postName');
    // let onInput = oInput.value.trim();
    const { dispatch } = this.props;
    const form = this.props.form;
    form.validateFields((err, values) => {
      if (!err) {
        if(values.statName==""){
          values.statName=undefined
        }
        dispatch({
          type: 'postalNetwork/List',
          payload:{
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
        data=values
      }
    });
    return data;
  };

  setSelectedRowKeys=()=>{
    this.setState({selectedRowKeys:[]})
  };

  postalVisible=(value)=>{
    this.setState({
      infoVisible: value,
    });
  };

  postalEditVisible=(value)=>{
    this.setState({
      editVisible: value,
    });
  };

  tableOnChange=(current, size)=>{
    const {nameValue,highSearchValue}=this.state;
    const form = this.props.form;
    form.validateFields((err, values) => {
      if (!err) {
        if(values.statName==""){
          values.statName=undefined
        }
        this.props.dispatch({
          type:'postalNetwork/List',
          payload:{
            page:current,
            pageSize:size,
            ...values,
            token:sessionStorage.getItem('sys-token'),
          }
        });
        this.setSelectedRowKeys();
      }
    });
  };

  tableOnShowSizeChange=(page, pageSize)=>{
    const form = this.props.form;
    form.validateFields((err, values) => {
      if (!err) {
        if(values.statName==""){
          values.statName=undefined
        }
        this.props.dispatch({
          type:'postalNetwork/List',
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
    const {postList,postalNetworkLoading,delLoading,searchLoading,pageSize,total}=this.props;
    const { getFieldDecorator } = this.props.form;
    const FormItem = Form.Item;
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
    // console.log("this.pros.controll",this.props.controlList);
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
                    id="postName"
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
                    style={{ width: "100%" }}
                    placeholder="请输入网点编号"
                    // suffix={dotName ? <Icon type="close" onClick={this.emptyDotName} /> : null}
                    // onChange={this.dotNameValueChange}
                  />
                )}
              </FormItem>
            </Col>
            <Col xs={{ span: 12 }} sm={{ span: 12 }} lg={{ span: 6}}>
              <span className={styles.unSpan}>
                <a onClick={this.hanldeHighSearch} style={{ marginRight: 20 }}>{this.state.openHighSearch?"收起":"展开"}</a>
                <Button  type="primary" icon="search"  onClick={this.handleSearch}>搜索</Button>
                {/*<a onClick={this.openHighSearch} style={{ marginLeft: 20 }}>高级搜索</a>*/}
              </span>
            </Col>
            <Col xs={{ span: 12 }} sm={{ span: 12 }} lg={{span: 6 }}>
              <Row type="flex" justify="end">
                <span className={styles.unSpan1}>
                  {this.props.controlList.post_imp? <Button onClick={this.handleImportVisible}><Icon type="upload" /> 导入</Button>:null}
                </span>
                <span className={styles.unSpan1}>
                  {
                    this.props.controlList.post_del?
                      ( selectedRowKeys.length>0? <Popconfirm
                        okText="确定"
                        cancelText="取消"
                        title="是否要删除选中的用户信息?"
                        placement="bottomRight"
                        onConfirm={this.moreRowDel}
                      >
                        <Button type="primary" className={styles.allDelete} loading={delLoading} style={{ marginLeft: 10 }}>删除</Button>
                      </Popconfirm>:null):null
                  }
                  {this.props.controlList.post_add?<Button type="primary" icon="plus" onClick={this.showInfoModal} style={{ marginLeft: 10 }}>添加</Button>:null}
                </span>
              </Row>
            </Col>
          </Row>
          {this.state.openHighSearch?<Row>
            <Row>
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
                      style={{ width: "100%" }}
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
                  label="网点联系人"
                  style={{ width: "100%" }}
                >
                  {getFieldDecorator('contact', {
                    rules: [{
                      required: false, message: '请输入网点联系人!',
                    }],
                  })(
                    <Input
                      style={{ width: "100%" }}
                      placeholder="请输入网点联系人"
                      // suffix={dotContactsValue ? <Icon type="close" onClick={this.emptyDotContacts} /> : null}
                      // onChange={this.dotContactsValueChange}
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
          this.state.importVisible?<ImportModal visible={this.state.importVisible} changeVisible={this.handleCloseVisible} getSearch={this.getSearch} setSelectedRowKeys={this.setSelectedRowKeys}/>:null
        }
        {
          infoVisible?<PostalAddModal postalVisible={this.postalVisible} showPostalModal={infoVisible} getSearch={this.getSearch} setSelectedRowKeys={this.setSelectedRowKeys}/>:null
        }
        {
          !showSearch?normalSearch:<ExpHighSearch showSearch={this.highSearch} getHighSearch={this.getHighSearch}/>
        }
        {
          this.state.editVisible?<ExpEditModal postalEditVisible={this.postalEditVisible} showPostalEditModal={this.state.editVisible} rowData={rowData} getSearch={this.getSearch} setSelectedRowKeys={this.setSelectedRowKeys}/>:null
        }
        <Table
          bordered
          dataSource={postList}
          columns={columns}
          rowSelection={rowSelection}
          loading={postalNetworkLoading}
          scroll={{x:true}}
          rowKey="sid"
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

