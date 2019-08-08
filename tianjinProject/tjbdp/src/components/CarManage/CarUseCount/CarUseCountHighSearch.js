import React,{Component} from 'react';
import {Row,Col,Form,Input,Button,Icon} from 'antd';

const FormItem=Form.Item;

@Form.create()

class CarUseCountHighSearch extends Component{
  constructor(props){
	super(props);
  }

  closeHighSearch=()=>{
  	this.props.dispatch({
        type:"carusecount/setShowHighSearch",
        payload:{
          showHighSearch:false,
        }
      });
  }

  searchCarUseCount = () => {
    const form = this.props.form;
    form.validateFields((err, values) => {
      console.log(values);
      
    });
  }

  render(){
  	const formItemLayout = {
      labelCol: {
        span:6,
        offset:1,
      },
      wrapperCol: {
        span:12,
      },
    };

  const { getFieldDecorator } = this.props.form;

	const HighSearch=(
    <Row type="flex" justify="center" style={{marginBottom:14}}>
      <Form>
        <Row style={{
          borderBottom:'2px solid #fafafa',
          textAlign:'center',
          marginBottom:'12px',
          padding:'8px',
          fontSize:'18px',
        }}>
          <Col span={24}>
            高级搜索
          </Col>
        </Row>

        <FormItem {...formItemLayout} label="所属企业">
          {getFieldDecorator('enterprisesValue', {

          })(
            <Input placeholder="请输入车辆所属企业" style={{width:260}}/>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="所属公司">
          {getFieldDecorator('ownershipValue', {

          })(
            <Input placeholder="请输入车辆所属公司" style={{width:260}}/>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="营运范围">
          {getFieldDecorator('scopeValue', {

          })(
            <Input placeholder="请输入车辆营运范围" style={{width:260}}/>
          )}
        </FormItem>

        <Row type="flex" justify="center" align="middle">
          <span>
            <Button onClick={this.searchCarUseCount} type="primary" icon="search">搜索</Button>
            <Button onClick={this.closeHighSearch} style={{marginLeft:20}}>退出搜索</Button>
          </span>
        </Row>
      </Form>
    </Row>
  );

	return (
		<div>{HighSearch}</div>
	);
  }
}

export default CarUseCountHighSearch;