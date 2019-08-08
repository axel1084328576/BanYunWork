<template>
    <div class="map_detail">
        <div class="left">
            <date :title="title" :isIndex="false"></date>
            <div class="middle">
                <div class="title">企业人员排名</div>
                <table-list :showType="false" :url="rankingUrl"></table-list>
            </div>
        </div>
        <div class="center">
            <div class="top">
                <div class="t">
                    <ul>
                        <li>
                            <p>累计业务量统计</p>
                            <span>87,134,083</span>
                        </li>
                        <li>
                            <p>累计业务量统计</p>
                            <span>12,52,621</span>
                        </li>
                        <li>
                            <p>累计业务量统计</p>
                            <span>35,992,513</span>
                        </li>
                        <li>
                            <p>累计业务量统计</p>
                            <span>17,52,739</span>
                        </li>
                    </ul>
                </div>
                <div class="b">
                    <div class="l">
                        <h1>数据日期：2019年5月21日</h1>
                        <h2>网点数量：<span>4738</span>个</h2>
                    </div>
                    <ul>
                        <li>
                            <p>武清区<i>揽收总量</i></p>
                            <span>38,203,512</span>
                        </li>
                        <li>
                            <p>武清区<i>投递总量</i></p>
                            <span>12,532,421</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="middle" id="container">
                <!-- <el-amap class="amap-box" :vid="'amap-vue'"></el-amap> -->
            </div>
        </div>
        <div class="right">
            <div class="top">
                <div class="title">妥投率</div>
                <table-list :showType="false" :url="rateUrl"></table-list>
            </div>
            <div class="bottom">
                <div class="title">区域流量排名</div>
                <table-list :showType="false" :url="flowUrl"></table-list>
            </div>
        </div>
    </div>
</template>
<script>
import TableList from '@/components/TableList'
import Date from '@/components/Date'

export default {
    data() {
        return {
            showType:false,
            //title: '武清区业务量监控',
            rankingUrl: 'http://rap2api.taobao.org/app/mock/223607/map/ranking',
            rateUrl: 'http://rap2api.taobao.org/app/mock/223607/map/rate',
            flowUrl: 'http://rap2api.taobao.org/app/mock/223607/map/flow',
            data:[]
        }
    },
    mounted() {
        this.setMap()
    },
    computed: {
        title() {
            return this.$route.query.name
        }
    },
    components: {
        TableList,
        Date
    },
    
    mounted :function(){
        var map = new AMap.Map('container', {
            zoom: 9
        });

        function initPage(DistrictCluster, PointSimplifier, $) {
            var pointSimplifierIns = new PointSimplifier({
                map: map, //所属的地图实例
                autoSetFitView: false, //禁止自动更新地图视野
                zIndex: 110,
                getPosition: function(item) {
                    if (!item) {
                        return null;
                    }
                    var parts = item.split(',');
                    //返回经纬度
                    return [parseFloat(parts[0]), parseFloat(parts[1])];
                },
                getHoverTitle: function(dataItem, idx) {
                    return idx + ': ' + dataItem;
                },
                renderOptions: {
                    //点的样式
                    pointStyle: {
                        width: 6,
                        height: 6,
                        fillStyle:'rgba(153, 0, 153, 0.38)'
                    },
                    //鼠标hover时的title信息
                },
            });
            map.setCenter([117.313076,39.291917]);
            var distCluster = new DistrictCluster({
                zIndex: 100,
                map: map, //所属的地图实例
                topAdcodes: [120000],
                autoSetFitView: false,
                getPosition: function(item) {
                    if (!item) {
                        return null;
                    }
                    var parts = item.split(',');
                    //返回经纬度
                    return [parseFloat(parts[0]), parseFloat(parts[1])];
                }
            });
            window.distCluster = distCluster;
            function refresh() {
                var zoom = map.getZoom();
                //获取 pointStyle
                var pointStyle = pointSimplifierIns.getRenderOptions().pointStyle;
                //根据当前zoom调整点的尺寸
                pointStyle.width = pointStyle.height = 2 * Math.pow(1.2, map.getZoom() - 3);
            }
            map.on('zoomend', function() {
                refresh();
            });
            refresh();

            $.get('https://a.amap.com/amap-ui/static/data/10w.txt', function(csv) {
                // $('#loadingTip').remove();
                console.log(csv)
                var data = csv.split('\n');
                distCluster.setData(data);
                pointSimplifierIns.setData(data);
            });
        }

        console.log(123)
        

        //加载相关组件
        AMapUI.load(['ui/geo/DistrictCluster', 'ui/misc/PointSimplifier', 'lib/$'], function(DistrictCluster, PointSimplifier, $) {
            //启动页面
            initPage(DistrictCluster, PointSimplifier, $);
        });
    },
    
    methods:{
        getMapData(){
            this.$axios.get('http://rap2api.taobao.org/app/mock/223607/map/map').then(res => {
                //var data = csv.split('\n');
                console.log(res.data)
                this.data = res.data
                
                distCluster.setData(this.data)
                pointSimplifierIns.setData(this.data)
                this.setMap()
            }).catch(err => {    
                console.log(err)
            })
        },
        setMap(){
            
        }
    }
}


