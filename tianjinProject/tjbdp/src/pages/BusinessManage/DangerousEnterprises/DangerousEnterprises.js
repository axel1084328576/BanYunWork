//危化品名录
import React, { Component } from 'react'
import { Divider, Popconfirm, Table, Card, Row, Col, Input, Form, Button, Select, Icon } from "antd";
import { connect } from "dva";
import styles from "./DangerousEnterprises.less";
import AddModal from '../../../components/BusinessManage/DangerousEnterprises/AddModal';
import EditModal from '../../../components/BusinessManage/DangerousEnterprises/EditModal';
import ImportModal from '../../../components/BusinessManage/DangerousEnterprises/ImportModal';
import MapShow from '@/components/BusinessManage/DangerousEnterprises/MapShow'

@connect(({ dangerousEnterprises, getPagePage, loading }) => {
  const { list, pageSize, total, controlList, page, netList } = dangerousEnterprises;
  const { pagePath } = getPagePage;
  return {
    list, pageSize, total, controlList, page, pagePath, netList,
    loading: loading.effects['dangerousEnterprises/List'],
  }
})

@Form.create()
export default class DangerousEnterprises extends Component {
  state = {
    addVisible: false,
    editVisible: false,
    importVisible: false,
    mapVisible: false,
    rowData: {},
    showNet: [],
    netList: null,
    columns: [
      {
        title: "企业名称",
        dataIndex: "qymc",
        key: "qymc",
        // width:100,
      },
      {
        title: "企业社会统一信用代码",
        dataIndex: "qyshtyxy",
        key: "qyshtyxy",
        // width:100,
      },
      {
        title: "企业地址",
        dataIndex: "qydz",
        key: "qydz",
        // width:100,
      },
      {
        title: "经营危化品",
        dataIndex: "jjwhp",
        key: "jjwhp",
        // width:100,
      }, {
        title: "联系人",
        dataIndex: "lxr",
        key: "lxr",
        // width:100,
      }, {
        title: "联系电话",
        dataIndex: "lxdh",
        key: "blxdh",
        // width:100,
      }, {
        title: "联系人手机号",
        dataIndex: "lxsj",
        key: "lxsj",
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
              {record.lon != undefined || record.lon != null ? <a href="javascript:" onClick={() => {
                this.showMap(record)
              }}>显示</a> : null}
              {record.lon != undefined || record.lon != null ? <Divider type="vertical" /> : null}
              {this.props.controlList.wqy_edit ? <a href="javascript:" onClick={() => {
                this.showEditModal(record);
              }}>修改</a> : null}
              {this.props.controlList.wqy_edit && this.props.controlList.wqy_del ? <Divider type="vertical" /> : null}
              {
                this.props.controlList.wqy_del ? (this.props.list.length >= 1
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
      type: "dangerousEnterprises/Control",
      payload: {
        menuCode: this.props.pagePath,
        token: sessionStorage.getItem('sys-token'),
      }
    })

    dispatch({
      type: "dangerousEnterprises/NetList",
      payload: {
        page: 1,
        pageSize: 10000,
        token: sessionStorage.getItem('sys-token'),
      }
    })
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'dangerousEnterprises/List',
      payload: {
        token: sessionStorage.getItem('sys-token'),
        page: 1,
        pageSize: 10
      }
    })
  }



  setMapShow = (value) => {
    this.setState({
      mapVisible: value
    })
  }

  setSelectedRowKeys = () => {
    this.setState({ selectedRowKeys: [] })
  };

  showMap = (record) => {
    this.setState({
      mapVisible: true,
      rowData: record
    });
  }

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
      type: 'dangerousEnterprises/AddOrEdit',
      payload: {
        opType: "del",
        wybs: key.wybs,
        token: sessionStorage.getItem('sys-token'),
      },
      callback: () => {
        this.setSelectedRowKeys();
        dispatch({
          type: 'dangerousEnterprises/List',
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
      type: "dangerousEnterprises/AddOrEdit",
      payload: {
        wybs: selectedRowKeys.join(","),
        opType: "del",
        token: sessionStorage.getItem("sys-token")
      },
      callback: () => {
        this.setSelectedRowKeys();
        dispatch({
          type: 'dangerousEnterprises/List',
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
          type: 'dangerousEnterprises/List',
          payload: {
            page: 1,
            pageSize: 10,
            ...values,
            token: sessionStorage.getItem('sys-token'),
          },
        });
      }
    })
  }

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
          type: 'dangerousEnterprises/List',
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
          type: 'dangerousEnterprises/List',
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
    const { columns, selectedRowKeys, editVisible, rowData, addVisible, setImportModal, importVisible, mapVisible } = this.state;
    const { list, pageSize, total, loading, netList } = this.props;
    const { getFieldDecorator } = this.props.form;

