import React,{Component} from 'react';
import {Card,Row,Col,Menu,Icon,Select,Button,List} from 'antd';
import {connect} from 'dva';
import { Map,Markers,InfoWindow } from 'react-amap';
import styles from './index.less'
import an from '../../assets/expIcon/an.png'
import jlb from '../../assets/expIcon/jlb.png'
import ky from '../../assets/expIcon/ky.png'
import mhkd from '../../assets/expIcon/mhkd.png'
import rfd from '../../assets/expIcon/rfd.png'
import tnt from '../../assets/expIcon/tnt.png'
import tt from '../../assets/expIcon/tt.png'
import ups from '../../assets/expIcon/ups.png'
import wpt from '../../assets/expIcon/wpt.png'
import yt from '../../assets/expIcon/yt.png'
import zjs from '../../assets/expIcon/zjs.png'
import st from '../../assets/expIcon/st.png'
import jbd from '../../assets/expIcon/jbd.png'
import fxd from '../../assets/expIcon/fxd.png'
import dhl from '../../assets/expIcon/dhl.png'
import fedEx from '../../assets/expIcon/fedEx.png'
import us from '../../assets/expIcon/us.png'
import qy from '../../assets/expIcon/qy.png'
import ems from '../../assets/expIcon/ems.png'
import pj from '../../assets/expIcon/pj.png'
import gtkd from '../../assets/expIcon/gtkd.png'
import dbkd from '../../assets/expIcon/dbkd.png'
import bsht from '../../assets/expIcon/bsht.png'
import sn from '../../assets/expIcon/sn.png'
import sekd from '../../assets/expIcon/sekd.png'
import ydkd from '../../assets/expIcon/ydkd.png'
import sf from '../../assets/expIcon/sf.png'
import zt from '../../assets/expIcon/zt.png'
import xx from '../../assets/expIcon/xx.png'
import zgyz from '../../assets/expIcon/zgyz.png'

const {Option}=Select;
const ListItem = List.Item;
const ListItemMeta = List.Item.Meta;

@connect(({express}) => {
  const {expressList,compList}=express;
  return{
    expressList,
    compList,
  }
})

export default class ExpressBox extends Component{
  state={
    current:"ExpressNetwork", //默认选择项
    infoVisible:false, //窗口显示
    compNo:null,
    compNa:null,
    statName:null,
    stateCode:null,
    address:null,
    contact:null,
    tel:null,
    boxNo:null,
    center:{
      longitude:117.20,
      latitude:39.12
    }
  };

  componentDidMount(){
    this.props.dispatch({
      type: 'express/expList'
    });
    this.props.dispatch({
      type: 'express/compList',
    });
  }

  showInfoVisible=(value)=>{
    // console.log("value",value);
    this.setState({
      infoVisible:true,
      compNo:value.compNo,
      compNa:value.compNa,
      statName:value.statName,
      stateCode:value.stateCode,
      address:value.address,
      contact:value.contact,
      tel:value.tel,
      boxNo:value.boxNo,
    })
  };

  closeInfoVisible=()=>{
    this.setState({
      infoVisible:false,
    })
  };

  handleClick = (e) => {
    // console.log('click ', e);
    this.setState({
      current: e.key,
    });
    if(e.key=='ExpressBox'){
      this.props.dispatch({
        type: 'express/expBoxList'
      });
    }else if(e.key=='PostalNetwork'){
      this.props.dispatch({
        type: 'express/postList'
      });
    }else if(e.key=='PostboxManage'){
      this.props.dispatch({
        type: 'express/postBoxList'
      });
    }else if(e.key=='ExpressNetwork'){
      this.props.dispatch({
        type: 'express/expList'
      });
    }
    this.setState({
      infoVisible:false,
    })
  };

  selectChange=(value)=>{
    const {current}=this.state;
    if(current=="ExpressNetwork"){
      this.props.dispatch({
        type: 'express/expList',
        payload:{
          compNo:value
        }
      });
    }else if(current=="ExpressBox"){
      this.props.dispatch({
        type: 'express/expBoxList',
        payload:{
          compNo:value
        }
      });
    }

  };

