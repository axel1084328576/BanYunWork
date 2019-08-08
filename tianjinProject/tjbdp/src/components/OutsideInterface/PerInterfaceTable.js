import React,{Component} from 'react';
import {Table,Form,Modal,Radio,Button,Input,Divider,Row,Col,Icon,Popconfirm} from 'antd';
import styles from './OutsideInterfaceGlobal.less';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const isopen=[{
  label:'连接',
  value:true,
},{
  label:'断开',
  value:false,
}];
@Form.create()

class PerInterfaceTable extends Component{
	constructor(props){
		super(props);
		this.state={
			orgaNameValue:'',
			modalVisible:false,
			modalType:'',
			modifyKey:'',
		}
	}

	emptyOrgaNameValue=()=>{
		this.setState({
			orgaNameValue:'',
		});
	}

	orgaNameValueChange=(e)=>{
		this.setState({
			orgaNameValue:e.target.value,
		});
	}

	backHandle=()=>{
		this.props.dispatch({
			type:'outsideinterface/setShowState',
			payload:{
				interfaceListShow:true,
    			interfaceParamsShow:false,
    			perInterfaceListShow:false,
			},
		});
	}

	deleteInterface=(key)=>{
		this.props.dispatch({
			type:'outsideinterface/deletePerInterfaceList',
			payload:{
				key,
			}
		});
	}

	openModifyModal = (record)=>{
		const form = this.props.form;

	    form.setFieldsValue({
		  orgaName:record.orgaName,
		  use: record.use,
		  securityKey: record.securityKey,
		  open: record.open,
	    });
		this.setState({
			modalVisible:true,
			modalType:'modify',
			modifyKey:record.key,
		});
	}

	openAddModal = ()=>{
		const form = this.props.form;

	    form.setFieldsValue({
		  orgaName: '',
		  use: '',
		  securityKey: '',
		  open: true,
	    });
		this.setState({
			modalVisible:true,
			modalType:'add',
		});
	}

	cancelOpenModal = ()=>{
		this.setState({
			modalVisible:false,
			modalType:'',
			modifyKey:'',
		});
	}

	randomSecurityKey = (type)=>{
		const form = this.props.form;
		
		const name = form.getFieldValue("orgaName");
		const use = form.getFieldValue("use");
		form.setFieldsValue({
		  securityKey: `${name}${use}`,
	    });
	}

	modifyInterface = ()=>{
		const form = this.props.form;
	    form.validateFields((err, values) => {
	      if (!err) {
	        this.props.dispatch({
	          type:'outsideinterface/updatePerInterfaceList',
	          payload:{
	            key:this.state.modifyKey,
				orgaName:values.orgaName,
				use: values.use,
				securityKey: values.securityKey,
				open: values.open,
	          },
	        });
	        this.setState({
				modalVisible:false,
				modifyKey:'',
				modalType:'',
			});
	      }
	    });
	}

	addInterface = ()=>{
		const form = this.props.form;
		form.validateFields((err,values)=>{
			if(!err){
				//TODO 添加新组织接入
				this.props.dispatch({
					type:'outsideinterface/addPerInterfaceList',
					payload:{
						orgaName: values.orgaName,
						use: values.use,
						securityKey: values.securityKey,
						open: values.open,
					}
				});
				this.setState({
					modalVisible:false,
					modalType:'',
				})
			}
		});
	}