    const mapData = [
      {
        position: [117.27907783, 39.12956283]
      }
    ];
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
    const normalSearch = (
      <div className={styles.searchRow}>
        <Form layout="inline">
          <Row>
            <Col sm={{ span: 24 }} lg={{ span: 6 }}>
              <Form.Item
                label="企业名称"
                {...formItemLayout}
                style={{ width: "100%" }}
              >
                {getFieldDecorator("qymc", {
                  rules: [{ required: false }]
                })(
                  <Input
                    className={styles.formItemWidth}
                    placeholder="请输入危化品名称"
                  />
                )}
              </Form.Item>
            </Col>
            <Col xs={{ span: 12 }} sm={{ span: 12 }} lg={{ span: 6 }}>
              <span className={styles.unSpan}>
                <a style={{ marginRight: 20 }} onClick={this.hanldeHighSearch} style={{ marginRight: 20 }}>{this.state.openHighSearch ? "收起" : "展开"}</a>
                <Button type="primary" icon="search" onClick={this.handleSearch}>
                  搜索
                </Button>
              </span>
            </Col>
            <Col xs={{ span: 12 }} sm={{ span: 12 }} lg={{ offset: 6, span: 6 }}>
              <Row type="flex" justify="end">
                {this.props.controlList.wqy_imp ? <span className={styles.unSpan1}>
                  <Button onClick={this.handleImportVisible}><Icon type="upload" /> 导入</Button>
                </span> : null}
                <span className={styles.unSpan1}>
                  {this.props.controlList.wqy_del ? (selectedRowKeys.length > 0 ? <Popconfirm
                    okText="确定"
                    cancelText="取消"
                    title="是否要删除选中的用户信息?"
                    placement="bottomRight"
                    onConfirm={this.moreRowDel}
                  >
                    <Button type="primary" className={styles.allDelete} style={{ marginLeft: 10 }}>删除</Button>
                  </Popconfirm> : null) : null}
                  {this.props.controlList.wqy_add ? <Button style={{ marginLeft: 10 }} type="primary" icon="plus" onClick={this.showAddModal}>添加</Button> : null}
                </span>
              </Row>
            </Col>
          </Row>
          {this.state.openHighSearch ? <Row>
            <Row>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="信用代码"
                  {...formItemLayout}
                  style={{ width: "100%" }}
                >
                  {getFieldDecorator("qyshtyxy", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入危化品名称"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="企业地址"
                  {...formItemLayout}
                  style={{ width: "100%" }}
                >
                  {getFieldDecorator("qydz", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入企业地址"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="经营危化品"
                  {...formItemLayout}
                  style={{ width: "100%" }}
                >
                  {getFieldDecorator("jjwhp", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入经营危化品"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="联系人"
                  {...formItemLayout}
                  style={{ width: "100%" }}
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
                  label="联系电话"
                  {...formItemLayout}
                  style={{ width: "100%" }}
                >
                  {getFieldDecorator("lxdh", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入联系电话"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="联系人手机号"
                  {...formItemLayout}
                  style={{ width: "100%" }}
                >
                  {getFieldDecorator("lxsj", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入联系人手机号"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Row> : null}
        </Form>
      </div>
    );
    return (
      <Card>
        {mapVisible ? <MapShow mapVisible={mapVisible} setMapShow={this.setMapShow} rowData={rowData} netList={netList} /> : null}
        <AddModal addVisible={addVisible} setAddModal={this.setAddModal} getSearch={this.getSearch} setSelectedRowKeys={this.setSelectedRowKeys} />
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
          scroll={{ x: "100%" }}
          pagination={pagination}
          onRow={(record) => {
            return {
              onClick: (event) => {
                // console.log("record",record);
                if (selectedRowKeys.indexOf(record.wybs) > -1) {
                  let index = selectedRowKeys.indexOf(record.wybs);
                  selectedRowKeys.splice(index, 1);
                  this.setState({
                    selectedRowKeys: selectedRowKeys
                  })
                } else {
                  selectedRowKeys.push(record.wybs);
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