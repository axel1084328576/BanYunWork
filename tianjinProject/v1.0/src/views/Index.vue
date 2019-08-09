<template>
  <div class="index-layer">
    <div class="left">
      <date :title="title" :isIndex="true"></date>
      <div class="middle">
        <router-link class="title pointer" tag="div" to="/Intelligence">智能快件箱</router-link>
        <h1>
          总柜数
          <span>
            <em>{{courierBoxData.total}}</em>
            <i>个</i>
          </span>
        </h1>
        <h2>
          <span>当前柜数</span>
          <span>
            <p>
              <i :style="{width: courierBoxData.liyonglv + '%'}"></i>
            </p>
          </span>
          <span>
            <em>{{courierBoxData.usetotal}}</em>
            <!-- <i>个</i> -->
          </span>
        </h2>
        <ul>
          <li>
            <h2>
              {{courierBoxData.delivertotal}}
              <span>件</span>
            </h2>
            <h3>入柜量</h3>
          </li>
          <li>
            <h2>
              {{courierBoxData.successtotal}}
              <span>件</span>
            </h2>
            <h3>出柜量</h3>
          </li>
          <li>
            <h2>
              {{courierBoxData.liyonglv}}
              <span>%</span>
            </h2>
            <h3>利用率</h3>
          </li>
        </ul>
      </div>
      <div class="bottom">
        <div class="title">企业投递TOP3</div>
        <p>
          <span>中通快递</span>
          <i>{{top3Data.zhongtong}}件</i>
        </p>
        <p>
          <span>圆通快递</span>
          <i>{{top3Data.yuantong}}件</i>
        </p>
        <p>
          <span>申通快递</span>
          <i>{{top3Data.shentong}}件</i>
        </p>
      </div>
    </div>
    <div class="center">
      <div class="top">
        <div class="title">区域详细业务量</div>
        <table class="thead">
          <tr>
            <td>区域</td>
            <td>揽收（件）</td>
            <td>投递（件）</td>
            <td>实名（件）</td>
          </tr>
        </table>
        <div class="box">
          <table class="tbody" v-scroll>
            <tr v-for="(regional, index) in regionalTrafficData" :key="index">
              <td>{{regional.areaname}}</td>
              <td>{{regional.collectNum}}</td>
              <td>{{regional.deliverNum}}</td>
              <td>{{regional.realNameNum}}</td>
            </tr>
          </table>
        </div>
        <table class="tbottom">
          <tr>
            <td>合计</td>
            <td>{{regionalTrafficData.collectNumSum}}</td>
            <td>{{regionalTrafficData.deliverNumSum}}</td>
            <td>{{regionalTrafficData.realNameNumSum}}</td>
          </tr>
        </table>
      </div>
      <div class="middle">
        <router-link tag="div" class="title pointer" to="TotalMonitor">总业务量波动</router-link>
        <ul>
          <li
            :class="{'this': index == business.index}"
            v-for="(title, index) in business.titles"
            :key="index"
            @click="getBusinessData(index)"
          >{{title}}</li>
        </ul>
        <div id="main"></div>
      </div>
      <div class="bottom">
        <router-link tag="div" class="title pointer" to="flow">流量流向</router-link>
        <div class="circleChart circleChart6" id="circleChart6">
          <!-- <CircleProgress  
                    
                    :width="216"
                    :radius="12"
                    :progress="flowData[0]"
                    :isAnimation="true"
                    barColor="#43b9fd"
          ></CircleProgress>-->
          <vue-progress-bar
            :value="flowData[0]"
            :options="{radius:100,circleLineCap: 'round',varyStrokeArray: [10,12],pathColors: ['rgba(0, 0, 0, 0.3)', '#43b9fd'], rectWidth: 216, rectHeight: 216}"
          ></vue-progress-bar>
        </div>
        <div class="circleChart circleChart7" id="circleChart7">
          <!-- <CircleProgress  
                    
                    :width="175"
                    :radius="12"
                    :progress="flowData[1]"
                    :isAnimation="true"
                    barColor="#faa136"
          ></CircleProgress>-->
          <vue-progress-bar
            :value="flowData[1]"
            :options="{radius:80,circleLineCap: 'round',varyStrokeArray: [10,12],pathColors: ['rgba(0, 0, 0, 0.3)', '#faa136'], rectWidth: 175, rectHeight: 175}"
          ></vue-progress-bar>
        </div>
        <div class="circleChart circleChart8" id="circleChart8">
          <!-- <CircleProgress  
                    :width="135"
                    :radius="12"
                    :progress="flowData[2]"
                    :isAnimation="true"
                    barColor="#33ea94"
          ></CircleProgress>-->
          <vue-progress-bar
            :value="flowData[2]"
            :options="{radius:60,circleLineCap: 'round',varyStrokeArray: [10,12],pathColors: ['rgba(0, 0, 0, 0.3)', '#33ea94'], rectWidth: 135, rectHeight: 135}"
          ></vue-progress-bar>
        </div>
        <ul>
          <li>
            <i></i>
            <h1>省内流量</h1>
            <h2 class="number6">{{flowData[0]}}</h2>
            <h3>{{flowData[0]}}%</h3>
          </li>
          <li>
            <i></i>
            <h1>省内流量</h1>
            <h2 class="number7">{{flowData[1]}}</h2>
            <h3>{{flowData[1]}}%</h3>
          </li>
          <li>
            <i></i>
            <h1>省内流量</h1>
            <h2 class="number8">{{flowData[2]}}</h2>
            <h3>{{flowData[2]}}%</h3>
          </li>
        </ul>
      </div>
    </div>
    <div class="right">
      <div class="top">
        <div class="title">企业排行列表</div>

        <!-- <table class="thead">
          <tr>
            <td>区域</td>
            <td>揽收（件）</td>
            <td>投递（件）</td>
            <td>实名（件）</td>
          </tr>
        </table>
        <div class="box">
          <table class="tbody" v-scroll>
            <tr v-for="(regional, index) in regionalTrafficData" :key="index">
              <td>{{regional.areaname}}</td>
              <td>{{regional.collectNum}}</td>
              <td>{{regional.deliverNum}}</td>
              <td>{{regional.realNameNum}}</td>
            </tr>
          </table>
        </div>-->

        <table-list :showType="true" :url="tableUrl"></table-list>
      </div>
      <div class="middle">
        <router-link tag="div" class="title pointer" to="employees">从业人员</router-link>
        <ul>
          <li>
            <h1>全职员工</h1>
            <h2>
              {{employeesData.data1[0].number}}
              <span>万人</span>
            </h2>
            <h3>
              同比
              <span>
                <img src="../assets/images/index/images/icon1.png" alt />
                {{employeesData.data1[0].percentage}}%
              </span>
            </h3>
            <p>
              <span>行业平均值</span>
              <i>
                {{employeesData.data1[0].average}}
                <em>%</em>
              </i>
            </p>
          </li>
          <li>
            <h1>全职员工</h1>
            <h2>
              {{employeesData.data2[0].number}}
              <span>万人</span>
            </h2>
            <h3>
              同比
              <span>
                <img src="../assets/images/index/images/icon1.png" alt />
                {{employeesData.data2[0].percentage}}%
              </span>
            </h3>
            <p>
              <span>行业平均值</span>
              <i>
                {{employeesData.data2[0].average}}
                <em>%</em>
              </i>
            </p>
          </li>
          <li>
            <h1>全职员工</h1>
            <h2>
              {{employeesData.data3[0].number}}
              <span>万人</span>
            </h2>
            <h3>
              同比
              <span>
                <img src="../assets/images/index/images/icon1.png" alt />
                {{employeesData.data3[0].percentage}}%
              </span>
            </h3>
            <p>
              <span>行业平均值</span>
              <i>
                {{employeesData.data3[0].average}}
                <em>%</em>
              </i>
            </p>
          </li>
        </ul>
      </div>
      <div class="bottom">
        <router-link tag="div" class="title pointer" to="CarInfomation">车辆信息</router-link>
        <p>
          <span>
            车辆总数
            <i>
              {{carsData.carNum[0]}}
              <em>辆</em>
            </i>
          </span>
          <span>
            车辆总数
            <i>
              {{carsData.carNum[1]}}
              <em>辆</em>
            </i>
          </span>
        </p>
        <div id="main1"></div>
        <ul>
          <li>
            <i></i>
            <h1>小型车辆</h1>
            <h2 class="number9">{{carsData.carPercentage[0]}}</h2>
            <h3 class="number11">{{carsData.proportion[0]}}%</h3>
          </li>
          <li>
            <i></i>
            <h1>大型车辆</h1>
            <h2 class="number10">{{carsData.carPercentage[1]}}</h2>
            <h3 class="number12">{{carsData.proportion[1]}}%</h3>
          </li>
        </ul>
      </div>
    </div>
    <div class="map-top">
      <ul>
        <li>
          <h1>揽收总量</h1>
          <h2>635,622</h2>
        </li>
        <li>
          <h1>揽收总量</h1>
          <h2>958,145</h2>
        </li>
        <li>
          <h1>揽收总量</h1>
          <h2>896,110</h2>
        </li>
      </ul>
    </div>
    <div class="map">
      <div id="map" style="width: 100%;height:660px;"></div>
    </div>
    <div class="map-bottom">
      <div class="title">安检机</div>
      <div class="l">
        <div class="circleChart" id="circleChart3" style="height: 133px;">
          <!-- <CircleProgress  
                        :width="133"
                        :radius="12"
                        :progress="securityData[0]"
                        :isAnimation="true"
                        barColor="#43b9fd"
          ></CircleProgress>-->
          <vue-progress-bar
            :value="securityData[0]"
            :options="{radius:70,circleLineCap: 'round',varyStrokeArray: [10,12],pathColors: ['rgba(0, 0, 0, 0.3)', '#43b9fd'], rectWidth: 133, rectHeight: 133}"
          ></vue-progress-bar>
        </div>
        <p>
          <span class="number3">{{securityData[0]}}</span>
          <span>使用量</span>
        </p>
      </div>
      <div class="c">
        <div class="circleChart" id="circleChart4" style="height: 133px;">
          <!-- <CircleProgress  
                        :width="133"
                        :radius="12"
                        :progress="securityData[1]"
                        :isAnimation="true"
                        barColor="#33ea94"
          ></CircleProgress>-->
          <vue-progress-bar
            :value="securityData[1]"
            :options="{radius:70,circleLineCap: 'round',varyStrokeArray: [10,12],pathColors: ['rgba(0, 0, 0, 0.3)', '#33ea94'], rectWidth: 133, rectHeight: 133}"
          ></vue-progress-bar>
        </div>
        <p>
          <span class="number4">{{securityData[1]}}</span>
          <span>使用量</span>
        </p>
      </div>
      <div class="r">
        <div class="circleChart" id="circleChart5" style="height: 133px;">
          <!-- <CircleProgress  
                        :width="133"
                        :radius="12"
                        :progress="securityData[2]"
                        :isAnimation="true"
                        barColor="#faa136"
          ></CircleProgress>-->
          <vue-progress-bar
            :value="securityData[2]"
            :options="{radius:70,circleLineCap: 'round',varyStrokeArray: [10,12],pathColors: ['rgba(0, 0, 0, 0.3)', '#faa136'], rectWidth: 133, rectHeight: 133}"
          ></vue-progress-bar>
        </div>
        <p>
          <span class="number5">{{securityData[2]}}</span>
          <span>使用量</span>
        </p>
      </div>
      <!-- <div class="title">战备指挥</div>
            <div class="text">
                <p>
                    <span>战备人员总数</span>
                    <i>7,842,256<em>人</em></i>
                </p>
                <p>
                    <span>战备人员总数</span>
                    <i>7,842,256<em>人</em></i>
                </p>
                <p>
                    <span>战备人员总数</span>
                    <i>7,842,256<em>人</em></i>
                </p>
      </div>-->
    </div>
  </div>
