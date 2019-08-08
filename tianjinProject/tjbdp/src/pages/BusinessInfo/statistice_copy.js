import React from 'react';
import ReactEcharts from 'echarts-for-react';
import {Table,Card,Row,Col,DatePicker,Button,Form, Select ,Icon} from 'antd';
import { connect } from "dva/index";
import styles from './HighSearch.less'
import moment from "moment/moment";

const FormItem = Form.Item;
const {Option}=Select;
const ButtonGroup = Button.Group;

@connect(({ statistics,dataAssets }) => {
  const {echartsStaList}=statistics;
  const {echartsList}=dataAssets;
  return{
    echartsStaList,echartsList
  }
})

@Form.create()
export default class Statistics extends React.Component{
  state={
    dataValue:moment().format("YYYY-MM-DD"),
    // eccompanyid:"default",
    data:"1"
  };

  componentDidMount(){
    const { dispatch } = this.props;
    dispatch({
      type:'statistics/getStaEcharts',
    });
    dispatch({
      type:'dataAssets/getEcharts',
      payload:{
        countType:2
      }
    });
    const form = this.props.form;
    form.setFieldsValue({
      utcdate:moment(moment().format("YYYY-MM-DD"), "YYYY-MM-DD"),
      select:"default",
    });
  }

  handleSelectChange1=(value)=>{
    // console.log(`selected ${value}`);
    // this.setState({eccompanyid:value})
    this.setState({data:value});
    const {dataValue,eccompanyid}=this.state;
    const { dispatch } = this.props;
    dispatch({
      type:'statistics/getStaEcharts',
      payload:{
        utcdate:dataValue,
        countType:value,
        eccompanyid:eccompanyid,
      }
    });
  };

  handleSelectChange=(value)=>{
    // console.log(`selected ${value}`);
    this.setState({eccompanyid:value})
    const { dispatch } = this.props;
    if(value!="default"){
      dispatch({
        type:'statistics/getStaEcharts',
        payload:{
          utcdate:this.state.dataValue,
          countType:this.state.data,
          eccompanyid:value,
        }
      });
    }else{
      this.setState({dataValue:moment().format("YYYY-MM-DD")});
      const form = this.props.form;
      // console.log("moment(moment().format(\"YYYY-MM-DD\"), \"YYYY-MM-DD\")",moment(moment().format("YYYY-MM-DD"), "YYYY-MM-DD"));
      form.setFieldsValue({
        utcdate:moment(moment().format("YYYY-MM-DD"), "YYYY-MM-DD"),
      });
      dispatch({
        type:'statistics/getStaEcharts',
      });
    }
  };

  dataValueChange = (value) => {
    // console.log("value",value.format("YYYY-MM-DD"));
    this.setState({
      dataValue:value.format("YYYY-MM-DD")
    });
    const { dispatch } = this.props;
    dispatch({
      type:'statistics/getStaEcharts',
      payload:{
        utcdate:value.format("YYYY-MM-DD"),
        countType:this.state.data,
        eccompanyid:this.state.eccompanyid,
      }
    });
  };

  afterDay=()=>{
    // console.log("this.state.dataValue",this.state.dataValue);
    let data=moment(this.state.dataValue).subtract(1, 'days');
    // console.log("data",data.format("YYYY-MM-DD"));
    this.setState({dataValue:data.format("YYYY-MM-DD")});
    const form = this.props.form;
    form.setFieldsValue({
      utcdate:data,
    });
    const { dispatch } = this.props;
    dispatch({
      type:'statistics/getStaEcharts',
      payload:{
        utcdate:data.format("YYYY-MM-DD"),
        countType:this.state.data,
        eccompanyid:this.state.eccompanyid,
      }
    });
    // console.log("dataValue",this.state.dataValue);
  };

  lastDay=()=>{
    // console.log("this.state.dataValue",this.state.dataValue);
    let data=moment(this.state.dataValue).add(1, 'days');
    // console.log("data",data);
    this.setState({dataValue:data.format("YYYY-MM-DD")});
    const form = this.props.form;
    form.setFieldsValue({
      utcdate:data,
    });
    const { dispatch } = this.props;
    dispatch({
      type:'statistics/getStaEcharts',
      payload:{
        utcdate:data.format("YYYY-MM-DD"),
        countType:this.state.data,
        eccompanyid:this.state.eccompanyid,
      }
    });
    // console.log("dataValue",this.state.dataValue);
  };

