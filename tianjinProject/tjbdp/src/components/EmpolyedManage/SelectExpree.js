import React,{Component} from 'react';
import {Card,Table,Button,Row,Col,Input,Icon,Popconfirm,Select,Form,Upload,Divider,message,Modal} from 'antd';
import {connect} from 'dva';
import styles from './SelectExpree.less';

const Option = Select.Option;
const FormItem = Form.Item;

@connect(({ expressNetwork,loading,businessinfo,getPagePage }) => {
  const {expressList,pageSize,total,controlList,page}=expressNetwork;
  const {pagePath}=getPagePage;
  const {companyList}=businessinfo;
  return{
    page,
    pagePath,
    expressList,
    pageSize,
    total,
    companyList,
    controlList,
    expressLoading: loading.effects['expressNetwork/List'],
    delLoading: loading.effects['expressNetwork/Del'],
  }
})

@Form.create()
export default class ExpressNetwork extends Component{
  state={
    showSearch:false,
    nameValue:'',
    infoVisible:false,
    editVisible:false,
    loading:false,
    selectedRows:"",
    rowData:"",
    importVisible:false,
    highSearchValue:{},
    selectedRowKeys:[],
    expVisible:this.props.expVisible,

    columns:[{
      title: '网点编号',
      dataIndex: 'statCode',
      key:'statCode',
      width:120
    },{
      title: '网点名称',
      dataIndex: 'statName',
      key:'statName',
      width:240
    }, {
      title: '网点地址',
      dataIndex: 'address',
      key: 'address',
      width:400
    },{
      title: '企业编码',
      dataIndex: 'compNo',
      key: 'compNo',
      width:100
    },{
      title: '企业名称',
      dataIndex: 'compNa',
      key: 'compNa',
      width:100
    },{
      title: '经营管理企业',
      dataIndex: 'enterprise',
      key: 'enterprise',
      width:120
    }, {
      title: '网点经纬度',
      children:[{
        title:'经度',
        dataIndex: 'longitude',
        key: 'longitude',
        width:130
      },{
        title:'纬度',
        dataIndex: 'latitude',
        key: 'latitude',
        width:130
      }]
    }, {
      title: '网点联系人',
      dataIndex: 'contact',
      key: 'contact',
      width:110
    }, {
      title: '联系人电话',
      dataIndex: 'tel',
      key: 'tel',
      width:120
    }, {
      title: '排序',
      dataIndex: 'norder',
      key: 'norder',
      width:100
    }, {
      title: '备注',
      dataIndex: 'notes',
      key: 'notes',
    }],
  };

  componentDidMount(){
    const { dispatch } = this.props;
    const form = this.props.form;
    form.validateFields((err, values) => {
      if (!err) {
        if(this.props.compNo!=null){
          values.compNo=this.props.compNo;
        }
        dispatch({
          type: 'expressNetwork/List',
          payload:{
            page: 1,
            pageSize:10,
            ...values,
            token:sessionStorage.getItem('sys-token'),
          }
        });
      }
    });
    form.setFieldsValue({
      compNo:this.props.compNo
    });
    this.props.dispatch({
      type:'businessinfo/companyList',
    });
  }

  nameValueChange = (value) => {
    this.setState({nameValue:value.target.value});
  };

  highSearch = (value) => {
    this.setState({ showSearch:value});
  };

  handleSearch = () => {
    // let oInput = document.querySelector('#dotName');
    // let onInput = oInput.value.trim();
    const { dispatch } = this.props;
    const form = this.props.form;
    form.validateFields((err, values) => {
      // if(values.)
      if (!err) {
        dispatch({
          type: 'expressNetwork/List',
          payload: {
            ...values,
            page: 1,
            pageSize:10,
            token:sessionStorage.getItem('sys-token'),
          }
        });
      }
    })
  };

  getHighSearch=(value)=>{
    this.setState({highSearchValue:value})
  };

