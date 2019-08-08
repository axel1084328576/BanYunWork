import React,{Component} from 'react';
import {Table,Modal,Form,Select,Button,Divider,Input,Row,Col,Icon,Popconfirm} from 'antd';
import styles from './OutsideInterfaceGlobal.less';

const TextArea = Input.TextArea;
const Option = Select.Option;
const FormItem = Form.Item;

const interfaceType=[
	{
		key:'GET',
		label:'GET',
		value:'GET',
	},{
		key:'POST',
		label:'POST',
		value:'POST',
	},{
		key:'PUT',
		label:'PUT',
		value:'PUT',
	},{
		key:'DELETE',
		label:'DELETE',
		value:'DELETE',
	},{
		key:'OPTIONS',
		label:'OPTIONS',
		value:'OPTIONS',
	},{
		key:'HEAD',
		label:'HEAD',
		value:'HEAD',
	},{
		key:'TRACE',
		label:'TRACE',
		value:'TRACE',
	},{
		key:'CONNECT',
		label:'CONNECT',
		value:'CONNECT',
	}
];
const paramsDataType=[
	{
		key:'JSON',
		label:'JSON',
		value:'JSON',
	},{
		key:'String',
		label:'String',
		value:'String',
	},{
		key:'Integer',
		label:'Integer',
		value:'Integer',
	},{
		key:'Array',
		label:'Array',
		value:'Array',
	}
];
const returnDataType=[
	{
		key:'JSON',
		label:'JSON',
		value:'JSON',
	},{
		key:'String',
		label:'String',
		value:'String',
	}
];

@Form.create()

class OutsideInterfaceTable extends Component{
	constructor(props){
		super(props);
		this.state={
			interfaceNameValue:'',
			modalVisible:false,
			modifyKey:'',
			modalType:'',
		}
	}

	emptyInterfaceNameValue=()=>{
		this.setState({
			interfaceNameValue:'',
		});
	}

	interfaceNameValueChange=(e)=>{
		this.setState({
			interfaceNameValue:e.target.value,
		});
	}

	viewParamsFormatContent = (key)=>{
		this.props.dispatch({
			type:'outsideinterface/getParamsFormatContent',
			payload:{
				key,
			},
		});

		this.props.dispatch({
			type:'outsideinterface/setShowState',
			payload:{
				interfaceListShow:false,
    			interfaceParamsShow:true,
    			perInterfaceListShow:false,
			},
		});
	}

	viewPerInterfaceShow = (key)=>{
		this.props.dispatch({
			type:'outsideinterface/getPerInterface',
			payload:{
				key,
			},
		});

		this.props.dispatch({
			type:'outsideinterface/setShowState',
			payload:{
				interfaceListShow:false,
    			interfaceParamsShow:false,
    			perInterfaceListShow:true,
			},
		});
	}

	deleteInterface=(key)=>{
		this.props.dispatch({
			type:'outsideinterface/deleteInterfaceList',
			payload:{
				key,
			}
		});
	}

	openModifyModal = (record)=>{
		const form = this.props.form;

	    form.setFieldsValue({
		  url:record.url,
		  name: record.name,
		  description: record.description,
		  interfaceType: record.interfaceType,
		  paramFormat: record.paramFormat.pType,
		  returnFormat: record.returnFormat,
	    });
		this.setState({
			modalVisible:true,
			modifyKey:record.key,
			modalType:'modify',
		});
	}

	openAddModal = (record)=>{
		const form = this.props.form;

	    form.setFieldsValue({
		  url:'',
		  name: '',
		  description: '',
		  interfaceType: interfaceType[0].value,
		  paramFormat: paramsDataType[0].value,
		  returnFormat: returnDataType[0].value,
	    });
		this.setState({
			modalVisible:true,
			modifyKey:record.key,
			modalType:'add',
		});
	}

	cancelOpenModal = ()=>{
		this.setState({
			modalVisible:false,
			modifyKey:'',
			modalType:'',
		});
	}