  renderMarkerLayout(extData){
    // console.log("extData",extData);
    if(extData.compNo=="BSHT"){ //百世
      return <img src={bsht} alt="" style={{width:34}} />
    }else if(extData.compNo=="APEX"){ //全一
      return <img src={qy} alt="" style={{width:34}} />
    }else if(extData.compNo=="PJ"){ // 品骏
      return <img src={pj} alt="" style={{width:34}} />
    }else if(extData.compNo=="EMS"){ //EMS
      return <img src={ems} alt="" style={{width:34}} />
    }else if(extData.compNo=="SF"){ //顺丰
      return <img src={sf} alt="" style={{width:34}} />
    }else if(extData.compNo=="UC"){ //优速
      return <img src={us} alt="" style={{width:34}} />
    }else if(extData.compNo=="DHL"){ //DHL
      return <img src={dhl} alt="" style={{width:34}} />
    }else if(extData.compNo=="SUNING"){ //苏宁
      return <img src={sn} alt="" style={{width:34}} />
    }else if(extData.compNo=="YUNDA"){ //韵达
      return <img src={ydkd} alt="" style={{width:34}} />
    }else if(extData.compNo=="SUR"){ //速尔
      return <img src={sekd} alt="" style={{width:34}} />
    }else if(extData.compNo=="DEPPON"){ //德邦
      return <img src={dbkd} alt="" style={{width:34}} />
    }else if(extData.compNo=="FEDEX"){ //FEDEX
      return <img src={fedEx} alt="" style={{width:34}} />
    }else if(extData.compNo=="ZTO"){ //中通
      return <img src={zt} alt="" style={{width:34}} />
    }else if(extData.compNo=="BSHT"){ //百世汇通
      return <img src={bsht} alt="" style={{width:34}} />
    }else if(extData.compNo=="GTO"){ //国通
      return <img src={gtkd} alt="" style={{width:34}} />
    }else if(extData.compNo=="ANE"){ //安能
      return  <img src={an} alt="" style={{width:34}} />
    }else if(extData.compNo=="JINLINBAO"){ //近邻宝
      return  <img src={jlb} alt="" style={{width:34}} />
    }else if(extData.compNo=="KYE"){ //跨越
      return  <img src={ky} alt="" style={{width:34}} />
    }else if(extData.compNo=="CAE"){ //民航
      return  <img src={mhkd} alt="" style={{width:34}} />
    }else if(extData.compNo=="RUFENGDA"){ //如风达
      return  <img src={rfd} alt="" style={{width:34}} />
    }else if(extData.compNo=="TNT"){ //TNT
      return  <img src={tnt} alt="" style={{width:34}} />
    }else if(extData.compNo=="TTKD"){ //天天
      return  <img src={tt} alt="" style={{width:34}} />
    }else if(extData.compNo=="UPS"){ //UPS
      return  <img src={ups} alt="" style={{width:34}} />
    }else if(extData.compNo=="VTEPAI"){ //微特派
      return  <img src={wpt} alt="" style={{width:34}} />
    }else if(extData.compNo=="YTO"){ //圆通
      return  <img src={yt} alt="" style={{width:34}} />
    }else if(extData.compNo=="ZJS"){ //宅急送
      return  <img src={zjs} alt="" style={{width:34}} />
    }else if(extData.compNo=="STO"){ //申通
      return  <img src={st} alt="" style={{width:34}} />
    }else if(extData.compNo=="JBD"){ //京邦达
      return  <img src={jbd} alt="" style={{width:34}} />
    }else if(extData.compNo=="FEIXUNDA"){ //飞讯达
      return  <img src={fxd} alt="" style={{width:34}} />
    }else if(extData.compNo=="ZGYZ"){ //邮政
      return  <img src={zgyz} alt="" style={{width:34}} />
    }else{
      return <img src={xx} alt="" style={{width:34}} />
    }
  }

  getExpress=(value)=>{
    // console.log("value",value);
    let expressdata=[];
    value.map((item)=>{
      let express={};
      express.position= [item.longitude,item.latitude];
      express.address=item.address;
      express.compNa=item.compNa;
      express.compNo=item.compNo;
      express.contact=item.contact;
      express.statName=item.statName;
      express.stateCode=item.stateCode;
      express.tel=item.tel;
      express.boxNo=item.boxNo;
      expressdata.push(express)
    });
    return expressdata
  };

  showTip = ()=>{
    return (
      <Card bordered={false} className={this.state.current=="PostalNetwork" || this.state.current=="PostboxManage"?styles.infoTip1:styles.infoTip}>
        <Row>
          <List>
            <ListItem>
              <ListItemMeta
                title="网点编号"
                description={this.state.stateCode}
              />
            </ListItem>
            <ListItem>
              <ListItemMeta
                title="网点名称"
                description={this.state.statName}
              />
            </ListItem>
            <ListItem>
              <ListItemMeta
                title="网点地址"
                description={this.state.address}
              />
            </ListItem>
            <ListItem>
              <ListItemMeta
                title="网点联系人"
                description={this.state.contact}
              />
            </ListItem>
            <ListItem>
              <ListItemMeta
                title="联系电话"
                description={this.state.tel}
              />
            </ListItem>
          </List>
        </Row>
      </Card>
    );
  };

