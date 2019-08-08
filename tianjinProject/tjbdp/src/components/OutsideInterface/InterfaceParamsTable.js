import React,{Component} from 'react';
import {Table,Form,Select,Radio,Input,Modal,Button,Divider,Row,Col,Icon,Popconfirm} from 'antd';
import styles from './OutsideInterfaceGlobal.less';

const TextArea = Input.TextArea;
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

const isOrNotNull = [
	{
		label:'可为空',
		value:true,
		key:'null',
	},{
		label:'不可为空',
		value:false,
		key:'notNull',
	}
];
const paramsDataType=[
	{
		key:'Integer',
		label:'Integer',
		value:'Integer',
	},
	{
		key:'Object',
		label:'Object',
		value:'Object',
	},{
		key:'String',
		label:'String',
		value:'String',
	},{
		key:'Float',
		label:'Float',
		value:'Float',
	},{
		key:'Array',
		label:'Array',
		value:'Array',
	}
];

@Form.create()

class InterfaceParamsTable extends Component{
	constructor(props){
		super(props);
		this.state={
			modalVisible:false,
			modifyKey:'',
			modalType:'',
		}
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

	deleteParam=(key)=>{
		this.props.dispatch({
			type:'outsideinterface/deleteParamsFormatContent',
			payload:{
				key,
			}
		});
	}

	openModifyModal = (record)=>{
		const form = this.props.form;

	    form.setFieldsValue({
	      pName: record.pName,
	      pType: record.pType,
	      pDefaultValue: record.pDefaultValue,
	      pIsNull: record.pIsNull,
	      pDescription: record.pDescription,
	    });

		this.setState({
			modalVisible:true,
			modifyKey:record.key,
			modalType:'modify',
		});
	}

	openAddModal = ()=>{
		const form = this.props.form;

	    form.setFieldsValue({
	      pName: '',
	      pType: paramsDataType[0].value,
	      pDefaultValue: '',
	      pIsNull: false,
	      pDescription: '',
	    });

		this.setState({
			modalVisible:true,
			modalType:'add',
		});
	}

	cancelOpenModal = ()=>{
		this.setState({
			modalVisible: false,
			modifyKey: '',
			modalType: '',
		});
	}

	modifyParam = ()=>{
		const form = this.props.form;
	    form.validateFields((err, values) => {
	      if (!err) {
	        this.props.dispatch({
	          type:'outsideinterface/updateInterfaceParams',
	          payload:{
	            key:this.state.modifyKey,
	            pName: values.pName,
	            pType: values.pType,
	            pDefaultValue: values.pDefaultValue,
	            pIsNull: values.pIsNull,
	            pDescription: values.pDescription,
	          },
	        });
	        this.setState({
				modalVisible: false,
				modifyKey: '',
				modalType: '',
			});
	      }
	    });   
	}

	addParam = ()=>{
		const form = this.props.form;
	    form.validateFields((err, values) => {
	      if (!err) {
	        this.props.dispatch({
	          type:'outsideinterface/addInterfaceParams',
	          payload:{
	            pName: values.pName,
	            pType: values.pType,
	            pDefaultValue: values.pDefaultValue,
	            pIsNull: values.pIsNull,
	            pDescription: values.pDescription,
	          },
	        });
	        this.setState({
				modalVisible: false,
				modifyKey: '',
				modalType: '',
			});
	      }
	    });   
	}

	render(){
		const columns = [
			{
			  title: '参数名',
			  dataIndex: 'pName',
			  width: '15%',
			  key: 'pName',
			}, {
			  title: '参数类型',
			  dataIndex: 'pType',
			  width: '15%',
			  key: 'pType',
			}, {
			  title: '默认值',
			  dataIndex: 'pDefaultValue',
			  width: '15%',
			  key: 'pDefaultValue',
			  render: (text,record)=>(
			  	<span>{text === '' ? '无' : text}</span>
			  ),
			},	{
			  title: '空值',
			  dataIndex: 'pIsNull',
			  width: '15%',
			  key: 'pIsNull',
			  render: (text,record)=>(
			  	<span>{text ? '可为空' : '不可为空'}</span>
			  ),
			}, {
			  title: '参数描述',
			  dataIndex: 'pDescription',
			  width: '30%',
			  key: 'pDescription',
			}, {
			  dataIndex: 'option',
			  key: 'option',
			  render:(text,record)=>(
			  	<span>
			  		<a onClick={()=>{this.openModifyModal(record)}}>修改</a>
			  		<Divider type="vertical" />
			  		<Popconfirm
		                title="是否删除该接口参数？"
		                onConfirm={() => {this.deleteParam(record.key)}}
		              >
		                <a className={styles.delete}>删除</a>
		              </Popconfirm>
			  	</span>
			  )
			}
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

	    const ModalForm=(
	      <Modal
	        confirmLoading={false}
	        title="修改参数信息"
	        visible={this.state.modalVisible}
	        onOk={
	        	this.state.modalType === 'add'
	        	?
	        	this.addParam
	        	:
	        	this.modifyParam
	        }
	        onCancel={this.cancelOpenModal}
	      >
	        <Form>
	          <FormItem {...formItemLayout} label="参数名">
	            {getFieldDecorator('pName', {
	              rules: [{
	                required: true,
	                message: '参数名称不能为空！',
	              }],
	            })(
	              <Input placeholder="请输入参数名称" />
	            )}
	          </FormItem>
	          <FormItem {...formItemLayout} label="参数类型">
	            {getFieldDecorator('pType', {
	            	rules: [{
	                required: true,
	                message: '参数类型不能为空！',
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
	          <FormItem {...formItemLayout} label="空值">
	            {getFieldDecorator('pIsNull', {
	            	rules: [{
	                required: true,
	                message: '请设置是否可为空值',
	              }],
	            })(
	              <RadioGroup options={isOrNotNull} />
	            )}
	          </FormItem>
	          <FormItem {...formItemLayout} label="默认值">
	            {getFieldDecorator('pDefaultValue', {

	            })(
	              <Input placeholder="请输入参数默认值" />
	            )}
	          </FormItem>
	          <FormItem {...formItemLayout} label="参数描述">
	            {getFieldDecorator('pDescription', {
	              
	            })(
	              <TextArea rows={4} placeholder="参数描述" />
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
					dataSource={this.props.paramsFormatContent}
					columns={columns} 
					bordered={false}
	          		pagination={pagination}
				/>
			</div>
		);
	}
}

export default InterfaceParamsTable;