import React, { Component } from "react";
import { Button, Input, Collapse, Row, Col,Divider, DatePicker, Form,Select,message } from "antd";
import BusinessInfoHighSearch from "./BusinessInfoHighSearch";
import styles from "./HighSearch.less";
import moment from "moment";
import { connect } from "dva/index";

const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const Panel = Collapse.Panel;
const Option = Select.Option;

@Form.create()
class BusinessInfoSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mailNoValue: "",
      defaultCurrent:1,
      // dataValue: [moment(moment().format("YYYY-MM-DD"), "YYYY-MM-DD"), moment(moment().format("YYYY-MM-DD"), "YYYY-MM-DD")]
      dataValue:moment(moment().format("YYYY-MM-DD"), "YYYY-MM-DD"),
      dataValue1:moment(moment().format("YYYY-MM-DD"), "YYYY-MM-DD"),
      dataValue2:null,
      dataValue3:null,
      openHighSearch:false,
    };
  }

  componentDidMount() {
    const {dataValue,dataValue1,dataValue2,dataValue3}=this.state;
    const form = this.props.form;
    form.validateFields((err, values) => {
      // console.log("From",values);
      if(!err){
        // values.eccompanyid="";
        // values.deliveryno=null;
        // values.checkmethod=null;
        // values.usercardid=null;
        // values.username=null;
        // values.usermobile=null;
        // values.taxregno=null;
        // values.staffcardid=null;
        // values.staffname=null;
        // values.staffmobile=null;
        // values.staffaddress=null;
        // values.senderaddress=null;
        // values.utcdate=null;
        values.start=dataValue.format("YYYY-MM-DD");
        values.end=dataValue1.format("YYYY-MM-DD");
        if(dataValue2!=null && dataValue3!=null){
          values.utcstart=dataValue2.format("YYYY-MM-DD HH:mm:ss");
          values.utcend=dataValue3.format("YYYY-MM-DD HH:mm:ss");
        }
        // console.log("myFormValues",values);
        if(this.props.getValues){
          this.props.getValues(values)
        }
      }
    });

  }

  dataValueChange = (value) => {
    this.setState({ dataValue: value });
  };

  dataValueChange1 = (value) => {
    this.setState({ dataValue1: value });
  };

  dataValueChange2 = (value) => {
    this.setState({ dataValue2: value });
  };

  dataValueChange3 = (value) => {
    this.setState({ dataValue3: value });
  };

  mailNoValueChange = (value) => {
    this.setState({ mailNoValue: value.target.value });
  };

  openHighSearch = () => {
    this.setState({ mailNoValue: "" });
    this.props.dispatch({
      type: "businessinfo/setShowHighSearch",
      payload: {
        showHighSearch: true
      }
    });
  };

  hanldeHighSearch = () => {
    this.props.dispatch({
      type: "businessinfo/setShowHighSearch",
      payload:{
        openHighSearch:this.state.openHighSearch
      }
    });
    this.setState({
      openHighSearch:!this.state.openHighSearch
    })
  };

  //
  // emptyMailNoValue = () => {
  //   this.setState({mailNoValue:''});
  //
  //   // const {dispatch,pageSize} = this.props;
  //   // dispatch({
  //   //   type:'businessinfo/getBusinessInfo',
  //   //   payload:{
  //   //     page:1,
  //   //     pageSize,
  //   //   }
  //   // });
  // };

  searchMail = () => {
    const {
      mailNoValue,
      dataValue,
      dataValue1,
    } = this.state;

    const {
      current,
      pageSize,
      dispatch
    } = this.props;

    // dispatch({
    //   type:'businessinfo/simpleSearch',
    //   payload:{
    //     mailno:mailNoValue,
    //     pageSize,
    //     page:1,
    //   },
    // })
    if(dataValue!=null && dataValue1!=null){
      dispatch({
        type: "businessinfo/simpleSearch",
        payload: {
          deliveryno: mailNoValue,
          start: dataValue.format("YYYY-MM-DD"),
          end: dataValue1.format("YYYY-MM-DD"),
          pageSize,
          page:1,
        }
      });
    }
  };

  handleSearchMail = () => {
    const {
      pageSize,
      dispatch
    } = this.props;

    const form = this.props.form;
    const {dataValue,dataValue1,dataValue2,dataValue3}=this.state;
    if(dataValue!=null && dataValue1!=null){
      form.validateFields((err, values) => {
        if(!err){
          values.start=dataValue.format("YYYY-MM-DD");
          values.end=dataValue1.format("YYYY-MM-DD");
          // console.log("dataValue2",dataValue2);
          // console.log("ataValue3",dataValue3);
          if(dataValue2!=null){
            values.utcstart=dataValue2.format("YYYY-MM-DD HH:mm:ss");
          }
          if(dataValue3!=null){
            values.utcend=dataValue3.format("YYYY-MM-DD HH:mm:ss");
          }
          // if(values.deliveryno==undefined){
          //   values.deliveryno=null;
          // }
          // if(values.checkmethod==undefined){
          //   values.checkmethod=null;
          // }
          // if(values.eccompanyid==undefined){
          //   values.eccompanyid=null;
          // }
          // if(values.usercardid==undefined){
          //   values.usercardid=null
          // }
          // if(values.username==undefined){
          //   values.username=null;
          // }
          // if(values.usermobile==undefined){
          //   values.usermobile=null;
          // }
          // if(values.taxregno==undefined){
          //   values.taxregno=null;
          // }
          // if(values.staffcardid==undefined){
          //   values.staffcardid=null;
          // }
          // if(values.staffname==undefined){
          //   values.staffname=null;
          // }
          // if(values.staffmobile==undefined){
          //   values.staffmobile=null;
          // }
          // if(values.staffaddress==undefined){
          //   values.staffaddress=null;
          // }
          // if(values.senderaddress==undefined){
          //   values.senderaddress=null;
          // }
          // if(values.utcdate==undefined){
          //   values.utcdate=null;
          // }
          if(this.props.getValues){
            this.props.getValues(values)
          }
          dispatch({
            type:'businessinfo/simpleSearch',
            payload:{
              ...values,
              // page:1,
              // pageSize:10,
            }
          });
        }
      });
    }else{
      message.warning("查验时间不能为空")
    }
  };


  render() {
    const { getFieldDecorator } = this.props.form;
    // console.log("getFieldDecorator ",getFieldDecorator );
    const {
      LPIDSelect,
      dispatch,
      showHighSearch,
      highSearch,
      simpleLoading,
      pageSize
    } = this.props;

    const highSearchProps = {
      highSearch,
      LPIDSelect,
      pageSize,
      showHighSearch,
      dispatch
    };

    const HighSearch = (<BusinessInfoHighSearch {...highSearchProps} />);

    const formItemLayout = {
      labelCol: {
        sm: { span: 24 },
        md: { span: 24 },
        lg: { span: 11},
        xl: { span: 9 }
      },
      wrapperCol: {
        sm: { span: 24 },
        md: { span: 24 },
        lg: { span: 12 },
        xl: { span: 14 }
      }
    };

    const formItemLayout1 = {
      labelCol: {
        sm: { span: 24 },
        md: { span: 24 },
        lg: { span: 6},
        xl: { span: 4}
      },
      wrapperCol: {
        sm: { span: 24 },
        md: { span: 24 },
        lg: { span: 18 },
        xl: { span: 18 }
      }
    };

    const formItemLayout2 = {
      labelCol: {
        sm: { span: 24 },
        md: { span: 24 },
        lg: { span: 6},
        xl: { span: 4}
      },
      wrapperCol: {
        sm: { span: 24 },
        md: { span: 24 },
        lg: { span: 18 },
        xl: { span: 20 }
      }
    };

    const companyList=this.props.companyList.map((item)=>{
      return <Option key={item.compNo} value={item.compNo}>{item.compName}</Option>;
    });

    const mainSearchOrAdd = (
      <div>
        <Form layout="inline">
          <Row>
            <Col sm={{ span: 24 }} lg={{ span: 6 }}>
              <FormItem
                label="运单号"
                {...formItemLayout}
                style={{ width: "100%" }}
              >
                {getFieldDecorator("deliveryno", {
                  rules: [{ required: false }]
                })(
                  <Input
                    className={styles.formItemWidth1}
                    placeholder="请输入运单号"
                    // suffix={this.state.mailNoValue ? <Icon type="close" onClick={this.emptyMailNoValue} /> : null}
                    onChange={this.mailNoValueChange}
                  />
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
                    <Col span={11}>
                      <DatePicker
                        className={styles.formItemWidth2}
                        format="YYYY-MM-DD"
                        placeholder="开始时间"
                        value={this.state.dataValue}
                        onChange={this.dataValueChange}
                      />
                    </Col>
                    <Col span={1} className={styles.drawCenter}>
                      -
                    </Col>
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
            <Col sm={{ span: 24 }} lg={{ span: 6 }}>
              <span className={styles.unSpan}>
                  <a onClick={this.hanldeHighSearch} style={{ marginRight: 20 }}>{this.state.openHighSearch?"收起":"展开"}</a>
                  <Button
                    loading={simpleLoading}
                    onClick={this.handleSearchMail }
                    type="primary"
                    icon="search"
                  >
                    搜索
                  </Button>
              </span>
            </Col>
          </Row>
          {this.state.openHighSearch?<Row>
            <Row>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <FormItem
                  {...formItemLayout}
                  label="企业名称"
                  style={{ width: "100%" }}
                >
                  {getFieldDecorator('eccompanyid', {
                    initialValue:'',
                    rules: [{
                      required: false,
                    }],
                  })(
                    <Select
                      className={styles.formItemWidth1}
                    >
                      <Option key={''} value={''}>全部</Option>
                      {companyList}
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <FormItem
                  {...formItemLayout}
                  label="用户证件号"
                  style={{ width: "100%" }}
                >
                  {getFieldDecorator('usercardid', {
                    rules: [{
                      required: false,
                    }],
                  })(
                    <Input
                      className={styles.formItemWidth1}
                      placeholder="请输入用户身份证件号码"
                      // suffix={cameraId ? <Icon type="close" onClick={this.emptyCameraId} /> : null}
                      // onChange={this.cameraIdValueChange}
                    />
                  )}
                </FormItem>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <FormItem
                  {...formItemLayout}
                  label="用户名"
                  style={{ width: "100%" }}
                >
                  {getFieldDecorator('username', {
                    rules: [{
                      required: false,
                    }],
                  })(
                    <Input
                      className={styles.formItemWidth1}
                      placeholder="请输入用户名"
                      // suffix={cameraId ? <Icon type="close" onClick={this.emptyCameraId} /> : null}
                      // onChange={this.cameraIdValueChange}
                    />
                  )}
                </FormItem>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <FormItem
                  {...formItemLayout}
                  label="电话"
                  style={{ width: "100%" }}
                >
                  {getFieldDecorator('usermobile', {
                    rules: [{
                      required: false,
                    }],
                  })(
                    <Input
                      className={styles.formItemWidth1}
                      placeholder="请输入电话"
                      // suffix={cameraId ? <Icon type="close" onClick={this.emptyCameraId} /> : null}
                      // onChange={this.cameraIdValueChange}
                    />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <FormItem
                  {...formItemLayout}
                  label="税务证号"
                  style={{ width: "100%" }}
                >
                  {getFieldDecorator('taxregno', {
                    rules: [{
                      required: false,
                    }],
                  })(
                    <Input
                      className={styles.formItemWidth1}
                      placeholder="请输入税务证号"
                      // suffix={cameraId ? <Icon type="close" onClick={this.emptyCameraId} /> : null}
                      // onChange={this.cameraIdValueChange}
                    />
                  )}
                </FormItem>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <FormItem
                  {...formItemLayout}
                  label="收派员证件号"
                  style={{ width: "100%" }}
                >
                  {getFieldDecorator('staffcardid', {
                    rules: [{
                      required: false,
                    }],
                  })(
                    <Input
                      className={styles.formItemWidth1}
                      placeholder="请输入收派员身份证件号码"
                      // suffix={cameraId ? <Icon type="close" onClick={this.emptyCameraId} /> : null}
                      // onChange={this.cameraIdValueChange}
                    />
                  )}
                </FormItem>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <FormItem
                  {...formItemLayout}
                  label="收派员姓名"
                  style={{ width: "100%" }}
                >
                  {getFieldDecorator('staffname', {
                    rules: [{
                      required: false,
                    }],
                  })(
                    <Input
                      className={styles.formItemWidth1}
                      placeholder="请输入收派员姓名"
                      // suffix={cameraId ? <Icon type="close" onClick={this.emptyCameraId} /> : null}
                      // onChange={this.cameraIdValueChange}
                    />
                  )}
                </FormItem>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <FormItem
                  {...formItemLayout}
                  label="收派员电话"
                  style={{ width: "100%" }}
                >
                  {getFieldDecorator('staffmobile', {
                    rules: [{
                      required: false,
                    }],
                  })(
                    <Input
                      className={styles.formItemWidth1}
                      placeholder="请输入收派员电话"
                      // suffix={cameraId ? <Icon type="close" onClick={this.emptyCameraId} /> : null}
                      // onChange={this.cameraIdValueChange}
                    />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <FormItem
                  {...formItemLayout}
                  label="收派员地址"
                  style={{ width: "100%" }}
                >
                  {getFieldDecorator('staffaddress', {
                    rules: [{
                      required: false,
                    }],
                  })(
                    <Input
                      className={styles.formItemWidth1}
                      placeholder="请输入收派员地址"
                      // suffix={cameraId ? <Icon type="close" onClick={this.emptyCameraId} /> : null}
                      // onChange={this.cameraIdValueChange}
                    />
                  )}
                </FormItem>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <FormItem
                  {...formItemLayout}
                  label="寄递地址"
                  style={{ width: "100%" }}
                >
                  {getFieldDecorator('senderaddress', {
                    rules: [{
                      required: false,
                    }],
                  })(
                    <Input
                      className={styles.formItemWidth1}
                      placeholder="请输入寄递地址"
                      // suffix={cameraId ? <Icon type="close" onClick={this.emptyCameraId} /> : null}
                      // onChange={this.cameraIdValueChange}
                    />
                  )}
                </FormItem>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                <FormItem
                  {...formItemLayout2}
                  label="入库时间"
                  style={{ width: "100%" }}
                >
                  {getFieldDecorator('utcdate', {
                    rules: [{
                      required: false,
                    }],
                  })(
                    <Row>
                      <Col span={11}>
                        <DatePicker
                          showTime
                          // className={styles.formItemWidth2}
                          style={{width:"100%"}}
                          format="YYYY-MM-DD HH:mm:ss"
                          placeholder="开始时间"
                          onChange={this.dataValueChange2}
                        />
                      </Col>
                      <Col span={1} className={styles.drawCenter}>
                        -
                      </Col>
                      <Col span={11}>
                        <DatePicker
                          showTime
                          // className={styles.formItemWidth2}
                          style={{width:"100%"}}
                          format="YYYY-MM-DD HH:mm:ss"
                          placeholder="结束日期"
                          onChange={this.dataValueChange3}
                        />
                      </Col>
                    </Row>
                  )}
                </FormItem>
              </Col>
            </Row>
          </Row>:null}
        </Form>
      </div>
    );

    return (
      <div className={styles.wrap}>
        {!this.props.showHighSearch ? mainSearchOrAdd : HighSearch}
      </div>
    );
  }
}

export default BusinessInfoSearch;
