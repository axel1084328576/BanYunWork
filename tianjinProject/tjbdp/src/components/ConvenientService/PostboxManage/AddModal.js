import React,{Component} from 'react';
import {Row,Col,Input,Select,InputNumber,Button,Icon,Form,Modal,message} from 'antd';
import styles from './HighSearch.less'
import { connect } from "dva/index";

const FormItem = Form.Item;
const Option = Select.Option;

@connect(({ postboxManage,loading}) => {
  const {mailAddOrEdit,mailList}=postboxManage;
  return{
    addOrEditLoading: loading.effects['postboxManage/AddOrEdit'],
  }
})

@Form.create()
export default class AddModal extends Component{
  constructor(props){
    super(props);
    this.state={
      infoVisible:props.showPostboxModal,
      dotName:'',
      dotAddressValue:'',
      dotLalValue:'',
      dotContactsValue:'',
      dotTelValue:'',
      loading:false,
      longitudeValue:"",
      latitudeValue:"",
    };
  }

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
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        values.opType="add";
        values.token=sessionStorage.getItem('sys-token');
        this.setState({ loading: true });
        const { dispatch,mailAddOrEdit,postboxVisible,dataList } = this.props;
        dispatch({
          type: 'postboxManage/AddOrEdit',
          payload:{
            data:values,
            searchItem:searchItem,
          },
          callback:()=>{
            if(postboxVisible){
              postboxVisible(false)
            }
            message.success("添加成功");
          }
        });
        if(this.props.setSelectedRowKeys){
          this.props.setSelectedRowKeys()
        }
      }
    });
  };

  handleCancel=()=> {
    if(this.props.postboxVisible){
      this.props.postboxVisible(false)
    }
  };

  render(){
    const {dotName,dotAddressValue,latitudeValue,longitudeValue,dotContactsValue,dotTelValue,infoVisible}=this.state;
    const { addOrEditLoading}=this.props;
    const { getFieldDecorator } = this.props.form;
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
    return(
      <Modal
        title="添加信筒信箱信息"
        visible={infoVisible}
        width={720}
        onOk={this.handleSearch}
        onCancel={this.handleCancel}
        footer={[
          <Button key="back" onClick={this.handleCancel}>取消</Button>,
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
                  label="信筒信箱编号"
                >
                  {getFieldDecorator('boxNo', {
                    rules: [{
                      required: true, message: '请输入信筒信箱编号!',
                    }],
                  })(
                    <Input
                      className={styles.formItemWidth1}
                      placeholder="请输入信筒信箱编号"
                      // suffix={dotName ? <Icon type="close" onClick={this.emptyDotName} /> : null}
                      // onChange={this.dotNameValueChange}
                    />
                  )}
                </FormItem>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                <FormItem
                  {...formItemLayout}
                  label="地址"
                >
                  {getFieldDecorator('address', {
                    rules: [{
                      required: true, message: '请输入地址!',
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
            </Row>
            <Row>
              <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                <FormItem
                  {...formItemLayout}
                  label="经度"
                >
                  {getFieldDecorator('longitude', {
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
                  label="收信时间"
                >
                  {getFieldDecorator('collectionTime', {
                    rules: [{
                      required: false, message: '请输入收信时间!',
                    }],
                  })(
                    <Input
                      className={styles.formItemWidth1}
                      placeholder="请输入收信时间"
                      // suffix={dotContactsValue ? <Icon type="close" onClick={this.emptyDotContacts} /> : null}
                      // onChange={this.dotContactsValueChange}
                    />
                  )}
                </FormItem>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                <FormItem
                  {...formItemLayout}
                  label="维护人信息"
                >
                  {getFieldDecorator('contact', {
                    rules: [{
                      required: false, message: '请输入维护人信息!',
                    }],
                  })(
                    <Input
                      className={styles.formItemWidth1}
                      placeholder="请输入维护人信息"
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
                  label="类别"
                >
                  {getFieldDecorator('category', {
                    rules: [{
                      required: false, message: '请输入类别!',
                    }],
                  })(
                    <Input
                      className={styles.formItemWidth1}
                      placeholder="请输入类别"
                      // suffix={dotTelValue ? <Icon type="close" onClick={this.emptyDotTel} /> : null}
                      // onChange={this.dotTelValueChange}
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
          </Form>
        </div>
      </Modal>

    )
  }
}