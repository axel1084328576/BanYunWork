//危化品名录
import React,{Component} from 'react'
import { Divider, Popconfirm, Table, Card, Row, Col, Input, Form, Button, Select, Icon } from "antd";
import { connect } from "dva";
import styles from "./AccessInfo.less";

@connect(({ expressBoxManage,loading }) => {
  const {pickUpList,pickUpPageSize,pickUpTotal,pickUpPage,}=expressBoxManage;
  return{
    pickUpList,pickUpPageSize,pickUpTotal,pickUpPage,
    pickUpLoading: loading.effects['expressBoxManage/pickUpList'],
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
        title: "包裹类型",
        dataIndex: "parcelType",
        key: "parcelType",
        // width:100,
      },
      {
        title: "包裹重量",
        dataIndex: "parcelWeight",
        key: "parcelWeight",
        // width:100,
      },
      {
        title: "寄件人手机号",
        dataIndex: "senderPhoneNumber",
        key: "senderPhoneNumber",
        // width:100,
      },{
        title: "寄件人姓名",
        dataIndex: "senderName",
        key: "senderName",
        // width:100,
      },{
        title: "寄件人地址",
        dataIndex: "senderAddress",
        key: "senderAddress",
        // width:100,
      },{
        title: "收件人地址",
        dataIndex: "receiverAddress",
        key: "receiverAddress",
        // width:100,
      },{
        title: "目的省",
        dataIndex: "destinationProvince",
        key: "destinationProvince",
        // width:100,
      },{
        title: "目的市",
        dataIndex: "destinationCity",
        key: "destinationCity",
        // width:100,
      },{
        title: "目的区县",
        dataIndex: "destinationDistrict",
        key: "destinationDistrict",
        // width:100,
      },{
        title: "收件人详细地址",
        dataIndex: "recipientAddress",
        key: "recipientAddress",
        // width:100,
      },{
        title: "快递企业名称",
        dataIndex: "expressName",
        key: "expressName",
        // width:100,
      },{
        title: "网点名称",
        dataIndex: "facilityName",
        key: "facilityName",
        // width:100,
      },{
        title: "网点编码",
        dataIndex: "facilityCode",
        key: "facilityCode",
        // width:100,
      },{
        title: "揽件时间",
        dataIndex: "takingTime",
        key: "takingTime",
        // width:100,
      },{
        title: "出库时间",
        dataIndex: "deliveryTime",
        key: "deliveryTime",
        // width:100,
      },{
        title: "快递员编号",
        dataIndex: "courierNumber",
        key: "courierNumber",
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
    const {pickUpList,pickUpPageSize,pickUpTotal,pickUpPage,pickUpLoading}=this.props;
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
      current:pickUpPage,
      pageSize:pickUpPageSize,
      total:pickUpTotal,
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
                label="包裹类型"
                {...formItemLayout}
                style={{ width:"100%"}}
              >
                {getFieldDecorator("parcelType", {
                  rules: [{ required: false }]
                })(
                  <Input
                    className={styles.formItemWidth}
                    placeholder="请输入包裹类型"
                  />
                )}
              </Form.Item>
            </Col>
            <Col sm={{ span: 24 }} lg={{ span: 6 }}>
              <Form.Item
                label="包裹重量"
                {...formItemLayout}
                style={{ width:"100%"}}
              >
                {getFieldDecorator("parcelWeight", {
                  rules: [{ required: false }]
                })(
                  <Input
                    className={styles.formItemWidth}
                    placeholder="请输入包裹重量"
                  />
                )}
              </Form.Item>
            </Col>
            <Col sm={{ span: 24 }} lg={{ span: 6 }}>
              <Form.Item
                label="寄件人手机号"
                {...formItemLayout}
                style={{ width:"100%"}}
              >
                {getFieldDecorator("senderPhoneNumber", {
                  rules: [{ required: false }]
                })(
                  <Input
                    className={styles.formItemWidth}
                    placeholder="请输入寄件人手机号"
                  />
                )}
              </Form.Item>
            </Col>
            <Col sm={{ span: 24 }} lg={{ span: 6 }}>
              <Form.Item
                label="寄件人姓名"
                {...formItemLayout}
                style={{ width:"100%"}}
              >
                {getFieldDecorator("senderName", {
                  rules: [{ required: false }]
                })(
                  <Input
                    className={styles.formItemWidth}
                    placeholder="请输入寄件人姓名"
                  />
                )}
              </Form.Item>
            </Col>
            <Col sm={{ span: 24 }} lg={{ span: 6 }}>
              <Form.Item
                label="寄件人地址"
                {...formItemLayout}
                style={{ width:"100%"}}
              >
                {getFieldDecorator("senderAddress", {
                  rules: [{ required: false }]
                })(
                  <Input
                    className={styles.formItemWidth}
                    placeholder="请输入寄件人地址"
                  />
                )}
              </Form.Item>
            </Col>
            <Col sm={{ span: 24 }} lg={{ span: 6 }}>
              <Form.Item
                label="收件人地址"
                {...formItemLayout}
                style={{ width:"100%"}}
              >
                {getFieldDecorator("receiverAddress", {
                  rules: [{ required: false }]
                })(
                  <Input
                    className={styles.formItemWidth}
                    placeholder="请输入收件人地址"
                  />
                )}
              </Form.Item>
            </Col>
            <Col sm={{ span: 24 }} lg={{ span: 6 }}>
              <Form.Item
                label="目的省"
                {...formItemLayout}
                style={{ width:"100%"}}
              >
                {getFieldDecorator("destinationProvince", {
                  rules: [{ required: false }]
                })(
                  <Input
                    className={styles.formItemWidth}
                    placeholder="请输入目的省"
                  />
                )}
              </Form.Item>
            </Col>
            <Col sm={{ span: 24 }} lg={{ span: 6 }}>
              <Form.Item
                label="目的市"
                {...formItemLayout}
                style={{ width:"100%"}}
              >
                {getFieldDecorator("destinationCity", {
                  rules: [{ required: false }]
                })(
                  <Input
                    className={styles.formItemWidth}
                    placeholder="请输入目的市"
                  />
                )}
              </Form.Item>
            </Col>
            <Col sm={{ span: 24 }} lg={{ span: 6 }}>
              <Form.Item
                label="目的区县"
                {...formItemLayout}
                style={{ width:"100%"}}
              >
                {getFieldDecorator("destinationDistrict", {
                  rules: [{ required: false }]
                })(
                  <Input
                    className={styles.formItemWidth}
                    placeholder="请输入目的区县"
                  />
                )}
              </Form.Item>
            </Col>
            <Col sm={{ span: 24 }} lg={{ span: 6 }}>
              <Form.Item
                label="收件人详细地址"
                {...formItemLayout}
                style={{ width:"100%"}}
              >
                {getFieldDecorator("recipientAddress", {
                  rules: [{ required: false }]
                })(
                  <Input
                    className={styles.formItemWidth}
                    placeholder="请输入收件人详细地址"
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
                label="网点编码"
                {...formItemLayout}
                style={{ width:"100%"}}
              >
                {getFieldDecorator("facilityCode", {
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
                label="揽件时间"
                {...formItemLayout}
                style={{ width:"100%"}}
              >
                {getFieldDecorator("takingTime", {
                  rules: [{ required: false }]
                })(
                  <Input
                    className={styles.formItemWidth}
                    placeholder="请输入揽件时间"
                  />
                )}
              </Form.Item>
            </Col>
            <Col sm={{ span: 24 }} lg={{ span: 6 }}>
              <Form.Item
                label="出库时间"
                {...formItemLayout}
                style={{ width:"100%"}}
              >
                {getFieldDecorator("deliveryTime", {
                  rules: [{ required: false }]
                })(
                  <Input
                    className={styles.formItemWidth}
                    placeholder="请输入出库时间"
                  />
                )}
              </Form.Item>
            </Col>
            <Col sm={{ span: 24 }} lg={{ span: 6 }}>
              <Form.Item
                label="快递员编号"
                {...formItemLayout}
                style={{ width:"100%"}}
              >
                {getFieldDecorator("courierNumber", {
                  rules: [{ required: false }]
                })(
                  <Input
                    className={styles.formItemWidth}
                    placeholder="请输入快递员编号"
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
          </Row> :null}
        </Form>
      </div>
    );
    return(
      <Card>
        {normalSearch}
        <Table
          dataSource={pickUpList}
          columns={columns}
          bordered
          loading={pickUpLoading}
          // rowKey="sid"
          // scroll={{x:"100%"}}
          pagination={pagination}
        />
      </Card>
    )
  }
}