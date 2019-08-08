import React,{Component} from 'react';
import {Row,Col,Form,Input,Button,Select,TreeSelect,Icon,Radio} from 'antd';
import { connect } from "dva/index";

const FormItem=Form.Item;
const {Option} = Select;
const RadioGroup = Radio.Group;
const TreeNode = TreeSelect.TreeNode;

const isLockRadio=[{
  label:'已锁定',
  value:true,
},{
  label:'未锁定',
  value:false,
}];

@Form.create()
class UserHighSearch extends Component{
  constructor(props){
    super(props);
  }

  closeHighSearch=()=>{
    this.props.dispatch({
      type:"usermanage/setShowHighSearch",
      payload:{
        showHighSearch:false,
      }
    });
  };

  highSearch = () => {
    const {pageSize,dispatch} = this.props;
    const form = this.props.form;
    form.validateFields((err, values) => {
      // console.log("222222",values);
      const valueData={
        orgId:values.orgValue,
        userName:values.userAccountValue,
        role:values.roleValue,
        stype:values.islockValue,
      };
      if(!err){
        dispatch({
          type:'usermanage/highSearchUser',
          payload:{
            ...valueData,
            page:1,
            pageSize:10,
          }
        });
        this.props.dispatch({
          type:"usermanage/setShowHighSearch",
          payload:{
            showHighSearch:false,
          }
        });
      }
    });
  }

  render(){
    const formItemLayout = {
      labelCol: {
        span:6,
        offset:1,
      },
      wrapperCol: {
        span:14,
      },
    };

  const { getFieldDecorator } = this.props.form;
  const {
    roleSelect,
    showHighSearch,
    highSearchLoading,
    organizationTree,
  } = this.props;

  const HighSearch=(
    <Row type="flex" justify="center" style={{ marginBottom: 14 }}>
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
        <FormItem {...formItemLayout} label="用户账号">
          {getFieldDecorator('userAccountValue', {
          })(
            <Input placeholder="请输入用户账号" style={{ width: 260 }}/>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="业务角色">
          {getFieldDecorator('roleValue', {
          })(
            <Select
              style={{ width: 260 }}
              allowClear={true}
              mode="multiple"
              placeholder="请选择业务角色"
            >
              {roleSelect.map(item => <Option key={item.key} value={item.value}>{item.title}</Option>)}
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="所属组织">
          {getFieldDecorator('orgValue', {
          })(
            <TreeSelect
              style={{ width: 260 }}
              dropdownStyle={{maxHeight:'300px'}}
              allowClear={true}
              treeDefaultExpandAll
              treeData={organizationTree}
              placeholder="请选择所属组织"
            />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="是否锁定">
          {getFieldDecorator('islockValue', {
          })(
            <RadioGroup options={isLockRadio} style={{ width: 260 }}/>
          )}
        </FormItem>
        <Row type="flex" justify="center" align="middle">
          <span>
             <Button
               loading={highSearchLoading}
               onClick={this.highSearch}
               type="primary"
               icon="search"
             >
              搜索
            </Button>
            <Button onClick={this.closeHighSearch} style={{ marginLeft: 20 }}>退出搜索</Button>
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

export default UserHighSearch;
