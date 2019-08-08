import React, { Component } from "react";
import { Button, Input, Icon, Row, Col, Modal, DatePicker, Form } from "antd";
import BusinessInfoHighSearch from "./BusinessInfoHighSearch";
import styles from "./HighSearch.less";
import moment from "moment";
import { connect } from "dva/index";

const { RangePicker } = DatePicker;
const FormItem = Form.Item;

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
    };
  }

  componentDidMount() {
    const form = this.props.form;
    form.setFieldsValue({
      postBoxId: this.state.mailNoValue,
      start: this.state.dataValue,
      end:this.state.dataValue1,
    });
  }

  dataValueChange = (value) => {
    this.setState({ dataValue: value });
  };

  dataValueChange1 = (value) => {
    this.setState({ dataValue1: value });
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


  render() {
    const { getFieldDecorator } = this.props.form;
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
        lg: { span: 8 },
        xl: { span: 7 }
      },
      wrapperCol: {
        sm: { span: 24 },
        md: { span: 24 },
        lg: { span: 15 },
        xl: { span: 16 }
      }
    };

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
                {getFieldDecorator("postBoxId", {
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
            <Col sm={{ span: 24 }} lg={{ span: 6 }}>
              <FormItem
                label="开始日期"
                {...formItemLayout}
                style={{ width: "100%" }}
              >
                {getFieldDecorator("start", {
                  rules: [{ required: true,message:'开始日期不能为空' }]
                })(
                  <DatePicker
                    className={styles.formItemWidth2}
                    format="YYYY-MM-DD"
                    placeholder="开始日期"
                    onChange={this.dataValueChange}
                  />
                )}
              </FormItem>
            </Col>
            <Col sm={{ span: 24 }} lg={{ span: 6 }}>
              <FormItem
                label="结束日期"
                {...formItemLayout}
                style={{ width: "100%" }}
              >
                {getFieldDecorator("end", {
                  rules: [{ required: true,message:'结束日期不能为空' }]
                })(
                  <DatePicker
                    className={styles.formItemWidth2}
                    format="YYYY-MM-DD"
                    placeholder="结束日期"
                    onChange={this.dataValueChange1}
                  />
                )}
              </FormItem>
            </Col>
            <Col sm={{ span: 24 }} lg={{ span: 6 }}>
              <span className={styles.unSpan}>
                  <Button
                    loading={simpleLoading}
                    onClick={this.searchMail}
                    type="primary"
                    icon="search"
                  >
                    搜索
                  </Button>
                  <a onClick={this.openHighSearch} style={{ marginLeft: 20 }}>高级搜索</a>
              </span>
            </Col>
          </Row>
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
