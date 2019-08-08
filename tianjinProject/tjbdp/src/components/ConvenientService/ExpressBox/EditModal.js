import React,{Component} from 'react';
import {Row,Col,Input,Select,InputNumber,Button,Icon,Form,Modal,message} from 'antd';
import styles from './HighSearch.less'
import { connect } from "dva/index";

const FormItem = Form.Item;
const Option = Select.Option;

@connect(({ expressBox,loading}) => {
  const {boxAddOrEdit,compList}=expressBox;
  return{
    compList,
    boxAddOrEdit,
    addOrEditLoading:loading.effects['expressBox/AddOrEdit'],
  }
})

@Form.create()
export default class EditModal extends Component{
  constructor(props){
    super(props);
    this.state={
      editVisible:props.showExpressEditModal,
      dotName:'',
      dotAddressValue:'',
      dotLalValue:'',
      dotContactsValue:'',
      dotTelValue:'',
      longitudeValue:"",
      latitudeValue:"",
    };
  }

  componentDidMount(){
    const { dispatch } = this.props;
    dispatch({
      type:'expressBox/compList',
    });
  }

  emptyDotAddress = () => {
    this.setState({dotAddressValue:''});
  };

  dotAddressValueChange = (value) => {
    this.setState({dotAddressValue:value});
  };

  highSearch = () => {
    if(this.props.showSearch){
      this.props.showSearch(false)
    }
  };


