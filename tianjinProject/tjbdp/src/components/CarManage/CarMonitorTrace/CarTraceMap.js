import React,{Component} from 'react';
import {Icon,Card, Row,Col ,List,Button} from 'antd';
import { Map,Markers,Polyline } from 'react-amap';
import styles from './CarTraceMap.less';

const ListItem = List.Item;
const ListItemMeta = List.Item.Meta;

class CarTraceMap extends Component{
	constructor(props){
		super(props);
		this.state={
			tipshow:false,
			showTrace:true,
			showLicenceNumber:true,
			carDriver:'',
			location:'',
			licenceNumber:'',
			position:{
				longitude:0,
      			latitude:0,
			},
			time:'',
			sd:'',
		}
	}
	// 信息渲染
	showTip = ()=>{
		return (
			<Card bordered={false} className={styles.infoTip}>
				<Row gutter={12}>
					<Col span={12}>
						<List>
							<ListItem>
								<ListItemMeta 
									title="时间"
									description={this.state.time}
								/>
							</ListItem>
							<ListItem>
								<ListItemMeta 
									title="速度"
									description={this.state.sd}
								/>
							</ListItem>
						</List>
					</Col>
					<Col span={12}>
						<List>
							<ListItem>
								<ListItemMeta 
									title="车牌号"
									description={this.state.carDriver}
								/>
							</ListItem>
							<ListItem>
								<ListItemMeta 
									title="经纬度"
									description={`( ${this.state.position.longitude} , ${this.state.position.latitude} )`}
								/>
							</ListItem>
						</List>
					</Col>
				</Row>
			</Card>
		);
	}
	//
	mapEvents = {
		//created: (ins) => { console.log(ins); },
  		//click: () => { console.log('clicked') },
  		dragstart: ()=>{
  			this.props.dispatch({
				type:'carmonitortrace/setSelectCarKey',
				payload:{
					selectCarKey:'',
				},
			});
  		},
	}
	// 图标鼠标事件
	markerEvents = {
      mouseover:(e,marker) => {
      	console.log("marker",marker);
      	this.setState({
      		tipshow:true,
      		// carDriver:marker.Pg.extData.carDriver,
					// location:marker.Pg.extData.location,
					// licenceNumber:marker.Pg.extData.licenceNumber,
					// position:{...marker.Pg.extData.position},
					carDriver:marker.Ge.extData.carDriver,
					location:marker.Ge.extData.location,
					licenceNumber:marker.Ge.extData.licenceNumber,
					position:{...marker.Ge.extData.position},
					time:marker.Ge.extData.time,
					sd:marker.Ge.extData.sd,
      	});	
      },
      mouseout: (e,marker) => {
      	this.setState({
      		tipshow:false,
					sd:'',
					time:'',
      		carDriver:'',
					location:'',
					licenceNumber:'',
					position:{
						longitude: '',
						latitude:'',
					},
				});
			}
    }
    // 车牌展示
    changeShowLicenceNumber= ()=>{
    	var hide=document.getElementsByClassName("antd-pro-components-car-manage-car-monitor-trace-car-trace-map-carNumber");
    	console.log("hide",hide);
    	if(!this.state.showLicenceNumber){
    		for(let i=0;i<hide.length;i+=1){
    			hide[i].style.display="block";
    		}
    	}else{
    		for(let i=0;i<hide.length;i+=1){
    			hide[i].style.display="none";
    		}
    	}	
    	this.setState({showLicenceNumber:!this.state.showLicenceNumber});
    }
    // 路径展示
    changeShowTrace = ()=>{
    	this.setState({showTrace:!this.state.showTrace});
    }
    // 图标渲染
	renderCarPosition=(item)=>{
		return (
			<div className={styles.markerContent}>
				<div 
					className={styles.markerIcon}
				>
					<Icon className={styles.carIcon} type="car" />
				</div>
				{this.state.showLicenceNumber?
					<div
						className={styles.carNumber} 
					>
						{item.carDriver}
					</div>
					:
					null
				}
			</div>
		);
	}

	renderBtn=()=>{
		return (
			<div className={styles.btnGroup}>
		    	{/*<Button */}
		    	{/*	onClick={this.changeShowTrace}*/}
		    	{/*>*/}
		    	{/*	{this.state.showTrace ? '隐藏轨迹' : '显示轨迹'}*/}
		    	{/*</Button>*/}
		    	<Button 
		    		onClick={this.changeShowLicenceNumber}
		    	>
		    		{this.state.showLicenceNumber ? '隐藏车牌' : '显示车牌'}
		    	</Button>
		    </div>
		);
	};

	renderMap = (center)=>{
		const plugins=['ControlBar','OverView','Scale'];
		// viewMode='3D'
		// console.log("this.props.carTrace",this.props.carTrace)
		return (
			<Map 
					plugins={plugins}
					amapkey={'6f3678d577c3367347962b83b9e247fd'}
					version='1.4.0'
					center={center}
					events={this.mapEvents}
					zoom={10}
			>
				{this.state.tipshow ? this.showTip() : null}
				{this.renderBtn()}
				{/*{this.props.perCarTrace.map((item,key)=>*/}
				{/*		<Polyline*/}
				{/*			key={key}*/}
				{/*			path={item}*/}
				{/*			visible={ this.state.showTrace }*/}
				{/*			showDir={ true }*/}
				{/*			style={ {strokeWeight:'8',lineJoin:'round',lineCap:'round'} }*/}
				{/*		/>*/}
				{/*	)*/}
				{/*}*/}
					<Markers
						// markers={this.props.carTrace}
						markers={this.props.carData}
						events={this.markerEvents}
						render={this.renderCarPosition}
					/>
			</Map>
		);
	};

	componentDidMount(){
		this.interval=setInterval(()=>{
			this.props.dispatch({
				type:'carmonitortrace/updateCarTrace',
				payload:{},
			});
		},1000);
	}

	componentWillUnmount(){
		clearInterval(this.interval);
	}

	render(){
		// console.log(this.props.center);
		return (
			<div
			  className={styles.mapContainer}
			>
				{this.renderMap(this.props.center)}
			</div>
		);
	}
}

export default CarTraceMap;