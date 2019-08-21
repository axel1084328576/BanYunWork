//危化品名录
import React, { Component } from 'react'
import { Divider, Popconfirm, Table, Card, Row, Col, Input, Form, Button, InputNumber, Icon, Select } from "antd";
import { connect } from "dva";
import styles from "./NetworkManage.less";
import AddModal from '../../../components/BrandManage/NetworkManage/AddModal';
import EditModal from '../../../components/BrandManage/NetworkManage/EditModal';
import ImportModal from '../../../components/BrandManage/NetworkManage/ImportModal';
import MapDrawer from '../../../components/BrandManage/NetworkManage/MapDrawer';

const { Option } = Select;

@connect(({ networkManage, getPagePage, loading }) => {
  const { list, pageSize, total, controlList, page, netList } = networkManage;
  const { pagePath } = getPagePage;
  return {
    list, pageSize, total, controlList, page, pagePath, netList,
    loading: loading.effects['networkManage/List'],
  }
})

@Form.create()
export default class DeliveryEnterprise extends Component {
  state = {
    addVisible: false,
    editVisible: false,
    importVisible: false,
    mapVisible: false,
    mapData: [
      {
        position: {}
      }
    ],
    rowData: {},
    columns: [
      {
        title: "品牌编码",
        dataIndex: "compNo",
        key: "compNo",
        // width:100,
      },
      {
        title: "品牌名称",
        dataIndex: "compNa",
        key: "compNa",
        // width:100,
      },
      // {
      //   title: "网点代码",
      //   dataIndex: "statCode",
      //   key: "statCode",
      //   // width:100,
      // },
       {
        title: "网点名称",
        dataIndex: "statName",
        key: "statName",
        // width:100,
      }, {
        title: "许可备案名称",
        dataIndex: "websiteLicenseName",
        key: "websiteLicenseName",
        // width:100,
      }, {
        title: "网点地址",
        dataIndex: "address",
        key: "address",
        // width:100,
      }, {
        title: "所属行政区名称",
        dataIndex: "administrativeName",
        key: "administrativeName",
        // width:100,
      }, {
        title: "网点类型",
        dataIndex: "networkType",
        key: "networkType",
        // width:100,
        // render: (text, record) => {
        //   if(record!=undefined){
        //     if(record.statType==2){
        //       return <span>邮政</span>
        //     }else if(record.statType==1){
        //       return <span>快递</span>
        //     }
        //   }
        // }
      },
      //  {
      //   title: '网点经纬度',
      //   children:[{
      //     title:'经度',
      //     dataIndex: 'longitude',
      //     key: 'longitude',
      //     // width:120,
      //   },{
      //     title:'纬度',
      //     dataIndex: 'latitude',
      //     key: 'latitude',
      //     // width:120,
      //   }]
      // },
      {
        title: "网点负责人",
        dataIndex: "contact",
        key: "contact",
        // width:100,
      }, {
        title: "电话",
        dataIndex: "tel",
        key: "tel",
        // width:100,
      }, {
        title: "",
        dataIndex: "operation",
        key: "operation",
        // fixed: "right",
        width: 110,
        render: (text, record) => {
          return (
            <span>

              {/* {this.props.controlList.net_map ? <a href="javascript:" onClick={() => {
                this.showMapDrawer(record);
              }}>网点位置</a> : null}
              {this.props.controlList.net_map ? <Divider type="vertical" /> : null} */}

              {
                //无条件显示网点位置选项
                <a href="javascript:" onClick={() => {
                  this.showMapDrawer(record);
                }}>网点位置 </a>}
              {<Divider type="vertical" />}


              {this.props.controlList.net_edit ? <a href="javascript:" onClick={() => {
                this.showEditModal(record);
              }}>修改</a> : null}
              {this.props.controlList.net_edit && this.props.controlList.net_del ? <Divider type="vertical" /> : null}
              {
                this.props.controlList.net_del ? (this.props.list.length >= 1
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
      }
    ],
    openHighSearch: false,
    selectedRowKeys: [],
  };

  componentWillMount() {
    // console.log("this.props.pagePath",this.props.pagePath);
    const { dispatch } = this.props;
    dispatch({
      type: "networkManage/sortNet",
      payload: {
        token: sessionStorage.getItem('sys-token'),
      }
    })
    dispatch({
      type: "networkManage/Control",
      payload: {
        menuCode: this.props.pagePath,
        token: sessionStorage.getItem('sys-token'),
      }
    })
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'networkManage/List',
      payload: {
        token: sessionStorage.getItem('sys-token'),
        page: 1,
        pageSize: 10
      }
    })
  }

  setSelectedRowKeys = () => {
    this.setState({ selectedRowKeys: [] })
  };

  showMapDrawer = (record) => {
    console.log("record", record);
    let data = {
      name: record.statName,
      position: {
        latitude: record.latitude,
        longitude: record.longitude,
      },
      key: record.sid,
    };
    this.setState({
      mapVisible: true,
      mapData: [data]
    })
  };

  setMapDrawer = (value) => {
    this.setState({
      mapVisible: value,
    })
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

  handleImportVisible = () => {
    this.setState({
      importVisible: true
    })
  };

  setEditModal = (value) => {
    this.setState({
      editVisible: value,
    })
  };

  setAddModal = (value) => {
    this.setState({
      addVisible: value,
    })
  };

  setImportModal = (value) => {
    this.setState({
      importVisible: value,
    })
  };

  rowDel = (key) => {
    let data;
    if (this.getSearch) {
      data = this.getSearch();
    }
    const { dispatch, page, pageSize } = this.props;
    dispatch({
      type: 'networkManage/Del',
      payload: {
        opType: "del",
        ids: key.sid,
        token: sessionStorage.getItem('sys-token'),
      },
      callback: () => {
        this.setSelectedRowKeys();
        dispatch({
          type: 'networkManage/List',
          payload: {
            ...data,
            page: page,
            pageSize: pageSize
          }
        });
      }
    });
  };

  moreRowDel = () => {
    let data;
    if (this.getSearch) {
      data = this.getSearch();
    }
    const { selectedRowKeys } = this.state;
    const { dispatch, page, pageSize } = this.props;

    dispatch({
      type: "networkManage/AddOrEdit",
      payload: {
        ids: selectedRowKeys.join(","),
        opType: "del",
        token: sessionStorage.getItem("sys-token")
      },
      callback: () => {
        this.setSelectedRowKeys();
        dispatch({
          type: 'networkManage/List',
          payload: {
            ...data,
            page: page,
            pageSize: pageSize
          }
        });
      }
    });
  };

  handleSearch = () => {
    const form = this.props.form;
    const { dispatch } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'networkManage/List',
          payload: {
            page: 1,
            pageSize: 10,
            ...values,
            token: sessionStorage.getItem('sys-token'),
          },
        });
      }
    })
  };

  hanldeHighSearch = () => {
    this.setState({
      openHighSearch: !this.state.openHighSearch
    })
  };

  onChanged = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRowKeys: selectedRowKeys })
  };

  tableOnChange = (current, size) => {
    this.setState({ selectedRowKeys: [] })
    const form = this.props.form;
    form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'networkManage/List',
          payload: {
            page: current,
            pageSize: size,
            ...values,
            token: sessionStorage.getItem('sys-token'),
          }
        });
      }
    })
  };

  tableOnShowSizeChange = (page, pageSize) => {
    this.setState({ selectedRowKeys: [] });
    const form = this.props.form;
    form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'networkManage/List',
          payload: {
            page,
            pageSize,
            ...values,
            token: sessionStorage.getItem('sys-token'),
          }
        });
      }
    });
  };

  getSearch = () => {
    let data;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        data = values;
      }
    });
    return data;
  };

  render() {
    const { columns, selectedRowKeys, editVisible, rowData, addVisible, setImportModal, importVisible, mapVisible, mapData } = this.state;
    const { list, pageSize, total, loading, netList } = this.props;


    let showList = [];

    list.forEach(element => {

      let type = '';
      for (let i in netList) {
        if (netList[i].networkType == element.networkType) {
          type = netList[i].name;
          break;
        }
      }
      let temp = {
        ...element,
        networkType: type
      }
      showList.push(temp);
    });

    const { getFieldDecorator } = this.props.form;
    // console.log("this.props.cheList",this.props.cheList);
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
      // pageSizeOptions:['2','5','10']
    };
    const option = netList.map((item) => {
      return <Option value={item.networkType}>{item.name}</Option>
    })

    const normalSearch = (
      <div className={styles.searchRow}>
        <Form layout="inline">
          <Row>
            <Col sm={{ span: 24 }} lg={{ span: 6 }}>
              <Form.Item
                label="网点类型"
                {...formItemLayout}
                style={{ width: "100%" }}
              >
                {getFieldDecorator("networkType", {
                  initialValue: null,
                  rules: [{ required: false }]
                })(
                  <Select className={styles.formItemWidth}>
                    <Option value={null}>全部</Option>
                    {option}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col sm={{ span: 24 }} lg={{ span: 6 }}>
              <Form.Item
                label="品牌编码"
                {...formItemLayout}
                style={{ width: "100%" }}
              >
                {getFieldDecorator("compNo", {
                  rules: [{ required: false }]
                })(
                  <Input
                    id="cameraId"
                    className={styles.formItemWidth}
                    placeholder="请输入品牌编码"
                  />
                )}
              </Form.Item>
            </Col>
            <Col xs={{ span: 12 }} sm={{ span: 12 }} lg={{ span: 6 }}>
              <span className={styles.unSpan}>
                <a style={{ marginRight: 20 }} onClick={this.hanldeHighSearch}>{this.state.openHighSearch ? "收起" : "展开"}</a>
                <Button type="primary" icon="search" onClick={this.handleSearch}>
                  搜索
                </Button>
              </span>
            </Col>
            <Col xs={{ span: 12 }} sm={{ span: 12 }} lg={{ span: 6 }}>
              <Row type="flex" justify="end">
                {this.props.controlList.net_imp ? <span className={styles.unSpan1}>
                  <Button onClick={this.handleImportVisible}><Icon type="upload" /> 导入</Button>
                </span> : null}
                <span className={styles.unSpan1}>
                  {this.props.controlList.net_del ? (selectedRowKeys.length > 0 ? <Popconfirm
                    okText="确定"
                    cancelText="取消"
                    title="是否要删除选中的用户信息?"
                    placement="bottomRight"
                    onConfirm={this.moreRowDel}
                  >
                    <Button type="primary" className={styles.allDelete} style={{ marginLeft: 10 }}>删除</Button>
                  </Popconfirm> : null) : null}
                  {this.props.controlList.net_add ? <Button style={{ marginLeft: 10 }} type="primary" icon="plus" onClick={this.showAddModal}>添加</Button> : null}
                </span>
              </Row>
            </Col>
          </Row>
          {this.state.openHighSearch ? <Row>
            <Row>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="品牌名称"
                  {...formItemLayout}
                  style={{ width: "100%" }}
                >
                  {getFieldDecorator("compNa", {
                    rules: [{ required: false }]
                  })(
                    <Input placeholder="请输入品牌名称" className={styles.formItemWidth} />
                  )}
                </Form.Item>
              </Col>
              {/* <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="网点代码"
                  {...formItemLayout}
                  style={{ width: "100%" }}
                >
                  {getFieldDecorator("statCode", {
                    rules: [{ required: false }]
                  })(
                    <Input placeholder="请输入网点代码" className={styles.formItemWidth} />
                  )}
                </Form.Item>
              </Col> */}
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="网点名称"
                  {...formItemLayout}
                  style={{ width: "100%" }}
                >
                  {getFieldDecorator("statName", {
                    rules: [{ required: false }]
                  })(
                    <Input placeholder="请输入网点名称" className={styles.formItemWidth} />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="许可备案名称"
                  {...formItemLayout}
                  style={{ width: "100%" }}
                >
                  {getFieldDecorator("websiteLicenseName", {
                    rules: [{ required: false }]
                  })(
                    <Input placeholder="请输入许可备案名称" className={styles.formItemWidth} />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="网点地址"
                  {...formItemLayout}
                  style={{ width: "100%" }}
                >
                  {getFieldDecorator("address", {
                    rules: [{ required: false }]
                  })(
                    <Input placeholder="请输入网点地址" className={styles.formItemWidth} />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="所属行政区代码"
                  {...formItemLayout}
                  style={{ width: "100%" }}
                >
                  {getFieldDecorator("administrativeCode", {
                    rules: [{ required: false }]
                  })(
                    <Input placeholder="请输入所属行政区代码" className={styles.formItemWidth} />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="网点负责人"
                  {...formItemLayout}
                  style={{ width: "100%" }}
                >
                  {getFieldDecorator("contact", {
                    rules: [{ required: false }]
                  })(
                    <Input placeholder="请输入网点负责人" className={styles.formItemWidth} />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="电话"
                  {...formItemLayout}
                  style={{ width: "100%" }}
                >
                  {getFieldDecorator("tel", {
                    rules: [{ required: false }]
                  })(
                    <Input placeholder="请输入电话" className={styles.formItemWidth} />
                  )}
                </Form.Item>
              </Col>
              {/* <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="经度"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("longitude", {
                    rules: [{ required: false }]
                  })(
                    <Input  placeholder="请输入经度"  className={styles.formItemWidth}/>
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
                    <Input  placeholder="请输入纬度"  className={styles.formItemWidth}/>
                  )}
                </Form.Item>
              </Col> */}
            </Row>
            <Row>
              {/* <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="类型"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("statType", {
                    initialValue:null,
                    rules: [{ required: false }]
                  })(
                    <Select className={styles.formItemWidth}>
                      <Option value={null}>全部</Option>
                      <Option value={1}>快递</Option>
                      <Option value={2}>邮政</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col> */}
              {/* <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="网点负责人"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("contact", {
                    rules: [{ required: false }]
                  })(
                    <Input  placeholder="请输入网点负责人"  className={styles.formItemWidth}/>
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="电话"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("tel", {
                    rules: [{ required: false }]
                  })(
                    <Input  placeholder="请输入电话"  className={styles.formItemWidth}/>
                  )}
                </Form.Item>
              </Col> */}
            </Row>
          </Row> : null}
        </Form>
      </div>
    );
    return (
      <Card>
        <MapDrawer mapVisible={mapVisible} mapData={mapData} setMapDrawer={this.setMapDrawer} />
        <AddModal addVisible={addVisible} setAddModal={this.setAddModal} getSearch={this.getSearch} setSelectedRowKeys={this.setSelectedRowKeys} />
        <EditModal editVisible={editVisible} rowData={rowData} setEditModal={this.setEditModal} getSearch={this.getSearch} setSelectedRowKeys={this.setSelectedRowKeys} />
        <ImportModal importVisible={importVisible} setImportModal={this.setImportModal} dispatch={this.props.dispatch} getSearch={this.getSearch} setSelectedRowKeys={this.setSelectedRowKeys} />
        {normalSearch}
        <Table
          dataSource={showList}
          columns={columns}
          bordered
          rowSelection={rowSelection}
          loading={loading}
          rowKey="sid"
          scroll={{ x: "100%" }}
          pagination={pagination}
          onRow={(record) => {
            return {
              onClick: (event) => {
                // console.log("record",record);
                if (selectedRowKeys.indexOf(record.sid) > -1) {
                  let index = selectedRowKeys.indexOf(record.sid);
                  selectedRowKeys.splice(index, 1);
                  this.setState({
                    selectedRowKeys: selectedRowKeys
                  })
                } else {
                  selectedRowKeys.push(record.sid);
                  this.setState({
                    selectedRowKeys: selectedRowKeys
                  })
                }
                // console.log("selectedRowKeys",selectedRowKeys);
              }
            };
          }}
        />
      </Card>
    )
  }
}