  handleSearch = (e) => {
    e.preventDefault();
    let searchItem;
    if(this.props.getSearch){
      searchItem=this.props.getSearch()
    }
    // console.log("searchItem",searchItem);
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { dispatch,expressEditVisible,rowData } = this.props;
        console.log('Received values of form: ', values);
        values.opType="mod";
        values.sid=rowData.sid;
        values.token=sessionStorage.getItem('sys-token');
        dispatch({
          type:'expressBox/AddOrEdit',
          payload:{
            data:values,
            searchItem:searchItem,
          },
          callback: ()=>{
            if(expressEditVisible){
              expressEditVisible(false)
            }
            message.success("修改成功");
          }
        });
        if(this.props.setSelectedRowKeys){
          this.props.setSelectedRowKeys()
        }
      }
    });
  };

  handleEditCancel = () => {
    if(this.props.expressEditVisible){
      this.props.expressEditVisible(false)
    }
  };

  render(){
    const {rowData,addOrEditLoading}=this.props;
    const { getFieldDecorator } = this.props.form;
    const { TextArea } = Input;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14},
      },
    };

    const companyList=this.props.compList.map((item)=>{
      return <Option key={item.code} value={item.code}>{item.name}</Option>;
    });

    return(
      <Modal
        title='编辑快递箱信息'
        visible={this.state.editVisible}
        width={720}
        onOk={this.handleSearch}
        onCancel={this.handleEditCancel}
        footer={[
          <Button key="back" onClick={this.handleEditCancel}>取消</Button>,
          <Button key="submit" type="primary" loading={addOrEditLoading} onClick={this.handleSearch}>
            确定
          </Button>,
        ]}
      >
        <div className={styles.wrap}>
          <Form onSubmit={this.handleSearch}>
            <Row>
              <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                <FormItem
                  {...formItemLayout}
                  label="序号"
                >
                  {getFieldDecorator('orgId', {
                    initialValue:rowData.orgId,
                    rules: [{
                      required: false, message: '请输入序号!',
                    }],
                  })(
                    <Input
                      className={styles.formItemWidth1}
                      placeholder="请输入序号"
                      // suffix={dotName ? <Icon type="close" onClick={this.emptyDotName} /> : null}
                      // onChange={this.dotNameValueChange}
                    />
                  )}
                </FormItem>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                <FormItem
                  {...formItemLayout}
                  label="企业"
                >
                  {getFieldDecorator('compNo', {
                    initialValue:rowData.compNo,
                    rules: [{
                      required: false, message: '请输入企业!',
                    }],
                  })(
                    <Select
                      className={styles.formItemWidth}
                      placeholder="请选择"
                      allowClear={this.props.compList.length==1?false:true}
                    >
                      {companyList}
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                <FormItem
                  {...formItemLayout}
                  label="快递箱号"
                >
                  {getFieldDecorator('boxNo', {
                    initialValue:rowData.boxNo,
                    rules: [{
                      required: false, message: '请输入快递箱号!',
                    }],
                  })(
                    <Input
                      className={styles.formItemWidth1}
                      placeholder="请输入快递箱号"
                      // suffix={dotAddressValue ? <Icon type="close" onClick={this.emptyDotAddress} /> : null}
                      // onChange={this.dotAddressValueChange}
                    />
                  )}
                </FormItem>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                <FormItem
                  {...formItemLayout}
                  label="快递箱名"
                >
                  {getFieldDecorator('boxName', {
                    initialValue:rowData.boxName,
                    rules: [{
                      required: false, message: '请输入快递箱名!',
                    }],
                  })(
                    <Input
                      className={styles.formItemWidth1}
                      placeholder="请输入快递箱名"
                      // suffix={dotAddressValue ? <Icon type="close" onClick={this.emptyDotAddress} /> : null}
                      // onChange={this.dotAddressValueChange}
                    />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                <FormItem
                  {...formItemLayout}
                  label="地址"
                >
                  {getFieldDecorator('address', {
                    initialValue:rowData.address,
                    rules: [{
                      required: false, message: '请输入地址!',
                    }],
                  })(
                    <Input
                      className={styles.formItemWidth1}
                      placeholder="请输入地址"
                      // suffix={dotAddressValue ? <Icon type="close" onClick={this.emptyDotAddress} /> : null}
                      // onChange={this.dotAddressValueChange}
                    />
                  )}
                </FormItem>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                <FormItem
                  {...formItemLayout}
                  label="状态"
                >
                  {getFieldDecorator('status', {
                    initialValue:rowData.status,
                    rules: [{
                      required: false, message: '请输入状态!',
                    }],
                  })(
                    <Select className={styles.formItemWidth1}>
                      <Option value="1">在用</Option>
                      <Option value="2">停用</Option>
                      <Option value="3">报修</Option>
                      <Option value="4">报废</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                <FormItem
                  {...formItemLayout}
                  label="经度"
                >
                  {getFieldDecorator('longitude', {
                    initialValue:rowData.longitude,
                    rules: [{
                      required: false, message: '请输入经度!',
                    }],
                  })(
                    <Input
                      className={styles.formItemWidth1}
                      placeholder="请输入经度"
                      // suffix={longitudeValue ? <Icon type="close" onClick={this.emptyLongitude} /> : null}
                      // onChange={this.longitudeValueChange}
                    />
                  )}
                </FormItem>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                <FormItem
                  {...formItemLayout}
                  label="纬度"
                >
                  {getFieldDecorator('latitude', {
                    initialValue:rowData.latitude,
                    rules: [{
                      required: false, message: '请输入纬度!',
                    }],
                  })(
                    <Input
                      className={styles.formItemWidth1}
                      placeholder="请输入纬度"
                      // suffix={latitudeValue ? <Icon type="close" onClick={this.emptyLatitude} /> : null}
                      // onChange={this.latitudeValueChange}
                    />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                <FormItem
                  {...formItemLayout}
                  label="网点联系人"
                >
                  {getFieldDecorator('contact', {
                    initialValue:rowData.contact,
                    rules: [{
                      required: false, message: '请输入网点联系人!',
                    }],
                  })(
                    <Input
                      className={styles.formItemWidth1}
                      placeholder="请输入网点联系人"
                      // suffix={dotContactsValue ? <Icon type="close" onClick={this.emptyDotContacts} /> : null}
                      // onChange={this.dotContactsValueChange}
                    />
                  )}
                </FormItem>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                <FormItem
                  {...formItemLayout}
                  label="联系人电话"
                >
                  {getFieldDecorator('tel', {
                    initialValue:rowData.tel,
                    rules: [{
                      required: false, message: '请输入联系人电话!',
                    }],
                  })(
                    <Input
                      className={styles.formItemWidth1}
                      placeholder="请输入联系人电话"
                      // suffix={dotTelValue ? <Icon type="close" onClick={this.emptyDotTel} /> : null}
                      // onChange={this.dotTelValueChange}
                    />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                <FormItem
                  {...formItemLayout}
                  label="经营管理企业"
                >
                  {getFieldDecorator('enterprise', {
                    initialValue:rowData.enterprise,
                    rules: [{
                      required: false, message: '请输入经营管理企业!',
                    }],
                  })(
                    <Input
                      className={styles.formItemWidth1}
                      placeholder="请输入经营管理企业"
                      // suffix={dotAddressValue ? <Icon type="close" onClick={this.emptyDotAddress} /> : null}
                      // onChange={this.dotAddressValueChange}
                    />
                  )}
                </FormItem>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                <FormItem
                  {...formItemLayout}
                  label="排序"
                >
                  {getFieldDecorator('boxOrder', {
                    initialValue:rowData.boxOrder,
                    rules: [{
                      required: false, message: '请输入排序!',
                    }],
                  })(
                    <Input
                      className={styles.formItemWidth1}
                      placeholder="请输入排序"
                      // suffix={dotAddressValue ? <Icon type="close" onClick={this.emptyDotAddress} /> : null}
                      // onChange={this.dotAddressValueChange}
                    />
                  )}
                </FormItem>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>

    )
  }
}