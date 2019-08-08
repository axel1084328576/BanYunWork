//危化品名录
import React,{Component} from 'react'
import { Divider, Popconfirm, Table, Card, Row, Col, Input, Form, Button, Select, Icon } from "antd";
import { connect } from "dva";
import styles from "./EnforcementRecord.less";
import AddModal from '../../components/EnforcementRecord/AddModal';
import EditModal from '../../components/EnforcementRecord/EditModal';
import ImportModal from '../../components/EnforcementRecord/ImportModal';


@connect(({ enforcementRecord,getPagePage,loading }) => {
  const {list,pageSize,total,controlList,page,}=enforcementRecord;
  const {pagePath}=getPagePage;
  return{
    list,pageSize,total,controlList,page,pagePath,
    loading: loading.effects['enforcementRecord/List'],
  }
})

@Form.create()
export default class EnforcementRecord extends Component{
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
      },
      {
        title: "统计编码",
        dataIndex: "statisticsCode",
        key: "statisticsCode",
        // width:100,
      },
      {
        title: "案件来源",
        dataIndex: "lawCaseSource",
        key: "lawCaseSource",
        // width:100,
      }, {
        title: "检查对象",
        dataIndex: "checkObject",
        key: "checkObject",
        // width:100,
      }, {
        title: "企业名称",
        dataIndex: "companyName",
        key: "companyName",
        // width:100,
      }, {
        title: "品牌",
        dataIndex: "brand",
        key: "brand",
        // width:100,
      }, {
        title: "当事人姓名",
        dataIndex: "partyName",
        key: "partyName",
        // width:100,
      }, {
        title: "当事人身份证号",
        dataIndex: "partyIdNumber",
        key: "partyIdNumber",
        // width:100,
      }, {
        title: "当事人联系电话",
        dataIndex: "partTel",
        key: "partTel",
        // width:100,
      }, {
        title: "当事人住址",
        dataIndex: "partyAddress",
        key: "partyAddress",
        // width:100,
      }, {
        title: "当事人单位",
        dataIndex: "partyUnit",
        key: "partyUnit",
        // width:100,
      }, {
        title: "当事人邮编",
        dataIndex: "partyPostcode",
        key: "partyPostcode",
        // width:100,
      }, {
        title: "业务类别",
        dataIndex: "professionalWorkType",
        key: "professionalWorkType",
        // width:100,
      }, {
        title: "案情",
        dataIndex: "sachverhalt",
        key: "sachverhalt",
        // width:100,
      }, {
        title: "案由",
        dataIndex: "caseAction",
        key: "caseAction",
        // width:100,
      }, {
        title: "案件类别",
        dataIndex: "caseType",
        key: "caseType",
        // width:100,
      }, {
        title: "案发地",
        dataIndex: "caseAddress",
        key: "caseAddress",
        // width:100,
      }, {
        title: "备注",
        dataIndex: "remarks",
        key: "remarks",
        // width:100,
      }, {
        title: "受理时间",
        dataIndex: "processingTime",
        key: "processingTime",
        // width:100,
      }, {
        title: "受理机构",
        dataIndex: "processing_address",
        key: "processing_address",
        // width:100,
      }, {
        title: "受理人员",
        dataIndex: "processingPeople",
        key: "processingPeople",
        // width:100,
      }, {
        title: "立案案号",
        dataIndex: "registerCode",
        key: "registerCode",
        // width:100,
      }, {
        title: "立案时间",
        dataIndex: "registerTime",
        key: "registerTime",
        // width:100,
      }, {
        title: "案件终结时间",
        dataIndex: "registerOverTime",
        key: "registerOverTime",
        // width:100,
      }, {
        title: "处罚决定书送达时间",
        dataIndex: "penalizeDecisionBookTime",
        key: "penalizeDecisionBookTime",
        // width:100,
      }, {
        title: "案件执行完成时间",
        dataIndex: "caseExecuteOverTime",
        key: "caseExecuteOverTime",
        // width:100,
      }, {
        title: "办案人员",
        dataIndex: "transactionPeople",
        key: "transactionPeople",
        // width:100,
      }, {
        title: "执法证号",
        dataIndex: "enforceCode",
        key: "enforceCode",
        // width:100,
      }, {
        title: "主要违法事实证据",
        dataIndex: "illegalEvidence",
        key: "illegalEvidence",
        // width:100,
      }, {
        title: "引用法条",
        dataIndex: "quoteLaw",
        key: "quoteLaw",
        // width:100,
      }, {
        title: "执法单位",
        dataIndex: "enforceUnit",
        key: "enforceUnit",
        // width:100,
      }, {
        title: "处罚种类",
        dataIndex: "penaltyType",
        key: "penaltyType",
        // width:100,
      }, {
        title: "罚款金额",
        dataIndex: "punishMoney",
        key: "punishMoney",
        // width:100,
      }, {
        title: "罚款缴纳方式",
        dataIndex: "punishType",
        key: "punishType",
        // width:100,
      }, {
        title: "强制措施生效日期",
        dataIndex: "effectiveTime",
        key: "effectiveTime",
        // width:100,
      }, {
        title: "执行情况",
        dataIndex: "executiveSituation",
        key: "executiveSituation",
        // width:100,
      }, {
        title: "强制措施种类",
        dataIndex: "measureType",
        key: "measureType",
        // width:100,
      }, {
        title: "是否结案",
        dataIndex: "isSettle",
        key: "isSettle",
        // width:100,
      }, {
        title: "结案日期",
        dataIndex: "settleTime",
        key: "settleTime",
        // width:100,
      }, {
        title: "结案原因",
        dataIndex: "settleCause",
        key: "settleCause",
        // width:100,
      }, {
        title: "是否简易程序",
        dataIndex: "isSimpleProcedure",
        key: "isSimpleProcedure",
        // width:100,
      },{
        title: "涉嫌违反法律条文",
        dataIndex: "breakArticle",
        key: "breakArticle",
        // width:100,
      }, {
        title: "是否立案",
        dataIndex: "isRegister",
        key: "isRegister",
        // width:100,
      }, {
        title: "处罚决定生效日期",
        dataIndex: "punishDecisionTime",
        key: "punishDecisionTime",
        // width:100,
      }, {
        title: "主管机构名称",
        dataIndex: "organizationName",
        key: "organizationName",
        // width:100,
      }, {
        title: "省份",
        dataIndex: "province",
        key: "province",
        // width:100,
      }, {
        title: "当事人单位品牌代码",
        dataIndex: "partyPeopleBrandCode",
        key: "partyPeopleBrandCode",
        // width:100,
      }, {
        title: "当事人单位机构代码",
        dataIndex: "partUnitOrganizationCode",
        key: "partUnitOrganizationCode",
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
            {this.props.controlList.enf_edit? <a href="javascript:" onClick={() => {
              this.showEditModal(record);
            }}>修改</a>:null}
              {this.props.controlList.enf_edit && this.props.controlList.enf_del?<Divider type="vertical" />:null}
              {
                this.props.controlList.enf_del?(this.props.list.length >= 1
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
      type:"enforcementRecord/Control",
      payload:{
        menuCode:this.props.pagePath,
        token:sessionStorage.getItem('sys-token'),
      }
    })
  }

  componentDidMount() {
    this.props.dispatch({
      type:'enforcementRecord/List',
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
      type:'enforcementRecord/AddOrEdit',
      payload:{
        opType:"del",
        id:key.id,
        token:sessionStorage.getItem('sys-token'),
      },
      callback:()=>{
        this.setSelectedRowKeys();
        dispatch({
          type:'enforcementRecord/List',
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
      type: "enforcementRecord/AddOrEdit",
      payload:{
        id: selectedRowKeys.join(","),
        opType:"del",
        token: sessionStorage.getItem("sys-token")
      },
      callback:()=>{
        this.setSelectedRowKeys();
        dispatch({
          type:'enforcementRecord/List',
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
          type: 'enforcementRecord/List',
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
    this.setState({selectedRowKeys:[]});
    const form = this.props.form;
    form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type:'enforcementRecord/List',
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
          type:'enforcementRecord/List',
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
      showLessItems:true,
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
                label="统计编码"
                {...formItemLayout}
                style={{ width:"100%"}}
              >
                {getFieldDecorator("statisticsCode", {
                  rules: [{ required: false }]
                })(
                  <Input
                    className={styles.formItemWidth}
                    placeholder="请输入统计编码"
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
                {this.props.controlList.enf_imp?<span className={styles.unSpan1}>
                   <Button onClick={this.handleImportVisible}><Icon type="upload" /> 导入</Button>
                </span>:null}
                <span className={styles.unSpan1}>
                  {this.props.controlList.enf_del?(selectedRowKeys.length>0?<Popconfirm
                    okText="确定"
                    cancelText="取消"
                    title="是否要删除选中的用户信息?"
                    placement="bottomRight"
                    onConfirm={this.moreRowDel}
                  >
                    <Button type="primary" className={styles.allDelete} style={{ marginLeft: 10 }}>删除</Button>
                  </Popconfirm>:null):null}
                  {this.props.controlList.enf_add?<Button style={{ marginLeft: 10 }} type="primary" icon="plus" onClick={this.showAddModal}>添加</Button>:null}
                </span>
              </Row>
            </Col>
          </Row>
          {this.state.openHighSearch?<Row>
            <Row>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="案件来源"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("lawCaseSource", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入案件来源"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="检查对象"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("checkObject", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入检查对象"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="企业名称"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("companyName", {
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
                  label="品牌"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("brand", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入品牌"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="当事人姓名"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("partyName", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入当事人姓名"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="当事人身份证号"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("partyIdNumber", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入当事人身份证号"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="当事人联系电话"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("partTel", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入当事人联系电话"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="当事人住址"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("partyAddress", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入当事人住址"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="当事人单位"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("partyUnit", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入当事人单位"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="当事人邮编"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("partyPostcode", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入当事人邮编"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="业务类别"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("professionalWorkType", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入业务类别"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="案情"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("sachverhalt", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入案情"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="案由"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("caseAction", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入案由"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="案件类别"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("caseType", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入案件类别"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="案发地"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("caseAddress", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入案发地"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="备注"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("remarks", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入备注"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="受理时间"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("processingTime", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入受理时间"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="受理机构"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("processingAddress", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入受理机构"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="受理人员"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("processingPeople", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入受理人员"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="立案案号"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("registerCode", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入立案案号"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="立案时间"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("registerTime", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入立案时间"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="案件终结时间"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("registerOverTime", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入案件终结时间"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="决定书送达时间"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("penalizeDecisionBookTime", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入处罚决定书送达时间"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="案件完成时间"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("caseExecuteOverTime", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入案件执行完成时间"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="办案人员"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("transactionPeople", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入办案人员"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="执法证号"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("enforceCode", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入执法证号"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="违法事实证据"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("illegalEvidence", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入主要违法事实证据"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="引用法条"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("quoteLaw", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入引用法条"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="执法单位"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("enforceUnit", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入执法单位"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="处罚种类"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("penaltyType", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入处罚种类"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="罚款金额"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("punishMoney", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入罚款金额"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="罚款缴纳方式"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("punishType", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入罚款缴纳方式"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="生效日期"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("effectiveTime", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入强制措施生效日期"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="执行情况"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("executiveSituation", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入执行情况"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="强制措施种类"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("measureType", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入强制措施种类"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="是否结案"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("isSettle", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入是否结案"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="结案日期"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("settleTime", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入结案日期"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="结案原因"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("settleCause", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入结案原因"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="是否简易程序"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("isSimpleProcedure", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入是否简易程序"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="违反法律条文"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("breakArticle", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入涉嫌违反法律条文"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="是否立案"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("isRegister", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入是否立案"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="处罚生效日期"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("punishDecisionTime", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入处罚决定生效日期"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="主管机构名称"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("organizationName", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入主管机构名称"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="省份"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("province", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入省份"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="品牌代码"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("partyPeopleBrandCode", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入当事人单位品牌代码"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="单位机构代码"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("partUnitOrganizationCode", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入当事人单位机构代码"
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