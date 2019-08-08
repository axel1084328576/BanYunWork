import React,{Component} from 'react';
import {Row,Col,Form,DatePicker,Button,Select,Card} from 'antd'
import ReactEcharts from 'echarts-for-react';
import {connect} from 'dva';
import styles from './HighSearch.less'
import moment from "moment/moment";

const FormItem = Form.Item;
const {Option}=Select;

@connect(({ dataAssets }) => {
  const {echartsList,type}=dataAssets;
  return{
    echartsList,type
  }
})

@Form.create()
export default class  DataAssets extends Component{

  state={
    dataValue:moment(moment().format("YYYY-MM-DD"), "YYYY-MM-DD"),
    dataValue1:moment(moment().format("YYYY-MM-DD"), "YYYY-MM-DD"),
    selectValue:"eventdate",
  };

  componentDidMount(){
    const { dispatch } = this.props;
    dispatch({
      type:'dataAssets/getEcharts',
      payload:{
        countType:1,
        start:this.state.dataValue.format("YYYY-MM-DD"),
        end:this.state.dataValue1.format("YYYY-MM-DD"),
      }
    });
    const form = this.props.form;
    form.setFieldsValue({
      select:"eventdate",
    });
  }

  dataValueChange = (value) => {
    this.setState({ dataValue: value });
    const {selectValue,dataValue1}=this.state;
    let countType=1;
    if(selectValue=="eventdate"){
      countType=1;
    }else if(selectValue=="eccompanyid"){
      countType=2;
    }else if(selectValue=="datecompany"){
      countType=3;
    }else if(selectValue=="utcdatecompany"){
      countType=13;
    }else{
      countType=12;
    }
    const { dispatch } = this.props;
    dispatch({
      type:'dataAssets/getEcharts',
      payload:{
        countType:countType,
        start:selectValue=="datecompany" ||  selectValue=="utcdatecompany"?null:value.format("YYYY-MM-DD"),
        end:dataValue1.format("YYYY-MM-DD"),
      }
    });
  };

  dataValueChange1 = (value) => {
    this.setState({ dataValue1:value });
    const {selectValue,dataValue}=this.state;
    let countType=1;
    if(selectValue=="eventdate"){
      countType=1;
    }else if(selectValue=="eccompanyid"){
      countType=2;
    }else if(selectValue=="datecompany"){
      countType=3;
    }else if(selectValue=="utcdatecompany"){
      countType=13;
    }else{
      countType=12;
    }
    const { dispatch } = this.props;
    dispatch({
      type:'dataAssets/getEcharts',
      payload:{
        countType:countType,
        start:selectValue=="datecompany" || selectValue=="utcdatecompany"?null:dataValue.format("YYYY-MM-DD"),
        end:value.format("YYYY-MM-DD"),
      }
    });
  };

  handleArray=(value)=>{
    let arr=[];
    for(let i=0;i<value.length;i++){
      if(arr.indexOf(value[i]) == -1){
        arr.push(value[i]);
      }
    }
    return arr;
  };

  handleGetArr=(value)=>{
    let timeArr=[],arr=[],arr1=[];
    this.props.echartsList.map((item)=>{
      timeArr.push(item.dt);
    });
    this.props.echartsList.map((item)=>{
      if(item.eccompanyname==value){
        arr.push(item)
      }
    });
    return arr;
  };

  handleGetNewArr=(value)=>{
    // 获取日期，去除重复项
    let timeArr=[];
    this.props.echartsList.map((item)=>{
      timeArr.push(item.dt);
    });
    let timeArr1=this.handleArray(timeArr);

    let newArr=[];
    for(let i=0;i<timeArr1.length;i++){
      newArr[i]=0;
    }
    for(let i=0;i<timeArr1.length;i++){
      for(let j=0;j<value.length;j++){
        if(timeArr1[i]==value[j].dt){
          newArr[i]=value[j].cnt;
        }
      }
    }
    return newArr;
  };

  handleGetArr1=(value)=>{
    let timeArr=[],arr=[],arr1=[];
    this.props.echartsList.map((item)=>{
      timeArr.push(item.utc);
    });
    this.props.echartsList.map((item)=>{
      if(item.eccompanyname==value){
        arr.push(item)
      }
    });
    // console.log("arr11110",arr)
    return arr;
  };

