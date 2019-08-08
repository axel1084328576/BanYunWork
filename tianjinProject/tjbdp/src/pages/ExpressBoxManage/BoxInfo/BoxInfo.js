//危化品名录
import React,{Component} from 'react'
import { Divider, Popconfirm, Table, Card, Row, Col, Input, Form, Button, Select, Icon } from "antd";
import { connect } from "dva";
import styles from "./BoxInfo.less";
import AddModal from '../../../components/ExpressBoxManage/BoxInfo/AddModal';
import EditModal from '../../../components/ExpressBoxManage/BoxInfo/EditModal';
import ImportModal from '../../../components/ExpressBoxManage/BoxInfo/ImportModal';

@connect(({ expressBox,expressBoxManage,getPagePage,loading }) => {
  const {expressBoxList,pageSize,total,page,}=expressBox;
  const {controlList}=expressBoxManage;
  const {pagePath}=getPagePage;
  return{
    expressBoxList,pageSize,total,controlList,page,pagePath,
    cheLoading: loading.effects['expressBox/List'],
  }
})

@Form.create()
export default class BoxInfo extends Component{
  state={
    addVisible:false,
    editVisible:false,
    importVisible:false,
    rowData:{},
    columns:[
      {
        title: "企业编号",
        dataIndex: "compNo",
        key: "compNo",
        // width:100,
      },
      {
        title: "企业名称",
        dataIndex: "compNa",
        key: "compNa",
        // width:100,
      },
      {
        title: "编号",
        dataIndex: "boxNo",
        key: "boxNo",
        // width:100,
      },
      {
        title: "名称",
        dataIndex: "boxName",
        key: "boxName",
        // width:100,
      },{
        title: "地址",
        dataIndex: "address",
        key: "address",
        // width:100,
      }, {
        title:"经纬度",
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
      },{
        title: "维护人",
        dataIndex: "contact",
        key: "contact",
        // width:100,
      },{
        title: "维护人电话",
        dataIndex: "tel",
        key: "tel",
        // width:100,
      },{
        title: "经营管理企业",
        dataIndex: "enterprise",
        key: "enterprise",
        // width:100,
      },{
        title: "格口数量",
        dataIndex: "gksl",
        key: "gksl",
        // width:100,
      },{
        title: "数据上传时间",
        dataIndex: "sjscsj",
        key: "sjscsj",
        // width:100,
      },{
        title: "操作编码",
        dataIndex: "czbm",
        key: "czbm",
        // width:100,
      },{
        title: "柜体箱子类型",
        dataIndex: "gtxzlx",
        key: "gtxzlx",
        // width:100,
      },{
        title: "快件箱编号",
        dataIndex: "gtmcmmkjxbh",
        key: "gtmcmmkjxbh",
        // width:100,
      },{
        title: "批次",
        dataIndex: "pc",
        key: "pc",
        // width:100,
      },{
        title: "所属企业",
        dataIndex: "ssqy",
        key: "ssqy",
        // width:100,
      }, {
        title: "",
        dataIndex: "operation",
        key: "operation",
        // fixed: "right",
        width:110,
        render: (text, record) => {
          console.log("this.props.controlList",this.props.controlList);
          return (
            <span>
            {this.props.controlList.ebox_mod? <a href="javascript:" onClick={() => {
              this.showEditModal(record);
            }}>修改</a>:null}
              {this.props.controlList.ebox_mod && this.props.controlList.ebox_del?<Divider type="vertical" />:null}
              {
                this.props.controlList.ebox_del?(this.props.expressBoxList.length >= 1
                  ? (
                    <Popconfirm
                      title="是否要删除选中的用户信息?"
                      placement="bottomRight"
                      onConfirm={() => {
                        this.rowDel(record);
                      }}
                    >
                      <a href="javascript:;" style={{ color: "#f5222d" }}>删除</a>
                    </Popconfirm>
                  ) : null):null
              }
          </span>
          );
        }
      }
    ],
    openHighSearch:false,
    selectedRowKeys:[],
  };

