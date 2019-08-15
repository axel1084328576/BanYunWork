import React,{Component} from 'react';
import { connect } from 'dva';
import ColorModel from './ColorModel';
import {Modal,Row,Col,Icon,Input,Select,Form,Checkbox,Table,message,Button} from 'antd';
import styles from './all.less'

const { Option } = Select;

@connect(({modelDesign}) => {
  const {colorVisible,edgeVisible,list,selectList}=modelDesign;
  return{
    edgeVisible,
    colorVisible,
    selectList,
    list
  }
})

@Form.create()
export default class AddEdge extends Component{
  state={
    colorValue:'#000',
    check:false,
    selectId:null,
    selectValue:"ONE2ONE",
    columns:[
      {
        title:'属性名称',
        dataIndex:'attributeName',
        key: 'attributeName',
      },
      {
        title:'中文描述',
        dataIndex:'attributeDesc',
        key:'attributeDesc',
      },
      {
        title:'属性类型',
        dataIndex:'attributeType',
        key:'attributeType',
      },
      {
        title:'属性默认值',
        dataIndex:'attributeValue',
        key:'attributeValue',
      },
      {
        title: "",
        dataIndex: "operation",
        key: "operation",
        render: (text, record) => {
          return (
            <Icon type="minus-circle" style={{color:"red"}} onClick={()=>{this.delSelectList(record)}}/>
          )
        }
      }
    ],
    data:[],
  };

  delSelectList=(value)=>{
    let listData=this.state.data;
    let index=listData.indexOf(value);
    if (index > -1) {
      listData.splice(index, 1);
    }
    this.setState({
      data:listData
    })
  };

