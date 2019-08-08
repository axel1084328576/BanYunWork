//危化品名录
import React,{Component} from 'react'
import { Divider, Popconfirm, Table, Card, Row, Col, Input, Form, Button, Select, Icon } from "antd";
import { connect } from "dva";
import styles from "./DeliverInfo.less";

@connect(({ expressBoxManage,loading }) => {
  const {sendList,sendPageSize,sendTotal,sendPage,}=expressBoxManage;
  return{
    sendList,sendPageSize,sendTotal,sendPage,
    sendLoading: loading.effects['expressBoxManage/sendList'],
  }
})

@Form.create()
export default class DeliverInfo extends Component{
  state={
    columns:[
      {
        title: "运单编号",
        dataIndex: "trackNumber",
        key: "trackNumber",
        // width:100,
      },
      {
        title: "批次编号",
        dataIndex: "batchNumber",
        key: "batchNumber",
        // width:100,
      },
      {
        title: "收件人手机号",
        dataIndex: "recipientPhoneNumber",
        key: "recipientPhoneNumber",
        // width:100,
      },
      {
        title: "快递企业名称",
        dataIndex: "expressName",
        key: "expressName",
        // width:100,
      },{
        title: "网点地址",
        dataIndex: "facilityAddress",
        key: "facilityAddress",
        // width:100,
      },{
        title: "网点编号",
        dataIndex: "facilityCode",
        key: "facilityCode",
        // width:100,
      },{
        title: "网点名称",
        dataIndex: "facilityName",
        key: "facilityName",
        // width:100,
      },{
        title: "柜体名称",
        dataIndex: "cabinetName",
        key: "cabinetName",
        // width:100,
      },{
        title: "柜体编号",
        dataIndex: "cabinetNumber",
        key: "cabinetNumber",
        // width:100,
      },{
        title: "柜体箱门编号",
        dataIndex: "cabinetDoorNumber",
        key: "cabinetDoorNumber",
        // width:100,
      },{
        title: "柜体箱门门牌号",
        dataIndex: "cabinetBoxDoorNumber",
        key: "cabinetBoxDoorNumber",
        // width:100,
      },{
        title: "柜体箱子类型",
        dataIndex: "cabinetBoxType",
        key: "cabinetBoxType",
        // width:100,
      },{
        title: "到站时间",
        dataIndex: "arriveTime",
        key: "arriveTime",
        // width:100,
      },{
        title: "入柜时间",
        dataIndex: "arriveTime",
        key: "arriveTime",
        // width:100,
      },{
        title: "取走时间",
        dataIndex: "takeAwayTime",
        key: "takeAwayTime",
        // width:100,
      }
    ],
    openHighSearch:false,
  };

  componentDidMount() {
    // this.props.dispatch({
    //   type:'expressBoxManage/sendList',
    //   payload:{
    //     token:sessionStorage.getItem('sys-token'),
    //     page:1,
    //     pageSize:10
    //   }
    // })
  }

