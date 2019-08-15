/**
 * 图标数据1
 */
var WebSocketServer = require('ws').Server,
  wss = new WebSocketServer({ port: 9900 });

let cloths=[[14,32,13,45,60,17,32],[79,45,32,31,65,21,7],[98,34,11,9,7,5,55],[88,65,74,25,5,6,7],[4,32,65,45,60,34,32],[79,6,32,27,65,7,21],[12,61,11,9,7,55,5]];
let shoes=[[4,32,65,45,60,34,32],[79,6,32,27,65,7,21],[12,61,11,9,7,55,5],[51,7,12,25,5,11,33],[14,32,13,45,60,17,32],[79,45,32,31,65,21,7],[98,34,11,9,7,5,55]];
let arr={};
arr.cloths=cloths;
arr.shoes=shoes;

wss.on('connection', function(ws) {
  ws.send(JSON.stringify(arr))
});


/**
 * 图标数据2
 */
var WebSocketServer1 = require('ws').Server,
  wss1 = new WebSocketServer1({ port: 9800 });

let arr1=[];

wss1.on('connection', function(ws1) {
  setInterval(()=>{
    for(let i=0;i<14;i+=1) {
      arr1[i] = Math.ceil(Math.random() * 1000);
    }
    ws1.send(JSON.stringify(arr1))
  },5000);
});


/**
 * 图表数据3
 */

let bdp={};
bdp.xData=['2018-09-29', '2018-9-30', '2018-10-01', '2018-10-02', '2018-10-03', '2018-10-04', '2018-10-05','2018-10-06','2018-10-07','2018-10-08'];
bdp.series=[{name:'APEX',type: 'bar',data: [320, 332, 301, 334, 390, 334, 390, 77, 101, 99],markLine:{data: [{type: 'average', name: '平均值'}]}}];
var WebSocketServer2 = require('ws').Server,
  wss2 = new WebSocketServer2({ port: 9700 });

wss2.on('connection', function(ws1) {
  ws1.send(JSON.stringify(arr1))
});

/**
 * 视频
 */
var WebSocketServer3 = require('ws').Server,
  wss3 = new WebSocketServer3({ port: 9600 });

wss3.on('connection', function(ws) {
  ws.send(JSON.stringify("rtsp://184.72.239.149/vod/mp4://BigBuckBunny_175k.mov"))
});




