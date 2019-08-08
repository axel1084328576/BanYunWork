import React from 'react';
import {Table,Card,Popconfirm,Divider,Button,Row,Col,Form,Input,Select} from 'antd';
import EnterAddSearch from '../../components/UniformIdentity/EnterpriseManage/AddModal';
import EnterEditSearch from '../../components/UniformIdentity/EnterpriseManage/EditModal';
import { connect } from "dva";
import styles from "./allStyles.less";

const {Option}=Select;

@connect(({ enterprise, loading ,getPagePage}) => {
  const {  companyList, pageSize, total,current,option,controlList } = enterprise;
  const {pagePath}=getPagePage;
  return {
    companyList,
    pageSize,
    current,
    total,
    option,
    controlList,
    pagePath,
    diceLoading: loading.effects["enterprise/List"],
  };
})

@Form.create()
export default class EnterpriseManage extends React.Component{
  state={
    openHighSearch:false,
    enterVisible:false,
    selectedRows:"",
    editVisible:false,
    rowData:"",
    selectedRowKeys:[],
    columns:[{
      title: '编号',
      dataIndex: 'compNo',
      key:'compNo',
    },{
      title: '名称',
      dataIndex: 'compName',
      key: 'compName',
    },{
      title: '类型',
      dataIndex: 'compType',
      key: 'compType',
    },{
      title: '排序',
      dataIndex: 'compOrder',
      key: 'compOrder',
    },{
      title: '',
      dataIndex: 'operation',
      // fixed: 'right',
      // width:110,
      render: (text, record) => {
        return (
          <span>
            {this.props.controlList.ent_mod?<a href="javascript:" onClick={()=>{this.showEditModal(record)}}>修改</a>:null}
            {this.props.controlList.ent_mod && this.props.controlList.ent_del?<Divider type="vertical" />:null}
            {
              this.props.controlList.ent_del?
                (this.props.companyList.length >= 1
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
      },
    }],
  }

  componentWillMount(){
    // console.log("this.props.pagePath",this.props.pagePath);
    const { dispatch } = this.props;
    dispatch({
      type:"enterprise/Control",
      payload:{
        menuCode:this.props.pagePath,
        token:sessionStorage.getItem('sys-token'),
      }
    })
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const form = this.props.form;
    form.setFieldsValue({
      compType:""
    });
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: "enterprise/List",
          payload: {
            page: 1,
            pageSize:10,
            ...values,
            token: sessionStorage.getItem("sys-token")
          }
        });
      }
    });

    dispatch({
      type: "enterprise/SelectOption",
    });
  }

  setSelectedRowKeys=()=>{
    this.setState({selectedRowKeys:[]})
  };

  showEditModal = (record) => {
    // console.log("record",record);
    this.setState({
      editVisible: true,
      rowData:record,
    });
  };

  rowDel = (key) => {
    // console.log("key",key);
    const {dispatch}=this.props;
    dispatch({
      type:'enterprise/Del',
      payload:{
        opType:"del",
        ids:key.compNo,
        token:sessionStorage.getItem('sys-token'),
      },
    });
    if(this.props.setSelectedRowKeys){
      this.props.setSelectedRowKeys()
    }
  };

  moreRowDel = () => {
    const {selectedRows,selectedRowKeys}=this.state;
    // const delMoreRows=[];
    // selectedRows.map((item)=>{
    //   delMoreRows.push(item.compNo)
    // });
    const {dispatch}=this.props;
    dispatch({
      type:'enterprise/Del',
      payload:{
        ids:selectedRowKeys.join(","),
        opType:"del",
        token:sessionStorage.getItem('sys-token'),
      },
    });
    if(this.props.setSelectedRowKeys){
      this.props.setSelectedRowKeys()
    }
  };

  tableOnChange = (current, size) => {
    const form = this.props.form;
    form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type:'enterprise/List',
          payload:{
            page:current,
            pageSize:size,
            ...values
          }
        });
      }
    })
    if(this.props.setSelectedRowKeys){
      this.props.setSelectedRowKeys()
    }
  };

  tableOnShowSizeChange = (page, pageSize) => {
    const form = this.props.form;
    form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type:'enterprise/List',
          payload:{
            page,
            pageSize,
            ...values
          }
        });
      }
    })
    if(this.props.setSelectedRowKeys){
      this.props.setSelectedRowKeys()
    }
  };

  hanldeHighSearch = () => {
    this.setState({
      openHighSearch:!this.state.openHighSearch
    })
  };

  showInfoModal=()=>{
    this.setState({
      enterVisible: true,
    });
  };

  enterVisible=(value)=>{
    this.setState({
      enterVisible: value,
    });
  };

  enterEditVisible=(value)=>{
    this.setState({
      editVisible: value,
    });
  };

  handleSearch = () => {
    const form = this.props.form;
    form.validateFields((err, values) => {
      if (!err) {
        const { dispatch } = this.props;
        dispatch({
          type: "enterprise/List",
          payload:{
            page: 1,
            pageSize:10,
            ...values,
            token:sessionStorage.getItem('sys-token'),
          },
        });
        if(this.props.setSelectedRowKeys){
          this.props.setSelectedRowKeys()
        }
      }
    });

  };

  onChanged=(selectedRowKeys, selectedRows) => {
    // console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
    this.setState({ selectedRows: selectedRows,selectedRowKeys:selectedRowKeys})
  };

  render(){
    const {columns,openHighSearch,enterVisible,editVisible,rowData,selectedRows,selectedRowKeys}=this.state;
    const {  companyList, pageSize,total,diceLoading,current,option}=this.props;
    const { getFieldDecorator } = this.props.form;
    // console.log("option",option);
    const children = option.map((item) => {
      return <Option key={item.code} value={item.code}>{item.name}</Option>;
    });
    const FormItem = Form.Item;
    const rowSelection = {
      selectedRowKeys:selectedRowKeys,
      onChange: this.onChanged,
    };
    const pagination = {
      current:this.props.current,
      pageSize,
      total,
      showSizeChanger: true,
      showTotal: (total, range) => `共${total}条记录`,
      onChange: this.tableOnChange,
      onShowSizeChange: this.tableOnShowSizeChange,
      // pageSizeOptions:['1','5','10'],
    };
    const formItemLayout1 = {
      labelCol: {
        sm: { span: 24 },
        md: { span: 24 },
        lg: { span: 11},
        xl: { span: 8 }
      },
      wrapperCol: {
        sm: { span: 24 },
        md: { span: 24 },
        lg: { span: 12 },
        xl: { span: 15 }
      }
    };
    const normalSearch = (
      <div className={styles.searchRow}>
        <Form layout="inline">
          <Row>
            <Col sm={{ span: 24 }} lg={{ span: 5 }}>
              <FormItem
                label="编号"
                {...formItemLayout1}
                style={{ width: "100%" }}
              >
                {getFieldDecorator("comp_no", {
                  rules: [{ required: false }]
                })(
                  <Input
                    id="employeeId"
                    placeholder="请输入编号"
                    className={styles.formItemWidth1}
                    // value={this.state.nameValue}
                    // suffix={this.state.nameValue ? <Icon type="close" onClick={this.emptyNameValue}/> : null}
                    // onChange={this.nameValueChange}
                  />
                )}
              </FormItem>
            </Col>
            <Col sm={{ span: 24 }} lg={{ span:5}}>
              <FormItem
                {...formItemLayout1}
                label="名称"
                style={{ width: "100%" }}
              >
                {getFieldDecorator("compName", {
                  rules: [{
                    required: false, message: "请输入名称!"
                  }]
                })(
                  <Input
                    className={styles.formItemWidth1}
                    placeholder="请输入名称"
                  />
                )}
              </FormItem>
            </Col>
            <Col sm={{ span: 24 }} lg={{ span:5}}>
              <FormItem
                {...formItemLayout1}
                label="类型"
                style={{ width: "100%" }}
              >
                {getFieldDecorator("compType", {
                  rules: [{
                    required: false, message: "请输入类型!"
                  }]
                })(
                  <Select
                    className={styles.formItemWidth1}
                  >
                    <Option key={""} value={""}>全部</Option>
                    {children}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col xs={{ span: 12 }} sm={{ span: 12 }} lg={{ span: 4}}>
              <span className={styles.unSpan}>
                  {/*<a onClick={this.hanldeHighSearch} style={{ marginRight: 20 }}>{openHighSearch?"收起":"展开"}</a>*/}
                  <Button type="primary" icon="search" onClick={this.handleSearch} style={{ marginLeft: 20 }}>搜索</Button>
              </span>
            </Col>
            <Col xs={{ span: 12 }} sm={{ span: 12 }} lg={{ span: 5}}>
              <Row type="flex" justify="end">
                <span className={styles.unSpan1}>
                    {
                      this.props.controlList.ent_del?
                        ( selectedRowKeys.length > 0 ? <Popconfirm
                          okText="确定"
                          cancelText="取消"
                          title="是否要删除选中的用户信息?"
                          placement="bottomRight"
                          onConfirm={this.moreRowDel}
                        >
                          <Button type="primary" className={styles.allDelete}>删除</Button>
                        </Popconfirm> : null):null
                    }
                  {this.props.controlList.ent_add?<Button style={{ marginLeft: 10 }} type="primary" icon="plus" onClick={this.showInfoModal}>添加</Button>:null}
                </span>
              </Row>
            </Col>
          </Row>
        </Form>
      </div>
    );
    return(
      <Card>
        {normalSearch }
        {
          enterVisible?<EnterAddSearch enterVisible={this.enterVisible} showEnterModal={enterVisible} setSelectedRowKeys={this.setSelectedRowKeys}/>:null
        }
        {
          editVisible?<EnterEditSearch enterEditVisible={this.enterEditVisible} showEnterEditModal={editVisible} rowData={rowData} setSelectedRowKeys={this.setSelectedRowKeys}/>:null
        }
        <Table
          columns={columns}
          onRow={(record) => {
            return { onClick: (event) => {
                // console.log("record",record);
                if(selectedRowKeys.indexOf(record.compNo) > -1){
                  let index=selectedRowKeys.indexOf(record.compNo);
                  selectedRowKeys.splice(index, 1);
                  this.setState({
                    selectedRowKeys
                  })
                }else{
                  selectedRowKeys.push(record.compNo);
                  this.setState({
                    selectedRowKeys
                  })
                }
                // console.log("selectedRowKeys",selectedRowKeys);
              }};
          }}
          dataSource={ companyList}
          rowSelection={rowSelection}
          loading={diceLoading}
          scroll={{ x:'100%' }}
          rowKey="compNo"
          pagination={pagination}
        />
      </Card>
    )
  }
}