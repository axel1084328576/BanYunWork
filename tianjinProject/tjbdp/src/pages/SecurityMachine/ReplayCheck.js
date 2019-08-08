import React, { Component } from "react";
import {
  Card,
  Table,
  Button,
  Row,
  Col,
  Input,
  Form,
  Popconfirm,
  Select,
  TreeSelect,
  InputNumber,
  Modal,
  Icon,
  Divider
} from "antd";
import { connect } from "dva";
import download from "downloadjs";
import Work from '../../components/PublicWork/PublicWork'
import HighSearch from "../../components/SecurityMachine/HighSearch";
import AddModal from "../../components/SecurityMachine/AddModal";
import EditModal from "../../components/SecurityMachine/EditModal";
import ImportModal from "../../components/SecurityMachine/ImportModal";
import SelectExpree from '../../components/SecurityMachine/SelectExpree';
import styles from "./ReplayCheck.less";

const {Option}=Select;
const status=['在用','停用','报修','报废'];

@connect(({ replayCheck, loading,expressNetwork,getPagePage,businessinfo }) => {
  const { checkList, selectList, pageSize, total,controlList,page } = replayCheck;
  const { expressList } = expressNetwork;
  const {pagePath}=getPagePage;
  const {companyList}=businessinfo;
  return {
    page,
    expressList,
    selectList,
    checkList,
    pageSize,
    total,
    controlList,
    pagePath,
    companyList,
    replayLoading: loading.effects["replayCheck/List"],
    delLoading: loading.effects["replayCheck/Del"]
  };
})

@Form.create()
export default class ReplayCheck extends Component {
  state = {
    editVisible: false,
    showSearch: false,
    addVisible: false,
    selectedRows:"",
    selectedRowKeys:[],
    idValue1:"",
    // modalVisible: false,
    importVisible:false,
    rowData: "",
    highSearchValue:{},
    openHighSearch:false,
    expVisible:false,
    stationId:null,
    compNo:null,
    columns: [{
      title: "安检机编号",
      dataIndex: "machNo",
      key: "machNo",
      // width:130,
    }, {
      title: "安检机厂家",
      dataIndex: "producter",
      key: "producter",
      // width:120,
    }, {
      title: "安检数量",
      dataIndex: "amount",
      key: "amount",
      // width:100,
    }, {
      title: "安检机位置",
      children: [{
        title: "经度",
        dataIndex: "longitude",
        key: "longitude",
        // width:100,
      }, {
        title: "纬度",
        dataIndex: "latitude",
        key: "latitude",
        // width:100,
      }],
    }, {
      title: "地址",
      dataIndex: "address",
      key: "address",
      // width:200,
    }, {
      title: "安检机品牌",
      dataIndex: "brand",
      key: "brand",
      // width:120,
    },{
      title: "购买时间",
      dataIndex: "buyDate",
      key: "buyDate",
      // width:120,
    },{
      title: "快递企业",
      dataIndex: "compNo",
      key: "compNo",
      // width:100,
    },{
      title: "公司名称",
      dataIndex: "enterpriseName",
      key: "enterpriseName",
      // width:120,
    },{
      title: "牌照",
      dataIndex: "licencePlate",
      key: "licencePlate",
      // width:100,
    },{
      title: "安检机名称",
      dataIndex: "machName",
      key: "machName",
      // width:120,
    },{
      title: "安检机型号",
      dataIndex: "model",
      key: "model",
      // width:120,
    },{
      title: "使用年限",
      dataIndex: "serviceLife",
      key: "serviceLife",
      // width:100,
    }, {
      title: "联系人",
      dataIndex: "contact",
      key: "contact",
      // width:100,
    }, {
      title: "联系电话",
      dataIndex: "tel",
      key: "tel",
      // width:140,
    }, {
      title: "状态",
      dataIndex: "status",
      key: "status",
      // width:100,
      render: (text, record) => (
        <span>{status[record.status]}</span>
      ),
    }, {
      title: "归属网点",
      dataIndex: "workStation.statName",
      key: "workStation.statName",
    }, {
      title: "",
      dataIndex: "scVideo",
      key: "scVideo",
      render: (text, record) => (
        <div>
          {this.props.controlList.sec_mod? <a href="javascript:" onClick={() => {
            this.showEditModal(record);
          }}>修改</a>:null}
          {this.props.controlList.sec_mod && this.props.controlList.sec_del?<Divider type="vertical" />:null}
          {
            this.props.controlList.sec_del?
              (this.props.checkList.length >= 1
                ? (
                  <Popconfirm title="是否要删除选中的用户信息?" placement="bottomRight" onConfirm={() => {
                    this.rowDel(record);
                  }}>
                    <a href="javascript:;" style={{ color: "#f5222d" }}>删除</a>
                  </Popconfirm>
                ) : null):null
          }
        </div>
      )
    }]
  };