  handleSearch=()=>{
    const form = this.props.form;
    const { dispatch } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        // dispatch({
        //   type: 'expressBoxManage/sendList',
        //   payload:{
        //     page: 1,
        //     pageSize:10,
        //     ...values,
        //     token:sessionStorage.getItem('sys-token'),
        //   },
        // });
      }
    })
  }

  hanldeHighSearch = () => {
    this.setState({
      openHighSearch:!this.state.openHighSearch
    })
  };

  tableOnChange=(current, size)=>{
    const form = this.props.form;
    form.validateFields((err, values) => {
      if (!err) {
        // this.props.dispatch({
        //   type:'expressBoxManage/sendList',
        //   payload:{
        //     page:current,
        //     pageSize:size,
        //     ...values,
        //     token:sessionStorage.getItem('sys-token'),
        //   }
        // });
      }
    })
  };

  tableOnShowSizeChange=(page, pageSize)=>{
    const form = this.props.form;
    form.validateFields((err, values) => {
      if (!err) {
        // this.props.dispatch({
        //   type:'expressBoxManage/sendList',
        //   payload:{
        //     page,
        //     pageSize,
        //     ...values,
        //     token:sessionStorage.getItem('sys-token'),
        //   }
        // });
      }
    });
  };

  render(){
    const{columns,selectedRowKeys,editVisible,rowData,addVisible,setImportModal,importVisible}=this.state;
    const {sendList,sendPageSize,sendTotal,sendPage,sendLoading}=this.props;
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
    const pagination = {
      current:sendPage,
      pageSize:sendPageSize,
      total:sendTotal,
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
                label="运单编号"
                {...formItemLayout}
                style={{ width:"100%"}}
              >
                {getFieldDecorator("运单编号", {
                  rules: [{ required: false }]
                })(
                  <Input
                    className={styles.formItemWidth}
                    placeholder="请输入运单编号"
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
            </Col>
          </Row>
          {this.state.openHighSearch? <Row>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="批次编号"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("batchNumber", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入批次编号"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="收件人手机号"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("recipientPhoneNumber", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入收件人手机号"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="快递企业名称"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("expressName", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入快递企业名称"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  label="网点地址"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("facilityAddress", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入网点地址"
                    />
                  )}
                </Form.Item>
              </Col>
            <Col sm={{ span: 24 }} lg={{ span: 6 }}>
              <Form.Item
                label="网点编号"
                {...formItemLayout}
                style={{ width:"100%"}}
              >
                {getFieldDecorator("facilityCode", {
                  rules: [{ required: false }]
                })(
                  <Input
                    className={styles.formItemWidth}
                    placeholder="请输入网点编号"
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
                {getFieldDecorator("facilityName", {
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
                label="柜体名称"
                {...formItemLayout}
                style={{ width:"100%"}}
              >
                {getFieldDecorator("cabinetName", {
                  rules: [{ required: false }]
                })(
                  <Input
                    className={styles.formItemWidth}
                    placeholder="请输入柜体名称"
                  />
                )}
              </Form.Item>
            </Col>
            <Col sm={{ span: 24 }} lg={{ span: 6 }}>
              <Form.Item
                label="柜体编号"
                {...formItemLayout}
                style={{ width:"100%"}}
              >
                {getFieldDecorator("cabinetNumber", {
                  rules: [{ required: false }]
                })(
                  <Input
                    className={styles.formItemWidth}
                    placeholder="请输入柜体编号"
                  />
                )}
              </Form.Item>
            </Col>
            <Col sm={{ span: 24 }} lg={{ span: 6 }}>
              <Form.Item
                label="柜体箱门编号"
                {...formItemLayout}
                style={{ width:"100%"}}
              >
                {getFieldDecorator("cabinetDoorNumber", {
                  rules: [{ required: false }]
                })(
                  <Input
                    className={styles.formItemWidth}
                    placeholder="请输入柜体箱门编号"
                  />
                )}
              </Form.Item>
            </Col>
            <Col sm={{ span: 24 }} lg={{ span: 6 }}>
              <Form.Item
                label="柜体箱门门牌号"
                {...formItemLayout}
                style={{ width:"100%"}}
              >
                {getFieldDecorator("cabinetBoxDoorNumber", {
                  rules: [{ required: false }]
                })(
                  <Input
                    className={styles.formItemWidth}
                    placeholder="请输入柜体箱门门牌号"
                  />
                )}
              </Form.Item>
            </Col>
            <Col sm={{ span: 24 }} lg={{ span: 6 }}>
              <Form.Item
                label="柜体箱子类型"
                {...formItemLayout}
                style={{ width:"100%"}}
              >
                {getFieldDecorator("cabinetBoxType", {
                  rules: [{ required: false }]
                })(
                  <Input
                    className={styles.formItemWidth}
                    placeholder="请输入柜体箱子类型"
                  />
                )}
              </Form.Item>
            </Col>
            <Col sm={{ span: 24 }} lg={{ span: 6 }}>
              <Form.Item
                label="到站时间"
                {...formItemLayout}
                style={{ width:"100%"}}
              >
                {getFieldDecorator("arriveTime", {
                  rules: [{ required: false }]
                })(
                  <Input
                    className={styles.formItemWidth}
                    placeholder="请输入到站时间"
                  />
                )}
              </Form.Item>
            </Col>
            <Col sm={{ span: 24 }} lg={{ span: 6 }}>
              <Form.Item
                label="入柜时间"
                {...formItemLayout}
                style={{ width:"100%"}}
              >
                {getFieldDecorator("InCabinetTime", {
                  rules: [{ required: false }]
                })(
                  <Input
                    className={styles.formItemWidth}
                    placeholder="请输入入柜时间"
                  />
                )}
              </Form.Item>
            </Col>
            <Col sm={{ span: 24 }} lg={{ span: 6 }}>
              <Form.Item
                label="取走时间"
                {...formItemLayout}
                style={{ width:"100%"}}
              >
                {getFieldDecorator("takeAwayTime", {
                  rules: [{ required: false }]
                })(
                  <Input
                    className={styles.formItemWidth}
                    placeholder="请输入取走时间"
                  />
                )}
              </Form.Item>
            </Col>
            </Row> :null}
        </Form>
      </div>
    );
    return(
      <Card>
        {normalSearch}
        <Table
          dataSource={sendList}
          columns={columns}
          bordered
          loading={sendLoading}
          // rowKey="sid"
          // scroll={{x:"100%"}}
          pagination={pagination}
        />
      </Card>
    )
  }
}