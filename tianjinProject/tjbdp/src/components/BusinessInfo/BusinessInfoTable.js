import React from 'react';
import { Table, Card} from 'antd';
import { connect } from "dva/index";

class BusinessInfoTable extends React.Component {
  constructor(props) {
    super(props);
  }

  tableOnShowSizeChange=(page, pageSize)=>{
    // console.log("pageSize2222222222",pageSize);
    // console.log("deliveryno22222",deliveryno);
    // console.log("deliveryno11111",deliveryno);
    this.props.dispatch({
      type:'businessinfo/getBusinessInfo',
      payload:{
        page,
        pageSize,
        ...this.props.value
      }
    });
    // if(deliveryno!={}){
    //   alert(1)
    //   this.props.dispatch({
    //     type:'businessinfo/getBusinessInfo',
    //     payload:{
    //       page,
    //       pageSize,
    //       ...deliveryno
    //     }
    //   });
    // }else if(highValue!={}){
    //   alert(2)
    //   this.props.dispatch({
    //     type:'businessinfo/getBusinessInfo',
    //     payload:{
    //       page,
    //       pageSize,
    //       ...highValue
    //     }
    //   });
    // }
  };

  tableOnChange=(current, size)=>{
    // console.log("current",current);
    // console.log("size",size);
    this.props.dispatch({
      type:'businessinfo/getBusinessInfo',
      payload:{
        page:current,
        pageSize:size,
        ...this.props.value
      }
    });
    // if(deliveryno!={}){
    //   this.props.dispatch({
    //     type:'businessinfo/getBusinessInfo',
    //     payload:{
    //       page:current,
    //       pageSize:size,
    //       ...deliveryno
    //     }
    //   });
    // }else if(highValue!={}){
    //   this.props.dispatch({
    //     type:'businessinfo/getBusinessInfo',
    //     payload:{
    //       page:current,
    //       pageSize:size,
    //       ...highValue
    //     }
    //   });
    // }

  };

  add0=(m)=>{return m<10?'0'+m:m };
  formatDate=(needTime)=>
  {
    //needTime是整数，否则要parseInt转换
    let time = new Date(needTime);
    let y = time.getFullYear();
    let m = time.getMonth()+1;
    let d = time.getDate();
    let h = time.getHours();
    let mm = time.getMinutes();
    let s = time.getSeconds();
    return y+'-'+this.add0(m)+'-'+this.add0(d)+' '+this.add0(h)+':'+this.add0(mm)+':'+this.add0(s);
  }

  timestampToTime=(timestamp)=>{
    let date = new Date(timestamp);
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();

    month = month < 10 ? "0"+month:month;
    day = day < 10 ? "0"+day:day;
    return timestamp = year+'-'+month+'-'+day;
  };

  render() {
    const LPIDFilters=[
      {
        text: '申通',
        value: 'ST',
      }, {
        text: '韵达',
        value: 'TD',
      },{
        text: 'STO',
        value: 'STO',
      },{
        text: '圆通',
        value: 'YRT',
      },{
        text: '中通',
        value: 'ZT',
      },{
        text: '顺丰',
        value: 'SF',
      },{
        text: '邮政',
        value: 'YZ',
      }
    ];
    const mailTypeFilters=[
      {
        text: '线上订单',
        value: '线上订单',
      }, {
        text: '线下订单',
        value: '线下订单',
      },{
        text: '人工面单',
        value: '人工面单',
      },{
        text: '到付面单',
        value: '到付面单',
      }
    ];

    const columns = [
      { title: '运单号',  dataIndex: 'deliveryno', key: 'deliveryno'},
      { title: '企业名称', dataIndex: 'eccompanyname', key: 'eccompanyname'},
      { title: '查验时间', dataIndex: 'checkdate', key: 'checkdate',sorter: (a, b) => a.checkdate >b.checkdate?1:-1},
      { title: '用户证件类型', dataIndex: 'usercardtype', key: 'usercardtype'},
      { title: '用户证件号', dataIndex: 'usercardid', key: 'usercardid'},
      { title: '用户名',dataIndex: 'username', key: 'username' },
      { title: '用户电话', dataIndex: 'usermobile', key: 'usermobile' },
      { title: '机构代码', dataIndex: 'orgcode', key: 'orgcode' },
      { title: '信用代码', dataIndex: 'unifiedsocialcreditcode', key: 'unifiedsocialcreditcode' },
      { title: '税务证号', dataIndex: 'taxregno', key: 'taxregno' },
      { title: '收派员证件类型', dataIndex: 'staffcardtype', key: 'staffcardtype' },
      { title: '收派员证件号', dataIndex: 'staffcardid', key: 'staffcardid' },
      { title: '收派员姓名', dataIndex: 'staffname', key: 'staffname' },
      { title: '收派员电话', dataIndex: 'staffmobile', key: 'staffmobile' },
      { title: '收派员地址', dataIndex: 'staffaddress', key: 'staffaddress' },
      { title: '查验方式', dataIndex: 'checkmethod', key: 'checkmethod' },
      { title: '寄递地址', dataIndex: 'senderaddress', key: 'senderaddress' },
      { title: '入库时间', dataIndex: 'utcdate', key: 'utcdate',sorter: (a, b) => a.utcdate >b.utcdate?1:-1 },
      { title: '时间', dataIndex: 'eventdate', key: 'eventdate'},
      { title: '企业代码', dataIndex: 'eccompanyid', key: 'eccompanyid'},
    ];
    const { dispatch ,current,pageSize,total,businessInfo,tableLoading } = this.props;
    businessInfo.map(item=>{
      item.eventdate=this.timestampToTime(item.eventdate)
    });
    businessInfo.map(item=>{
      item.utcdate=this.formatDate(item.utcdate)
    });
    // console.log("my pageSize",pageSize);
    const pagination={
      current,
      pageSize,
      total,
      showSizeChanger:true,
      showTotal:(total,range)=>`共${total}条记录 耗时`+this.props.spent/1000+"秒",
      onChange:this.tableOnChange,
      onShowSizeChange:this.tableOnShowSizeChange,
    };
    return (
      <div
        style={{marginTop:'6px'}}
      >
        <Table
          loading={tableLoading}
          dataSource={businessInfo}
          columns={columns}
          bordered={false}
          scroll={{ x:'100%'}}
          rowKey="deliveryno"
          pagination={pagination}
        />
      </div>
    );
  }
}

export default BusinessInfoTable;