  handleGetNewArr1=(value)=>{
    // 获取日期，去除重复项
    let timeArr=[];
    this.props.echartsList.map((item)=>{
      timeArr.push(item.utc);
    });
    let timeArr1=this.handleArray(timeArr);

    let newArr=[];
    for(let i=0;i<timeArr1.length;i++){
      newArr[i]=0;
    }
    for(let i=0;i<timeArr1.length;i++){
      for(let j=0;j<value.length;j++){
        if(timeArr1[i]==value[j].utc){
          newArr[i]=value[j].cnt;
        }
      }
    }
    return newArr;
  };

  handleSelectChange=(value)=>{
    const {dataValue,dataValue1}=this.state;
    this.setState({selectValue:value});
    let countType=1;
    if(value=="eventdate"){
      countType=1;
    }else if(value=="eccompanyid"){
      countType=2;
    }else if(value=="datecompany"){
      countType=3;
    }else if(value=="utcdatecompany"){
      countType=13;
    }else{
      countType=12;
    }
    const { dispatch } = this.props;

    dispatch({
      type:'dataAssets/getEcharts',
      payload:{
        countType:countType,
        start:value=="datecompany" ||  value=="utcdatecompany"?null:dataValue.format("YYYY-MM-DD"),
        end:dataValue1.format("YYYY-MM-DD"),
      }
    });
  };

  // handleSearch=()=>{
  //   const {selectValue}=this.state;
  //   console.log("selectValue",selectValue);
  //   let countType=1;
  //   if(selectValue=="eventdate"){
  //     countType=1;
  //   }else if(selectValue=="eccompanyid"){
  //     countType=2;
  //   }else if(selectValue=="datecompany"){
  //     countType=3;
  //   }else if(selectValue=="utcdatecompany"){
  //     countType=13;
  //   }else{
  //     countType=12;
  //   }
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type:'dataAssets/getEcharts',
  //     payload:{
  //       countType:countType
  //     }
  //   });
  // };

