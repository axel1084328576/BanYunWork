import React from 'react';
import {Table,Card,Popconfirm,Divider,Button,Row,Col,Form,Input,Select} from 'antd';
import DictAddSearch from '../../components/UniformIdentity/DictionariesManage/AddModal';
import DictEditSearch from '../../components/UniformIdentity/DictionariesManage/EditModal';
import DictTree from '../../components/UniformIdentity/DictionariesManage/DictTree';
import { connect } from "dva";
import styles from "./allStyles.less";

const Option = Select.Option;

@connect(({ dictionaries, loading,getPagePage }) => {
  const { diceList, pageSize, total, current,dictTreeList,treeId,controlList } = dictionaries;
  const {pagePath}=getPagePage;
  return {
    diceList,
    pageSize,
    current,
    total,
    treeId,
    dictTreeList,
    controlList,
    pagePath,
    diceLoading: loading.effects["dictionaries/List"],
  };
})

@Form.create()
export default class DictionariesManage extends React.Component{
  state={
    openHighSearch:false,
    dictValue:null,
    // dictNameValue:null,
    // dictOrderValue:null,
    dictVisible:false,
    rowData:"",
    editVisible:false,
    selectKeys:null,
    selectedRows:"",
    selectedRowKeys:[],
    treeData:[],
    columns:[{
      title: '字典编码',
      dataIndex: 'dictCode',
      key:'dictCode',
    }, {
      title: '字典名称',
      dataIndex: 'dictName',
      key: 'dictName',
    }, {
      title: '字典排序',
      dataIndex: 'dictOrder',
      key: 'dictOrder',
    },{
      title: '',
      dataIndex: 'operation',
      // fixed: 'right',
      // width:110,
      render: (text, record) => {
        return (
          <span>
            {this.props.controlList.dic_mod?<a href="javascript:" onClick={()=>{this.showEditModal(record)}}>修改</a>:null}
            {this.props.controlList.dic_mod && this.props.controlList.dic_del?<Divider type="vertical" />:null}
            {
              this.props.controlList.dic_del?
                this.props.diceList.length >= 1
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
                  ):null:null
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
      type:"dictionaries/Control",
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
          type: "dictionaries/List",
          payload: {
            page: 1,
            pageSize:10,
            ...values,
            token: sessionStorage.getItem("sys-token")
          }
        });
      }
    });
  }

  setSelectedRowKeys=()=>{
    this.setState({selectedRowKeys:[]})
  };

  updataTreeData=(treeData)=>{
    this.setState({treeData:treeData})
  };

  showEditModal = (record) => {
    this.setState({
      editVisible: true,
      rowData:record,
    });
  };

  rowDel = (key) => {
    const {dispatch}=this.props;
    dispatch({
      type:'dictionaries/Del',
      payload:{
        opType:"del",
        ids:key.sid,
        pid:this.props.treeId,
        token:sessionStorage.getItem('sys-token'),
      },
      callback:(values)=>{
        dispatch({
          type: "dictionaries/Tree",
          payload: {
            token: sessionStorage.getItem("sys-token")
          },
          callback:(values)=>{
            // console.log("33333",values);
            if(this.updataTreeData){
              this.updataTreeData(values)
            }
          }
        });
      }
    });
    if(this.props.setSelectedRowKeys){
      this.props.setSelectedRowKeys()
    }
  };

  moreRowDel = () => {
    const {selectedRows,selectedRowKeys}=this.state;
    // console.log("selectedRowKeys",selectedRowKeys);
    // console.log("selectedRows",selectedRows);
    // const delMoreRows=[];
    // selectedRows.map((item)=>{
    //   delMoreRows.push(item.sid)
    // });
    const {dispatch}=this.props;
    dispatch({
      type:'dictionaries/Del',
      payload:{
        // ids:delMoreRows.join(","),
        ids:selectedRowKeys.join(","),
        opType:"del",
        pid:this.props.treeId,
        token:sessionStorage.getItem('sys-token'),
      },
      callback:(values)=>{
        dispatch({
          type: "dictionaries/Tree",
          payload: {
            token: sessionStorage.getItem("sys-token")
          },
          callback:(values)=>{
            if(this.updataTreeData){
              this.updataTreeData(values)
            }
          }
        });
      }
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
          type:'dictionaries/List',
          payload:{
            page:current,
            pageSize:size,
            ...values,
            pid:this.state.selectKeys[0],
            token:sessionStorage.getItem('sys-token'),
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
          type:'dictionaries/List',
          payload:{
            page,
            pageSize,
            ...values,
            pid:this.state.selectKeys[0],
            token:sessionStorage.getItem('sys-token'),
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

  dictValueChange = (value) => {
    this.setState({dictValue:value.target.value});
  };

  handleSearch = () => {
    // let oInput = document.querySelector('#cameraId');
    // let onInput = oInput.value.trim();
    const {dictValue}=this.state;
    const form = this.props.form;
    form.validateFields((err, values) => {
      if (!err) {
        const { dispatch } = this.props;
        dispatch({
          type: "dictionaries/List",
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

  dictEditVisible=(value)=>{
    this.setState({
      editVisible: value,
    });
  };

  showInfoModal=()=>{
    this.setState({
      dictVisible: true,
    });
  };

  dictVisible=(value)=>{
    this.setState({
      dictVisible: value,
    });
  };

  changeDel1=(value)=>{
    this.setState({
      selectKeys:value
    })
  };

  onChanged=(selectedRowKeys, selectedRows) => {
    // console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
    this.setState({ selectedRows: selectedRows,selectedRowKeys:selectedRowKeys})
  };

  // dictNameValueChange = (value) => {
  //   this.setState({dictNameValue:value.target.value});
  // };
  //
  // dictOrderValueChange = (value) => {
  //   this.setState({dictOrderValue:value.target.value});
  // };
  setValue=(value)=>{
    this.setState({
      selectedRowKeys:value
    })
  }

  render(){
    const {columns,openHighSearch,dictVisible,rowData,editVisible,selectedRows,selectedRowKeys}=this.state;
    const { diceList, pageSize,total,diceLoading,current,dictTreeList,dispatch}=this.props;
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
    };
    const formItemLayout1 = {
      labelCol: {
        sm: { span: 24 },
        md: { span: 24 },
        lg: { span: 11 },
        xl: { span: 9 }
      },
      wrapperCol: {
        sm: { span: 24 },
        md: { span: 24 },
        lg: { span: 12 },
        xl: { span: 14 }
      }
    };

    const normalSearch = (
      <div className={styles.searchRow}>
        <Form layout="inline">
          <Row>
            <Col sm={{ span: 24 }} lg={{ span: 6 }}>
              <FormItem
                label="字典编码"
                {...formItemLayout1}
                style={{ width: "100%" }}
              >
                {getFieldDecorator("dictCode", {
                  rules: [{ required: false }]
                })(
                  <Input
                    id="employeeId"
                    placeholder="请输入字典编码"
                    // value={this.state.nameValue}
                    // suffix={this.state.nameValue ? <Icon type="close" onClick={this.emptyNameValue}/> : null}
                    onChange={this.dictValueChange}
                  />
                )}
              </FormItem>
            </Col>
            <Col sm={{ span: 24 }} lg={{ span:6}}>
              <FormItem
                label="字典名称"
                {...formItemLayout1}
                style={{ width: "100%" }}
              >
                {getFieldDecorator("dictName", {
                  rules: [{ required: false }]
                })(
                  <Input
                    className={styles.formItemWidth1}
                    id="employeeId"
                    placeholder="请输入字典名称"
                    // value={this.state.nameValue}
                    // suffix={this.state.nameValue ? <Icon type="close" onClick={this.emptyNameValue}/> : null}
                    // onChange={this.dictNameValueChange}
                  />
                )}
              </FormItem>
            </Col>
            <Col xs={{ span: 12 }} sm={{ span: 12 }} lg={{ span:6 }}>
              <span className={styles.unSpan}>
                  {/*<a onClick={this.hanldeHighSearch} style={{ marginRight: 20 }}>{openHighSearch?"收起":"展开"}</a>*/}
                  <Button type="primary" icon="search" onClick={this.handleSearch} style={{ marginLeft: 20 }}>搜索</Button>
              </span>
            </Col>
            <Col xs={{ span: 12 }} sm={{ span: 12 }} lg={{ span: 6}}>
              <Row type="flex" justify="end">
                <span className={styles.unSpan1}>
                   {
                     this.props.controlList.dic_del?
                       (selectedRowKeys.length > 0 ? <Popconfirm
                         okText="确定"
                         cancelText="取消"
                         title="是否要删除选中的用户信息?"
                         placement="bottomRight"
                         onConfirm={this.moreRowDel}
                       >
                         <Button type="primary" className={styles.allDelete}>删除</Button>
                       </Popconfirm> : null):null
                   }
                  {this.props.controlList.dic_add?<Button style={{ marginLeft: 10 }} type="primary" icon="plus" onClick={this.showInfoModal}>添加</Button>:null}

                </span>
              </Row>
            </Col>
          </Row>
        </Form>
      </div>
    );

    return(
      <Card>
        <Row>
          <Col xs={{span: 24}} sm={{ span: 24 }} lg={{ span: 6}}>
            <DictTree changeDel1={this.changeDel1} setValue={this.setValue} updataTreeData={this.updataTreeData} treeData={this.state.treeData}/>
          </Col>
          <Col xs={{span: 24}} sm={{ span: 24 }} lg={{ span: 18 }}  className={styles.allLine}>
            {normalSearch }
            {
              dictVisible?<DictAddSearch dictVisible={this.dictVisible} showDictModal={dictVisible} updataTreeData={this.updataTreeData} setSelectedRowKeys={this.setSelectedRowKeys} />:null
            }
            {
              editVisible?<DictEditSearch dictEditVisible={this.dictEditVisible} showDictEditModal={editVisible} rowData={rowData} setSelectedRowKeys={this.setSelectedRowKeys} />:null
            }
            <Table
              columns={columns}
              onRow={(record) => {
                return { onClick: (event) => {
                   if(selectedRowKeys.indexOf(record.sid) > -1){
                     let index=selectedRowKeys.indexOf(record.sid);
                     selectedRowKeys.splice(index, 1);
                     this.setState({
                       selectedRowKeys
                     })
                     // console.log("selectedRowKeys",selectedRowKeys)
                   }else{
                      selectedRowKeys.push(record.sid);
                      this.setState({
                        selectedRowKeys
                      })
                     // console.log("selectedRowKeys",selectedRowKeys)
                   }
                   // console.log("selectedRowKeys",selectedRowKeys);
                }};
              }}
              dataSource={diceList}
              rowSelection={rowSelection}
              loading={diceLoading}
              scroll={{ x:'100%' }}
              rowKey="sid"
              pagination={pagination}
            />
          </Col>
        </Row>
      </Card>
    )
  }
}