
import React from 'react';
import echarts from 'echarts';
import { connect } from 'dva';
import { Modal, Col, Statistic, Row, Table, Card } from 'antd';

@connect(({ infoSafeGuard }) => {
    const { netInfo } = infoSafeGuard;
    return {
        netInfo: netInfo
    }
})


export default class NetModal extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            visible: props.modalVisible,
            carNumber: 34,
            ajjNumber: 9,
            number: 123,
            rowData: props.data,
            columns: [
                {
                    title: "网点名称",
                    dataIndex: "statName",
                    key: "statName",
                    width: 100,
                },
                {
                    title: "品牌编码",
                    dataIndex: "compNo",
                    key: "compNo",
                    width: 100,
                }, {
                    title: "网点地址",
                    dataIndex: "address",
                    key: "address",
                    width: 100,
                }, {
                    title: "网点类型",
                    dataIndex: "networkType",
                    key: "networkType",
                    width: 100,
                },
                {
                    title: "网点负责人",
                    dataIndex: "contact",
                    key: "contact",
                    width: 100,
                }, {
                    title: "电话",
                    dataIndex: "tel",
                    key: "tel",
                    width: 100,
                }, {
                    title: "许可备案名称",
                    dataIndex: "websiteLicenseName",
                    key: "websiteLicenseName",
                    width: 100,
                }
            ],
            data: props.data.worklist
        }
    }

    componentDidMount() {

        const { dispatch } = this.props;
        dispatch({
            type: "infoSafeGuard/getNetInfo",
            payload: {
                compNo: this.props.data.worklist[0].compNo,
                networkNo: this.props.data.worklist[0].statCode,
                token: sessionStorage.getItem('sys-token'),
            }
        })

        setTimeout(() => {
            this.initOption();
        }, 1000);
    }

    componentDidUpdate() {
        this.initOption();
    }

    handleCancel = () => {
        if (this.props.setModalVisible)
            this.props.setModalVisible(false)
    }



    initOption() {
        const myCharts = echarts.init(document.getElementById('option'));

        let data = [
            [this.props.netInfo.personneAndbrandPercentage > 0 ? this.props.netInfo.personneAndbrandPercentage : 0, this.props.netInfo.personneAndbrandPercentage != undefined ? 100 - this.props.netInfo.personneAndbrandPercentage : 1],
            [this.props.netInfo.personneAndpersonnPercentage > 0 ? this.props.netInfo.personneAndpersonnPercentage : 0, this.props.netInfo.personneAndpersonnPercentage != undefined ? 100 - this.props.netInfo.personneAndpersonnPercentage : 1],
            [this.props.netInfo.brandpersonallPercentage > 0 ? this.props.netInfo.brandpersonallPercentage : 0, this.props.netInfo.brandpersonallPercentage != undefined ? 100 - this.props.netInfo.brandpersonallPercentage : 1]
        ]
        myCharts.setOption({
            title: [
                {
                    text: '人数品牌比' + data[0][0] + '%',
                    left: '10%',
                    top: '5%'
                },
                {
                    text: '人数占比' + data[1][0] + '%',
                    left: '45%',
                    top: '5%'
                },
                {
                    text: '品牌人数占比' + data[2][0] + '%',
                    left: '80%',
                    top: '5%'
                }
            ],
            series: [
                {
                    name: '人数品牌比',
                    type: 'pie',
                    center: ['15%', '60%'],
                    // radius: ['20%', '50%'],
                    areaStyle: {},
                    lineStyle: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    },
                    data: data[0],
                    silent: true
                },
                {
                    name: '人数占比',
                    type: 'pie',
                    center: ['50%', '60%'],
                    // radius: ['20%', '50%'],
                    areaStyle: {},
                    lineStyle: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    },
                    data: data[1],
                    silent: true
                },
                {
                    name: '品牌人数占比',
                    type: 'pie',
                    center: ['85%', '60%'],
                    // radius: ['20%', '50%'],
                    areaStyle: {},
                    lineStyle: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    },
                    data: data[2],
                    silent: true
                },
            ]
        });
    }

    render() {
        return (
            <div>
                <Modal
                    title="所属网点信息"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                    width={'60%'}>

                    <Table
                        columns={this.state.columns}
                        dataSource={this.state.data}
                        pagination={false}
                        scroll={{ x: '100%' }} />
                    <Card>
                        <Row>
                            <Col span={6} offset={2}>
                                <Statistic title="网点人员总数" value={this.props.netInfo.personall} suffix="/人" />
                            </Col>
                            <Col span={6} offset={2}>
                                <Statistic title="网点车辆总数" value={this.state.carNumber} suffix="/辆" />
                            </Col>
                            <Col span={6} offset={2}>
                                <Statistic title="安检机总数" value={this.state.ajjNumber} suffix="/台" />
                            </Col>
                        </Row>
                    </Card>

                    <div id={'option'} style={{ height: '200px' }}></div>

                </Modal>
            </div>
        )
    }
}