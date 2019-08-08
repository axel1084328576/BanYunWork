import React,{Component} from 'react';
import { Table, Input,Popconfirm, Modal, Form, Divider } from 'antd';
import styles from './CarUseCountEditTable.less';

const FormItem = Form.Item;

@Form.create()

class CarUseCountEditTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modifykey: '',
      modifynumber: '',
      carInfoVisible:false,
    };
  }

  hideCarInfo=()=>{
    this.setState({carInfoVisible:false});
  }

  showCarInfo=()=>{
    this.setState({carInfoVisible:true});
  }

  onSelectChange = (selectedRowKeys) => {
    this.props.dispatch({
      type:'carusecount/setSelectedRowKeys',
      payload:{
        selectedRowKeys
      },
    });
  }

  delete = (key) => {
    this.props.dispatch({
      type:'carusecount/deleteCarUseCount',
      payload:{
        key,
      }
    })
  }

  openModifyModal = (payload) => {
    const form = this.props.form;
    this.setState({
      modifykey:payload.key,
      modifynumber:payload.number,
    });

    form.setFieldsValue({
      mlicenceNumber: payload.licenceNumber,
      mtotalMileage: payload.totalMileage,
      mconvey: payload.convey,
      mreportInfo: payload.reportInfo,
      moperate: payload.operate,
      menterprises: payload.enterprises,
      mownership: payload.ownership,
      mscope: payload.scope,
    });

    this.props.dispatch({
      type:'carusecount/setModifyModalVisible',
      payload:{
        modifyModalVisible:true,
      }
    });
  }

  modifyCarInfo = (key) => {
    const form = this.props.form;
    form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type:'carusecount/modifyCarUseCount',
          payload:{
            key:this.state.modifykey,
            number:this.state.modifynumber,
            licenceNumber: values.mlicenceNumber,
            totalMileage: values.mtotalMileage,
            convey: values.mconvey,
            reportInfo: values.mreportInfo,
            operate: values.moperate,
            enterprises: values.menterprises,
            ownership: values.mownership,
            scope: values.mscope,
          },
        });
      }
    });
  }

  cancelModifyCarInfo = () => {
    this.setState({modifykey:'',modifynumber:'',});
    this.props.dispatch({
      type:'carusecount/setModifyModalVisible',
      payload:{
        modifyModalVisible:false,
      }
    })
  }

  render() {
    const columns = [
      {
        title: '序号',
        dataIndex: 'number',
        key:'number',
      },
      {
        title: '车辆号码',
        dataIndex: 'licenceNumber',
        key:'licenceNumber',
        // sorter: (a, b) => a.name.length - b.name.length,
      },
      {
        title: '累计里程数',
        dataIndex: 'totalMileage',
        key:'totalMileage',
      },
      {
        title: '货物运载量',
        dataIndex: 'convey',
        key:'convey',
      },
      {
        title: '报警信息',
        dataIndex: 'reportInfo',
        key:'reportInfo',
      },
      {
        title: '营运证',
        dataIndex: 'operate',
        key:'operate',
        width:160,
      },
      {
        title: '所属企业',
        dataIndex: 'enterprises',
        key:'enterprises',
      },
      {
        title: '车辆归属',
        dataIndex: 'ownership',
        key:'ownership',
      },
      {
        title: '车辆运营范围',
        dataIndex: 'scope',
        key:'scope',
      },
      {
        title: '车辆信息',
        dataIndex: 'carInfo',
        // fixed: 'right',
        key:'carInfo',
        // width:80,
        render:(text,record) => {
          return (
            <a onClick={this.showCarInfo}>查看</a>
          );
        }
      },
      {
        title: '',
        dataIndex: 'operation',
        // fixed: 'right',
        key:'operation',
        // width:110,
        render: (text, record) => {
          return (
            <span>
              {this.props.controlList.cuse_mod? <a onClick={() => this.openModifyModal(record)}>修改</a>:null}
              {this.props.controlList.cuse_mod && this.props.controlList.cuse_del?<Divider type="vertical" />:null}
              {
                this.props.controlList.cuse_del?
                  <Popconfirm
                    title="是否删除该车辆信息？"
                    onConfirm={() => {this.delete(record.key)}}
                  >
                    <a className={styles.carUseCountDelete}>删除</a>
                  </Popconfirm>:null
              }
            </span>
          );
        },
      },
    ];

    const formItemLayout = {
      labelCol: {
        span:6,
        offset:1,
      },
      wrapperCol: {
        span:16,
      },
    };

    const { getFieldDecorator } = this.props.form;

    const modifyModalForm=(
      <Modal
        confirmLoading={false}
        title="修改车辆统计信息"
        visible={this.props.modifyModalVisible}
        onOk={()=>{this.modifyCarInfo(this.state.modifykey)}}
        onCancel={this.cancelModifyCarInfo}
      >
        <Form>
          <FormItem {...formItemLayout} label="车辆号码">
            {getFieldDecorator('mlicenceNumber', {
              rules: [{
                required: true,
                message: '车辆号码不能为空！',
              }],
            })(
              <Input placeholder="请输入车辆号码" />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="累计里程数">
            {getFieldDecorator('mtotalMileage', {
              rules: [{
                required: true,
                message: '累计里程数不能为空！',
              }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="货物运载量">
            {getFieldDecorator('mconvey', {
              rules: [{
                required: true,
                message: '货物运载量不能为空！',
              }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="报警信息">
            {getFieldDecorator('mreportInfo', {
              rules: [{
                required: true,
                message: '报警信息不能为空！',
              }],
            })(
              <Input placeholder="请输入报警信息" />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="运营证">
            {getFieldDecorator('moperate', {
              rules: [{
                required: true,
                message: '运营证不能为空！',
              }],
            })(
              <Input placeholder="请输入运营证" />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="所属企业">
            {getFieldDecorator('menterprises', {
              rules: [{
                required: true,
                message: '所属企业不能为空！',
              }],
            })(
              <Input placeholder="请选择所属企业" />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="车辆归属">
            {getFieldDecorator('mownership', {
              rules: [{
                required: true,
                message: '车辆归属不能为空！',
              }],
            })(
              <Input placeholder="请输入车辆归属" />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="车辆运营范围">
            {getFieldDecorator('mscope', {
              rules: [{
                required: true,
                message: '运营范围不能为空！',
              }],
            })(
              <Input placeholder="请输入运营范围" />
            )}
          </FormItem>
        </Form>
      </Modal>
    );

    const carInfoModal=(
      <Modal
        visible={this.state.carInfoVisible}
        onCancel={this.hideCarInfo}
        footer={null}
        title="车辆信息"
      >
        <Form>
          <FormItem
            {...formItemLayout}
            label="车牌号码"
          >
            <Input />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="车辆类型"
          >
            <Input />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="车辆品牌"
          >
            <Input />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="车辆驾驶人"
          >
            <Input />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="购买时间"
          >
            <Input />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="使用年限"
          >
            <Input />
          </FormItem>
        </Form>
      </Modal>
    );
    // 选择配置项
    const { selectedRowKeys,dispatch } = this.props;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      hideDefaultSelections: true,
      // selections: [{
      //   key: 'all-data',
      //   text: '全选',
      //   onSelect: (changableRowKeys) => {
      //     dispatch({
      //       type:'carusecount/setSelectedRowKeys',
      //       payload:{ selectedRowKeys: changableRowKeys }
      //     });
      //   },
      // }, {
      //   key: 'odd',
      //   text: '奇数行',
      //   onSelect: (changableRowKeys) => {
      //     let newSelectedRowKeys = [];
      //     newSelectedRowKeys = changableRowKeys.filter((key, index) => {
      //       if (index % 2 !== 0) {
      //         return false;
      //       }
      //       return true;
      //     });
      //     dispatch({
      //       type:'carusecount/setSelectedRowKeys',
      //       payload:{ selectedRowKeys: newSelectedRowKeys }
      //     });
      //   },
      // }, {
      //   key: 'even',
      //   text: '偶数行',
      //   onSelect: (changableRowKeys) => {
      //     let newSelectedRowKeys = [];
      //     newSelectedRowKeys = changableRowKeys.filter((key, index) => {
      //       if (index % 2 !== 0) {
      //         return true;
      //       }
      //       return false;
      //     });
      //     dispatch({
      //       type:'carusecount/setSelectedRowKeys',
      //       payload:{ selectedRowKeys: newSelectedRowKeys }
      //     });
      //   },
      // }],
      onSelection: this.onSelection,
    };

    const pagination={
      showSizeChanger:true,
      showTotal:(total,range)=>`共${total}条记录`,
    };
    
    return (
      <div className={styles.carUseCountTable}>
        {modifyModalForm}
        {carInfoModal}
        <Table
          loading={this.props.tableLoading}
          dataSource={this.props.carUseCount}
          columns={columns}
          rowSelection={rowSelection}
          bordered={false}
          pagination={pagination}
          scroll={{x:"100%"}}
        />
      </div>
    );
  }
}

export default CarUseCountEditTable;