  componentWillMount(){
    // console.log("this.props.pagePath",this.props.pagePath);
    const { dispatch } = this.props;
    dispatch({
      type:"expressBoxManage/Control",
      payload:{
        menuCode:this.props.pagePath,
        token:sessionStorage.getItem('sys-token'),
      }
    })
  }

  componentDidMount() {
    this.props.dispatch({
      type:'expressBox/List',
      payload:{
        token:sessionStorage.getItem('sys-token'),
        page:1,
        pageSize:10
      }
    })
  }

  setSelectedRowKeys=()=>{
    this.setState({selectedRowKeys:[]})
  };

  showEditModal=(record)=>{
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

  handleImportVisible=()=>{
    this.setState({
      importVisible:true
    })
  };

  setEditModal=(value)=>{
    this.setState({
      editVisible:value,
    })
  };

  setAddModal=(value)=>{
    this.setState({
      addVisible:value,
    })
  };

  setImportModal=(value)=>{
    this.setState({
      importVisible:value,
    })
  };

  rowDel = (key) => {
    let data;
    if(this.getSearch){
      data=this.getSearch();
    }
    const {dispatch,page,pageSize}=this.props;
    dispatch({
      type:'expressBox/Del',
      payload:{
        opType:"del",
        ids:key.sid,
        token:sessionStorage.getItem('sys-token'),
      },
      callback:()=>{
        this.setSelectedRowKeys();
        dispatch({
          type:'expressBox/List',
          payload:{
            ...data,
            page:page,
            pageSize:pageSize
          }
        });
      }
    });
  };

  moreRowDel = () => {
    let data;
    if(this.getSearch){
      data=this.getSearch();
    }
    const { selectedRowKeys} = this.state;
    const {dispatch,page,pageSize}=this.props;
    dispatch({
      type: "expressBox/Del",
      payload:{
        ids: selectedRowKeys.join(","),
        opType:"del",
        token: sessionStorage.getItem("sys-token")
      },
      callback:()=>{
        this.setSelectedRowKeys();
        dispatch({
          type:'expressBox/List',
          payload:{
            ...data,
            page:page,
            pageSize:pageSize
          }
        });
      }
    });
  };

  handleSearch=()=>{
    const form = this.props.form;
    const { dispatch } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'expressBox/List',
          payload:{
            page: 1,
            pageSize:10,
            ...values,
            token:sessionStorage.getItem('sys-token'),
          },
        });
      }
    })
  }

  hanldeHighSearch = () => {
    this.setState({
      openHighSearch:!this.state.openHighSearch
    })
  };

  onChanged=(selectedRowKeys, selectedRows) => {
    this.setState({selectedRowKeys:selectedRowKeys})
  };

  tableOnChange=(current, size)=>{
    this.setState({selectedRowKeys:[]})
    const form = this.props.form;
    form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type:'expressBox/List',
          payload:{
            page:current,
            pageSize:size,
            ...values,
            token:sessionStorage.getItem('sys-token'),
          }
        });
      }
    })
  };

  tableOnShowSizeChange=(page, pageSize)=>{
    this.setState({selectedRowKeys:[]});
    const form = this.props.form;
    form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type:'expressBox/List',
          payload:{
            page,
            pageSize,
            ...values,
            token:sessionStorage.getItem('sys-token'),
          }
        });
      }
    });
  };

  getSearch=()=>{
    let data;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        data=values;
      }
    });
    return data;
  };

  render(){
    const{columns,selectedRowKeys,editVisible,rowData,addVisible,setImportModal,importVisible}=this.state;
    const {expressBoxList,pageSize,total,cheLoading}=this.props;
    const { getFieldDecorator } = this.props.form;
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
    const rowSelection = {
      selectedRowKeys:selectedRowKeys,
      onChange:this.onChanged,
    };
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
    const normalSearch=(
      <div className={styles.searchRow}>
        <Form layout="inline">
          <Row>
            <Col sm={{ span: 24 }} lg={{ span: 6 }}>
              <Form.Item
                label="企业编号"
                {...formItemLayout}
                style={{ width:"100%"}}
              >
                {getFieldDecorator("compNo", {
                  rules: [{ required: false }]
                })(
                  <Input
                    className={styles.formItemWidth}
                    placeholder="请输入企业编号"
                  />
                )}
              </Form.Item>
            </Col>
            <Col xs={{ span: 12 }} sm={{ span: 12 }} lg={{ span:6 }}>
              <span className={styles.unSpan}>
                <a style={{ marginRight: 20 }} onClick={this.hanldeHighSearch} style={{ marginRight: 20 }}>{this.state.openHighSearch?"收起":"展开"}</a>
                <Button type="primary" icon="search" onClick={this.handleSearch}>
                  搜索
                </Button>
            </span>
            </Col>
            <Col xs={{ span: 12 }} sm={{ span: 12 }} lg={{offset:6,span:6}}>
              <Row type="flex" justify="end">
                {this.props.controlList.ebox_imp?<span className={styles.unSpan1}>
                   <Button onClick={this.handleImportVisible}><Icon type="upload" /> 导入</Button>
                </span>:null}
                <span className={styles.unSpan1}>
                  {this.props.controlList.ebox_del?(selectedRowKeys.length>0?<Popconfirm
                    okText="确定"
                    cancelText="取消"
                    title="是否要删除选中的用户信息?"
                    placement="bottomRight"
                    onConfirm={this.moreRowDel}
                  >
                    <Button type="primary" className={styles.allDelete} style={{ marginLeft: 10 }}>删除</Button>
                  </Popconfirm>:null):null}
                  {this.props.controlList.ebox_add?<Button style={{ marginLeft: 10 }} type="primary" icon="plus" onClick={this.showAddModal}>添加</Button>:null}
                </span>
              </Row>
            </Col>
          </Row>
          {this.state.openHighSearch?<Row>
            <Row>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="企业名称"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("compNa", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入企业名称"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="编号"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("boxNo", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      id="cameraId"
                      className={styles.formItemWidth}
                      placeholder="请输入编号"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="名称"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("boxName", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入名称"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="地址"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("address", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入地址"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="经度"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("longitude", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入经度"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="纬度"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("latitude", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入纬度"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="维护人"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("contact", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入维护人"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="维护人电话"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("tel", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入维护人电话"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="经营管理企业"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("enterprise", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入经营管理企业"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="格口数量"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("gksl", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入格口数量"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="数据上传时间"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("sjscsj", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入数据上传时间"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="操作编码"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("czbm", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入操作编码"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="柜体箱子类型"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("gtxzlx", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入柜体箱子类型"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="快件箱编号"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("gtmcmmkjxbh", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入快件箱编号"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="批次"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("pc", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入批次"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="所属企业"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("ssqy", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入所属企业"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Row>:null}
        </Form>
      </div>
    );
    return(
      <Card>
        <AddModal addVisible={addVisible} setAddModal={this.setAddModal} getSearch={this.getSearch} setSelectedRowKeys={this.setSelectedRowKeys}/>
        <EditModal editVisible={editVisible} rowData={rowData} setEditModal={this.setEditModal} getSearch={this.getSearch} setSelectedRowKeys={this.setSelectedRowKeys} />
        <ImportModal importVisible={importVisible} setImportModal={this.setImportModal} dispatch={this.props.dispatch} getSearch={this.getSearch} setSelectedRowKeys={this.setSelectedRowKeys} />
        {normalSearch}
        <Table
          dataSource={expressBoxList}
          columns={columns}
          bordered
          rowSelection={rowSelection}
          loading={cheLoading}
          rowKey="sid"
          scroll={{x:"100%"}}
          pagination={pagination}
          onRow={(record) => {
            return { onClick: (event) => {
                // console.log("record",record);
                if(selectedRowKeys.indexOf(record.sid) > -1){
                  let index=selectedRowKeys.indexOf(record.sid);
                  selectedRowKeys.splice(index, 1);
                  this.setState({
                    selectedRowKeys:selectedRowKeys
                  })
                }else{
                  selectedRowKeys.push(record.sid);
                  this.setState({
                    selectedRowKeys:selectedRowKeys
                  })
                }
                // console.log("selectedRowKeys",selectedRowKeys);
              }};
          }}
        />
      </Card>
    )
  }
}