  render(){
    // console.log("echartsStaList",this.props.echartsStaList);
    let componeyCount=[],eventdateData="",allComponey=[],todayCount=[],componeyName="";
    // componeyName=this.state.eccompanyid!="default"?this.state.eccompanyid:null;
    componeyCount[0]={};
    componeyCount[0].name="快递总量";
    componeyCount[0].value=this.props.echartsStaList.total;
    todayCount[0]={};
    todayCount[0].name=this.state.dataValue+" 快递总量";
    todayCount[0].value=this.props.echartsStaList.today;

    if(this.props.echartsStaList.hours!=undefined){
      // console.log("this.props.echartsStaList.hours",this.props.echartsStaList.hours);
      for(let i=0;i<this.props.echartsStaList.hours.length;i++){
        allComponey[i]={};
        allComponey[i].value=this.props.echartsStaList.hours[i].cnt;
        allComponey[i].name=this.props.echartsStaList.hours[i].utcdate+"时";
      }
    }

    const { getFieldDecorator } = this.props.form;
    const formItemLayout1 = {
      labelCol: {
        sm: { span: 24 },
        md: { span: 24 },
        lg: { span: 6},
        xl: { span: 8}
      },
      wrapperCol: {
        sm: { span: 24 },
        md: { span: 24 },
        lg: { span: 18 },
        xl: { span: 15},
      }
    };

    const formItemLayout = {
      labelCol: {
        sm: { span: 24 },
        md: { span: 24 },
        lg: { span: 11},
        xl: { span: 7 }
      },
      wrapperCol: {
        sm: { span: 24 },
        md: { span: 24 },
        lg: { span: 12 },
        xl: { span: 14}
      }
    };

    return(
      <Card className={styles.wrap}>
        <Row>
          <Col sm={{ span: 24 }} lg={{ span: 8 }}>
            <FormItem
              label="快递公司"
              {...formItemLayout}
              style={{ width: "100%" }}
            >
              {getFieldDecorator("select", {
                rules: [{ required: false,message:'查询方式不能为空' }]
              })(
                <Select className={styles.formItemWidth1} onChange={this.handleSelectChange}>
                  <Option key="default">全部</Option>
                  {this.props.echartsList.map(item=>(<Option value={item.eccompanyid} key={item.eccompanyid}>{item.eccompanyname}</Option>))}
                </Select>

              )}
            </FormItem>
          </Col>
          <Col sm={{ span: 24 }} lg={{ span: 8 }}>
            <FormItem
              // label="查验时间"
              label={<Select defaultValue={"1"} className={styles.formItemWidth1} onChange={this.handleSelectChange1}>
                <Option key="1">查验时间</Option>
                <Option key="2">入库时间</Option>
              </Select>}
              {...formItemLayout1}
              style={{ width: "100%" }}
            >
              {getFieldDecorator("utcdate", {
                rules: [{ required: false,message:'查验时间不能为空' }]
              })(
                <DatePicker
                  className={styles.formItemWidth2}
                  format="YYYY-MM-DD"
                  placeholder="开始时间"
                  // value={this.state.dataValue}
                  onChange={this.dataValueChange}
                />
              )}
            </FormItem>
          </Col>
          <Col sm={{ span: 24 }} lg={{ span: 8 }} style={{marginTop:3}}>
            <ButtonGroup>
              <Button onClick={this.afterDay}>
                <Icon type="left" />前一天
              </Button>
              <Button onClick={this.lastDay}>
                后一天<Icon type="right" />
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
        <Row>
          <Col sm={{ span: 24 }} lg={{ span: 7}}>
            {
              this.props.echartsStaList.total!=undefined? <ReactEcharts
                option={{
                  title : {
                    text: '快递总量',
                    // subtext: '纯属虚构',
                    x:'center'
                  },
                  tooltip : {
                    trigger: 'item',
                    formatter: "{b} : {c}"
                  },
                  series : [
                    {
                      name: '访问来源',
                      type: 'pie',
                      radius : '55%',
                      center: ['50%', '50%'],
                      data:componeyCount,
                      // data:[
                      //   {value:335, name:'直接访问'},
                      //   {value:310, name:'邮件营销'},
                      //   {value:234, name:'联盟广告'},
                      //   {value:135, name:'视频广告'},
                      //   {value:1548, name:'搜索引擎'}
                      // ],
                      itemStyle: {
                        emphasis: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                      }
                    }
                  ]
                }}
              />:<ReactEcharts
                option={{
                  title : {
                    text: '暂无数据',
                    // subtext: '纯属虚构',
                    x:'center'
                  },
                  tooltip : {
                    trigger: 'item',
                    formatter: "{b} : {c}"
                  },
                  series : [
                    {
                      name: '访问来源',
                      type: 'pie',
                      radius : '55%',
                      center: ['50%', '50%'],
                      data:[{value:0,name:'暂无数据'}],
                      // data:[
                      //   {value:335, name:'直接访问'},
                      //   {value:310, name:'邮件营销'},
                      //   {value:234, name:'联盟广告'},
                      //   {value:135, name:'视频广告'},
                      //   {value:1548, name:'搜索引擎'}
                      // ],
                      itemStyle: {
                        emphasis: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                      }
                    }
                  ]
                }}
              />
            }
          </Col>
          <Col sm={{ span: 24 }} lg={{ span:7}}>
            {
              this.props.echartsStaList.today!=undefined? <ReactEcharts
                option={{
                  title : {
                    text:this.state.dataValue+' 快递总量',
                    // subtext: '纯属虚构',
                    x:'center'
                  },
                  tooltip : {
                    trigger: 'item',
                    formatter: "{b} : {c}"
                  },
                  series : [
                    {
                      name: '访问来源',
                      type: 'pie',
                      radius : '55%',
                      center: ['50%', '50%'],
                      data:todayCount,
                      // data:[
                      //   {value:335, name:'直接访问'},
                      //   {value:310, name:'邮件营销'},
                      //   {value:234, name:'联盟广告'},
                      //   {value:135, name:'视频广告'},
                      //   {value:1548, name:'搜索引擎'}
                      // ],
                      itemStyle: {
                        emphasis: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                      }
                    }
                  ]
                }}
              />:<ReactEcharts
                option={{
                  title : {
                    text: '暂无数据',
                    // subtext: '纯属虚构',
                    x:'center'
                  },
                  tooltip : {
                    trigger: 'item',
                    formatter: "{b} : {c}"
                  },
                  series : [
                    {
                      name: '访问来源',
                      type: 'pie',
                      radius : '55%',
                      center: ['50%', '50%'],
                      data:[{value:0,name:'暂无数据'}],
                      // data:[
                      //   {value:335, name:'直接访问'},
                      //   {value:310, name:'邮件营销'},
                      //   {value:234, name:'联盟广告'},
                      //   {value:135, name:'视频广告'},
                      //   {value:1548, name:'搜索引擎'}
                      // ],
                      itemStyle: {
                        emphasis: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                      }
                    }
                  ]
                }}
              />
            }
          </Col>
          <Col sm={{ span: 24 }} lg={{ span: 10}}>
            {this.props.echartsStaList.hours!=undefined ?<ReactEcharts
              option={{
                title : {
                  text: this.state.dataValue+' 每小时快递总量',
                  // subtext: '纯属虚构',
                  x:'center'
                },
                tooltip : {
                  trigger: 'item',
                  formatter: "{b} : {c} ({d}%)"
                },
                series : [
                  {
                    name: '访问来源',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '50%'],
                    data:allComponey,
                    // data:[
                    //   {value:335, name:'直接访问'},
                    //   {value:310, name:'邮件营销'},
                    //   {value:234, name:'联盟广告'},
                    //   {value:135, name:'视频广告'},
                    //   {value:1548, name:'搜索引擎'}
                    // ],
                    itemStyle: {
                      emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                      }
                    }
                  }
                ]
              }}
            />:<ReactEcharts option={{
              title : {
                text: '暂无数据',
                // subtext: '纯属虚构',
                x:'center'
              },
              tooltip : {
                trigger: 'item',
                formatter: "{b} : {c}"
              },
              series : [
                {
                  name: '访问来源',
                  type: 'pie',
                  radius : '55%',
                  center: ['50%', '50%'],
                  data:[{value:0,name:'暂无数据'}],
                  // data:[
                  //   {value:335, name:'直接访问'},
                  //   {value:310, name:'邮件营销'},
                  //   {value:234, name:'联盟广告'},
                  //   {value:135, name:'视频广告'},
                  //   {value:1548, name:'搜索引擎'}
                  // ],
                  itemStyle: {
                    emphasis: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  }
                }
              ]
            }}/>}
          </Col>
        </Row>
      </Card>
    )
  }
}
