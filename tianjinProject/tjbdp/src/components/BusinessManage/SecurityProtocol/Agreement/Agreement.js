//危化品名录
import React,{Component} from 'react'
import { Divider, Popconfirm, Table, Card, Row, Col, Input, Form, Button, Select, Icon, Modal,Upload} from "antd";
import { connect } from "dva";
import styles from "./Agreement.less";
import AddModal from './AddEditImp/AddModal';
import EditModal from './AddEditImp/EditModal';
import ImportModal from './AddEditImp/ImportModal';
import apiConfig from '@/utils/apiConfig';


const {host,picDown}=apiConfig;

@connect(({ agreement,getPagePage,loading }) => {
  const {list,pageSize,total,controlList,page,}=agreement;
  const {pagePath}=getPagePage;
  return{
    list,pageSize,total,controlList,page,pagePath,
    loading: loading.effects['agreement/List'],
  }
})

@Form.create()
export default class Agreement extends Component{
  state={
    addVisible:false,
    editVisible:false,
    importVisible:false,
    photoVisible:false,
    rowData:{},
    columns:[
      {
        title: "企业社会统一信用代码",
        dataIndex: "qyshtyxydm",
        key: "qyshtyxydm",
        // width:100,
      },
      {
        title: "协议名称",
        dataIndex: "xymc",
        key: "xymc",
        // width:100,
      },
      {
        title: "协议编号",
        dataIndex: "xybh",
        key: "xybh",
        // width:100,
      }, {
        title: "签约时间",
        dataIndex: "qysj",
        key: "qysj",
        // width:100,
      }, {
        title: "协议过期时间",
        dataIndex: "xygqsj",
        key: "xygqsj",
        // width:100,
      }, {
        title: "品牌简称",
        dataIndex: "ppjc",
        key: "ppjc",
        // width:100,
      }, {
        title: "网点编码",
        dataIndex: "wdbm",
        key: "wdbm",
        // width:100,
      }, {
        title: "'网点名称",
        dataIndex: "wdmc",
        key: "wdmc",
        // width:100,
      }, {
        title: "状态",
        dataIndex: "zt",
        key: "zt",
        // width:100,
      }, {
        title: "",
        dataIndex: "operation",
        key: "operation",
        // fixed: "right",
        width:110,
        render: (text, record) => {
          return (
            <span>
              {this.props.controlList.agr_ann?<a onClick={this.toAgree}>查看附件</a>:null}
              {this.props.controlList.agr_ann?<Divider type="vertical" />:null}
              {this.props.controlList.agr_edit? <a href="javascript:" onClick={() => {
                this.showEditModal(record);
              }}>修改</a>:null}
                {this.props.controlList.agr_edit && this.props.controlList.agr_del?<Divider type="vertical" />:null}
                {
                  this.props.controlList.agr_del?(this.props.list.length >= 1
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
      type:"agreement/Control",
      payload:{
        menuCode:this.props.pagePath,
        token:sessionStorage.getItem('sys-token'),
      }
    })
  }

  componentDidMount() {
    this.props.dispatch({
      type:'agreement/List',
      payload:{
        token:sessionStorage.getItem('sys-token'),
        page:1,
        pageSize:10
      }
    })
  }

  toAgree=()=>{
    this.setState({
      photoVisible:true
    })
  };

  handleCancel=()=>{
    this.setState({
      photoVisible:false
    })
  };

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
      type:'agreement/AddOrEdit',
      payload:{
        opType:"del",
        wybs:key.wybs,
        token:sessionStorage.getItem('sys-token'),
      },
      callback:()=>{
        this.setSelectedRowKeys();
        dispatch({
          type:'agreement/List',
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
      type: "agreement/AddOrEdit",
      payload:{
        wybs: selectedRowKeys.join(","),
        opType:"del",
        token: sessionStorage.getItem("sys-token")
      },
      callback:()=>{
        this.setSelectedRowKeys();
        dispatch({
          type:'agreement/List',
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
          type: 'agreement/List',
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
          type:'agreement/List',
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
          type:'agreement/List',
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

  addPhoto=()=>{

  };

  render(){
    const{columns,selectedRowKeys,editVisible,rowData,addVisible,setImportModal,importVisible}=this.state;
    const {list,pageSize,total,loading}=this.props;
    const { getFieldDecorator } = this.props.form;
    // console.log("this.props.cheList",this.props.cheList);
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
                label="统一信用代码"
                {...formItemLayout}
                style={{ width:"100%"}}
              >
                {getFieldDecorator("qyshtyxydm", {
                  rules: [{ required: false }]
                })(
                  <Input
                    className={styles.formItemWidth}
                    placeholder="请输入统一信用代码"
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
                {this.props.controlList.agr_imp?<span className={styles.unSpan1}>
                   <Button onClick={this.handleImportVisible}><Icon type="upload" /> 导入</Button>
                </span>:null}
                <span className={styles.unSpan1}>
                  {this.props.controlList.agr_del?(selectedRowKeys.length>0?<Popconfirm
                    okText="确定"
                    cancelText="取消"
                    title="是否要删除选中的用户信息?"
                    placement="bottomRight"
                    onConfirm={this.moreRowDel}
                  >
                    <Button type="primary" className={styles.allDelete} style={{ marginLeft: 10 }}>删除</Button>
                  </Popconfirm>:null):null}
                  {this.props.controlList.agr_add?<Button style={{ marginLeft: 10 }} type="primary" icon="plus" onClick={this.showAddModal}>添加</Button>:null}
                </span>
              </Row>
            </Col>
          </Row>
          {this.state.openHighSearch?<Row>
            <Row>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="协议名称"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("xymc", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入协议名称"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="协议编号"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("xybh", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入协议编号"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="签约时间"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("qysj", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入签约时间"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="协议过期时间"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("xygqsj", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入协议过期时间"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="品牌简称"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("ppjc", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入品牌简称"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="网点编码"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("wdbm", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入网点编码"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="网点名称"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("wdmc", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入网点名称"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="状态"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("zt", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入状态"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Row>:null}
        </Form>
      </div>
    );

    const uploadProps={
      action:host+picDown,
      accept:"image/*",
    };
    return(
      <Card>
        <Modal
          title={<Row type="flex" align="middle"><span>附件管理</span><Upload  style={{float:"right"}} {...uploadProps}><Button style={{float:"right"}}  type="primary" shape="circle" icon="plus" size="small"/></Upload></Row>}
          visible={this.state.photoVisible}
          centered={true}
          closable={false}
          destroyOnClose={true}
          maskClosable={true}
          onCancel={this.handleImportCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>关闭</Button>,
          ]}
        >

        </Modal>
        <AddModal addVisible={addVisible} setAddModal={this.setAddModal} getSearch={this.getSearch} setSelectedRowKeys={this.setSelectedRowKeys}/>
        <EditModal editVisible={editVisible} rowData={rowData} setEditModal={this.setEditModal} getSearch={this.getSearch} setSelectedRowKeys={this.setSelectedRowKeys} />
        <ImportModal importVisible={importVisible} setImportModal={this.setImportModal} dispatch={this.props.dispatch} getSearch={this.getSearch} setSelectedRowKeys={this.setSelectedRowKeys} />
        {normalSearch}
        <Table
          dataSource={list}
          columns={columns}
          bordered
          rowSelection={rowSelection}
          loading={loading}
          rowKey="wybs"
          scroll={{x:"100%"}}
          pagination={pagination}
          onRow={(record) => {
            return { onClick: (event) => {
                // console.log("record",record);
                if(selectedRowKeys.indexOf(record.wybs) > -1){
                  let index=selectedRowKeys.indexOf(record.wybs);
                  selectedRowKeys.splice(index, 1);
                  this.setState({
                    selectedRowKeys:selectedRowKeys
                  })
                }else{
                  selectedRowKeys.push(record.wybs);
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