  showTip1 = ()=>{
    return (
      <Card bordered={false} className={styles.infoTip1}>
        <Row>
          <List>
            <ListItem>
              <ListItemMeta
                title="邮箱编号"
                description={this.state.boxNo}
              />
            </ListItem>
            <ListItem>
              <ListItemMeta
                title="邮箱地址"
                description={this.state.address}
              />
            </ListItem>
            <ListItem>
              <ListItemMeta
                title="邮箱联系人"
                description={this.state.contact}
              />
            </ListItem>
            <ListItem>
              <ListItemMeta
                title="联系电话"
                description={this.state.tel}
              />
            </ListItem>
          </List>
        </Row>
      </Card>
    );
  };

  markerEvents={ //坐标事件
    click:(e, marker) => {
      // console.log("1111")
      // console.log("e",e);
      // console.log("marker",marker.F.extData);
      this.showInfoVisible(marker.F.extData)
    },

    // mouseout:(e, marker) => {
    //   // console.log("2222")
    //   // console.log("e",e);
    //   // console.log("marker",marker.F.extData);
    //   this.setInfoVisible();
    // },
  };

  events = {
    click: () => {
      this.setState({
        infoVisible:false,
      })
    },
  };

  renderMap=(center)=>{
    const expressdata=this.getExpress(this.props.expressList);
    const children = this.props.compList.map((item) => {
      return <Option key={item.compNo} value={item.compNo}>{item.compNa}</Option>;
    });
    return(
      <Row style={{marginTop:20}} id="expSelect">
        {this.state.current=="ExpressNetwork" || this.state.current=="ExpressBox"? <Card className={styles.leftCard}>
          <Select defaultValue={null} style={{ width: '100%'}} onChange={this.selectChange}>
            <Option key={null} value={null}>全部</Option>
            {children}
          </Select>
        </Card>:null}
        <div id="container" className={styles.amapDiv}>
          <Map
            className={styles.amap}
            zoom={8}
            center={center}
            events={this.events}
            plugins={['ToolBar']}
          >
            {this.state.infoVisible ? (this.state.current=="PostboxManage" ? this.showTip1() : this.showTip()): null}
            <Markers
              events={this.markerEvents}
              useCluster={true}
              markers={expressdata}
              render={this.renderMarkerLayout}
            />
          </Map>
        </div>
      </Row>
    )
  };

  render(){
    return (
      <Card className={styles.wrap}>
        <Row>
          <Menu
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal"
          >
            <Menu.Item key="ExpressNetwork">
              快递网点查询
            </Menu.Item>
            <Menu.Item key="ExpressBox">
              快件箱查询
            </Menu.Item>
            <Menu.Item key="PostalNetwork">
              邮政网点查询
            </Menu.Item>
            <Menu.Item key="PostboxManage">
              信筒信息
            </Menu.Item>
          </Menu>
        </Row>
        {this.renderMap(this.state.center)}
      </Card>
    );
  }
}

//
// const expressNetwork=(
//   <Row style={{marginTop:30}} id="expSelect">
//     <Card className={styles.leftCard}>
//       <Select defaultValue={null} style={{ width: '100%'}} onChange={this.selectChange}>
//         <Option key={null} value={null}>全部</Option>
//         {children}
//       </Select>
//     </Card>
//     <div id="container" className={styles.amapDiv}>
//       <Map
//         className={styles.amap}
//         zoom={8}
//         // center={{
//         //   longitude:117.20,
//         //   latitude:39.12
//         // }}
//         plugins={['ToolBar']}
//       >
//         {this.state.infoVisible ? this.showTip() : null}
//         <Markers
//           events={this.markerEvents}
//           useCluster={true}
//           markers={expressdata}
//           render={this.renderMarkerLayout}
//         />
//       </Map>
//     </div>
//   </Row>
// );
//
// const postNetwork=(
//   <Row style={{marginTop:30}}>
//     <div id="container" className={styles.amapDiv}>
//       <Map
//         className={styles.amap}
//         zoom={8}
//         // center={{
//         //   longitude:117.20,
//         //   latitude:39.12
//         // }}
//         plugins={['ToolBar']}
//       >
//         {this.state.infoVisible ? (this.state.current=="PostboxManage"?this.showTip1():this.showTip()) : null}
//         <Markers
//           events={this.markerEvents}
//           useCluster={true}
//           markers={expressdata}
//           render={this.renderMarkerLayout}
//         />
//       </Map>
//     </div>
//   </Row>
// );
