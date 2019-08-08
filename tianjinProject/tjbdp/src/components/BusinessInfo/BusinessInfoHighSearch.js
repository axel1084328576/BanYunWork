import React,{Component} from 'react';
import {Row,Col,Form,Input,Button,Icon,Select,Checkbox, DatePicker} from 'antd';
import styles from './HighSearch.less'
import { connect } from "dva/index";

const FormItem=Form.Item;
const CheckboxGroup = Checkbox.Group;
const {Option} = Select;
const {RangePicker} = DatePicker;

const mailTypeCheckbox=[{
      label:'线上面单',
      value:'1',
    },{
      label:'线下面单',
      value:'2',
    },{ 
      label:'人工面单',
      value:'3',
    },{
      label:'到付面单',
      value:'4',
    }];

    const customerTypeCheckbox=[{
      label:'散件面单',
      value:'1',
    },{
      label:'协议面单',
      value:'2',
    }];

    const typeOfContentsCheckbox=[{
      label:'类型1',
      value:'1',
    },{
      label:'类型2',
      value:'2',
    },{
      label:'类型3',
      value:'3',
    }];

    const mailCodeCheckbox=[{
      label:'类型1',
      value:'类型1',
    },{
      label:'类型2',
      value:'类型2',
    },{
      label:'类型3',
      value:'类型3',
    }];

@Form.create()

class BusinessInfoHighSearch extends Component{
  constructor(props){
  super(props);
  }

  closeHighSearch=()=>{
    this.props.dispatch({
      type:"businessinfo/setShowHighSearch",
      payload:{
        showHighSearch:false,
      }
    });
  }

  searchMail = () => {
    const {
      pageSize,
      dispatch
    } = this.props;

    const form = this.props.form;

    form.validateFields((err, values) => {
      if(!err){
        dispatch({
          type:'businessinfo/highSearch',
          payload:{
            page:1,
            pageSize,
            ...values,
            // mailType: values.mailTypeValue.join(','),
          }
        });
        this.props.dispatch({
          type:"businessinfo/setShowHighSearch",
          payload:{
            showHighSearch:false,
          }
        });
      }
    });
  };

