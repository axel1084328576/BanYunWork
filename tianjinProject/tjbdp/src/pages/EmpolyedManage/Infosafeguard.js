import React, { Component } from "react";
import {
  Card,
  Table,
  Button,
  Row,
  Col,
  Input,
  Icon,
  Popconfirm,
  Select,
  Form,
  InputNumber,
  Modal,
  Divider,
  message
} from "antd";
import { connect } from "dva";
import InfoHighSearch from "../../components/EmpolyedManage/HighSearch";
import InfoAddSearch from "../../components/EmpolyedManage/AddModal";
import InfoEditSearch from "../../components/EmpolyedManage/EditModal";
import ImportModal from "../../components/EmpolyedManage/ImportModal";
import styles from "./Infosafeguard.less";
import SelectExpree from '../../components/EmpolyedManage/SelectExpree';

const idType = ['', '身份证', '护照', '其他'];
const status = ['离职', '在职'];

@connect(({ infoSafeGuard, loading, getPagePage, expressNetwork, businessinfo }) => {
  const { infoSafeList, pageSize, total, controlList, page, jobTypeList } = infoSafeGuard;
  const { expressList } = expressNetwork;
  const { pagePath } = getPagePage;
  const { companyList } = businessinfo;
  return {
    page,
    expressList,
    infoSafeList,
    jobTypeList,
    pageSize,
    total,
    controlList,
    pagePath,
    companyList,
    infoLoading: loading.effects["infoSafeGuard/List"],
    delLoading: loading.effects["infoSafeGuard/Del"]
  };
})

