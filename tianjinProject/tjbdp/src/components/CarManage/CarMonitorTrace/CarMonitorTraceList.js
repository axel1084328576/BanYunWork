import React,{Component} from 'react';
import {Select,Row,Col, List, Icon,Button,message} from 'antd';
import styles from './CarMonitorTraceList.less';

const {Option} = Select;
const ListItem = List.Item;

class CarMonitorTraceList extends Component{
	constructor(props){
		super(props);
		this.state={
			searchKey:'',
			searchNumber:'',
			searchCenter:null,
		}
	}

	setCarCenter=(item)=>{
		// console.log(item.position);
		this.props.dispatch({
			type:'carmonitortrace/setSelectCarKey',
			payload:{
				selectCarKey:item.key,
				center:item.position,
			},
		});
	}

	searchChange=(value)=>{
		// const searchItem=this.props.carTrace.filter(item=>item.licenceNumber===value);
		const searchItem=this.props.carData.filter(item=>item.carDriver===value);
		// console.log(searchItem);
		if(searchItem.length>0){
			this.setState({
				searchKey:searchItem[0].key,
				searchNumber:value,
				searchCenter:searchItem[0].position,
			});
		}else{
			this.setState({
				searchKey:'',
				searchNumber:value,
				searchCenter:null,
			});
		}
	}

	onSearch=()=>{
		if(this.state.searchKey !== ''){
			this.props.dispatch({
				type:'carmonitortrace/setSelectCarKey',
				payload:{
					selectCarKey:this.state.searchKey,
					center:this.state.searchCenter,
				},
			});
			message.success("查找成功!");
		}else{
			message.warning("请输入要查找的车辆号码!");
		}
	}

	render(){
		const CarSelectList = (
			<Row gutter={0} className={styles.searchRow}>
				<Col span={20}>
					<Select
						className={styles.searchWidth}
						allowClear={true}
						showSearch={true}
						showArrow={false}
						placeholder="请输入要查找的车辆号码"
						onChange={this.searchChange}
					>
						{this.props.carData.map(item =>
							(<Option key={item.key} value={item.carDriver}>{item.carDriver}</Option>)
						)}
					</Select>
				</Col>
				<Col span={4}>
					<Button className={styles.searchBtn} type="primary" onClick={this.onSearch} icon="search" />
				</Col>
			</Row>
			);

		const CarMonitorList = (
			<List
				className={styles.carMonitorList}
				bordered={false}
				loading={false}
				itemLayout="vertical"
			>
				{this.props.carData.map(item=>(
					<ListItem
						key={item.key} 
						extra={<a onClick={()=>{this.setCarCenter(item)}}>定位</a>}
					>
						<Row  type="flex" align="top">
							<Col span={4}>
								<Icon type="car" className={styles.carIcon} />
							</Col>
							<Col span={16}>
								<span>{item.carDriver}</span>
							</Col>
						</Row>
					</ListItem>
				))}
			</List>
		);					
		return(
			<div className={styles.selectList}>
				{CarSelectList}
				{CarMonitorList}
			</div>
			
		);
	}
}

export default CarMonitorTraceList;