</script>
<style src="../assets/css/common.css"></style>
<style scoped>
.map_detail { height: 100%; }
.left { width: 25%; height: 100%; float: left;}
.left .top { width: 100%; height: 315px;float: left; }
.left .top h1 { color: #abdbf6; font-size: 38px; text-align: center; margin-top: 18%; }
.left .top h2 { color: #2d4ea0; font-size: 18px; text-align: center; margin-top: 10%; }
.left .top h2 span { margin-right: 20px; }
.left .top a { width: 138px; height: 28px; background: url(../assets/images/index/images/back.png); background-size: 100% 100%; display: block; margin: 50px; }
.left .middle { padding: 10px; }
.left .middle .title { width: 148px; height: 50px; line-height: 50px; text-align: center; background: url(../assets/images/index/images/title.png); float: left;
color: #fff; font-size: 18px; }
.left .middle table { width: 100%; height: 79%; margin-top: 10px; float: left; }
.left .middle table td { font-size: 14px; color: #fff; }
.left .middle table tr { height: 28px; }
.left .middle table tr td:last-child { color: #62bb82; }
.left .middle table tr td:nth-child(1),.left .middle table tr td:nth-child(3) { width: 20%; text-align: center; }
.left .middle table tr td span { width: 100%; height: 12px; background: #161a3c; display: block; border-radius: 6px;
overflow: hidden; }
.left .middle table tr td span i { width: 0%; background: #62bb82; display: block; height: 100%; border-radius: 0 6px 6px 0; }
.left .middle table tr:nth-child(1) td,.left .middle table tr:nth-child(2) td,.left .middle table tr:nth-child(3) td { color: #f19d3a; }
.left .middle table tr:nth-child(1) i,.left .middle table tr:nth-child(2) i,.left .middle table tr:nth-child(3) i { background: #f19d3a; }

.center { width: 50%; height: 100%; float: left; }
.center .top { width: 100%; height: 310px; float: left; }
.center .top .t ul { width: 100%; height: 85px; margin-top: 50px; }
.center .top .t ul li { width: 25%; height: 85px; float: left; }
.center .top .t ul li p { width: 100%; height: 35px; line-height: 35px; text-align: center; font-size: 18px;
color: #f19d3a; margin-top: 7px; }
.center .top .t ul li span { width: 100%; height: 35px; line-height: 35px; text-align: center; font-size: 18px;
color: #f19d3a; display: block; }
.center .top .t ul li:first-child p,.center .top .t ul li:first-child span { color: #3eb9f7; }
.center .top .t ul li:first-child { background: url(../assets/images/index/images/line2.png) center right no-repeat;
background-size: auto 100%; }
.center .top .b { margin-top: 60px; }
.center .top .b .l { float: left; }
.center .top .b .l h1 { color: #fff; font-size: 18px; height: 40px; margin-top: 0; }
.center .top .b .l h2 { color: #fff; font-size: 18px; height: 40px; margin-top: 0; }
.center .top .b .l h2 span { color: #f19d3a; font-size: 24px; }
.center .top .b ul { width: 450px; height: 80px; float: right; }
.center .top .b ul li { width: 50%; height: 85px; float: left; }
.center .top .b ul li p { width: 100%; height: 35px; line-height: 35px; text-align: center; font-size: 18px;
color: #50aee3; }
.center .top .b ul li i { color: #fff; }
.center .top .b ul li span { width: 100%; height: 35px; line-height: 35px; text-align: center; font-size: 30px;
color: #50aee3; display: block; }
.center .middle { width: 100%; height: 700px; float: left; }


.right { width: 25%; height: 100%; float: left; }
.right .top { height: 50% !important; }
.right .top,.right .bottom { width: 100%; height: 40%; padding: 10px; }
.right .top .title,.right .bottom .title {width: 148px; height: 50px; line-height: 50px; text-align: center; background: url(../assets/images/index/images/title.png);
color: #fff; font-size: 18px;
}
.right .bottom .title { float: left; }
.right .top table { width: 100%; height: 79%; margin-top: 10px; float: left; }
.right .top table td { font-size: 14px; color: #fff; }
.right .top table tr { height: 22px; }
.right .top table tr td:last-child { color: #62bb82; }
.right .top table tr td:nth-child(1),.right .top table tr td:nth-child(3) { width: 20%; text-align: center; }
.right .top table tr td span { width: 100%; height: 12px; background: #161a3c; display: block; border-radius: 6px;
overflow: hidden; }
.right .top table tr td span i { width: 0%; background: #62bb82; display: block; height: 100%; border-radius: 0 6px 6px 0; }
.right .top table tr:nth-child(1) td,.right .top table tr:nth-child(2) td,.right .top table tr:nth-child(3) td { color: #f19d3a; }
.right .top table tr:nth-child(1) i,.right .top table tr:nth-child(2) i,.right .top table tr:nth-child(3) i { background: #f19d3a; }

.right .bottom table { width: 100%; height: 79%; margin-top: 10px; float: left; }
.right .bottom table td { font-size: 14px; color: #fff; }
.right .bottom table tr {  height: 22px; }
.right .bottom table tr td:last-child { color: #62bb82; }
.right .bottom table tr td:nth-child(1),.right .bottom table tr td:nth-child(3) { width: 20%; text-align: center; }
.right .bottom table tr td span { width: 100%; height: 12px; background: #161a3c; display: block; border-radius: 6px;
overflow: hidden; }
.right .bottom table tr td span i { width: 0%; background: #62bb82; display: block; height: 100%; border-radius: 0 6px 6px 0; }
.right .bottom table tr:nth-child(1) td,.right .bottom table tr:nth-child(2) td,.right .bottom table tr:nth-child(3) td { color: #f19d3a; }
.right .bottom table tr:nth-child(1) i,.right .bottom table tr:nth-child(2) i,.right .bottom table tr:nth-child(3) i { background: #f19d3a; }

</style>