@Form.create()
export default class Infosafeguard extends Component {
  state = {
    showSearch: false,
    nameValue: "",
    infoVisible: false,
    editVisible: false,
    selectedRows: "",
    selectedRowKeys: [],
    dataSource: [],
    rowData: "",
    importVisible: false,
    openHighSearch: false,
    highSearchValue: {},
    expVisible: false,
    stationId: null,
    compNo: null,
    columns: [{
      title: "从业人员编号",
      dataIndex: "emplNo",
      key: "emplNo",
      // width:100,
    }, {
      title: "快递企业代码",
      dataIndex: "expressNo",
      key: "expressNo",
      // width:120,
    }, {
      title: "网点编码",
      dataIndex: "networkNo",
      key: "networkNo",
      // width:100,
    }, {
      title: "姓名",
      dataIndex: "emplName",
      key: "emplName",
      // width:140,
    }, {
      title: "电话",
      dataIndex: "mobile",
      key: "mobile",
      // width:140,
    }, {
      title: "居住地址",
      dataIndex: "address",
      key: "address",
      // width:140,
    }, {
      title: "证件号码",
      dataIndex: "idcard",
      key: "idcard",
      // width:100,
    }, {
      title: "岗位类型",
      dataIndex: "level",
      key: "level",
      // width:120,
    }, {
      title: "",
      dataIndex: "operation",
      key: "operation",
      // fixed: "right",
      // width:110,
      render: (text, record) => {
        return (
          <span>
            {this.props.controlList.emp_mod ? <a href="javascript:" onClick={() => {
              this.showEditModal(record);
            }}>修改</a> : null}
            {this.props.controlList.emp_mod && this.props.controlList.emp_del ? <Divider type="vertical" /> : null}
            {
              this.props.controlList.emp_del ?
                (this.props.infoSafeList.length >= 1
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
                  ) : null) : null
            }
          </span>
        );
      }
    }]
    // columns: [{
    //   title: "职员ID",
    //   dataIndex: "emplNo",
    //   key: "emplNo",
    //   // width:100,
    // }, {
    //   title: "职员姓名",
    //   dataIndex: "emplName",
    //   key: "emplName",
    //   // width:120,
    // }, {
    //   title: "籍贯",
    //   dataIndex: "nativePlace",
    //   key: "nativePlace",
    //   // width:100,
    // }, {
    //   title: "住址",
    //   dataIndex: "address",
    //   key: "address",
    //   // width:140,
    // }, {
    //   title: "从业资格级别",
    //   dataIndex: "level",
    //   key: "level",
    //   // width:140,
    // }, {
    //   title: "证件号",
    //   dataIndex: "idcard",
    //   key: "idcard",
    //   // width:140,
    // }, {
    //   title: "证件类型",
    //   dataIndex: "idType",
    //   key: "idType",
    //   // width:100,
    //   render: (text, record) => (
    //     <span>{idType[record.idType]}</span>
    //   ),
    // }, {
    //   title: "快递企业",
    //   dataIndex: "compNo",
    //   key: "compNo",
    //   // width:100,
    // },{
    //   title: "离职时间",
    //   dataIndex: "departureTime",
    //   key: "departureTime",
    //   // width:120,
    // },{
    //   title: "入职时间",
    //   dataIndex: "entryTime",
    //   key: "entryTime",
    //   // width:120,
    // },{
    //   title: "公司名称",
    //   dataIndex: "enterpriseName",
    //   key: "enterpriseName",
    //   // width:120,
    // },{
    //   title: "雇佣状态",
    //   dataIndex: "status",
    //   key: "status",
    //   render: (text, record) => (
    //     <span>{status[record.status]}</span>
    //   ),
    //   // width:100,
    // },{
    //   title: "联系电话",
    //   dataIndex: "mobile",
    //   key: "mobile",
    //   // width:120,
    // }, {
    //   title: "归属网点",
    //   dataIndex: "workStation.statName",
    //   key: "workStation.statName",
    // }, {
    //   title: "",
    //   dataIndex: "operation",
    //   key: "operation",
    //   // fixed: "right",
    //   // width:110,
    //   render: (text, record) => {
    //     return (
    //       <span>
    //         {this.props.controlList.emp_mod?<a href="javascript:" onClick={() => {
    //           this.showEditModal(record);
    //         }}>修改</a>:null}
    //         {this.props.controlList.emp_mod && this.props.controlList.emp_del?<Divider type="vertical" />:null}
    //         {
    //           this.props.controlList.emp_del?
    //             (this.props.infoSafeList.length >= 1
    //               ? (
    //                 <Popconfirm
    //                   title="是否要删除选中的用户信息?"
    //                   placement="bottomRight"
    //                   onConfirm={() => {
    //                     this.rowDel(record);
    //                   }}
    //                 >
    //                   <a href="javascript:;" style={{ color: "#f5222d" }}>删除</a>
    //                 </Popconfirm>
    //               ) : null):null
    //         }
    //       </span>
    //     );
    //   }
    // }]
  };

  componentWillMount() {
    // console.log("this.props.pagePath",this.props.pagePath);
    const { dispatch } = this.props;
    dispatch({
      type: "infoSafeGuard/Control",
      payload: {
        menuCode: this.props.pagePath,
        token: sessionStorage.getItem('sys-token'),
      }
    })
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const form = this.props.form;
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: "infoSafeGuard/List",
          payload: {
            ...values,
            page: 1,
            pageSize: 10,
            token: sessionStorage.getItem("sys-token")
          }
        });
      }
    });
    dispatch({
      type: "expressNetwork/List",
      payload: {
        token: sessionStorage.getItem("sys-token")
      }
    });
    dispatch({
      type: "businessinfo/companyList",
      payload: {
        token: sessionStorage.getItem("sys-token")
      }
    });

    dispatch({
      type: "infoSafeGuard/getJobType",
      payload: {
        token: sessionStorage.getItem("sys-token")
      },
      callback(res) {
        console.log(res)
      }
    });
  }

  handleImportVisible = () => {
    this.setState({
      importVisible: true
    })
  };

  handleCloseVisible = (value) => {
    this.setState({
      importVisible: value
    })
  };

  rowDel = (key) => {
    let searchItem = this.getSearch();
    let data = {
      opType: "del",
      ids: key.sid,
      token: sessionStorage.getItem("sys-token")
    };
    const { dispatch } = this.props;
    dispatch({
      type: "infoSafeGuard/Del",
      payload: {
        data: data,
        searchItem: searchItem,
      },
      callback: () => {
        this.setSelectedRowKeys();
        dispatch({
          type: "expressNetwork/List",
          payload: {
            token: sessionStorage.getItem("sys-token")
          }
        });
      }
    });
  };

  moreRowDel = () => {
    const { selectedRows, selectedRowKeys } = this.state;
    let searchItem = this.getSearch();
    let data = {
      ids: selectedRowKeys.join(","),
      opType: "del",
      token: sessionStorage.getItem("sys-token")
    };
    const { dispatch } = this.props;
    dispatch({
      type: "infoSafeGuard/Del",
      payload: {
        data: data,
        searchItem: searchItem,
      },
    });
    this.setSelectedRowKeys();
  };

  emptyNameValue = () => {
    this.setState({ nameValue: "" });
  };

  nameValueChange = (value) => {
    this.setState({ nameValue: value.target.value });
  };

  openHighSearch = () => {
    this.setState({ showSearch: !this.state.showSearch });
  };

  highSearch = (value) => {
    this.setState({ showSearch: value });
  };

  showEditModal = (record) => {
    this.setState({
      editVisible: true,
      rowData: record
    });
  };

  handleEditOk = () => {
    this.setState({ editVisible: false });
  };

  showInfoModal = () => {
    this.setState({
      infoVisible: true
    });
  };

  infoVisible = (value) => {
    this.setState({
      infoVisible: value
    });
  };

  infoEditVisible = (value) => {
    this.setState({
      editVisible: value
    });
  };

  setSelectedRowKeys = () => {
    this.setState({ selectedRowKeys: [] })
  };

  handleSearch = () => {
    // let oInput = document.querySelector("#employeeId");
    // let onInput = oInput.value.trim();
    const form = this.props.form;
    const { dispatch } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: "infoSafeGuard/List",
          payload: {
            page: 1,
            pageSize: 10,
            ...values,
            token: sessionStorage.getItem("sys-token")
          }
        });
        this.setState({
          selectedRowKeys: []
        })
      }
    })
  };

  getSearch = () => {
    let data;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // let value={};
        // this.state.openHighSearch?value={
        //   emplNo:values.emplNo,
        //   compNo:this.state.compNo,
        //   stationId:this.state.stationId,
        //   emplName:values.emplName,
        //   address:values.address,
        //   status:values.status,
        //   idcard:values.idcard,
        //   mobile:values.mobile,
        //
        //   licencePlate:values.licencePlate1
        // }:value={
        //   emplNo:values.emplNo,
        //   compNo:this.state.compNo,
        // };
        // if(value.compNo==null){
        //   value.compNo=undefined
        // }
        // if(value.status==null){
        //   value.status=undefined
        // }
        // if(value.stationId==null){
        //   value.stationId=undefined
        // }
        // values.stationId=this.state.stationId;
        data = values;
      }
    });
    return data;
  };

  getHighSearch = (value) => {
    this.setState({ highSearchValue: value })
  };

  tableOnChange = (current, size) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: "infoSafeGuard/List",
          payload: {
            page: current,
            pageSize: size,
            ...values,
            token: sessionStorage.getItem("sys-token")
          }
        });
        this.setSelectedRowKeys();
      }
    })
  };

  tableOnShowSizeChange = (page, pageSize) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: "infoSafeGuard/List",
          payload: {
            page,
            pageSize,
            ...values,
            token: sessionStorage.getItem("sys-token")
          }
        });
        this.setSelectedRowKeys();
      }
    })
  };

  hanldeHighSearch = () => {
    this.setState({
      openHighSearch: !this.state.openHighSearch,
      stationId: null
    })
  };

  timestampToTime = (timestamp) => {
    if (timestamp != null && timestamp != undefined) {
      let date = new Date(timestamp);
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();

      month = month < 10 ? "0" + month : month;
      day = day < 10 ? "0" + day : day;
      return timestamp = year + '-' + month + '-' + day;
    } else {
      return null
    }
  };

  onChanged = (selectedRowKeys, selectedRows) => {
    // console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
    this.setState({ selectedRows: selectedRows, selectedRowKeys: selectedRowKeys })
  };

  inputHandle = () => {
    this.setState({ expVisible: true })
  };

  setExpVisible = (value, value1) => {
    // console.log("value1",value1);
    this.setState({
      expVisible: value
    });
    if (value1 != undefined && value != null) {
      this.props.form.setFieldsValue({
        compNo: value1.compNa,
        stationId: value1.statName,
      });
      this.setState({
        stationId: value1.sid,
        compNo: value1.compNo,
      })
    }
  };

  selectOnChange = (value) => {
    this.setState({
      compNo: value,
    })
  };

  render() {
    const { columns, showSearch, infoVisible, selectedRows, rowData, selectedRowKeys } = this.state;
    const { infoLoading, infoSafeList, delLoading, pageSize, total } = this.props;
    const { getFieldDecorator } = this.props.form;
    const FormItem = Form.Item;
    const Option = Select.Option;

    this.props.infoSafeList.map((item) => {
      item.departureTime = this.timestampToTime(item.departureTime)
    });

    this.props.infoSafeList.map((item) => {
      item.entryTime = this.timestampToTime(item.entryTime)
    });

    const children = this.props.expressList.map((item) => {
      return <Option key={item.sid} value={item.sid}>{item.statName}</Option>;
    });

    const rowSelection = {
      selectedRowKeys: selectedRowKeys,
      onChange: this.onChanged,
    };
    const pagination = {
      current: this.props.page,
      pageSize,
      total,
      showSizeChanger: true,
      showTotal: (total, range) => `共${total}条记录`,
      onChange: this.tableOnChange,
      onShowSizeChange: this.tableOnShowSizeChange,
      // pageSizeOptions:['3','5','10'],
    };
    const formItemLayout = {
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

    //岗位类型
    const jobTypeList = this.props.jobTypeList.map((item) => {
      return <Option key={item} value={item}>{item}</Option>;
    });

    const companyList = this.props.companyList.map((item) => {
      return <Option key={item.compNo} value={item.compNo}>{item.companyName}</Option>;
    });
    
    const normalSearch = (
      <div className={styles.searchRow}>
        <Form layout="inline">
          <Row>
            <Col sm={{ span: 24 }} lg={{ span: 6 }}>
              <FormItem
                label="从业人员编号"
                {...formItemLayout}
                style={{ width: "100%" }}
              >
                {getFieldDecorator("emplNo", {
                  rules: [{ required: false }]
                })(
                  <Input
                    id="employeeId"
                    placeholder="请输入从业人员编号"
                    // value={this.state.nameValue}
                    // suffix={this.state.nameValue ? <Icon type="close" onClick={this.emptyNameValue}/> : null}
                    onChange={this.nameValueChange}
                  />
                )}
              </FormItem>
            </Col>
            <Col sm={{ span: 24 }} lg={{ span: 6 }}>
              <FormItem
                label="快递企业代码"
                {...formItemLayout}
                style={{ width: "100%" }}
              >
                {getFieldDecorator("expressNo", {
                  initialValue: this.props.companyList.length == 1 ? this.props.companyList[0].compNo : null,
                  rules: [{ required: false }]
                })(
                  <Select className={styles.formItemWidth} onChange={this.selectOnChange}>
                    <Option key={null} value={null}>全部</Option>
                    {companyList}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col xs={{ span: 12 }} sm={{ span: 12 }} lg={{ span: 6 }}>
              <span className={styles.unSpan}>
                <a onClick={this.hanldeHighSearch} style={{ marginRight: 20 }}>{this.state.openHighSearch ? "收起" : "展开"}</a>
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
                    this.props.controlList.emp_del ?
                      (selectedRowKeys.length > 0 ? <Popconfirm
                        okText="确定"
                        cancelText="取消"
                        title="是否要删除选中的用户信息?"
                        placement="bottomRight"
                        onConfirm={this.moreRowDel}
                      >
                        <Button type="primary" className={styles.allDelete} loading={delLoading} style={{ marginLeft: 10 }}>删除</Button>
                      </Popconfirm> : null) : null
                  }
                  {this.props.controlList.emp_add ? <Button style={{ marginLeft: 10 }} type="primary" icon="plus" onClick={this.showInfoModal}>添加</Button> : null}
                </span>
              </Row>
            </Col>
          </Row>
          {this.state.openHighSearch ? <Row>
            <Col sm={{ span: 24 }} lg={{ span: 6 }}>
              <FormItem
                {...formItemLayout}
                label="网点编码"
                style={{ width: "100%" }}
              >
                {getFieldDecorator("networkNo", {
                  rules: [{
                    required: false, message: "请输入网点编码!"
                  }]
                })(
                  <Input
                    style={{ width: "100%" }}
                    placeholder="请输入网点编码"
                  // suffix={addressValue ? <Icon type="close" onClick={this.emptyAddress} /> : null}
                  // onChange={this.addressValueChange}
                  />
                )}
              </FormItem>
            </Col>
            <Col sm={{ span: 24 }} lg={{ span: 6 }}>
              <FormItem
                {...formItemLayout}
                label="姓名"
                style={{ width: "100%" }}
              >
                {getFieldDecorator("emplName", {
                  rules: [{
                    required: false, message: "请输入姓名!"
                  }]
                })(
                  <Input
                    style={{ width: "100%" }}
                    placeholder="请输入姓名"
                  // suffix={nameValue ? <Icon type="close" onClick={this.emptyName} /> : null}
                  // onChange={this.nameValueChange}
                  />
                )}
              </FormItem>
            </Col>
            <Col sm={{ span: 24 }} lg={{ span: 6 }}>
              <FormItem
                {...formItemLayout}
                label="电话"
                style={{ width: "100%" }}
              >
                {getFieldDecorator("mobile", {
                  rules: [{
                    required: false, message: "请输入电话!"
                  }]
                })(
                  <Input
                    style={{ width: "100%" }}
                    placeholder="请输入电话"
                  // suffix={addressValue ? <Icon type="close" onClick={this.emptyAddress} /> : null}
                  // onChange={this.addressValueChange}
                  />
                )}
              </FormItem>
            </Col>
            <Col sm={{ span: 24 }} lg={{ span: 6 }}>
              <FormItem
                {...formItemLayout}
                label="居住地址"
                style={{ width: "100%" }}
              >
                {getFieldDecorator("address", {
                  initialValue: null,
                  rules: [{
                    required: false, message: "请输入居住地址!"
                  }]
                })(
                  <Input
                    style={{ width: "100%" }}
                    placeholder="请输入居住地址"
                  />
                )}
              </FormItem>
            </Col>
            <Col sm={{ span: 24 }} lg={{ span: 6 }}>
              <FormItem
                {...formItemLayout}
                label="证件号码"
                style={{ width: "100%" }}
              >
                {getFieldDecorator("idcard", {
                  rules: [{
                    required: false, message: "请输入证件号码!"
                  }]
                })(
                  <Input
                    style={{ width: "100%" }}
                    placeholder="请输入证件号码"
                  // suffix={identityIdValue ? <Icon type="close" onClick={this.emptyIdentityId} /> : null}
                  // onChange={this.identityIdValueChange}
                  />
                )}
              </FormItem>
            </Col>
            <Col sm={{ span: 24 }} lg={{ span: 6 }}>
              <FormItem
                {...formItemLayout}
                label="岗位类型"
                style={{ width: "100%" }}
              >
                {getFieldDecorator("level", {
                  rules: [{
                    required: false, message: "请输入岗位类型"
                  }]
                })(
                  <Select
                    style={{ width: "100%" }}
                    placeholder="请选择岗位类型"
                  >
                    <Option key={null} value={null}>全部</Option>
                    {jobTypeList}
                    {/* <Option value="主负责人">主负责人</Option>
                      <Option value="安全负责人">安全负责人</Option>
                      <Option value="网点负责人">网点负责人</Option>
                      <Option value="安全管理人员">安全管理人员</Option>
                      <Option value="安全员">安全员</Option> */}
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
            : null}
        </Form>
      </div>
    );
    return (
      <Card>
        {
          this.state.expVisible ? <SelectExpree setExpVisible={this.setExpVisible} expVisible={this.state.expVisible} compNo={this.state.compNo} /> : null
        }
        {
          this.state.importVisible ? <ImportModal visible={this.state.importVisible} changeVisible={this.handleCloseVisible} setSelectedRowKeys={this.setSelectedRowKeys} getSearch={this.getSearch} /> : null
        }
        {
          infoVisible ? <InfoAddSearch infoVisible={this.infoVisible} showInfoModal={infoVisible} setSelectedRowKeys={this.setSelectedRowKeys} getSearch={this.getSearch} /> : null
        }
        {
          this.state.editVisible ?
            <InfoEditSearch infoEditVisible={this.infoEditVisible} showInfoEditModal={this.state.editVisible}
              rowData={rowData} setSelectedRowKeys={this.setSelectedRowKeys} getSearch={this.getSearch} /> : null
        }
        {normalSearch}
        <Table
          dataSource={infoSafeList}
          columns={columns}
          bordered
          rowSelection={rowSelection}
          loading={infoLoading}
          rowKey="sid"
          scroll={{ x: true }}
          pagination={pagination}
          onRow={(record) => {
            return {
              onClick: (event) => {
                // console.log("record",record);
                if (selectedRowKeys.indexOf(record.sid) > -1) {
                  let index = selectedRowKeys.indexOf(record.sid);
                  selectedRowKeys.splice(index, 1);
                  this.setState({
                    selectedRowKeys
                  })
                } else {
                  selectedRowKeys.push(record.sid);
                  this.setState({
                    selectedRowKeys
                  })
                }
                // console.log("selectedRowKeys",selectedRowKeys);
              }
            };
          }}
        />
      </Card>
    );
  }
}

