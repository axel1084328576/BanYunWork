import React from 'react';
import {connect} from 'dva';
import CarTraceMap from '@/components/CarManage/CarMonitorTrace/CarTraceMap';

@connect(({carmonitortrace}) => {
  const {carList,mapList}=carmonitortrace;
  return{
    carList,
    mapList,
  }
})

export default class Amap extends React.Component{
  // componentWillMount(){
  // const {dispatch}=this.props;
  //   this.inval1=setInterval(()=>{
  //     dispatch({
  //       type:'carmonitortrace/carData',
  //       payload:{
  //         token:sessionStorage.getItem('sys-token'),
  //       },
  //     });
  //   },5000);
  //
  //   this.inval2=setInterval(()=>{
  //     dispatch({
  //       type:'carmonitortrace/carMapData',
  //       payload:{
  //         token:sessionStorage.getItem('sys-token'),
  //         deviceCode:"car001",
  //       },
  //     });
  //   },5000);
  // }
  //
  // componentDidMount () {
  //   let markerList=[];
  //   let path=[];
  //   let AMap=window.AMap;
  //   let AMapUI=window.AMapUI;
  //   let map = new AMap.Map('container', {
  //     zoom:8,//级别
  //     center: [117.20, 39.12],//中心点坐标
  //     // viewMode:'3D'//使用3D视图
  //   });
  //
  //   console.log("this.props.carList",this.props.carList);
  //   this.props.carList.map((item)=>{
  //     let marker = new AMap.Marker({
  //       position: new AMap.LngLat(item.longitude,item.latitude),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
  //     });
  //     markerList.push(marker)
  //   });
  //   map.add(markerList);
  //
  //   const {mapList}=this.props;
  //   for(let i=0;i<mapList.length;i++){
  //     path.push(new AMap.LngLat(mapList[i].longitude,mapList[i].latitude))
  //   }
  //   // value.map((item)=>{
  //   //   path.push(new AMap.LngLat(item.longitude,item.latitude))
  //   // });
  //   // console.log("path",path);
  //   let polyline = new AMap.Polyline({
  //     path: path,
  //     borderWeight: 3, // 线条宽度，默认为 1
  //     strokeColor: 'black', // 线条颜色
  //     lineJoin: 'round' // 折线拐点连接处样式
  //   });
  //   map.add(polyline);
  //
  //   // AMapUI.load(['ui/misc/PathSimplifier', 'lib/$'], (PathSimplifier, $)=>{
  //   //   if (!PathSimplifier.supportCanvas) {
  //   //     alert('当前环境不支持 Canvas！');
  //   //     return;
  //   //   }
  //   //
  //   //   //just some colors
  //   //   let colors = [
  //   //     "#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00",
  //   //     "#b82e2e", "#316395", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300", "#8b0707",
  //   //     "#651067", "#329262", "#5574a6", "#3b3eac"
  //   //   ];
  //   //
  //   //   let pathSimplifierIns = new PathSimplifier({
  //   //     zIndex: 100,
  //   //     //autoSetFitView:false,
  //   //     map: map, //所属的地图实例
  //   //
  //   //     getPath: (pathData, pathIndex)=>{
  //   //       // console.log("pathData",pathData);
  //   //       // console.log("pathIndex",pathIndex);
  //   //       return pathData.path;
  //   //     },
  //   //     getHoverTitle:(pathData, pathIndex, pointIndex)=>{
  //   //       // console.log("pathData",pathData);
  //   //       // console.log("pathIndex",pathIndex);
  //   //       // console.log("pointIndex",pointIndex);
  //   //       if (pointIndex >= 0) {
  //   //         //point
  //   //         return pathData.name + '，点：' + pointIndex + '/' + pathData.path.length;
  //   //       }
  //   //
  //   //       return pathData.name + '，点数量' + pathData.path.length;
  //   //     },
  //   //     renderOptions: {
  //   //       pathLineStyle: {
  //   //         dirArrowStyle: true
  //   //       },
  //   //       getPathStyle:(pathItem, zoom)=>{
  //   //         // console.log("pathItem",pathItem);
  //   //         // console.log("zoom",zoom);
  //   //         let color = colors[pathItem.pathIndex % colors.length],
  //   //           lineWidth = Math.round(4 * Math.pow(1.1, zoom - 3));
  //   //
  //   //         return {
  //   //           pathLineStyle: {
  //   //             strokeStyle: color,
  //   //             lineWidth: lineWidth
  //   //           },
  //   //           pathLineSelectedStyle: {
  //   //             lineWidth: lineWidth + 2
  //   //           },
  //   //           pathNavigatorStyle: {
  //   //             fillStyle: color
  //   //           }
  //   //         };
  //   //       }
  //   //     }
  //   //   });
  //   //   // console.log("this.props.car",this.props.car);
  //   //   window.pathSimplifierIns = pathSimplifierIns;
  //   //   pathSimplifierIns.setData(this.props.car);
  //   //   //initRoutesContainer(d);
  //   //   function onload() {
  //   //     pathSimplifierIns.renderLater();
  //   //   }
  //   //   function onerror(e) {
  //   //     alert('图片加载失败！');
  //   //   }
  //   //   // $('<div id="loadingTip">加载数据，请稍候...</div>').appendTo(document.body);
  //   //   //
  //   //   $.getJSON('https://a.amap.com/amap-ui/static/data/big-routes.json', (d)=> {
  //   //     console.log("d", d);
  //   //   })
  //   //   //   //
  //   //   //   $('#loadingTip').remove();
  //   //   //
  //   //   //   let flyRoutes = [];
  //   //   //
  //   //   //   for (let i = 0, len = d.length; i < len; i++) {
  //   //   //     if (d[i].name.indexOf('乌鲁木齐') >= 0) {
  //   //   //       d.splice(i, 0, {
  //   //   //         name: '飞行 - ' + d[i].name,
  //   //   //         path: PathSimplifier.getGeodesicPath(
  //   //   //           d[i].path[0], d[i].path[d[i].path.length - 1], 100)
  //   //   //       });
  //   //   //       i++;
  //   //   //       len++;
  //   //   //     }
  //   //   //   }
  //   //   //
  //   //   //   d.push.apply(d, flyRoutes);
  //   //   //   pathSimplifierIns.setData(d);
  //   //   //   //initRoutesContainer(d);
  //   //   //   function onload() {
  //   //   //     pathSimplifierIns.renderLater();
  //   //   //   }
  //   //   //   function onerror(e) {
  //   //   //     alert('图片加载失败！');
  //   //   //   }
  //   //   //   //创建一个巡航器
  //   //   //   let navg0 = pathSimplifierIns.createPathNavigator(1, {
  //   //   //     loop: true, //循环播放
  //   //   //     speed: 500000
  //   //   //   });
  //   //   //   navg0.start();
  //   //   //
  //   //   //   let navg1 = pathSimplifierIns.createPathNavigator(0, {
  //   //   //     loop: true,
  //   //   //     speed: 1000000,
  //   //   //     pathNavigatorStyle: {
  //   //   //       width: 24,
  //   //   //       height: 24,
  //   //   //       //使用图片
  //   //   //       content: PathSimplifier.Render.Canvas.getImageContent('./imgs/plane.png', onload, onerror),
  //   //   //       strokeStyle: null,
  //   //   //       fillStyle: null,
  //   //   //       //经过路径的样式
  //   //   //       pathLinePassedStyle: {
  //   //   //         lineWidth: 6,
  //   //   //         strokeStyle: 'black',
  //   //   //         dirArrowStyle: {
  //   //   //           stepSpace: 15,
  //   //   //           strokeStyle: 'red'
  //   //   //         }
  //   //   //       }
  //   //   //     }
  //   //   //   });
  //   //   //   navg1.start();
  //   //   //
  //   //   //   let navg2 = pathSimplifierIns.createPathNavigator(7, {
  //   //   //     loop: true,
  //   //   //     speed: 500000,
  //   //   //     pathNavigatorStyle: {
  //   //   //       width: 16,
  //   //   //       height: 32,
  //   //   //       content: PathSimplifier.Render.Canvas.getImageContent('./imgs/car.png', onload, onerror),
  //   //   //       strokeStyle: null,
  //   //   //       fillStyle: null
  //   //   //     }
  //   //   //   });
  //   //   //   navg2.start();
  //   //   //
  //   //   //   let navg3 = pathSimplifierIns.createPathNavigator(5, {
  //   //   //     loop: true,
  //   //   //     speed: 500000,
  //   //   //     pathNavigatorStyle: {
  //   //   //       autoRotate: false, //禁止调整方向
  //   //   //       pathLinePassedStyle: null,
  //   //   //       width: 24,
  //   //   //       height: 24,
  //   //   //       content: PathSimplifier.Render.Canvas.getImageContent('./imgs/car-front.png', onload, onerror),
  //   //   //       strokeStyle: null,
  //   //   //       fillStyle: null
  //   //   //     }
  //   //   //   });
  //   //   //   navg3.start();
  //   //   // });
  //   //
  //   //   // let trafficLayer = new AMap.TileLayer.Traffic({
  //   //   //   zIndex: 10
  //   //   // });
  //   //   // map.add(trafficLayer);
  //   // })
  // };
  //
  // componentWillUnmount(){
  //   clearInterval(this.inval1);
  //   clearInterval(this.inval2);
  // }
  //
  // // state={
  // //   data: {
  // //     "nodes": [
  // //       { "id": "foo", "name": "foo" },
  // //       { "id": "bar", "name": "bar" },
  // //       { "id": "foo1", "name": "foo1" },
  // //       { "id": "bar1", "name": "bar1" },
  // //       { "id": "foo2", "name": "foo2" },
  // //       { "id": "bar2", "name": "bar2" },
  // //       { "id": "foo3", "name": "foo3" },
  // //       { "id": "bar3", "name": "bar3" },
  // //       { "id": "foo4", "name": "foo4" },
  // //       { "id": "bar4", "name": "bar4" },
  // //       { "id": "foo5", "name": "foo5" },
  // //       { "id": "bar5", "name": "bar5" },
  // //     ],
  // //     "edges": [
  // //       { "source": "foo", "target": "bar" },
  // //       { "source": "bar", "target": "foo1" },
  // //       { "source": "foo1", "target": "bar1" },
  // //       { "source": "bar1", "target": "foo2" },
  // //       { "source": "foo2", "target": "bar2" },
  // //       { "source": "bar2", "target": "foo3" },
  // //       { "source": "foo3", "target": "bar3" },
  // //       { "source": "bar3", "target": "foo4" },
  // //       { "source": "foo4", "target": "bar4" }
  // //     ],
  // //   }
  // // };
  // //
  // //
  // // componentDidMount(){
  // //   const {data}=this.state;
  // //   let nodes=data.nodes;
  // //   let edges=data.edges;
  // //   jsPlumbToolkit.ready(()=>{
  // //     let toolkit = jsPlumbToolkit.newInstance({
  // //       data: this.state.data
  // //     });
  // //     let renderer = toolkit.render({
  // //       container:"container",
  // //       layout:{
  // //         type:"Balloon"
  // //       },
  // //       view:{
  // //         nodes,
  // //         edges,
  // //       }
  // //     });
  // //   });
  // //
  // // }

  render(){
    return(
      <div></div>
    )
  }
}
{/*<div id="container" style={{width:'100%',height: '80vh'}}></div>*/}