import React from 'react';
import {Table,Card,Popconfirm,Divider,Button,Row,Col,Form,Input} from 'antd';
import ParaAddSearch from '../../components/UniformIdentity/ParameterManage/AddModal';
import ParaEditSearch from '../../components/UniformIdentity/ParameterManage/EditModal';
import { connect } from "dva";
import styles from "./allStyles.less";

@connect(({ parameter, loading,getPagePage }) => {
  const {  parasetList, pageSize, total,current,controlList } = parameter;
  const {pagePath}=getPagePage;
  return {
    parasetList,
    pageSize,
    current,
    total,
    controlList,
    pagePath,
    diceLoading: loading.effects["parameter/List"],
  };
})

@Form.create()
export default class ParameterManage extends React.Component{
  state={
    openHighSearch:false,
    paraVisible:false,
    editVisible:false,
    selectedRows:[],
    rowData:"",
    selectedRowKeys:[],
    columns:[{
      title: '代码',
      dataIndex: 'paraCode',
      key:'paraCode',
    },{
      title: '名称',
      dataIndex: 'paraName',
      key: 'paraName',
    },{
      title: '参数值',
      dataIndex: 'paraValue',
      key: 'paraValue',
    },{
      title: '类别',
      dataIndex: 'Type',
      key: 'Type',
    },{
      title: '排序',
      dataIndex: 'paraOrder',
      key: 'paraOrder',
    },{
      title: '',
      dataIndex: 'operation',
      // fixed: 'right',
      // width:110,
      render: (text, record) => {
        return (
          <span>
            {this.props.controlList.par_mod?<a href="javascript:" onClick={()=>{this.showEditModal(record)}}>修改</a>:null}
            {this.props.controlList.par_mod && this.props.controlList.par_del?<Divider type="vertical" />:null}
            {
              this.props.controlList.par_del?
                (this.props.parasetList.length >= 1
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
      type:"parameter/Control",
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
          type: "parameter/List",
          payload: {
            page: 1,
            pageSize: 10,
            ...values,
            token: sessionStorage.getItem("sys-token")
          }
        });
      }
    })
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
      type:'parameter/Del',
      payload:{
        opType:"del",
        ids:key.sid,
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
    //   delMoreRows.push(item.sid)
    // });
    const {dispatch}=this.props;
    dispatch({
      type:'parameter/Del',
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
          type:'parameter/List',
          payload:{
            page:current,
            pageSize:size,
            ...values
          }
        });
        if(this.props.setSelectedRowKeys){
          this.props.setSelectedRowKeys()
        }
      }
    })
  };

  tableOnShowSizeChange = (page, pageSize) => {
    const form = this.props.form;
    form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type:'parameter/List',
          payload:{
            page,
            pageSize,
            ...values
          }
        });
        if(this.props.setSelectedRowKeys){
          this.props.setSelectedRowKeys()
        }
      }
    })
  };

  hanldeHighSearch = () => {
    this.setState({
      openHighSearch:!this.state.openHighSearch
    })
  };

  showInfoModal=()=>{
    this.setState({
      paraVisible: true,
    });
  };

  paraVisible=(value)=>{
    this.setState({
      paraVisible: value,
    });
  };

  paraEditVisible=(value)=>{
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
          type: "parameter/List",
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
    const {columns,openHighSearch,paraVisible,editVisible,selectedRows,rowData,selectedRowKeys}=this.state;
    const {  parasetList, pageSize,total,diceLoading,current}=this.props;
    const { getFieldDecorator } = this.props.form;
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
        lg: { span: 9},
        xl: { span: 7 }
      },
      wrapperCol: {
        sm: { span: 24 },
        md: { span: 24 },
        lg: { span: 14 },
        xl: { span: 16 }
      }
    };
    const normalSearch = (
      <div className={styles.searchRow}>
        <Form layout="inline">
          <Row>
            <Col sm={{ span: 24 }} lg={{ span:6}}>
              <FormItem
                {...formItemLayout1}
                label="参数"
                style={{ width: "100%" }}
              >
                {getFieldDecorator("qryName1", {
                  rules: [{
                    required: false, message: "请输入参数!"
                  }]
                })(
                  <Input
                    className={styles.formItemWidth1}
                    placeholder="请输入参数"
                  />
                )}
              </FormItem>
            </Col>
            <Col sm={{ span: 24 }} lg={{ span:6}}>
              <FormItem
                {...formItemLayout1}
                label="类别"
                style={{ width: "100%" }}
              >
                {getFieldDecorator("Type", {
                  rules: [{
                    required: false, message: "请输入类别!"
                  }]
                })(
                  <Input
                    className={styles.formItemWidth1}
                    placeholder="请输入类别"
                  />
                )}
              </FormItem>
            </Col>
            <Col xs={{ span: 12 }} sm={{ span: 12 }} lg={{ span: 6 }}>
              <span className={styles.unSpan}>
                  {/*<a onClick={this.hanldeHighSearch} style={{ marginRight: 20 }}>{openHighSearch?"收起":"展开"}</a>*/}
                  <Button type="primary" icon="search" onClick={this.handleSearch} style={{ marginLeft: 20 }}>搜索</Button>
              </span>
            </Col>
            <Col xs={{ span: 12 }} sm={{ span: 12 }} lg={{ span: 6}}>
              <Row type="flex" justify="end">
                <span className={styles.unSpan1}>
                   {
                     this.props.controlList.par_del?
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
                  {this.props.controlList.par_add?<Button style={{ marginLeft: 10 }} type="primary" icon="plus" onClick={this.showInfoModal}>添加</Button>:null}
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
          paraVisible?<ParaAddSearch paraVisible={this.paraVisible} showParaModal={paraVisible} setSelectedRowKeys={this.setSelectedRowKeys}/>:null
        }
        {
          editVisible?<ParaEditSearch paraEditVisible={this.paraEditVisible} showParaEditModal={editVisible} rowData={rowData} setSelectedRowKeys={this.setSelectedRowKeys}/>:null
        }
        <Table
          columns={columns}
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
          dataSource={ parasetList}
          rowSelection={rowSelection}
          loading={diceLoading}
          scroll={{ x:'100%' }}
          rowKey="sid"
          pagination={pagination}
        />
      </Card>
    )
  }
}