  render(){
    let componeyArr=[];
    let timeArr=[];
    let componyArr=[];
    let series=[];
    let series1=[];
    let componyArr1=[];
    let timeArr1=[];
    let componeyArr1=[];
    let componyCnt=[];
    let dataComponyArr1=[];
    let dataComponyArr=[];
    let utTimeArr1=[];
    let utTimeArr=[];
    let type3=[];
    let type31=[];
    let typeCnt3=[];
    let typeCnt31=[];
    // console.log("this.props.echartsList",this.props.echartsList);
    if(this.props.type=="2"){
      this.props.echartsList.map((item)=>{
        componeyArr.push(item.eccompanyname);
        componyCnt.push(item.cnt)
      });
    }else if(this.props.type=="13"){
      this.props.echartsList.map((item)=>{
        utTimeArr.push(item.utc);
      });
      utTimeArr1=this.handleArray(utTimeArr);
      this.props.echartsList.map((item)=>{
        dataComponyArr.push(item.eccompanyname);
      });
      dataComponyArr1=this.handleArray(dataComponyArr);

      for(let i=0;i<dataComponyArr1.length;i++){
        series1[i]={};
        series1[i].name=dataComponyArr1[i];
        series1[i].type='bar';
        series1[i].data=this.handleGetNewArr1(this.handleGetArr1(dataComponyArr1[i]));
        series1[i].itemStyle={
          normal: {
            label: {
              show: true, //开启显示
              position: 'top', //在上方显示
              textStyle: { //数值样式
                color:'#FFF',
                fontSize: 12
              }
            }
          }
        };
        // console.log("this.handleGetArr(componyArr1[i])",this.handleGetArr(componyArr1[i]))
      }
    }else if(this.props.type=="3"){
      this.props.echartsList.map((item)=>{
        timeArr.push(item.dt);
      });
      timeArr1=this.handleArray(timeArr);
      this.props.echartsList.map((item)=>{
        componyArr.push(item.eccompanyname);
      });
      componyArr1=this.handleArray(componyArr);
      for(let i=0;i<componyArr1.length;i++){
        series[i]={};
        series[i].name=componyArr1[i];
        series[i].type='bar';
        series[i].data=this.handleGetNewArr(this.handleGetArr(componyArr1[i]));
        series[i].itemStyle={
          normal: {
            label: {
              show: true, //开启显示
              position: 'top', //在上方显示
              textStyle: { //数值样式
                color:'#FFF',
                fontSize: 12
              }
            }
          }
        };
        // console.log("this.handleGetArr(componyArr1[i])",this.handleGetArr(componyArr1[i]))
      }
    }else{
      this.props.echartsList.map((item)=>{
        type3.push(item.dt);
      });
      type31=this.handleArray(type3);
      this.props.echartsList.map((item)=>{
        typeCnt3.push(item.cnt);
      });
      typeCnt31=this.handleArray(typeCnt3);
    }

    const { getFieldDecorator } = this.props.form;
    const formItemLayout1 = {
      labelCol: {
        sm: { span: 24 },
        md: { span: 24 },
        lg: { span: 6},
        xl: { span: 5}
      },
      wrapperCol: {
        sm: { span: 24 },
        md: { span: 24 },
        lg: { span: 18 },
        xl: { span: 18 }
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
    const mainSearchOrAdd = (
      <div className={styles.wrap}>
        <Form layout="inline">
          <Row>
            <Col sm={{ span: 24 }} lg={{ span: 8 }}>
              <FormItem
                label="查询方式"
                {...formItemLayout}
                style={{ width: "100%" }}
              >
                {getFieldDecorator("select", {
                  rules: [{ required: false,message:'查询方式不能为空' }]
                })(
                  <Select className={styles.formItemWidth1} onSelect={this.handleSelectChange}>
                    <Option value="eventdate">查验时间</Option>
                    <Option value="eccompanyid">企业</Option>
                    <Option value="datecompany">查验时间与企业</Option>
                    <Option value="utcdate">入库时间</Option>
                    <Option value="utcdatecompany">入库时间与企业</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col sm={{ span: 24 }} lg={{ span: 12 }}>
              <FormItem
                label="查验时间"
                {...formItemLayout1}
                style={{ width: "100%" }}
              >
                {getFieldDecorator("checkmethod", {
                  rules: [{ required: false,message:'查验时间不能为空' }]
                })(
                  <Row>
                    {this.state.selectValue=="datecompany" ||  this.state.selectValue=="utcdatecompany"?null:<Col span={11}>
                      <DatePicker
                        className={styles.formItemWidth2}
                        format="YYYY-MM-DD"
                        placeholder="开始时间"
                        value={this.state.dataValue}
                        onChange={this.dataValueChange}
                      />
                    </Col>}
                    {this.state.selectValue=="datecompany" ||  this.state.selectValue=="utcdatecompany"?null:<Col span={1} className={styles.drawCenter}>
                      -
                    </Col>}
                    <Col span={11}>
                      <DatePicker
                        className={styles.formItemWidth2}
                        format="YYYY-MM-DD"
                        placeholder="结束日期"
                        value={this.state.dataValue1}
                        onChange={this.dataValueChange1}
                      />
                    </Col>
                  </Row>
                )}
              </FormItem>
            </Col>
            {/*<Col sm={{ span: 24 }} lg={{ span: 8 }}>*/}
            {/*<span className={styles.unSpan}>*/}
            {/*/!*<a onClick={this.hanldeHighSearch} style={{ marginRight: 20 }}>{this.state.openHighSearch?"收起":"展开"}</a>*!/*/}
            {/*<Button*/}
            {/*// loading={simpleLoading}*/}
            {/*onClick={this.handleSearch }*/}
            {/*type="primary"*/}
            {/*icon="search"*/}
            {/*>*/}
            {/*搜索*/}
            {/*</Button>*/}
            {/*</span>*/}
            {/*</Col>*/}
          </Row>
        </Form>
      </div>
    );
    return(
      <Card>
        <div>
          {mainSearchOrAdd}
          {this.props.type=="2"?
            <ReactEcharts
              option={{
                color: ['#3398DB'],
                tooltip : {
                  trigger: 'item',
                  axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                  }
                },
                backgroundColor:'#404A59',
                dataZoom:[{
                  textStyle:{
                    color:'#FFF',
                  },
                  type:'slider',
                  show:true,
                  start:0,
                  end:100,
                }],
                xAxis : [
                  {
                    type : 'category',
                    data : componeyArr,
                    axisTick: {
                      alignWithLabel: true,
                      interval: 0
                    },
                    axisLine:{
                      lineStyle:{
                        color:'#FFF',
                      },
                    },
                  }],
                yAxis:[{
                  type : 'value',
                  axisLine:{
                    lineStyle:{
                      color:'#FFF',
                    },
                  },
                }],
                series:[
                  {
                    type:'bar',
                    barWidth: '60%',
                    data: componyCnt,
                    itemStyle: {
                      normal: {
                        label: {
                          show: true, //开启显示
                          position: 'top', //在上方显示
                          textStyle: { //数值样式
                            color:'#FFF',
                            fontSize: 12
                          }
                        }
                      }
                    },
                  }
                ]
              }}
            />
            :this.props.type=="13"?<ReactEcharts
              theme='light'
              option={
                {
                  tooltip: {
                    trigger: 'item',
                    axisPointer: {
                      type: 'shadow',
                    },
                    position: [0, -30]
                  },
                  backgroundColor:'#404A59',
                  xAxis: [{
                    type: 'category',
                    // data: ['2018-09-29', '2018-9-30', '2018-10-01', '2018-10-02', '2018-10-03', '2018-10-04', '2018-10-05','2018-10-06','2018-10-07','2018-10-08'],
                    data: utTimeArr1,
                    axisLine:{
                      lineStyle:{
                        color:'#FFF',
                      },
                    },
                    axisTick: {
                      alignWithLabel: true,
                      interval: 0
                    }
                  }],
                  dataZoom:[{
                    textStyle:{
                      color:'#FFF',
                    },
                    type:'slider',
                    show:true,
                    start:0,
                    end:100,
                  }],
                  yAxis: {
                    type: 'value',
                    axisLine:{
                      lineStyle:{
                        color:'#FFF',
                      },
                    },
                  },
                  series:series1,
                }
              }
            />:this.props.type=="3"?<ReactEcharts
              theme='light'
              option={
                {
                  tooltip: {
                    trigger: 'item',
                    axisPointer: {
                      type: 'shadow',
                    },
                    position: [0, -30]
                  },
                  backgroundColor:'#404A59',
                  xAxis: [{
                    type: 'category',
                    // data: ['2018-09-29', '2018-9-30', '2018-10-01', '2018-10-02', '2018-10-03', '2018-10-04', '2018-10-05','2018-10-06','2018-10-07','2018-10-08'],
                    data:timeArr1,
                    axisLine:{
                      lineStyle:{
                        color:'#FFF',
                      },
                    },
                    axisTick: {
                      alignWithLabel: true,
                      interval: 0
                    }
                  }],
                  dataZoom:[{
                    textStyle:{
                      color:'#FFF',
                    },
                    type:'slider',
                    show:true,
                    start:0,
                    end:100,
                  }],
                  yAxis: {
                    type: 'value',
                    axisLine:{
                      lineStyle:{
                        color:'#FFF',
                      },
                    },
                  },
                  series:series,
                }
              }
            />:<ReactEcharts
              option={{
                color: ['#3398DB'],
                tooltip : {
                  trigger: 'item',
                  axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                  }
                },
                backgroundColor:'#404A59',
                dataZoom:[{
                  textStyle:{
                    color:'#FFF',
                  },
                  type:'slider',
                  show:true,
                  start:0,
                  end:100,
                }],
                xAxis : [
                  {
                    type : 'category',
                    data :  type31,
                    axisTick: {
                      alignWithLabel: true,
                      interval: 0
                    },
                    axisLine:{
                      lineStyle:{
                        color:'#FFF',
                      },
                    },
                  }],
                yAxis:[{
                  type : 'value',
                  axisLine:{
                    lineStyle:{
                      color:'#FFF',
                    },
                  },
                }],
                series:[
                  {
                    type:'bar',
                    barWidth: '60%',
                    data:  typeCnt31,
                    itemStyle: {
                      normal: {
                        label: {
                          show: true, //开启显示
                          position: 'top', //在上方显示
                          textStyle: { //数值样式
                            color:'#FFF',
                            fontSize: 12
                          }
                        }
                      }
                    },
                  }
                ]
              }}
            />}
        </div>
      </Card>

    )
  }
}

