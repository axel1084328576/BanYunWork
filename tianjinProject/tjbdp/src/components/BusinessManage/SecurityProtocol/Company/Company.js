//危化品名录
import React,{Component} from 'react'
import { Divider, Popconfirm, Table, Card, Row, Col, Input, Form, Button, Select, Icon } from "antd";
import { connect } from "dva";
import styles from "./Company.less";
import AddModal from './AddEditImp/AddModal';
import EditModal from './AddEditImp/EditModal';
import ImportModal from './AddEditImp/ImportModal';

@connect(({ company,getPagePage,loading }) => {
  const {list,pageSize,total,controlList,page,}=company;
  const {pagePath}=getPagePage;
  return{
    list,pageSize,total,controlList,page,pagePath,
    loading: loading.effects['company/List'],
  }
})

@Form.create()
export default class Company extends Component{
  state={
    addVisible:false,
    editVisible:false,
    importVisible:false,
    rowData:{},
    columns:[
      {
        title: "企业名称",
        dataIndex: "qymc",
        key: "qymc",
        // width:100,
      },
      {
        title: "社会统一信用代码",
        dataIndex: "shtyxydm",
        key: "shtyxydm",
        // width:100,
      },
      {
        title: "企业控股(所有权)",
        dataIndex: "qykg",
        key: "qykg",
        // width:100,
      }, {
        title: "企业成立日期",
        dataIndex: "qyclrq",
        key: "qyclrq",
        // width:100,
      }, {
        title: "执照有效期",
        dataIndex: "zzyxq",
        key: "zzyxq",
        // width:100,
      }, {
        title: "注册资金（万元）",
        dataIndex: "zczj",
        key: "zczj",
        // width:100,
      }, {
        title: "电话",
        dataIndex: "dh",
        key: "dh",
        // width:100,
      }, {
        title: "传真",
        dataIndex: "cz",
        key: "cz",
        // width:100,
      }, {
        title: "法人代表",
        dataIndex: "frdb",
        key: "frdb",
        // width:100,
      }, {
        title: "法人电话",
        dataIndex: "frdh",
        key: "frdh",
        // width:100,
      }, {
        title: "注册地址",
        dataIndex: "zcdz",
        key: "zcdz",
        // width:100,
      }, {
        title: "经营地址",
        dataIndex: "jydz",
        key: "jydz",
        // width:100,
      }, {
        title: "企业邮编",
        dataIndex: "qyyb",
        key: "qyyb",
        // width:100,
      }, {
        title: "联系人",
        dataIndex: "lxr",
        key: "lxr",
        // width:100,
      }, {
        title: "联系人电话",
        dataIndex: "lxrdh",
        key: "lxrdh",
        // width:100,
      }, {
        title: "联系人手机",
        dataIndex: "lxrsj",
        key: "lxrsj",
        // width:100,
      }, {
        title: "联系人地址",
        dataIndex: "lxrdz",
        key: "lxrdz",
        // width:100,
      }, {
        title: "业务范围",
        dataIndex: "ywfw",
        key: "ywfw",
        // width:100,
      }, {
        title: "企业性质",
        dataIndex: "qyxz",
        key: "qyxz",
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
              {this.props.controlList.com_agr?<a onClick={this.toAgree}>安全协议</a>:null}
              {this.props.controlList.com_agr?<Divider type="vertical" />:null}
              {this.props.controlList.com_edit? <a href="javascript:" onClick={() => {
                this.showEditModal(record);
              }}>修改</a>:null}
              {this.props.controlList.com_edit && this.props.controlList.com_del?<Divider type="vertical" />:null}
              {
                this.props.controlList.com_del?(this.props.list.length >= 1
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
      type:"company/Control",
      payload:{
        menuCode:this.props.pagePath,
        token:sessionStorage.getItem('sys-token'),
      }
    })
  }

  componentDidMount() {
    this.props.dispatch({
      type:'company/List',
      payload:{
        token:sessionStorage.getItem('sys-token'),
        page:1,
        pageSize:10
      }
    })
  }

  toAgree=()=>{
    if(this.props.setStatus){
      this.props.setStatus(false)
    }
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
      type:'company/AddOrEdit',
      payload:{
        opType:"del",
        wybs:key.wybs,
        token:sessionStorage.getItem('sys-token'),
      },
      callback:()=>{
        this.setSelectedRowKeys();
        dispatch({
          type:'company/List',
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
      type: "company/AddOrEdit",
      payload:{
        wybs: selectedRowKeys.join(","),
        opType:"del",
        token: sessionStorage.getItem("sys-token")
      },
      callback:()=>{
        this.setSelectedRowKeys();
        dispatch({
          type:'company/List',
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
          type: 'company/List',
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
          type:'company/List',
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
          type:'company/List',
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
                label="企业名称"
                {...formItemLayout}
                style={{ width:"100%"}}
              >
                {getFieldDecorator("qymc", {
                  rules: [{ required: false }]
                })(
                  <Input
                    className={styles.formItemWidth}
                    placeholder="请输入企业名称"
                  />
                )}
              </Form.Item>
            </Col>
            <Col xs={{ span: 12 }} sm={{ span: 12 }} lg={{ span:6 }}>
              <span className={styles.unSpan}>
                <a style={{ marginRight: 20 }} onClick={this.hanldeHighSearch}>{this.state.openHighSearch?"收起":"展开"}</a>
                <Button type="primary" icon="search" onClick={this.handleSearch}>
                  搜索
                </Button>
            </span>
            </Col>
            <Col xs={{ span: 12 }} sm={{ span: 12 }} lg={{offset:6,span:6}}>
              <Row type="flex" justify="end">
                {this.props.controlList.com_imp?<span className={styles.unSpan1}>
                   <Button onClick={this.handleImportVisible}><Icon type="upload" /> 导入</Button>
                </span>:null}
                <span className={styles.unSpan1}>
                  {this.props.controlList.com_del?(selectedRowKeys.length>0?<Popconfirm
                    okText="确定"
                    cancelText="取消"
                    title="是否要删除选中的用户信息?"
                    placement="bottomRight"
                    onConfirm={this.moreRowDel}
                  >
                    <Button type="primary" className={styles.allDelete} style={{ marginLeft: 10 }}>删除</Button>
                  </Popconfirm>:null):null}
                  {this.props.controlList.com_add?<Button style={{ marginLeft: 10 }} type="primary" icon="plus" onClick={this.showAddModal}>添加</Button>:null}
                </span>
              </Row>
            </Col>
          </Row>
          {this.state.openHighSearch?<Row>
            <Row>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="统一信用代码"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("shtyxydm", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入统一信用代码"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="企业控股"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("qykg", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入企业控股(所有权)"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="企业成立日期"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("qyclrq", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入企业成立日期"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="执照有效期"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("zzyxq", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入执照有效期"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="注册资金"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("zczj", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入注册资金"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="电话"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("dh", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入电话"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="传真"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("cz", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入传真"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="法人代表"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("frdb", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入法人代表"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="法人电话"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("frdh", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入法人电话"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="注册地址"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("zcdz", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入注册地址"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="经营地址"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("jydz", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入经营地址"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="企业邮编"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("qyyb", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入企业邮编"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="联系人"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("lxr", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入联系人"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="联系人电话"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("lxrdh", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入联系人电话"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
              <Form.Item
                label="联系人手机"
                {...formItemLayout}
                style={{ width:"100%"}}
              >
                {getFieldDecorator("lxrsj", {
                  rules: [{ required: false }]
                })(
                  <Input
                    className={styles.formItemWidth}
                    placeholder="请输入联系人手机"
                  />
                )}
              </Form.Item>
            </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="联系人地址"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("lxrdz", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入联系人地址"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="业务范围"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("ywfw", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入业务范围"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="企业性质"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("qyxz", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入企业性质"
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
