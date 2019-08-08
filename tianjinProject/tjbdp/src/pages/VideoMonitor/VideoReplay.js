import React,{Component} from 'react';
import {Card,Table,Button,Row,Col,Input,Icon,Popconfirm,Select,Form,InputNumber,Modal,Divider} from 'antd';
import {connect} from 'dva';
import VideoHighSearch from '../../components/VideoMonitor/HighSearch';
import VideoAddSearch from '../../components/VideoMonitor/AddModal';
import VideoEditSearch from '../../components/VideoMonitor/EditModal';
import download from 'downloadjs';
import styles from './VideoReplay.less';

const Option = Select.Option;

@connect(({ videoReplay,loading,getPagePage,expressNetwork }) => {
  const {videoList,pageSize,total,controlList,page}=videoReplay;
  const {pagePath}=getPagePage;
  const {expressList}=expressNetwork;
  return{
    page,
    videoList,
    pageSize,
    total,
    controlList,
    pagePath,
    expressList,
    videoLoading: loading.effects['videoReplay/List'],
    delLoading: loading.effects['videoReplay/Del'],
  }
})

@Form.create()
export default class VideoReplay extends Component{
  state={
    showSearch:false,
    nameValue:'',
    infoVisible:false,
    editVisible:false,
    videoVisible:false,
    selectedRows:"",
    selectedRowKeys:[],
    rowData:"",
    highSearchValue:{},
    openHighSearch:false,

    columns:[{
      title: '摄像头编号',
      dataIndex: 'videoNo',
      key:'cameraId',
    }, {
      title: '摄像头品牌',
      dataIndex: 'brand',
      key: 'brand',
    }, {
      title: '摄像头厂家',
      dataIndex: 'producter',
      key: 'producter',
    }, {
      title: '厂家联系人',
      dataIndex: 'contact',
      key: 'contact',
    }, {
      title: '厂家联系方式',
      dataIndex: 'tel',
      key: 'tel',
    }, {
      title:'摄像头安装位置',
      children:[{
        title:'经度',
        dataIndex: 'longitude',
        key: 'longitude',
      },{
        title:'纬度',
        dataIndex: 'latitude',
        key: 'latitude',
      }]
    },{
      title: '地址',
      dataIndex: 'address',
      key: 'address',
    },{
      title: '归属网点',
      dataIndex: 'workStation.statName',
      key:'workStation.statName',
    },{
      title: '',
      dataIndex: 'operation',
      // fixed: 'right',
      // width:200,
      render: (text, record) => {
        return (
          <span>
            <a href="javascript:" onClick={this.showVideoModal}>查看</a>
            <Divider type="vertical" />
            <a href="javascript:" onClick={this.handleSave}>保存</a>
            {this.props.controlList.video_mod? <Divider type="vertical" />:null}
            {this.props.controlList.video_mod? <a href="javascript:" onClick={()=>{this.showEditModal(record)}}>修改</a>:null}
            {this.props.controlList.video_mod && this.props.controlList.video_del?<Divider type="vertical" />:null}
            {
              this.props.controlList.video_del?
                (this.props.videoList.length>= 1
                  ?(
                    <Popconfirm title="是否要删除选中的用户信息?" placement="bottomRight" onConfirm={() => {this.rowDel(record)}}>
                      <a href="javascript:;" style={{color:"#f5222d"}}>删除</a>
                    </Popconfirm>
                  ):null):null
            }
          </span>
        );
      },
    }],
  };

  componentWillMount(){
    // console.log("this.props.pagePath",this.props.pagePath);
    const { dispatch } = this.props;
    dispatch({
      type:"videoReplay/Control",
      payload:{
        menuCode:this.props.pagePath,
        token:sessionStorage.getItem('sys-token'),
      }
    })
  }

