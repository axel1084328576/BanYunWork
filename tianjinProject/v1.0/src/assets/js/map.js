alert(1);

//创建地图
var map = new AMap.Map('container', {
    zoom: 9
});
map = new AMap.Map('container', {
  center: [116.397428, 39.90923],
  resizeEnable: true,
  zoom: 10
})
AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {
  map.addControl(new AMap.ToolBar())
  map.addControl(new AMap.Scale())
})