  handleSubmit=(e)=>{
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.color=this.state.colorValue;
        values.attribute=this.state.data;
        values.multiplicity=this.state.selectValue;
        if(this.state.check){
          values.reverseType=1;
          values.arrows='to,from';
        }else{
          values.reverseType=0;
        }
        if(this.props.addEdge){
          this.props.addEdge(values)
        }
      }
    });
  };

  handleEdgeCancel=()=>{
    this.props.dispatch({
      type:'modelDesign/setEdgeVisible',
      payload:false
    });
    if(this.props.network){
      this.props.network.disableEditMode()
    }
  };

  showColor=()=>{
    this.props.dispatch({
      type:'modelDesign/setColorVisible',
      payload:true
    })
  };

  getColorValue=(value)=>{
    this.setState({
      colorValue:value
    })
  };

  onCheckBoxChange=(e)=>{
    this.setState({
      check:e.target.checked
    })
  };

  onSelectChange=(value)=>{
    this.setState({
      selectId:value,
    });
  };

  onSelectSearch=(value)=>{
    this.props.dispatch({
      type:'modelDesign/findAtr',
      payload:{
        attributeName:value,
      },
    })
  };

  addTableList=()=>{
    if(this.state.selectId!=undefined  &&  this.state.selectId!=null){
      this.props.dispatch({
        type:'modelDesign/getAtr',
        payload:{
          id:this.state.selectId,
        },
        callback:()=>{
          let dataList=this.state.data;
          let isPush=true;
          dataList.map((item)=>{
            if(item==undefined || item==null){
              isPush=true
            }else if(item.id!=this.props.selectList.id){
              isPush=true
            }else{
              isPush=false
            }
          });
          if(isPush){
            dataList.push(this.props.selectList);
            this.setState({
              data:dataList
            })
          }else{
            message.warning("该属性值已存在!")
          }
        }
      })
    }else{
      message.warning("请先输入需要搜索的内容")
    }
  };

  selectChange=(value)=>{
    // console.log("value",value);
    this.setState({
      selectValue:value,
    })
  };

  render(){
    const { getFieldDecorator } = this.props.form;
    const formTailLayout = {
      labelCol: { span:20},
      wrapperCol: { span:4},
    };

    const list=this.props.nodeList.map((item,index)=>{
      return(
        <Option key={index} value={item.id}>{item.label}</Option>
      )
    });
    const children=this.state.data.map((item,index)=>{
      return <Option key={index} value={item.id}>{item.attributeName}</Option>;
    });
    // console.log("this.props.clickEdge",this.props.clickEdge);
    return(
      <Modal
        title="增加边"
        visible={this.props.edgeVisible}
        onOk={this.handleSubmit}
        onCancel={this.handleEdgeCancel}
        // className={styles.ModalScroll}
        maskStyle={{
          backgroundColor:'rgba(0,0,0,0.45)'
        }}
        bodyStyle={{
          padding:12
        }}
        style={{
          top:50
        }}
      >
        {this.props.colorVisible?<ColorModel getColorValue={this.getColorValue} />:null}
        <Row gutter={12} type="flex" justify="space-around" align="middle">
          <Col span={12}>
            <Form.Item
              label={<span style={{fontSize:12}}>边的英文名称</span>}
            >
              {getFieldDecorator('label', {
                rules: [{ required: true, message:'边的英文名称不能为空!'}],
              })(
                <Input placeholder="请输入边的英文名称" style={{width:"100%"}} />
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={<span style={{fontSize:12}}>边的中文描述</span>}
            >
              {getFieldDecorator('edgeDesc', {
                rules: [{ required: true, message:'边的中文描述不能为空!'}],
              })(
                <Input placeholder="请输入边的中文描述" style={{width:"100%"}} />
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12} type="flex" justify="space-around" align="middle">
          <Col span={12} style={{fontSize:12}}>
            <Form.Item
              label={<span style={{fontSize:12}}>起始节点</span>}
            >
              {getFieldDecorator('sourceVertex', {
                initialValue:this.props.clickEdge.from,
                rules: [{ required: true, message:'起始节点名称不能为空!'}],
              })(
                <Select style={{width:"100%"}} placeholder="请选择起始节点">
                  {list}
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col span={12} style={{fontSize:12}}>
            <Form.Item
              label={<span style={{fontSize:12}}>结束节点</span>}
            >
              {getFieldDecorator('targetVertex', {
                initialValue:this.props.clickEdge.to,
                rules: [{ required: true, message:'结束节点名称不能为空!'}],
              })(
                <Select style={{width:"100%"}} placeholder="请选择结束节点">
                  {list}
                </Select>
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row type="flex" align="middle" style={{marginBottom:20}}>
          <Col span={7}>
            <Checkbox onChange={this.onCheckBoxChange}><span style={{fontSize:12}}>是否有双向关系</span></Checkbox>
          </Col>
          <Col span={17}>
            <Row type="flex" align="middle">
              <Col span={3}>
                <span style={{fontSize:12}}>边类型</span>
              </Col>
              <Col span={21}>
                <Select style={{width:"100%"}} placeholder="请选择边类型" defaultValue="ONE2ONE" onChange={this.selectChange}>
                  <Option value="ONE2ONE">ONE2ONE</Option>
                  <Option value="MANY2ONE">MANY2ONE</Option>
                  <Option value="ONE2MANY">ONE2MANY</Option>
                  <Option value="MULTI">MULTI</Option>
                  <Option value="SIMPLE">SIMPLE</Option>
                </Select>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row style={{fontSize:12}}>
          实体外观
        </Row>
        <Row type="flex" align="middle" gutter={6} style={{marginBottom:14,padding:4,borderWidth:1,borderStyle:"solid",borderColor:"#DCDCDC"}}>
          <Col span={3}>
            <Icon type="swap-right" style={{fontSize:36,color:this.state.colorValue}} />
          </Col>
          <Col span={21}>
            <Input placeholder="请输入16进制色" style={{width:"100%"}} onClick={this.showColor}  value={this.state.colorValue} />
          </Col>
        </Row>
        <Row style={{fontSize:12}}>
          属性
        </Row>
        <Row style={{marginBottom:14,padding:4,borderWidth:1,borderStyle:"solid",borderColor:"#DCDCDC"}} gutter={12}>
          <Col span={22}>
            <Select
              style={{width:"100%"}}
              showSearch
              allowClear={true}
              placeholder="请输入所需添加的属性值"
              optionFilterProp="children"
              onSearch={this.onSelectSearch}
              onChange={this.onSelectChange}
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {this.props.list.map((item,index)=>{
                return(
                  <Option key={index} value={item.id}>{item.attributeName}</Option>
                )
              })}
            </Select>
          </Col>
          <Col span={2}>
            <Button  type="primary" shape="circle" icon="plus" onClick={this.addTableList}/>
          </Col>
        </Row>
        {this.state.data.length>0?<Row>
          <Table
            size="small"
            columns={this.state.columns}
            dataSource={this.state.data}
            key="attributeName"
            pagination={false}
          />
        </Row>:null}
      </Modal>
    )
  }
}
