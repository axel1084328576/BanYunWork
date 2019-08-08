//危化品名录
import React,{Component} from 'react'
import { Divider, Popconfirm, Table, Card, Row, Col, Input, Form, Button,Icon } from "antd";
import { connect } from "dva";
import styles from "./StarRating.less";
import AddModal from '../../components/StarRating/AddModal';
import EditModal from '../../components/StarRating/EditModal';
import ImportModal from '../../components/StarRating/ImportModal';

@connect(({ starRating,getPagePage,loading }) => {
  const {list,pageSize,total,controlList,page}=starRating;
  const {pagePath}=getPagePage;
  return{
    list,pageSize,total,controlList,page,pagePath,
    loading: loading.effects['starRating/List'],
  }
})

@Form.create()
export default class StarRating extends Component{
  state={
    addVisible:false,
    editVisible:false,
    importVisible:false,
    rowData:{},
    columns:[
      {
        title: "序号",
        dataIndex: "id",
        key: "id",
        // width:100,
      },{
        title: "企业代码",
        dataIndex: "enterpriseCode",
        key: "enterpriseCode",
        // width:100,
      }, {
        title: "企业名称",
        dataIndex: "enterpriseName",
        key: "enterpriseName",
        // width:100,
      }, {
        title: "申报单位",
        dataIndex: "declarationUnit",
        key: "declarationUnit",
        // width:100,
      }, {
        title: "星级",
        dataIndex: "star",
        key: "star",
        // width:100,
      },{
        title: "地址",
        dataIndex: "address",
        key: "address",
        // width:100,
      }, {
        title: "网点编码",
        dataIndex: "statCode",
        key: "statCode",
        // width:100,
      }, {
        title: "标牌编号",
        dataIndex: "scutcheonCode",
        key: "scutcheonCode",
        // width:100,
      }, {
        title: "审核成绩",
        dataIndex: "checkGrade",
        key: "checkGrade",
        // width:100,
      }, {
        title: "申报时间",
        dataIndex: "declarationTime",
        key: "declarationTime",
        // width:100,
      }, {
        title: "审核时间",
        dataIndex: "checkTime",
        key: "checkTime",
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
            {this.props.controlList.star_edit? <a href="javascript:" onClick={() => {
              this.showEditModal(record);
            }}>修改</a>:null}
              {this.props.controlList.star_edit && this.props.controlList.star_del?<Divider type="vertical" />:null}
              {
                this.props.controlList.star_del?(this.props.list.length >= 1
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
      type:"starRating/Control",
      payload:{
        menuCode:this.props.pagePath,
        token:sessionStorage.getItem('sys-token'),
      }
    })
  }

  componentDidMount() {
    this.props.dispatch({
      type:'starRating/List',
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
      type:'starRating/AddOrEdit',
      payload:{
        opType:"del",
        id:key.id,
        token:sessionStorage.getItem('sys-token'),
      },
      callback:()=>{
        this.setSelectedRowKeys();
        dispatch({
          type:'starRating/List',
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
      type: "starRating/AddOrEdit",
      payload:{
        id: selectedRowKeys.join(","),
        opType:"del",
        token: sessionStorage.getItem("sys-token")
      },
      callback:()=>{
        this.setSelectedRowKeys();
        dispatch({
          type:'starRating/List',
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
          type:'starRating/List',
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
          type:'starRating/List',
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
          type:'starRating/List',
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
                {getFieldDecorator("enterpriseName", {
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
                <a style={{ marginRight: 20 }} onClick={this.hanldeHighSearch} style={{ marginRight: 20 }}>{this.state.openHighSearch?"收起":"展开"}</a>
                <Button type="primary" icon="search" onClick={this.handleSearch}>
                  搜索
                </Button>
            </span>
            </Col>
            <Col xs={{ span: 12 }} sm={{ span: 12 }} lg={{offset:6,span:6}}>
              <Row type="flex" justify="end">
                {this.props.controlList.star_imp?<span className={styles.unSpan1}>
                   <Button onClick={this.handleImportVisible}><Icon type="upload" /> 导入</Button>
                </span>:null}
                <span className={styles.unSpan1}>
                  {this.props.controlList.star_del?(selectedRowKeys.length>0?<Popconfirm
                    okText="确定"
                    cancelText="取消"
                    title="是否要删除选中的用户信息?"
                    placement="bottomRight"
                    onConfirm={this.moreRowDel}
                  >
                    <Button type="primary" className={styles.allDelete} style={{ marginLeft: 10 }}>删除</Button>
                  </Popconfirm>:null):null}
                  {this.props.controlList.star_add?<Button style={{ marginLeft: 10 }} type="primary" icon="plus" onClick={this.showAddModal}>添加</Button>:null}
                </span>
              </Row>
            </Col>
          </Row>
          {this.state.openHighSearch?<Row>
            <Row>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="企业代码"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("enterpriseCode", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入企业代码"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="申报单位"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("declarationUnit", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入申报单位"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="星级"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("star", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入星级"
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
                  label="网点编码"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("statCode", {
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
                  label="标牌编号"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("scutcheonCode", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入标牌编号"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="审核成绩"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("checkGrade", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入审核成绩"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="申报时间"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("declarationTime", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入申报时间"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="审核时间"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("checkTime", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入审核时间"
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
          rowKey="id"
          scroll={{x:"100%"}}
          pagination={pagination}
          onRow={(record) => {
            return { onClick: (event) => {
                // console.log("record",record);
                if(selectedRowKeys.indexOf(record.id) > -1){
                  let index=selectedRowKeys.indexOf(record.id);
                  selectedRowKeys.splice(index, 1);
                  this.setState({
                    selectedRowKeys:selectedRowKeys
                  })
                }else{
                  selectedRowKeys.push(record.id);
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