</template>
<script>
import VueProgressBar from "svg-progress-bar";
let mapData = require("../assets/map/province/tianjin.json");
//接口地址
let host = "http://111.160.20.248:8090/maildatav";
import TableList from "@/components/TableList";
import Date from "@/components/Date";
import { stringify } from "querystring";
export default {
  data() {
    return {
      title: "天津市邮政管理局",
      //   tableUrl: "http://rap2api.taobao.org/app/mock/223607/index/list",
      tableUrl: host + "/api/front/comsortlist",
      courierBoxData: {},
      top3Data: {},
      regionalTrafficData: [],
      business: {
        index: 0,
        titles: ["揽收量", "投递量", "实名量"],
        data: {
          x: [],
          y: []
        }
      },
      flowData: [],
      carsData: {
        carNum: [0, 0],
        carPercentage: [0, 0],
        allPercentage: 0,
        proportion: ["0", "0"]
      },
      securityData: [],
      employeesData: {
        data1: [
          {
            number: 0,
            percentage: 0,
            average: 0
          }
        ],
        data2: [
          {
            number: 0,
            percentage: 0,
            average: 0
          }
        ],
        data3: [
          {
            number: 0,
            percentage: 0,
            average: 0
          }
        ]
      },
      maps: []
    };
  },
  mounted() {
    this.setBusinessEcharts();
    this.setCarsEcharts();
    // this.setMap()
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.$axios.defaults.headers["Content-Type"] =
        "application/x-www-form-urlencoded;charset=UTF-8";
      this.getCourierBoxData();
      this.getTop3Data();
      this.getRegionalTrafficData();
      this.getBusinessData(this.business.index);
      this.getFlowData();
      this.getCarsData();
      this.getSecurityData();
      this.getEmployeesData();
      this.getMapData();
    },
    //获取快递箱数据
    getCourierBoxData() {
      //   this.$axios.get('http://rap2api.taobao.org/app/mock/223607/index/intelligenceBox').then((res) => {
      //       let data = res.data
      //       if (data.code == '0') {
      //           this.courierBoxData = data.data
      //       }
      //   }).catch(err => {
      //       console.log(err)
      //   })
      let params = { requestid: "xcadadas" };
      let url = host + "/api/front/expressbox";
      this.$axios
        .post(url, params)
        .then(res => {
          let data = res.data;
          if (data.success == true) {
            this.courierBoxData = data.rows[0];
            this.courierBoxData.liyonglv =
              Math.floor(
                (this.courierBoxData.usetotal / this.courierBoxData.total) *
                  1000
              ) / 10;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取前三企业数据
    getTop3Data() {
      this.$axios
        .get("http://rap2api.taobao.org/app/mock/223607/index/top")
        .then(res => {
          let data = res.data;
          if (data.code == "0") {
            this.top3Data = data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取区域详细业务量数据
    getRegionalTrafficData() {
      // this.$axios
      //   .get("http://rap2api.taobao.org/app/mock/223607/index/detailedBusiness")
      //   .then(res => {
      //     let data = res.data;
      //     if (data.code == "0") {
      //       this.regionalTrafficData = data.data;
      //     }
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
      let params = { requestid: "xcadadas" };
      let url = host + "/api/front/areabusiness";
      this.$axios
        .post(url, params)
        .then(res => {
          let data = res.data;
          if (data.success == true) {
            this.regionalTrafficData = data.rows;
            this.regionalTrafficData.realNameNumSum = 1233124;
            this.regionalTrafficData.collectNumSum = 1233124;
            this.regionalTrafficData.deliverNumSum = 1233124;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取总业务量数据
    getBusinessData(type) {
      this.business.index = type;
      this.$axios
        .get("http://rap2api.taobao.org/app/mock/223607/index/wave", {
          params: {
            type: type
          }
        })
        .then(res => {
          let data = res.data;
          if (data.code == "0") {
            this.business.data.x = data.data[0].date;
            this.business.data.y = data.data[0].number;
            this.setBusinessEcharts();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取流量数据
    getFlowData() {
      this.$axios
        .get("http://rap2api.taobao.org/app/mock/223607/index/flow")
        .then(res => {
          let data = res.data;
          if (data.code == "0") {
            this.flowData = data.data.map(item => {
              return item.number;
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取车辆数据
    getCarsData() {
      this.$axios
        .get("http://rap2api.taobao.org/app/mock/223607/index/car")
        .then(res => {
          let data = res.data;
          if (data.code == "0") {
            this.carsData = data.data;
            this.carsData.allPercentage = parseInt(
              data.data.carPercentage[0] + data.data.carPercentage[1]
            );
            this.carsData.proportion = [
              (
                (data.data.carPercentage[0] / this.carsData.allPercentage) *
                100
              ).toFixed(2),
              (
                (data.data.carPercentage[1] / this.carsData.allPercentage) *
                100
              ).toFixed(2)
            ];
            this.setCarsEcharts();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取安检机数据
    getSecurityData() {
      this.$axios
        .get("http://rap2api.taobao.org/app/mock/223607/index/Security")
        .then(res => {
          let data = res.data;
          if (data.code == "0") {
            this.securityData = data.data.map(item => {
              return item;
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取从业人员数据
    getEmployeesData() {
      this.$axios
        .get("http://rap2api.taobao.org/app/mock/223607/indexEmployees")
        .then(res => {
          let data = res.data;
          if (data.code == "0") {
            this.employeesData = data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //地图数据
    getMapData() {
      this.$axios
        .get("http://rap2api.taobao.org/app/mock/223607/index/map")
        .then(res => {
          let data = res.data;
          if (data.code == "0") {
            data.data.forEach(data => {
              this.maps.push({
                name: data.name,
                value: data.val,
                selected: false
              });
            });
            this.setMap();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //初始化echarts  业务量
    setBusinessEcharts() {
      let myChart = this.$echarts.init(document.getElementById("main"));
      myChart.setOption({
        title: {
          textStyle: {
            color: "#989898",
            fontStyle: "normal",
            fontWeight: "bold",
            fontSize: 12
          }
        },
        tooltip: {
          show: false,
          trigger: "false",
          axisPointer: {
            type: "cross",

            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        color: ["#fff", "#fff"],
        legend: {
          data: ["订单总数"]
        },
        toolbox: {
          show: false,
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          top: "15%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: this.business.data.x,
            axisLine: {
              lineStyle: {
                type: "solid",
                color: "#009bff", // 左边线的颜色
                width: "1" // 坐标线的宽度
              }
            },
            splitLine: {
              //网格线
              show: true,
              lineStyle: {
                color: "#393f70",
                type: "solid",
                width: "1"
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                type: "solid",
                color: "#009bff", // 左边线的颜色
                width: "1" // 坐标线的宽度
              }
            },
            axisTick: {
              //y轴刻度线
              show: false
            },
            splitLine: {
              //网格线
              show: false
            }
          }
        ],
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            itemStyle: {
              normal: {
                //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 1,
                    color: "#112645" // 0% 处的颜色
                  },
                  {
                    offset: 0,
                    color: "#4da9dc" // 100% 处的颜色
                  }
                ]), //背景渐变色
                lineStyle: {
                  // 系列级个性化折线样式
                  width: 3,
                  type: "solid",
                  color: "#50aee3"
                }
              },
              emphasis: {
                color: "#50aee3",
                lineStyle: {
                  // 系列级个性化折线样式
                  width: 2,
                  type: "dotted",
                  color: "#50aee3" //折线的颜色
                }
              }
            }, //线条样式
            symbolSize: 5, //折线点的大小
            areaStyle: { normal: {} },
            data: this.business.data.y
          }
        ]
      });
    },
    //初始化车辆echarts
    setCarsEcharts() {
      var myChart = this.$echarts.init(document.getElementById("main1"));
      var option = {
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c} ({d}%)"
        },
        color: ["#43b9fd", "#faa136"],
        series: [
          {
            name: "车辆信息",
            type: "pie",
            radius: ["55%", "65%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: this.carsData.carPercentage[0], name: "小型车辆" },
              { value: this.carsData.carPercentage[1], name: "大型车辆" }
            ]
          }
        ]
      };
      myChart.setOption(option);
    },
    //初始化地图map
    setMap() {
      var that = this;

      //地图容器
      var chart = this.$echarts.init(document.getElementById("map"));
      //34个省、市、自治区的名字拼音映射数组
      var provinces = {
        //23个省
        台湾: "taiwan",
        河北: "hebei",
        山西: "shanxi",
        辽宁: "liaoning",
        吉林: "jilin",
        黑龙江: "heilongjiang",
        江苏: "jiangsu",
        浙江: "zhejiang",
        安徽: "anhui",
        福建: "fujian",
        江西: "jiangxi",
        山东: "shandong",
        河南: "henan",
        湖北: "hubei",
        湖南: "hunan",
        广东: "guangdong",
        海南: "hainan",
        四川: "sichuan",
        贵州: "guizhou",
        云南: "yunnan",
        陕西: "shanxi1",
        甘肃: "gansu",
        青海: "qinghai",
        //5个自治区
        新疆: "xinjiang",
        广西: "guangxi",
        内蒙古: "neimenggu",
        宁夏: "ningxia",
        西藏: "xizang",
        //4个直辖市
        北京: "beijing",
        天津: "tianjin",
        上海: "shanghai",
        重庆: "chongqing",
        //2个特别行政区
        香港: "xianggang",
        澳门: "aomen"
      };

      //初始化绘制全国地图配置
      var option = {
        title: {
          text: "",

          link: "https://blog.csdn.net/example440982",
          left: "center",
          textStyle: {
            color: "#fff",
            fontSize: 16,
            fontWeight: "normal",
            fontFamily: "Microsoft YaHei"
          },
          subtextStyle: {
            color: "#fff",
            fontSize: 18,
            fontWeight: "normal",
            fontFamily: "Microsoft YaHei"
          }
        },

        tooltip: {
          enterable: true,
          trigger: "item",
          borderRadius: 8,
          backgroundColor: "rgba(7,8,26,0.9)",
          padding: [10, 20, 10, 20],
          textStyle: {
            lineHeight: 24,
            fontSize: 18
          },
          formatter: function(params) {
            var relVal = "";
            var ser = option.series;
            for (var i = 0; i < ser.length; i++) {
              for (var j = 0; j < ser[i].data.length; j++) {
                if (ser[i].data[j].name == params.name) {
                  relVal +=
                    '<span style="color:#43b9fd;">数据1' +
                    ":" +
                    ser[i].data[j].value[0] +
                    "<br/></span>";
                  relVal +=
                    '<span style="color:#33eb94;">数据2' +
                    ":" +
                    ser[i].data[j].value[1] +
                    "<br/></span>";
                  relVal +=
                    '<span style="color:#faa136;">数据3' +
                    ":" +
                    ser[i].data[j].value[2] +
                    "<br/></span>";
                }
              }
            }
            return relVal;
          }
        },
        animationDuration: 1000,
        animationEasing: "cubicOut",
        idanimationDurationUpdate: 1000
      };

      var area = {};
      //直辖市和特别行政区-只有二级地图，没有三级地图
      var special = ["北京", "天津", "上海", "重庆", "香港", "澳门"];
      var mapdata = [];
      //绘制全国地图

      let d = [];
      for (var i = 0; i < mapData.features.length; i++) {
        d.push({
          name: mapData.features[i].properties.name
        });
      }
      mapdata = d;
      //注册地图
      this.$echarts.registerMap("tianjin", mapData);

      //绘制地图
      renderMap("tianjin", d, option, this.maps);

      function renderMap(map, data, option, maps) {
        option.series = [
          {
            data: maps,
            name: map,
            type: "map",
            mapType: map,
            roam: true,
            nameMap: {
              china: "中国"
            },
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: "#fff",
                  fontSize: 13
                }
              },
              emphasis: {
                show: true,
                textStyle: {
                  color: "#fff",
                  fontSize: 13
                }
              }
            },
            itemStyle: {
              normal: {
                areaColor: "#076291",
                borderColor: "#76c1d1"
              },
              emphasis: {
                areaColor: "#003c5d"
              }
            }
          }
        ];
        //渲染地图
        chart.setOption(option);

        chart.on("click", function(data) {
          that.$router.push({
            path: "mapDetail",
            query: {
              name: data.data.name
            }
          });
        });
      }
    }
  },
  directives: {
    scroll: {
      inserted(el) {
        let num = 0;
        let rollLength = 5;
        setTimeout(() => {
          let tr = el.children[0];
          setInterval(() => {
            num += rollLength;
            if (num == 10) {
              num = 0;
            }
            el.style.top = -num * tr.offsetHeight + "px";
          }, 3000);
        }, 3000);
      }
    }
  },
  components: {
    VueProgressBar,
    TableList,
    Date
  }
};
</script>
<style src="../assets/css/common.css"></style>

<style scoped>
.index-layer {
  height: 100%;
}
.tbody {
  position: relative;
  transition: 1s;
  top: 0;
}

.top tr {
  height: 25px !important;
}
.circleChart .circles-integer {
  display: none !important;
}
.left {
  width: 25%;
  height: 100%;
  float: left;
}
.left .top {
  width: 100%;
  height: 315px;
  float: left;
}
.left .top h1 {
  color: #abdbf6;
  font-size: 38px;
  text-align: center;
  margin-top: 18%;
}
.left .top h2 {
  color: #2d4ea0;
  font-size: 18px;
  text-align: center;
  margin-top: 10%;
}
.left .top h2 span {
  margin-right: 20px;
}
.left .top a {
  width: 138px;
  height: 28px;
  background: url(../assets/images/index/images/back.png);
  background-size: 100% 100%;
  display: block;
  margin: 50px;
}
.left .middle {
  width: 100%;
  height: 34%;
  float: left;
  padding: 0 10px;
}
.left .middle .title {
  width: 148px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background: url(../assets/images/index/images/title.png);
  color: #fff;
  font-size: 18px;
}
.left .middle h1 {
  color: #fff;
  font-size: 18px;
  margin-top: 5%;
  height: 15%;
  padding-left: 20px;
}
.left .middle h1 span {
  font-size: 24px;
  color: #3eb9f7;
  margin-left: 20px;
}
.left .middle h1 span i {
  font-size: 14px;
}
.left .middle h2 {
  color: #fff;
  font-size: 18px;
  margin-top: 2%;
  text-align: left;
  height: 15%;
  padding-left: 20px;
  background: url(../assets/images/index/images/line.png) left bottom no-repeat;
  background-size: 100% 2px;
}
.left .middle h2 em {
  float: right;
  font-size: 24px;
  color: #3eb9f7;
  margin-left: 20px;
}
.left .middle p {
  width: 220px;
  height: 12px;
  float: left;
  margin-top: 9px;
  background: #161a3c;
  margin-left: 10px;
  border-radius: 6px;
  overflow: hidden;
}
.left .middle h2 span {
  float: left;
}
.left .middle p i {
  width: 0;
  height: 12px;
  border-radius: 6px;
  background: #4faee3;
  display: block;
}

.left .middle .l,
.left .middle .c,
.left .middle .r {
  width: 133px;
  height: 133px;
  position: relative;
  margin-top: 20px;
  float: left;
  margin-right: 15px;
}
.left .middle .l p,
.left .middle .c p,
.left .middle .r p {
  width: 80px;
  height: 80px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -35px;
  margin-left: -40px;
}
.left .middle .l p span,
.left .middle .c p span,
.left .middle .r p span {
  width: 100%;
  height: 25px;
  display: block;
  text-align: center;
}
.left .middle .l p span:nth-child(1),
.left .middle .c p span:nth-child(1),
.left .middle .r p span:nth-child(1) {
  color: #3eb9f7;
}
.left .middle .l p span:nth-child(2),
.left .middle .c p span:nth-child(2),
.left .middle .r p span:nth-child(2) {
  color: #fff;
}
.left .middle .l p span:nth-child(3),
.left .middle .c p span:nth-child(3),
.left .middle .r p span:nth-child(3) {
  color: #f19d3a;
}
.left .middle .r {
  width: 133px;
  height: 133px;
  position: relative;
  margin-top: 20px;
  float: left;
  margin-right: 0;
}
.circleChart_text {
  display: none;
}

.left .middle ul {
  width: 100%;
  height: 45%;
  float: left;
  margin-top: 10px;
}
.left .middle ul li {
  width: 33.33%;
  height: 100%;
  background: #fff;
  float: left;
  background: url(../assets/images/index/images/line2.png) no-repeat;
  background-size: auto 100%;
}
.left .middle ul li:nth-child(1) {
  background: none;
}
.left .middle ul li h1 {
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: #fff;
  font-size: 14px;
}
.left .middle ul li h2 {
  width: 100%;
  height: 30px;
  line-height: 30px;
  background: none;
  margin-top: 50px;
  padding-left: 0;
  text-align: center;
  color: #4faee3;
  font-size: 24px;
}
.left .middle ul li h2 span {
  font-size: 14px !important;
  float: none;
}
.left .middle ul li h3 {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  font-size: 14px;
}
.left .middle ul li h3 span {
  font-size: 18px !important;
  color: #fba233;
}
.left .middle ul li h3 span img {
  margin: -5px 7px 0px 7px;
}
.left .middle ul li p {
  width: 104px;
  height: 74px;
  margin: 0 auto;
  background: url(../assets/images/index/images/block.png);
  margin-top: 10px;
  padding-top: 10px;
}
.left .middle ul li p span {
  text-align: center;
  color: #43b9fd;
  font-size: 14px;
  display: block;
  line-height: 30px;
}
.left .middle ul li p i {
  text-align: center;
  color: #43b9fd;
  font-size: 20px;
  display: block;
}
.left .middle ul li p i em {
  font-size: 14px;
}

.left .bottom {
  width: 100%;
  height: 34%;
  float: left;
  padding: 0 10px;
  background: rgba(0, 0, 0, 0.2);
}
.left .bottom .title {
  width: 148px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background: url(../assets/images/index/images/title.png);
  color: #fff;
  font-size: 18px;
  margin-top: 10px;
}
.left .bottom p {
  width: 135px;
  height: 126px;
  float: left;
  margin: 50px 0 0 8px;
}
.left .bottom p:nth-child(2) {
  background: url(../assets/images/index/images/block4.png);
  color: #faa136;
}
.left .bottom p:nth-child(3) {
  background: url(../assets/images/index/images/block5.png);
  color: #33eb94;
}
.left .bottom p:nth-child(4) {
  background: url(../assets/images/index/images/block3.png);
  color: #3eb9f7;
}
.left .bottom p span {
  width: 100%;
  height: 40px;
  text-align: center;
  line-height: 40px;
  display: block;
  font-size: 24px;
  margin-top: 20px;
}
.left .bottom p i {
  width: 100%;
  height: 30px;
  text-align: center;
  line-height: 30px;
  display: block;
  font-size: 12px;
  margin-top: 10px;
}

.center {
  width: 25%;
  height: 100%;
  float: left;
}
.center .top {
  width: 100%;
  height: 33%;
  float: left;
}
.center .top .title {
  width: 170px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background: url(../assets/images/index/images/title2.png);
  color: #fff;
  font-size: 18px;
  margin: 10px 0 0 10px;
}
.center .top table {
  width: 100%;
  height: auto;
  text-align: center;
}
.center .top table tr td:nth-child(1) {
  width: 19%;
}
.center .top table tr td {
  width: 27%;
}
.center .top .thead {
  color: #303c67;
  font-size: 18px;
  height: 40px;
}
.center .top .tbody {
  color: #fff;
  font-size: 14px;
}
.center .top .tbody tr td {
  height: 30px;
}
.center .top .tbody tr:nth-child(odd) {
  background: #172345;
}
.center .top .tbody tr:hover {
  background: #182953;
  cursor: pointer;
}
.center .top .tbottom {
  color: #f09c39;
  font-size: 14px;
  height: 40px;
}
.center .top .box {
  height: 52%;
  overflow: hidden;
}
.center .middle {
  width: 100%;
  height: 34%;
  float: left;
  padding: 0 10px;
  background: rgba(0, 0, 0, 0.2);
  position: relative;
}
.center .middle .title {
  width: 148px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background: url(../assets/images/index/images/title.png);
  color: #fff;
  font-size: 18px;
  margin-top: 10px;
  float: left;
}
.center .middle ul {
  float: right;
  margin-top: 20px;
}
.center .middle ul li {
  padding: 5px 10px;
  color: #1f397c;
  float: left;
  font-size: 14px;
  cursor: pointer;
}
.center .middle ul .this {
  box-shadow: 0px 0px 10px #0085ff;
  color: #fff;
}
.center .middle #main {
  position: absolute;
  z-index: -1;
  margin-top: 14%;
  height: 95%;
  width: 95%;
}
.center .bottom {
  width: 100%;
  height: 34%;
  float: left;
  padding: 0 10px;
  position: relative;
}
.center .bottom .title {
  width: 148px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background: url(../assets/images/index/images/title.png);
  color: #fff;
  font-size: 18px;
  margin-top: 10px;
}
.circleChart6 {
  width: 216px;
  height: 216px;
  margin: 20px 0 0 20px;
}
.circleChart7 {
  width: 175px;
  height: 175px;
  margin: -195px 0 0 40px;
}
.circleChart8 {
  width: 130px;
  height: 130px;
  margin: -155px 0 0 60px;
}
.center .bottom ul {
  width: 180px;
  height: 230px;
  position: absolute;
  right: 10px;
  top: 60px;
}
.center .bottom ul li {
  width: 100%;
  height: 66px;
  margin-bottom: 20px;
  float: left;
  position: relative;
}
.center .bottom ul li h1 {
  color: #fff;
  font-size: 14px;
  float: right;
  width: 130px;
  text-align: left;
  padding-left: 10px;
}
.center .bottom ul li h2 {
  color: #fff;
  font-size: 20px;
  float: right;
  width: 130px;
  text-align: left;
  padding-left: 10px;
}
.center .bottom ul li h3 {
  color: #fff;
  font-size: 14px;
  float: right;
  width: 130px;
  text-align: left;
  padding-left: 10px;
}
.center .bottom ul li i {
  width: 40px;
  height: 16px;
  display: block;
  border-radius: 8px;
  position: absolute;
  top: 28px;
}
.center .bottom ul li:nth-child(1) i {
  background: #43b9fd;
}
.center .bottom ul li:nth-child(2) i {
  background: #faa136;
}
.center .bottom ul li:nth-child(3) i {
  background: #33ea94;
}
.center .bottom ul li:nth-child(1) h3,
.center .bottom ul li:nth-child(1) h2 {
  color: #43b9fd;
}
.center .bottom ul li:nth-child(2) h3,
.center .bottom ul li:nth-child(2) h2 {
  color: #faa136;
}
.center .bottom ul li:nth-child(3) h3,
.center .bottom ul li:nth-child(3) h2 {
  color: #33ea94;
}

.right {
  width: 25%;
  height: 100%;
  float: left;
}
.right .top {
  width: 100%;
  height: 33%;
  float: left;
  background: rgba(0, 0, 0, 0.2);
}
.right .top .title {
  width: 170px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background: url(../assets/images/index/images/title2.png);
  color: #fff;
  font-size: 18px;
  margin: 10px 0 0 10px;
  float: left;
}
.right .top ul {
  float: right;
  margin-top: 20px;
}
.right .top ul li {
  padding: 5px 8px;
  color: #1f397c;
  float: left;
  font-size: 14px;
  cursor: pointer;
}
.right .top ul .this {
  box-shadow: 0px 0px 10px #0085ff;
  color: #fff;
}
.right .top table {
  width: 100%;
  height: 79%;
  margin-top: 10px;
  float: left;
}
.right .top table td {
  font-size: 14px;
  color: #fff;
}
.right .top table tr td:nth-child(1),
.right .top table tr td:nth-child(3) {
  width: 20%;
  text-align: center;
}
.right .top table tr td span {
  width: 100%;
  height: 12px;
  background: #161a3c;
  display: block;
  border-radius: 6px;
  overflow: hidden;
}
.right .top table tr td span i {
  width: 0%;
  background: #4faee3;
  display: block;
  height: 100%;
  border-radius: 0 6px 6px 0;
}
.right .top table tr:nth-child(1) td,
.right .top table tr:nth-child(2) td,
.right .top table tr:nth-child(3) td {
  color: #f19d3a;
}
.right .top table tr:nth-child(1) i,
.right .top table tr:nth-child(2) i,
.right .top table tr:nth-child(3) i {
  background: #f19d3a;
}
.right .middle {
  width: 100%;
  height: 34%;
  float: left;
  padding: 0 10px;
  position: relative;
}
.right .middle .title {
  width: 148px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background: url(../assets/images/index/images/title.png);
  color: #fff;
  font-size: 18px;
  margin-top: 10px;
  float: left;
}
.right .middle ul {
  width: 100%;
  height: 75%;
  float: left;
  margin-top: 10px;
}
.right .middle ul li {
  width: 30%;
  height: 100%;
  background: #fff;
  float: left;
  background: url(../assets/images/index/images/line2.png) no-repeat;
  background-size: auto 100%;
}
.right .middle ul li:nth-child(1) {
  margin-left: 5%;
  background: none;
}
.right .middle ul li h1 {
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: #fff;
  font-size: 14px;
}
.right .middle ul li h2 {
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: #4faee3;
  font-size: 24px;
}
.right .middle ul li h2 span {
  font-size: 14px !important;
}
.right .middle ul li h3 {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  font-size: 14px;
}
.right .middle ul li h3 span {
  font-size: 18px !important;
  color: #fba233;
}
.right .middle ul li h3 span img {
  margin: -5px 7px 0px 7px;
}
.right .middle ul li p {
  width: 104px;
  height: 74px;
  margin: 0 auto;
  background: url(../assets/images/index/images/block.png);
  margin-top: 10px;
  padding-top: 10px;
}
.right .middle ul li p span {
  text-align: center;
  color: #43b9fd;
  font-size: 14px;
  display: block;
  line-height: 30px;
}
.right .middle ul li p i {
  text-align: center;
  color: #43b9fd;
  font-size: 20px;
  display: block;
}
.right .middle ul li p i em {
  font-size: 14px;
}
.right .bottom {
  width: 100%;
  height: 34%;
  float: left;
  padding: 0 10px;
  position: relative;
  background: rgba(0, 0, 0, 0.2);
}
.right .bottom .title {
  width: 148px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background: url(../assets/images/index/images/title.png);
  color: #fff;
  font-size: 18px;
  margin-top: 10px;
}
.right .bottom p {
  width: 100%;
  height: 70px;
  background: url(../assets/images/index/images/line.png) left bottom no-repeat;
  padding: 0 10px;
}
.right .bottom p span {
  width: 50%;
  height: 70px;
  line-height: 70px;
  display: block;
  float: left;
  font-size: 14px;
  color: #fff;
}
.right .bottom p span i {
  color: #43b9fd;
  margin-left: 10px;
  font-size: 24px;
}
.right .bottom p span i em {
  font-size: 14px;
  margin-left: 10px;
}
.right .bottom #main1 {
  height: 220px;
  width: 220px;
}
.right .bottom ul {
  width: 180px;
  height: 230px;
  position: absolute;
  right: 10px;
  top: 160px;
}
.right .bottom ul li {
  width: 100%;
  height: 66px;
  margin-bottom: 20px;
  float: left;
  position: relative;
}
.right .bottom ul li h1 {
  color: #fff;
  font-size: 14px;
  float: right;
  width: 130px;
  text-align: left;
  padding-left: 10px;
}
.right .bottom ul li h2 {
  color: #fff;
  font-size: 20px;
  float: right;
  width: 130px;
  text-align: left;
  padding-left: 10px;
}
.right .bottom ul li h3 {
  color: #fff;
  font-size: 14px;
  float: right;
  width: 130px;
  text-align: left;
  padding-left: 10px;
}
.right .bottom ul li i {
  width: 40px;
  height: 16px;
  display: block;
  border-radius: 8px;
  position: absolute;
  top: 28px;
}
.right .bottom ul li:nth-child(1) i {
  background: #43b9fd;
}
.right .bottom ul li:nth-child(2) i {
  background: #faa136;
}
.right .bottom ul li:nth-child(1) h3,
.right .bottom ul li:nth-child(1) h2 {
  color: #43b9fd;
}
.right .bottom ul li:nth-child(2) h3,
.right .bottom ul li:nth-child(2) h2 {
  color: #faa136;
}

.map-top {
  width: 25%;
  height: 10%;
  float: left;
}
.map-top ul li {
  width: 33.3%;
  height: 100%;
  float: left;
}
.map-top ul li h1 {
  font-size: 18px;
  color: #f19d3a;
  text-align: center;
  line-height: 30px;
  margin-top: 20px;
}
.map-top ul li h2 {
  font-size: 18px;
  color: #f19d3a;
  text-align: center;
  line-height: 30px;
}
.map {
  width: 25%;
  float: left;
  height: 65%;
}

.map-bottom {
  width: 25%;
  height: 34%;
  float: left;
  padding: 0 10px;
}
.map-bottom .title {
  width: 148px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background: url(../assets/images/index/images/title.png);
  color: #fff;
  font-size: 18px;
  margin-top: 10px;
}
.map-bottom h1 {
  color: #fff;
  font-size: 18px;
  margin-top: 5%;
  height: 20%;
  background: url(../assets/images/index/images/line.png) left bottom no-repeat;
  background-size: 100% 2px;
  padding-left: 20px;
}
.map-bottom h1 span {
  font-size: 24px;
  color: #3eb9f7;
  margin-left: 20px;
}
.map-bottom h1 span i {
  font-size: 14px;
}
.map-bottom .l,
.map-bottom .c,
.map-bottom .r {
  width: 133px;
  height: 133px;
  position: relative;
  margin-top: 30px;
  float: left;
  margin-right: 15px;
}
.map-bottom .l p,
.map-bottom .c p,
.map-bottom .r p {
  width: 80px;
  height: 80px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -35px;
  margin-left: -40px;
}
.map-bottom .l p span,
.map-bottom .c p span,
.map-bottom .r p span {
  width: 100%;
  height: 25px;
  display: block;
  text-align: center;
}
.map-bottom .l p span:nth-child(1),
.map-bottom .c p span:nth-child(1),
.map-bottom .r p span:nth-child(1) {
  color: #3eb9f7;
}
.map-bottom .l p span:nth-child(2),
.map-bottom .c p span:nth-child(2),
.map-bottom .r p span:nth-child(2) {
  color: #fff;
}
.map-bottom .l p span:nth-child(3),
.map-bottom .c p span:nth-child(3),
.map-bottom .r p span:nth-child(3) {
  color: #f19d3a;
}
.map-bottom .r {
  width: 133px;
  height: 133px;
  position: relative;
  margin-top: 30px;
  float: left;
  margin-right: 0;
}
.map-bottom p span:first-child {
  margin-top: 10px;
}
.circles-integer {
  display: none;
}

.pointer {
  cursor: pointer;
}
</style>