	render(){
		const columns = [{
		  title: '组织名称',
		  dataIndex: 'orgaName',
		  width: '20%',
		  key: 'orgaName',
		}, {
		  title: '用途',
		  dataIndex: 'use',
		  width: '20%',
		  key: 'use',
		}, {
		  title: '安全密钥',
		  dataIndex: 'securityKey',
		  width: '35%',
		  key: 'securityKey',
		}, {
		  title: '状态',
		  dataIndex: 'open',
		  width: '15%',
		  key: 'open',
		  render:(text,record)=>(
		  	<span className={text ? styles.intelink : styles.intebreak}>
		  	{text ? 
		  		'已连接'
		  		: 
		  		'已断开'
		  	}
		  	</span>
		  ),
		}, {
		  dataIndex: 'option',
		  key: 'option',
		  render:(text,record)=>(
		  	<span>
		  		<a onClick={()=>{this.openModifyModal(record)}}>修改</a>
		  		<Divider type="vertical" />
		  		<Popconfirm
	                title="是否删除该组织接入？"
	                onConfirm={() => {this.deleteInterface(record.key)}}
	              >
	                <a className={styles.delete}>删除</a>
	            </Popconfirm>
		  	</span>
		  )
		}];

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

	    const ModalForm=(
	      <Modal
	        confirmLoading={false}
	        title="修改组织接口信息"
	        visible={this.state.modalVisible}
	        onOk={
	        	this.state.modalType === 'add' 
	        	? 
	        	this.addInterface 
	        	: 
	        	this.modifyInterface
	        }
	        onCancel={this.cancelOpenModal}
	      >
	        <Form>
	          <FormItem {...formItemLayout} label="组织名称">
	            {getFieldDecorator('orgaName', {
	              rules: [{
	                required: true,
	                message: '组织名称不能为空！',
	              }],
	            })(
	              <Input placeholder="请输入组织名称" />
	            )}
	          </FormItem>
	          <FormItem {...formItemLayout} label="接口用途">
	            {getFieldDecorator('use', {
	              rules: [{
	                required: true,
	                message: '接口用途不能为空！',
	              }],
	            })(
	              <Input placeholder="请输入接口用途" />
	            )}
	          </FormItem>
	          <FormItem {...formItemLayout} label="安全密钥">
	            {getFieldDecorator('securityKey', {
	              rules: [{
	                required: true,
	                message: '安全密钥不能为空！',
	              }],
	            })(
	              <Input placeholder="安全密钥" disabled />
	            )}
	          </FormItem>
	          <FormItem 
	          	wrapperCol={{
		        	span:4,
		        	offset:7,
		      	}}
		      >
	            <Button onClick={()=>{this.randomSecurityKey(2)}} type="primary">随机密钥</Button>
	          </FormItem>
	          <FormItem {...formItemLayout} label="连接状态">
	            {getFieldDecorator('open', {
	              rules: [{
	                required: true,
	                message: '连接状态不能为空！',
	              }],
	            })(
	              <RadioGroup options={isopen} />
	            )}
	          </FormItem>
	        </Form>
	      </Modal>
	    );

		const pagination={
	      showSizeChanger:true,
	      showTotal:(total,range)=>`共${total}条记录`,
	    };

	    const tooltip = (
	    	<div>
		        <Row
		          className={styles.searchRow}
		          type="flex"
		          align="middle"
		          gutter={10}
		        >
		          <Col
		            lg={{span:3}}
		            sm={{span:4}}
		          >
		            <Button
		              className={styles.formItemWidth}
		              icon="left"
		              onClick={this.backHandle}
		            >
		              返回
		            </Button>
		          </Col>
		          {/*
		          <Col span={2}>组织名称:</Col>
		          <Col span={6}>
		            <Input
		              className={styles.formItemWidth}
		              placeholder="请输入组织名称"
		              value={this.state.orgaNameValue}
		              suffix={this.state.orgaNameValue ? <Icon type="close" onClick={this.emptyOrgaNameValue} /> : null}
		              onChange={this.orgaNameValueChange}
		            />
		          </Col>
		          <Col
		            lg={{span:3}}
		            sm={{span:4}}
		          >
		            <Button className={styles.formItemWidth} type="primary" icon="search">搜索</Button>
		          </Col>
		          */}
		          <Col
		            lg={{span:3,offset:18}}
		            sm={{span:4,offset:16}}
		          >
		            <Button
		              className={styles.formItemWidth}
		              type="primary"
		              icon="plus"
		              onClick={this.openAddModal}
		            >
		              添加
		            </Button>
		          </Col>
		        </Row>
		    </div>
	    );

		return (
			<div	
        		className={styles.outsideInterface}
			>
				{ModalForm}
				{tooltip}
				<Table 
					dataSource={this.props.perInterfaceList}
					columns={columns} 
					bordered={false}
	          		pagination={pagination}
				/>
			</div>
		);
	}
}

export default PerInterfaceTable;