  tableOnChange=(current, size)=>{
    const form = this.props.form;
    form.validateFields((err, values) => {
      // if(values.)
      if (!err) {
        this.props.dispatch({
          type: 'expressNetwork/List',
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

  tableOnShowSizeChange=(page, pageSize)=>{
    const form = this.props.form;
    form.validateFields((err, values) => {
      // if(values.)
      if (!err) {
        this.props.dispatch({
          type:'expressNetwork/List',
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


  onChanged=(selectedRowKeys, selectedRows) => {
    // console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
    this.setState({ selectedRows: selectedRows,selectedRowKeys:selectedRowKeys})
  };

  hanldeHighSearch = () => {
    this.setState({
      openHighSearch:!this.state.openHighSearch
    })
  };

  handleExpOk=()=>{
    if(this.props.setExpVisible){
      this.props.setExpVisible(false,this.state.selectedRows);
    }
  };

  handleExpCancel=()=>{
    if(this.props.setExpVisible){
      this.props.setExpVisible(false)
    }
    this.setState({
      expVisible:false
    })
  };

  render(){
    const {columns,selectedRows,selectedRowKeys}=this.state;
    const {expressList,expressLoading,searchLoading,delLoading,pageSize,total}=this.props;
    const { getFieldDecorator } = this.props.form;
    const rowSelection = {
      selectedRowKeys:selectedRowKeys,
      selectedRows:selectedRows,
      onChange: this.onChanged,
      type:'radio',
    };
    const pagination={
      current:this.props.page,
      pageSize,
      total,
      showSizeChanger:true,
      showTotal:(total,range)=>`共${total}条记录`,
      onChange:this.tableOnChange,
      onShowSizeChange:this.tableOnShowSizeChange,
      // pageSizeOptions:['3','5','10'],
    };

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

    const companyList=this.props.companyList.map((item)=>{
      return <Option key={item.compNo} value={item.compNo}>{item.companyName}</Option>;
    });
    const normalSearch=(
      <div className={styles.searchRow}>
        <Form layout="inline">
          <Row>
            <Col sm={{ span: 24 }} lg={{ span: 6 }}>
              <FormItem
                label="网点编号"
                {...formItemLayout}
                style={{ width: "100%" }}
              >
                {getFieldDecorator("statCode", {
                  rules: [{ required: false }]
                })(
                  <Input
                    id="dotName"
                    placeholder="请输入网点名称"
                    // value={this.state.nameValue}
                    // suffix={this.state.nameValue ? <Icon type="close" onClick={this.emptyNameValue} /> : null}
                    onChange={this.nameValueChange}
                  />
                )}
              </FormItem>
            </Col>
            <Col sm={{ span: 24 }} lg={{ span: 6 }}>
              <FormItem
                label="网点名称"
                {...formItemLayout}
                style={{ width: "100%" }}
              >
                {getFieldDecorator("statName", {
                  rules: [{ required: false }]
                })(
                  <Input
                    id="dotName"
                    placeholder="请输入网点名称"
                    // value={this.state.nameValue}
                    // suffix={this.state.nameValue ? <Icon type="close" onClick={this.emptyNameValue} /> : null}
                    onChange={this.nameValueChange}
                  />
                )}
              </FormItem>
            </Col>
            <Col sm={{ span: 24 }} lg={{ span: 6 }}>
              <FormItem
                label="企业"
                {...formItemLayout}
                style={{ width: "100%" }}
              >
                {getFieldDecorator("compNo", {
                  rules: [{ required: false }]
                })(
                  <Select>
                    <Option key={null} value={null}>全部</Option>
                    {companyList}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 6 }}>
              <span className={styles.unSpan}>
                <Button  type="primary" icon="search" onClick={this.handleSearch}>搜索</Button>
              </span>
            </Col>
          </Row>
        </Form>
      </div>
    );
    return (
      <Modal
        visible={this.state.expVisible}
        onOk={this.handleExpOk}
        onCancel={this.handleExpCancel}
        width={1000}
        style={{top:40}}
      >
        <div className={styles.content}>
          {normalSearch}
          <Table
            dataSource={expressList}
            bordered
            columns={columns}
            rowSelection={rowSelection}
            loading={expressLoading}
            scroll={{x:2200,y:300}}
            rowKey="sid"
            pagination={pagination}
            onRow={(record) => {
              return { onClick: (event) => {
                  // console.log("record",record);
                  let arr=[];
                  arr[0]=record.sid;
                  this.setState({
                    selectedRowKeys:arr,
                    selectedRows:record,
                  });
                }};
            }}
          />
        </div>
      </Modal>
    );
  }
}

