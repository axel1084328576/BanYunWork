import React,{Component} from 'react';
import {Row,Col,Input,Select,InputNumber,Button,Icon,Form} from 'antd';
import styles from './HighSearch.less'

const FormItem = Form.Item;
const Option = Select.Option;

@Form.create()
export default class HighSearch extends Component{
  constructor(props){
    super(props);
    this.state={
      employeeIdValue:'',
      nameValue:'',
      birthVale:'',
      addressValue:'',
      levelValue:'',
      identityTypeValue:'',
      identityIdValue:'',
      telValue:'',
    };
  }

  emptyEmployeeId = () => {
    this.setState({employeeIdValue:''});
  };

  employeeIdValueChange = (value) => {
    this.setState({employeeIdValue:value});
  };


  emptyName = () => {
    this.setState({nameValue:''});
  };

  nameValueChange = (value) => {
    this.setState({nameValue:value});
  };

  emptyBirth = () => {
    this.setState({birthValue:''});
  };

  birthValueChange = (value) => {
    this.setState({birthValue:value});
  };

  emptyAddress = () => {
    this.setState({addressValue:''});
  };

  addressValueChange = (value) => {
    this.setState({addressValue:value});
  };

  emptyLevel = () => {
    this.setState({levelValue:''});
  };

  levelValueChange = (value) => {
    this.setState({levelValue:value});
  };

  emptyIdentityType = () => {
    this.setState({identityTypeValue:''});
  };

  identityTypeValueChange = (value) => {
    this.setState({identityTypeValue:value});
  };

  emptyIdentityId = () => {
    this.setState({identityIdValue:''});
  };

  identityIdValueChange = (value) => {
    this.setState({identityIdValue:value});
  };

  emptyTel = () => {
    this.setState({telValue:''});
  };

  telValueChange = (value) => {
    this.setState({telValue:value});
  };

  highSearch = () => {
    if(this.props.showSearch){
      this.props.showSearch(false)
    }
  };


  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
      }
    });
  };

  render(){
    const { cameraIdValue,nameValue,birthVale,addressValue,levelValue, identityTypeValue, identityIdValue, telValue}=this.state;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 4},
      },
    };
    return(
      <div className={styles.wrap}>
        <Row
          className={styles.higtSearchTitle}
          type="flex"
          align="middle"
        >
          <Col span={2} offset={10} style={{fontSize:18}}>
            高级搜索
          </Col>
        </Row>
        <Form onSubmit={this.handleSearch}>
          <FormItem
            {...formItemLayout}
            label="姓名"
          >
            {getFieldDecorator('birth', {
              rules: [{
                required: true, message: '请输入姓名!',
              }],
            })(
              <Input
                className={styles.formItemWidth1}
                placeholder="请输入姓名"
                suffix={birthVale ? <Icon type="close" onClick={this.emptyBirth} /> : null}
                onChange={this.birthValueChange}
              />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="从业人员编号"
          >
            {getFieldDecorator('employeeId', {
              rules: [{
                required: true, message: '请输入从业人员编号!',
              }],
            })(
              <Input
                className={styles.formItemWidth1}
                placeholder="请输入从业人员编号"
                suffix={cameraIdValue ? <Icon type="close" onClick={this.emptyEmployeeId} /> : null}
                onChange={this.employeeIdValueChange}
              />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="企业名称"
          >
            {getFieldDecorator('name', {
              rules: [{
                required: true, message: '请输入企业名称!',
              }],
            })(
              <Input
                className={styles.formItemWidth1}
                placeholder="请输入企业名称"
                suffix={nameValue ? <Icon type="close" onClick={this.emptyName} /> : null}
                onChange={this.nameValueChange}
              />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="网点名称"
          >
            {getFieldDecorator('address', {
              rules: [{
                required: true, message: '请输入网点名称!',
              }],
            })(
              <Input
                className={styles.formItemWidth1}
                placeholder="请输入网点名称"
                suffix={addressValue ? <Icon type="close" onClick={this.emptyAddress} /> : null}
                onChange={this.addressValueChange}
              />
            )}
          </FormItem>
          <FormItem>
            <Row
              type="flex"
              justify="center"
              align="middle"
            >
              <Col span={2}>
                <Button  type="primary" htmlType="submit">搜索</Button>
              </Col>
              <Col span={3}>
                <Button onClick={this.highSearch}>退出搜索</Button>
              </Col>
            </Row>
          </FormItem>
        </Form>
      </div>
    )
  }
}