  componentWillMount(){
    // console.log("this.props.pagePath",this.props.pagePath);
    const { dispatch } = this.props;
    dispatch({
      type:"replayCheck/Control",
      payload:{
        menuCode:this.props.pagePath,
        token:sessionStorage.getItem('sys-token'),
      }
    })
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const form = this.props.form;
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: "replayCheck/List",
          payload: {
            ...values,
            page: 1,
            pageSize:10,
            token: sessionStorage.getItem("sys-token")
          }
        });
      }
    });
    dispatch({
      type: 'expressNetwork/List',
      payload:{
        token:sessionStorage.getItem('sys-token'),
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

  rowDel = (key) => {
    let searchItem=this.getSearch();
    let data={
      opType:"del",
      ids: key.sid,
      token: sessionStorage.getItem("sys-token")
    };
    const { dispatch } = this.props;
    dispatch({
      type: "replayCheck/Del",
      payload:{
        data:data,
        searchItem:searchItem,
      },
    });
  };

  moreRowDel = () => {
    const { selectedRows,selectedRowKeys} = this.state;
    // const delMoreRows = [];
    // selectedRows.map((item) => {
    //   delMoreRows.push(item.sid);
    // });
    let searchItem=this.getSearch();
    let data={
      ids: selectedRowKeys.join(","),
      opType: "del",
      token: sessionStorage.getItem("sys-token")
    };
    const { dispatch } = this.props;
    dispatch({
      type: "replayCheck/Del",
      payload:{
        data:data,
        searchItem:searchItem,
      },
    });
  };

  smEditVisible = (value) => {
    this.setState({
      editVisible: value
    });
  };

  smVisible = (value) => {
    this.setState({
      addVisible: value
    });
  };

  showEditModal = (record) => {
    this.setState({
      editVisible: true,
      rowData: record
    });
  };

  showAddModal = () => {
    this.setState({
      addVisible: true
    });
  };

  handleSave = () => {
    download("https://media.w3.org/2010/05/sintel/trailer_hd.mp4", "mppp4");
  };

  emptyScIdHigh = () => {
    this.setState({ idValue1: "" });
  };

  scIdValueChangeHigh = (value) => {
    this.setState({ idValue1: value.target.value });
  };

  openHighSearch = () => {
    this.setState({ showSearch: !this.state.showSearch });
  };

  highSearch = (value) => {
    this.setState({ showSearch: value });
  };

  // showModal = () => {
  //   this.setState({
  //     modalVisible: true
  //   });
  // };

  handleOk = (e) => {
    download("https://media.w3.org/2010/05/sintel/trailer_hd.mp4", "mppp4");
  };

  // handleCancel = (e) => {
  //   // console.log(e);
  //   this.setState({
  //     modalVisible: false
  //   });
  // };

  setSelectedRowKeys=()=>{
    this.setState({selectedRowKeys:[]})
  };

  handleSearch = () => {
    const form = this.props.form;
    form.validateFields((err, values) => {
      if (!err) {
        let value={};
        this.state.openHighSearch?value={
          machNo:values.machNo,
          compNo:this.state.compNo,
          stationId:this.state.stationId,
          producter:values.producter,
          address:values.address,
          contact:values.contact,
          tel:values.tel,
          licencePlate:values.licencePlate1
        }:value={
          machNo:values.machNo,
          compNo:this.state.compNo,
        };
        if(value.compNo==null){
          value.compNo=undefined
        }
        if(value.stationId==null){
          value.stationId=undefined
        }
        this.props.dispatch({
          type: "replayCheck/List",
          payload: {
            ...value,
            page: 1,
            pageSize:10,
            token: sessionStorage.getItem("sys-token")
          }
        });
        this.setState({
          selectedRowKeys:[]
        })
      }
    });
    const { dispatch } = this.props;
  };

  getSearch=()=>{
    let data;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let value={};
        this.state.openHighSearch?value={
          machNo:values.machNo,
          compNo:this.state.compNo,
          stationId:this.state.stationId,
          producter:values.producter,
          address:values.address,
          contact:values.contact,
          tel:values.tel,
          licencePlate:values.licencePlate1
        }:value={
          machNo:values.machNo,
          compNo:this.state.compNo,
        };
        if(value.compNo==null){
          value.compNo=undefined
        }
        if(value.stationId==null){
          value.stationId=undefined
        }
        data=value
      }
    });
    return data;
  };

  getHighSearch=(value)=>{
    this.setState({highSearchValue:value})
  };

  tableOnChange = (current, size) => {
    const form = this.props.form;
    form.validateFields((err, values) => {
      if (!err) {
        values.stationId=this.state.stationId;
        this.props.dispatch({
          type: "replayCheck/List",
          payload: {
            page: current,
            pageSize:size,
            ...values,
            token:sessionStorage.getItem('sys-token'),
          }
        });
        this.setSelectedRowKeys();
      }
    });
  };

  tableOnShowSizeChange = (page, pageSize) => {
    form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: "replayCheck/List",
          payload: {
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

  hanldeHighSearch = () => {
    this.setState({
      openHighSearch:!this.state.openHighSearch,
      stationId:null
    })
  };

  timestampToTime=(timestamp)=>{
    if(timestamp!=null && timestamp!=undefined){
      let date = new Date(timestamp);
      let year = date.getFullYear();
      let month = date.getMonth()+1;
      let day = date.getDate();

      month = month < 10 ? "0"+month:month;
      day = day < 10 ? "0"+day:day;
      return timestamp = year+'-'+month+'-'+day;
    }else {
      return null
    }
  };

  onChanged=(selectedRowKeys, selectedRows) => {
    this.setState({ selectedRows: selectedRows,selectedRowKeys:selectedRowKeys})
  };

  inputHandle=()=>{
    this.setState({expVisible:true})
  };

  setExpVisible=(value,value1)=>{
    // console.log("value1",value1);
    this.setState({
      expVisible:value
    });
    if(value1!=undefined && value!=null){
      this.props.form.setFieldsValue({
        compNo:value1.compNa,
        stationId:value1.statName,
      });
      this.setState({
        stationId:value1.sid,
        compNo:value1.compNo,
      })
    }
  };

  selectOnChange=(value)=>{
    this.setState({
      compNo:value,
    })
  };

  render() {
    const { dataSource, columns, showSearch, idValue1, selectedRows, addVisible, rowData,selectedRowKeys } = this.state;
    const { checkList, replayLoading, delLoading, pageSize, total,expressList } = this.props;
    const children = expressList.map((item) => {
      return <Option key={item.sid} value={item.sid}>{item.statName}</Option>;
    });
    const { getFieldDecorator } = this.props.form;
    const FormItem = Form.Item;
    const rowSelection = {
      selectedRowKeys:selectedRowKeys,
      onChange:this.onChanged,
    };

    const companyList=this.props.companyList.map((item)=>{
      return <Option key={item.compNo} value={item.compNo}>{item.companyName}</Option>;
    });

    const pagination = {
      current:this.props.page,
      pageSize,
      total,
      showSizeChanger: true,
      showTotal: (total, range) => `共${total}条记录`,
      onChange: this.tableOnChange,
      onShowSizeChange: this.tableOnShowSizeChange,
      // pageSizeOptions:['2','5','10']
    };
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
    // console.log("this.props.controlList",this.props.controlList)
    const normalSearch = (
      <div className={styles.searchRow}>
        <Form layout="inline">
          <Row>
            <Col sm={{ span: 24 }} lg={{ span: 6 }}>
              <FormItem
                label="安检机编号"
                {...formItemLayout1}
                style={{ width: "100%" }}
              >
                {getFieldDecorator("machNo", {
                  rules: [{ required: false }]
                })(
                  <Input
                    className={styles.formItemWidth}
                    id="sid"
                    placeholder="请输入安检机编号"
                    // value={idValue1}
                    // suffix={idValue1 ? <Icon type="close" onClick={this.emptyScIdHigh} /> : null}
                    onChange={this.scIdValueChangeHigh}
                  />
                )}
              </FormItem>
            </Col>
            <Col sm={{ span: 24 }} lg={{ span: 6 }}>
              <FormItem
                label="快递企业"
                {...formItemLayout1}
                style={{ width: "100%" }}
              >
                {getFieldDecorator("compNo", {
                  initialValue:this.props.companyList.length==1?this.props.companyList[0].compNo:null,
                  rules: [{ required: false }]
                })(
                  this.props.companyList.length==1?<Select  className={styles.formItemWidth1} onChange={this.selectOnChange}>
                      {companyList}
                    </Select>:
                  <Select  className={styles.formItemWidth1} onChange={this.selectOnChange}>
                    <Option key={null} value={null}>全部</Option>
                    {companyList}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col xs={{ span: 12 }} sm={{ span: 12 }} lg={{ span: 6 }}>
              <span className={styles.unSpan}>
                 <a onClick={this.hanldeHighSearch} style={{ marginRight: 20 }}>{this.state.openHighSearch?"收起":"展开"}</a>
                  <Button type="primary" icon="search" onClick={this.handleSearch}>搜索</Button>
                  {/*<a onClick={this.openHighSearch} style={{ marginLeft: 20 }}>高级搜索</a>*/}
                </span>
            </Col>
            <Col xs={{ span: 12 }} sm={{ span: 12 }} lg={{ span: 6 }}>
              <Row type="flex" justify="end">
                 <span className={styles.unSpan1}>
                   <Button onClick={this.handleImportVisible}><Icon type="upload" /> 导入</Button>
                </span>
                <span className={styles.unSpan1}>
                  {
                    this.props.controlList.sec_del?
                      ( selectedRowKeys.length> 0 ? <Popconfirm
                        okText="确定"
                        cancelText="取消"
                        title="是否要删除选中的用户信息?"
                        placement="bottomRight"
                        onConfirm={this.moreRowDel}
                      >
                        <Button className={styles.allDelete} type="primary" loading={delLoading} style={{ marginLeft: 10 }}>删除</Button>
                      </Popconfirm> : null):null
                  }
                  {this.props.controlList.sec_add? <Button style={{ marginLeft: 10 }} type="primary" icon="plus" onClick={this.showAddModal}>添加</Button>:null}
                </span>
              </Row>
            </Col>
          </Row>
          {this.state.openHighSearch? <Row>
            <Row>
              <Col sm={{ span: 24 }} lg={{ span:6}}>
                <FormItem
                  {...formItemLayout1}
                  label="安检机厂家"
                  style={{ width: "100%" }}
                >
                  {getFieldDecorator("producter", {
                    rules: [{
                      required: false, message: "请输入安检机厂家!"
                    }]
                  })(
                    <Input
                      className={styles.formItemWidth1}
                      placeholder="请输入安检机厂家"
                    />
                  )}
                </FormItem>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span:6}}>
                <FormItem
                  {...formItemLayout1}
                  label="地址"
                  style={{ width: "100%" }}
                >
                  {getFieldDecorator("address", {
                    rules: [{
                      required: false, message: "请输入地址!"
                    }]
                  })(
                    <Input
                      className={styles.formItemWidth1}
                      placeholder="请输入地址"
                    />
                  )}
                </FormItem>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span:6}}>
                <FormItem
                  {...formItemLayout1}
                  label="联系人"
                  style={{ width: "100%" }}
                >
                  {getFieldDecorator("contact", {
                    rules: [{
                      required: false, message: "请输入联系人!"
                    }]
                  })(
                    <Input
                      className={styles.formItemWidth1}
                      placeholder="请输入联系人"
                    />
                  )}
                </FormItem>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span:6}}>
                <FormItem
                  {...formItemLayout1}
                  label="联系电话"
                  style={{ width: "100%" }}
                >
                  {getFieldDecorator("tel", {
                    rules: [{
                      required: false, message: "请输入联系电话!"
                    }]
                  })(
                    <Input
                      className={styles.formItemWidth1}
                      placeholder="请输入联系电话"
                    />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col sm={{ span: 24 }} lg={{ span:6}}>
                <FormItem
                  {...formItemLayout1}
                  label="归属网点"
                  style={{ width: "100%" }}
                >
                  {getFieldDecorator("stationId", {
                    rules: [{
                      required: false, message: "请输入归属网点!"
                    }]
                  })(
                    <Input style={{width:'100%'}} placeholder="请输入快递企业" onClick={this.inputHandle} readOnly={true} />
                  )}
                </FormItem>
              </Col>
            </Row>
          </Row>:null}
        </Form>
      </div>
    );

    this.props.checkList.map((item)=>{
      item.buyDate=this.timestampToTime(item.buyDate)
    });

    return (
      <Work />
    )

    // return (
    //   <Card>
    //     {this.state.expVisible?<SelectExpree setExpVisible={this.setExpVisible}  expVisible={this.state.expVisible} compNo={this.state.compNo} />:null}
    //     {/*<Modal*/}
    //       {/*style={{ height: 480 }}*/}
    //       {/*width={690}*/}
    //       {/*visible={this.state.modalVisible}*/}
    //       {/*onOk={this.handleOk}*/}
    //       {/*onCancel={this.handleCancel}*/}
    //       {/*centered={false}*/}
    //       {/*maskClosable={false}*/}
    //       {/*closable={false}*/}
    //       {/*okText="保存"*/}
    //       {/*cancelText="取消"*/}
    //     {/*>*/}
    //       {/*<object*/}
    //         {/*type='application/x-vlc-plugin'*/}
    //         {/*id='vlc'*/}
    //         {/*events='True'*/}
    //         {/*width="640"*/}
    //         {/*height="480"*/}
    //         {/*pluginspage="http://www.videolan.org"*/}
    //         {/*codebase="http://comic.sjtu.edu.cn/vlc/cab/axvlc.cab"*/}
    //       {/*>*/}
    //         {/*<param name='mrl' value='rtsp://184.72.239.149/vod/mp4:BigBuckBunny_175k.mov'/>*/}
    //         {/*<param name='volume' value='50'/>*/}
    //         {/*<param name='autoplay' value='true'/>*/}
    //         {/*<param name='loop' value='false'/>*/}
    //         {/*<param name='fullscreen' value='true'/>*/}
    //         {/*<embed*/}
    //           {/*type="application/x-vlc-plugin"*/}
    //           {/*pluginspage="http://www.videolan.org"*/}
    //           {/*width="640"*/}
    //           {/*height="480"*/}
    //           {/*mrl="rtsp://184.72.239.149/vod/mp4://BigBuckBunny_175k.mov"*/}
    //           {/*id="vlc"*/}
    //           {/*mute="true"*/}
    //         {/*/>*/}
    //       {/*</object>*/}
    //     {/*</Modal>*/}
    //     <div className={styles.wrap}>
    //       {
    //         this.state.importVisible?<ImportModal visible={this.state.importVisible} changeVisible={this.handleCloseVisible} setSelectedRowKeys={this.setSelectedRowKeys} getSearch={this.getSearch}/>:null
    //       }
    //       {
    //         addVisible ? <AddModal smVisible={this.smVisible} showSmboxModal={addVisible} setSelectedRowKeys={this.setSelectedRowKeys} getSearch={this.getSearch}/> : null
    //       }
    //       {
    //         showSearch ? <HighSearch showSearch={this.highSearch} getHighSearch={this.getHighSearch} /> : normalSearch
    //       }
    //       {
    //         this.state.editVisible ?
    //           <EditModal smEditVisible={this.smEditVisible} showSmEditModal={this.state.editVisible}
    //                      rowData={rowData} setSelectedRowKeys={this.setSelectedRowKeys} getSearch={this.getSearch}/> : null
    //       }
    //       <Table
    //         dataSource={checkList}
    //         bordered
    //         columns={columns}
    //         rowSelection={rowSelection}
    //         scroll={{x:true}}
    //         loading={replayLoading}
    //         rowKey="sid"
    //         pagination={pagination}
    //         onRow={(record) => {
    //           return { onClick: (event) => {
    //               // console.log("record",record);
    //               if(selectedRowKeys.indexOf(record.sid) > -1){
    //                 let index=selectedRowKeys.indexOf(record.sid);
    //                 selectedRowKeys.splice(index, 1);
    //                 this.setState({
    //                   selectedRowKeys
    //                 })
    //               }else{
    //                 selectedRowKeys.push(record.sid);
    //                 this.setState({
    //                   selectedRowKeys
    //                 })
    //               }
    //               // console.log("selectedRowKeys",selectedRowKeys);
    //             }};
    //         }}
    //       />
    //     </div>
    //   </Card>
    // );
  }
}
//checkList.data