  render(){
    const formItemLayout = {
      labelCol: {
        xs: { span: 10 },
        sm: { span: 10 },
      },
      wrapperCol: {
        xs: { span: 14 },
        sm: { span: 9},
      },
    };
    const { highSearch,LPIDSelect,showHighSearch } = this.props;
    const { getFieldDecorator } = this.props.form;

  return (
    <div className={styles.wrap}>
      <Form>
        <Row
          type="flex"
          justify="center"
          className={styles.higtSearchTitle}
        >
          <Col span={24}>
            高级搜索
          </Col>
        </Row>
        <FormItem
          {...formItemLayout}
          label="时间"
        >
          {getFieldDecorator('eventdate', {
            rules: [{
              required: false,
            }],
          })(
            <Input
              style={{ width: 260 }}
              placeholder="请输入时间"
              // suffix={cameraId ? <Icon type="close" onClick={this.emptyCameraId} /> : null}
              // onChange={this.cameraIdValueChange}
            />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="企业名称"
        >
          {getFieldDecorator('eccompanyname', {
            rules: [{
              required: false,
            }],
          })(
            <Input
              style={{ width: 260 }}
              placeholder="请输入企业名称"
              // suffix={cameraId ? <Icon type="close" onClick={this.emptyCameraId} /> : null}
              // onChange={this.cameraIdValueChange}
            />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="运单号"
        >
          {getFieldDecorator('deliveryno', {
            rules: [{
              required: false,
            }],
          })(
            <Input
              style={{ width: 260 }}
              placeholder="请输入运单号"
              // suffix={cameraId ? <Icon type="close" onClick={this.emptyCameraId} /> : null}
              // onChange={this.cameraIdValueChange}
            />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="用户身份证件类型"
        >
          {getFieldDecorator('usercardtype', {
            rules: [{
              required: false,
            }],
          })(
            <Input
              style={{ width: 260 }}
              placeholder="请输入用户身份证件类型"
              // suffix={cameraId ? <Icon type="close" onClick={this.emptyCameraId} /> : null}
              // onChange={this.cameraIdValueChange}
            />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="用户身份证件号码"
        >
          {getFieldDecorator('usercardid', {
            rules: [{
              required: false,
            }],
          })(
            <Input
              style={{ width: 260 }}
              placeholder="请输入用户身份证件号码"
              // suffix={cameraId ? <Icon type="close" onClick={this.emptyCameraId} /> : null}
              // onChange={this.cameraIdValueChange}
            />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="用户名"
        >
          {getFieldDecorator('username', {
            rules: [{
              required: false,
            }],
          })(
            <Input
              style={{ width: 260 }}
              placeholder="请输入用户名"
              // suffix={cameraId ? <Icon type="close" onClick={this.emptyCameraId} /> : null}
              // onChange={this.cameraIdValueChange}
            />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="电话"
        >
          {getFieldDecorator('usermobile', {
            rules: [{
              required: false,
            }],
          })(
            <Input
              style={{ width: 260 }}
              placeholder="请输入电话"
              // suffix={cameraId ? <Icon type="close" onClick={this.emptyCameraId} /> : null}
              // onChange={this.cameraIdValueChange}
            />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="组织代码"
        >
          {getFieldDecorator('orgcode', {
            rules: [{
              required: false,
            }],
          })(
            <Input
              style={{ width: 260 }}
              placeholder="请输入组织代码"
              // suffix={cameraId ? <Icon type="close" onClick={this.emptyCameraId} /> : null}
              // onChange={this.cameraIdValueChange}
            />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="税务登记号"
        >
          {getFieldDecorator('taxregno', {
            rules: [{
              required: false,
            }],
          })(
            <Input
              style={{ width: 260 }}
              placeholder="请输入税务登记号"
              // suffix={cameraId ? <Icon type="close" onClick={this.emptyCameraId} /> : null}
              // onChange={this.cameraIdValueChange}
            />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="收派员身份证件类型"
        >
          {getFieldDecorator('staffcardtype', {
            rules: [{
              required: false,
            }],
          })(
            <Input
              style={{ width: 260 }}
              placeholder="请输入收派员身份证件类型"
              // suffix={cameraId ? <Icon type="close" onClick={this.emptyCameraId} /> : null}
              // onChange={this.cameraIdValueChange}
            />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="收派员身份证件号码"
        >
          {getFieldDecorator('staffcardid', {
            rules: [{
              required: false,
            }],
          })(
            <Input
              style={{ width: 260 }}
              placeholder="请输入收派员身份证件号码"
              // suffix={cameraId ? <Icon type="close" onClick={this.emptyCameraId} /> : null}
              // onChange={this.cameraIdValueChange}
            />
          )}
        </FormItem>
        <FormItem
        {...formItemLayout}
        label="收派员姓名"
      >
        {getFieldDecorator('staffname', {
          rules: [{
            required: false,
          }],
        })(
          <Input
            style={{ width: 260 }}
            placeholder="请输入收派员姓名"
            // suffix={cameraId ? <Icon type="close" onClick={this.emptyCameraId} /> : null}
            // onChange={this.cameraIdValueChange}
          />
        )}
      </FormItem>
        <FormItem
          {...formItemLayout}
          label="收派员电话"
        >
          {getFieldDecorator('staffmobile', {
            rules: [{
              required: false,
            }],
          })(
            <Input
              style={{ width: 260 }}
              placeholder="请输入收派员电话"
              // suffix={cameraId ? <Icon type="close" onClick={this.emptyCameraId} /> : null}
              // onChange={this.cameraIdValueChange}
            />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="收派员地址"
        >
          {getFieldDecorator('staffaddress', {
            rules: [{
              required: false,
            }],
          })(
            <Input
              style={{ width: 260 }}
              placeholder="请输入收派员地址"
              // suffix={cameraId ? <Icon type="close" onClick={this.emptyCameraId} /> : null}
              // onChange={this.cameraIdValueChange}
            />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="查验时间"
        >
          {getFieldDecorator('checkdate', {
            rules: [{
              required: false,
            }],
          })(
            <Input
              style={{ width: 260 }}
              placeholder="请输入查验时间"
              // suffix={cameraId ? <Icon type="close" onClick={this.emptyCameraId} /> : null}
              // onChange={this.cameraIdValueChange}
            />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="查验方式"
        >
          {getFieldDecorator('checkmethod', {
            rules: [{
              required: false,
            }],
          })(
            <Input
              style={{ width: 260 }}
              placeholder="请输入查验方式"
              // suffix={cameraId ? <Icon type="close" onClick={this.emptyCameraId} /> : null}
              // onChange={this.cameraIdValueChange}
            />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="寄递地址"
        >
          {getFieldDecorator('senderaddress', {
            rules: [{
              required: false,
            }],
          })(
            <Input
              style={{ width: 260 }}
              placeholder="请输入寄递地址"
              // suffix={cameraId ? <Icon type="close" onClick={this.emptyCameraId} /> : null}
              // onChange={this.cameraIdValueChange}
            />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="入库时间"
        >
          {getFieldDecorator('utcdate', {
            rules: [{
              required: false,
            }],
          })(
            <Input
              style={{ width: 260 }}
              placeholder="请输入入库时间"
              // suffix={cameraId ? <Icon type="close" onClick={this.emptyCameraId} /> : null}
              // onChange={this.cameraIdValueChange}
            />
          )}
        </FormItem>
        <FormItem>
          <Row
            type="flex"
            justify="center"
            align="middle"
          >
            <span>
              <Button  type="primary" htmlType="submit" onClick={this.searchMail}>搜索</Button>
              <Button onClick={this.closeHighSearch} style={{marginLeft:20}}>退出搜索</Button>
            </span>
          </Row>
        </FormItem>
      </Form>
    </div>
  );
  }
}

export default BusinessInfoHighSearch;