  componentDidMount(){
    const { dispatch } = this.props;
    const form = this.props.form;
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type:'videoReplay/List',
          payload:{
            page: 1,
            pageSize:10,
            ...values,
            token:sessionStorage.getItem('sys-token'),
          }
        });
      }
    });
    dispatch({
      type: 'expressNetwork/List',
      payload:{
        token:sessionStorage.getItem('sys-token'),
      }
    });
  }

  rowDel = (key) => {
    const {dispatch}=this.props;
    dispatch({
      type:'videoReplay/Del',
      payload:{
        opType:"del",
        ids:key.sid,
        token:sessionStorage.getItem('sys-token'),
      },
    });
  };

  moreRowDel = () => {
    const {selectedRows}=this.state;
    const delMoreRows=[];
    selectedRows.map((item)=>{
      delMoreRows.push(item.sid)
    });
    const {dispatch}=this.props;
    dispatch({
      type:'videoReplay/Del',
      payload:{
        ids:delMoreRows.join(","),
        opType:"del",
        token:sessionStorage.getItem('sys-token'),
      },
    });
  };

  handleSave=()=>{
    download("https://media.w3.org/2010/05/sintel/trailer_hd.mp4","mppp4");
  };

  emptyNameValue = () => {
    this.setState({nameValue:''});
  };

  nameValueChange = (value) => {
    this.setState({nameValue:value.target.value});
  };

  openHighSearch = () => {
    this.setState({ showSearch:!this.state.showSearch});
  };


  highSearch = (value) => {
    this.setState({ showSearch:value});
  };

  showEditModal=(record)=>{
    this.setState({
      editVisible: true,
      rowData:record,
    });
  };

  handleVideoOk = () => {
    this.setState({  videoVisible: false });
  };

  handleVideoCancel = () => {
    this.setState({ videoVisible: false});
  };

  showInfoModal=()=>{
    this.setState({
      infoVisible: true,
    });
  };

  showVideoModal=()=>{
    this.setState({
      videoVisible: true,
    });
  };

  handleSearch = () => {
    // let oInput = document.querySelector('#cameraId');
    // let onInput = oInput.value.trim();
    const form = this.props.form;
    const { dispatch } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'videoReplay/List',
          payload:{
            page: 1,
            pageSize:10,
            ...values,
            token:sessionStorage.getItem('sys-token'),
          },
        });
      }
    })
  };

  videoVisible=(value)=>{
    this.setState({
      infoVisible: value,
    });
  };

  videoEditVisible=(value)=>{
    this.setState({
      editVisible: value,
    });
  };

  getHighSearch=(value)=>{
    this.setState({highSearchValue:value})
  };

  tableOnChange=(current, size)=>{
    const form = this.props.form;
    form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type:'videoReplay/List',
          payload:{
            page:current,
            pageSize:size,
            ...values,
            token:sessionStorage.getItem('sys-token'),
          }
        });
      }
    })
  };

  tableOnShowSizeChange=(page, pageSize)=>{
    const form = this.props.form;
    form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type:'videoReplay/List',
          payload:{
            page,
            pageSize,
            ...values,
            token:sessionStorage.getItem('sys-token'),
          }
        });
      }
    });
  };

  hanldeHighSearch = () => {
    this.setState({
      openHighSearch:!this.state.openHighSearch
    })
  };

  onChanged=(selectedRowKeys, selectedRows) => {
    // console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
    this.setState({ selectedRows: selectedRows,selectedRowKeys:selectedRowKeys})
  };

  render(){
    const {columns,showSearch,infoVisible,selectedRowKeys,selectedRows,rowData}=this.state;
    const { videoList,videoLoading,delLoading,pageSize,total}=this.props;
    // console.log("newVideoList",videoList);
    const children = this.props.expressList.map((item) => {
      return <Option key={item.sid} value={item.sid}>{item.statName}</Option>;
    });
    const { getFieldDecorator } = this.props.form;
    const FormItem = Form.Item;
    const rowSelection = {
      selectedRowKeys:selectedRowKeys,
      onChange: this.onChanged,
    };
    const pagination={
      current:this.props.page,
      pageSize,
      total,
      showSizeChanger:true,
      showTotal:(total,range)=>`共${total}条记录`,
      onChange:this.tableOnChange,
      onShowSizeChange:this.tableOnShowSizeChange,
      // pageSizeOptions:['1','5','10'],
    };
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

    const normalSearch=(
      <div className={styles.searchRow}>
        <Form layout="inline">
          <Row>
            <Col sm={{ span: 24 }} lg={{ span: 6 }}>
              <FormItem
                label="摄像头编号"
                {...formItemLayout}
                style={{ width: "100%" }}
              >
                {getFieldDecorator("videoNo", {
                  rules: [{ required: false }]
                })(
                  <Input
                    id="cameraId"
                    className={styles.formItemWidth}
                    placeholder="请输入摄像头编号"
                    // value={this.state.nameValue}
                    // suffix={this.state.nameValue ? <Icon type="close" onClick={this.emptyNameValue} /> : null}
                    onChange={this.nameValueChange}
                  />
                )}
              </FormItem>
            </Col>
            <Col xs={{ span: 12 }} sm={{ span: 12 }} lg={{ span:6 }}>
              <span className={styles.unSpan}>
                 <a onClick={this.hanldeHighSearch} style={{ marginRight: 20 }}>{this.state.openHighSearch?"收起":"展开"}</a>
                  <Button  type="primary" icon="search" onClick={this.handleSearch}>搜索</Button>
                  {/*<a onClick={this.openHighSearch} style={{ marginLeft: 20 }}>高级搜索</a>*/}
              </span>
            </Col>
            <Col xs={{ span: 12 }} sm={{ span: 12 }} lg={{offset:6,span:6}}>
              <Row type="flex" justify="end">
                <span className={styles.unSpan1}>
                   {
                     this.props.controlList.video_del?
                       ( selectedRowKeys.length>0? <Popconfirm
                         okText="确定"
                         cancelText="取消"
                         title="是否要删除选中的用户信息?"
                         placement="bottomRight"
                         onConfirm={this.moreRowDel}
                       >
                         <Button type="primary" className={styles.allDelete} loading={delLoading}>删除</Button>
                       </Popconfirm>:null):null
                   }
                  {this.props.controlList.video_add?<Button style={{ marginLeft: 10 }} type="primary" icon="plus" onClick={this.showInfoModal}>添加</Button>:null}
                </span>
              </Row>
            </Col>
          </Row>
          {this.state.openHighSearch?<Row>
            <Row>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <FormItem
                  {...formItemLayout}
                  label="摄像头品牌"
                  style={{ width: "100%" }}
                >
                  {getFieldDecorator('brand', {
                    rules: [{
                      required: false, message: '请输入摄像头品牌!',
                    }],
                  })(
                    <Input
                      style={{ width: "100%" }}
                      placeholder="请输入摄像头品牌"
                      // suffix={cameraBrandValue ? <Icon type="close" onClick={this.emptyCameraBrand} /> : null}
                      // onChange={this.cameraBrandValueChange}
                    />
                  )}
                </FormItem>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <FormItem
                  {...formItemLayout}
                  label="摄像头厂家"
                  style={{ width: "100%" }}
                >
                  {getFieldDecorator('producter', {
                    rules: [{
                      required: false, message: '请输入摄像头厂家!',
                    }],
                  })(
                    <Input
                      style={{ width: "100%" }}
                      placeholder="请输入摄像头厂家"
                      // suffix={cameraManufactorValue ? <Icon type="close" onClick={this.emptyCameraManufactor} /> : null}
                      // onChange={this.cameraManufactorValueChange}
                    />
                  )}
                </FormItem>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <FormItem
                  {...formItemLayout}
                  label="厂家联系人"
                  style={{ width: "100%" }}
                >
                  {getFieldDecorator('contact', {
                    rules: [{
                      required: false, message: '请输入厂家联系人!',
                    }],
                  })(
                    <Input
                      style={{ width: "100%" }}
                      placeholder="请输入厂家联系人"
                      // suffix={manufactorContactsValue ? <Icon type="close" onClick={this.emptyManufactorContacts} /> : null}
                      // onChange={this.manufactorContactsValueChange}
                    />
                  )}
                </FormItem>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <FormItem
                  {...formItemLayout}
                  label="厂家联系方式"
                  style={{ width: "100%" }}
                >
                  {getFieldDecorator('tel', {
                    rules: [{
                      required: false, message: '请输入厂家联系方式!',
                    }],
                  })(
                    <Input
                      style={{ width: "100%" }}
                      placeholder="请输入厂家联系方式"
                      // suffix={manufactorTelValue ? <Icon type="close" onClick={this.emptyManufactorTel} /> : null}
                      // onChange={this.manufactorTelValueChange}
                    />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <FormItem
                  {...formItemLayout}
                  label="经度"
                  style={{ width: "100%" }}
                >
                  {getFieldDecorator('longitude', {
                    rules: [{
                      required: false, message: '请输入经度!',
                    }],
                  })(
                    <Input
                      style={{width:"100%"}}
                      placeholder="请输入经度"
                      // suffix={longitudeValue ? <Icon type="close" onClick={this.emptyLongitude} /> : null}
                      // onChange={this.longitudeValueChange}
                    />
                  )}
                </FormItem>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <FormItem
                  {...formItemLayout}
                  label="纬度"
                  style={{ width: "100%" }}
                >
                  {getFieldDecorator('latitude', {
                    rules: [{
                      required: false, message: '请输入纬度!',
                    }],
                  })(
                    <Input
                      style={{width:"100%"}}
                      placeholder="请输入纬度"
                      // suffix={latitudeValue ? <Icon type="close" onClick={this.emptyLatitude} /> : null}
                      // onChange={this.latitudeValueChange}
                    />
                  )}
                </FormItem>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <FormItem
                  {...formItemLayout}
                  label="地址"
                  style={{ width: "100%" }}
                >
                  {getFieldDecorator('address', {
                    rules: [{
                      required: false, message: '请输入地址!',
                    }],
                  })(
                    <Input
                      style={{ width: "100%" }}
                      placeholder="请输入地址"
                      // suffix={address? <Icon type="close" onClick={this.emptyAddress} /> : null}
                      // onChange={this.addressValueChangec }
                    />
                  )}
                </FormItem>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 6 }}>
                <FormItem
                  {...formItemLayout}
                  label="归属网点"
                  style={{ width: "100%" }}
                >
                  {getFieldDecorator('stationId', {
                    rules: [{
                      required: false, message: '请输入归属网点!',
                    }],
                  })(
                    <Select
                      style={{ width: "100%" }}
                      showSearch
                      placeholder="请选择"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {children}
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
          </Row>:null}
        </Form>
      </div>
    );
    return (
      <Card>
        <Modal
          visible={this.state.videoVisible}
          onOk={this.handleVideoOk}
          onCancel={this.handleVideoCancel}
          style={{ height: 480 }}
          width={690}
          centered={false}
          maskClosable={false}
          closable={false}
          okText="保存"
          cancelText="取消"
        >
          <object
            type='application/x-vlc-plugin'
            id='vlc'
            events='True'
            width="640"
            height="480"
            pluginspage="http://www.videolan.org"
            codebase="http://comic.sjtu.edu.cn/vlc/cab/axvlc.cab"
          >
            <param name='mrl' value='rtsp://184.72.239.149/vod/mp4://BigBuckBunny_175k.mov'/>
            <param name='volume' value='50'/>
            <param name='autoplay' value='true'/>
            <param name='loop' value='false'/>
            <param name='fullscreen' value='true'/>
            <embed
              type="application/x-vlc-plugin"
              pluginspage="http://www.videolan.org"
              width="640"
              height="480"
              mrl="rtsp://184.72.239.149/vod/mp4://BigBuckBunny_175k.mov"
              id="vlc"
              mute="true"
            />
          </object>
        </Modal>
        {
          infoVisible?<VideoAddSearch videoVisible={this.videoVisible} showVideoModal={infoVisible}/>:null
        }
        {
          !showSearch?normalSearch:<VideoHighSearch showSearch={this.highSearch} getHighSearch={this.getHighSearch}/>
        }
        {
          this.state.editVisible?<VideoEditSearch videoEditVisible={this.videoEditVisible} showVideoEditModal={this.state.editVisible} rowData={rowData}/>:null
        }
        <Table
          bordered
          dataSource={videoList}
          columns={columns}
          rowSelection={rowSelection}
          loadind={videoLoading}
          scroll={{x:"100%"}}
          rowKey="sid"
          pagination={pagination}
          onRow={(record) => {
            return { onClick: (event) => {
                // console.log("record",record);
                if(selectedRowKeys.indexOf(record.sid) > -1){
                  let index=selectedRowKeys.indexOf(record.sid);
                  selectedRowKeys.splice(index, 1);
                  this.setState({
                    selectedRowKeys
                  })
                }else{
                  selectedRowKeys.push(record.sid);
                  this.setState({
                    selectedRowKeys
                  })
                }
                // console.log("selectedRowKeys",selectedRowKeys);
              }};
          }}
        />
      </Card>
    );
  }
}