	modifyInterface = ()=>{
		const form = this.props.form;
	    form.validateFields((err, values) => {
	      if (!err) {
	        this.props.dispatch({
	          type:'outsideinterface/updateInterfaceList',
	          payload:{
	            key:this.state.modifyKey,
				url: values.url,
		  		name: values.name,
		  		description: values.description,
		  		interfaceType: values.interfaceType,
		  		paramFormat: values.paramFormat,
		  		returnFormat: values.returnFormat,
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
	    form.validateFields((err, values) => {
	      if (!err) {
	        this.props.dispatch({
	          type:'outsideinterface/addInterfaceList',
	          payload:{
				  url: values.url,
		  		name: values.name,
		  		description: values.description,
		  		interfaceType: values.interfaceType,
		  		paramFormat: values.paramFormat,
		  		returnFormat: values.returnFormat,
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

	render(){
		
		const columns = [{
		  title: 'url',
		  dataIndex: 'url',
		  width: '25%',
		  key: 'url',
		}, {
		  title: '接口名称',
		  dataIndex: 'name',
		  width: '9%',
		  key: 'name',
		}, {
		  title: '接口类型',
		  dataIndex: 'interfaceType',
		  width: '9%',
		  key: 'interfaceType',
		}, {
		  title: '入参格式',
		  dataIndex: 'paramFormat',
		  width: '9%',
		  key: 'paramFormat',
		  render:(text,record)=>(
		  	<a onClick={()=>{this.viewParamsFormatContent(record.key)}}>{text ? text.pType : '无'}</a>
		  ),
		}, {
		  title: '出参格式',
		  dataIndex: 'returnFormat',
		  width: '9%',
		  key: 'returnFormat',
		}, {
			title: '描述',
			dataIndex: 'description',
			width: '20%',
			key: 'description',
		}, {
		  title: '接入',
		  dataIndex: 'haveLink',
		  width: '9%',
		  key: 'haveLink',
		  render: (text,record)=>(
		  	<a onClick={()=>{this.viewPerInterfaceShow(record.key)}}>查看</a>
		  ),
		}, {
		  dataIndex: 'option',
		  key: 'option',
		  render:(text,record)=>(
		  	<span>
		  		<a onClick={()=>{this.openModifyModal(record)}}>修改</a>
		  		<Divider type="vertical" />
		  		<Popconfirm
	                title="是否删除该接口？"
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
	        title="修改参数信息"
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
	          <FormItem {...formItemLayout} label="接口url">
	            {getFieldDecorator('url', {
	              rules: [{
	                required: true,
	                message: '接口url不能为空',
	              }],
	            })(
	              <Input placeholder="请输入接口url" />
	            )}
	          </FormItem>
	          <FormItem {...formItemLayout} label="接口名称">
	            {getFieldDecorator('name', {
	            	rules: [{
	                required: true,
	                message: '接口名称不能为空！',
	              }],
	            })(
	              <Input placeholder="请输入接口名称" />
	            )}
	          </FormItem>
	          <FormItem {...formItemLayout} label="接口类型">
	            {getFieldDecorator('interfaceType', {
	            	rules: [{
	                required: true,
	                message: '接口类型不能为空！',
	              }],
	            })(
	              <Select 
	              	showSearch
	              	placeholder="请选择接口类型"
	              >
	              	{interfaceType.map(item => 
	              		(<Option key={item.key} value={item.value}>{item.label}</Option>)
	              	)}
	              </Select>
	            )}
	          </FormItem>
	          <FormItem {...formItemLayout} label="接口描述">
	            {getFieldDecorator('description', {
	              
	            })(
	              <TextArea rows={4} placeholder="接口描述" />
	            )}
	          </FormItem>
	          <FormItem {...formItemLayout} label="参数类型">
	            {getFieldDecorator('paramFormat', {
	            	rules: [{
	                required: true,
	                message: '接口参数类型不能为空！',
	              }],
	            })(
	              <Select 
	              	showSearch
	              	placeholder="请选择参数类型"
	              >
	              	{paramsDataType.map(item => 
	              		(<Option key={item.key} value={item.value}>{item.label}</Option>)
	              	)}
	              </Select>
	            )}
	          </FormItem>
	          <FormItem {...formItemLayout} label="返回类型">
	            {getFieldDecorator('returnFormat', {
	            	rules: [{
	                required: true,
	                message: '接口返回类型不能为空！',
	              }],
	            })(
	              <Select 
	              	showSearch
	              	placeholder="请选择返回类型"
	              >
	              	{returnDataType.map(item => 
	              		(<Option key={item.key} value={item.value}>{item.label}</Option>)
	              	)}
	              </Select>
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
		          <Col span={2}>接口名称:</Col>
		          <Col span={6}>
		            <Input
		              className={styles.formItemWidth}
		              placeholder="请输入接口名称"
		              value={this.state.interfaceNameValue}
		              suffix={this.state.interfaceNameValue ? <Icon type="close" onClick={this.emptyInterfaceNameValue} /> : null}
		              onChange={this.interfaceNameValueChange}
		            />
		          </Col>
		          <Col
		            lg={{span:3}}
		            sm={{span:4}}
		          >
		            <Button className={styles.formItemWidth} type="primary" icon="search">搜索</Button>
		          </Col>
		          <Col
		            lg={{span:3,offset:10}}
		            sm={{span:4,offset:8}}
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
					dataSource={this.props.interfaceList}
					columns={columns} 
					bordered={false}
	          		pagination={pagination}
				/>
			</div>
		);
	}
}

export default OutsideInterfaceTable;