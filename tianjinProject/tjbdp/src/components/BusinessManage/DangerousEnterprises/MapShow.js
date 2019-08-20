import React from 'react';
import { Drawer, Icon } from "antd";
import { Map, Markers, Circle } from "react-amap";
import AMapJS from 'amap-js';
import styles from "./HighSearch.less";

export default class MapShow extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            rowData: props.rowData,
            aMapJSAPILoader: null,
            // 要在地图上展示的标记点，先把所选点标记
            showNet: [{ position: [this.props.rowData.lon, this.props.rowData.lat] }],
            // 同步标记，距离查询完毕后绘制amap
            syno: false
        }
    }

    componentWillMount() {
        this.state.aMapJSAPILoader = new AMapJS.AMapJSAPILoader({
            key: '6f3678d577c3367347962b83b9e247fd',
            v: "1.4.0", // 版本号
            params: {}, // 请求参数
            protocol: "https:" // 请求协议
        });
        let showNet = this.state.showNet;
        let center = [this.state.rowData.lon, this.state.rowData.lat];
        for (let i = 0; i < this.props.netList.length; i++) {

            const temp = {
                // position: {
                //     longitude: element.longitude,
                //     latitude: element.latitude
                // }
                position: [this.props.netList[i].longitude, this.props.netList[i].latitude]
            }

            const _this = this;
            // 调用load方法加载loader并调用执行回调。
            this.state.aMapJSAPILoader.load()
                .then(function (AMap) {
                    if (AMap.GeometryUtil.distance(center, temp.position) <= 1500) {
                        showNet.push(temp);
                    } // 请求成功
                    if (i == _this.props.netList.length - 1) {
                        _this.setState({ showNet: showNet, syno: true });
                    }
                })
                .catch(function (e) {
                    console.log(e)
                    // 请求失败
                })
                .finally(function () {

                    // 总是执行
                });
        }
    }

    renderCarPosition = (item) => {
        return (
            <div className={styles.markerContent}>
                <div
                    className={styles.markerIcon}
                >
                    <Icon className={styles.carIcon} type="environment" />
                </div>
            </div>
        );
    };

    renderMap = () => {
        const plugins = ['OverView', 'Scale'];
        const mapStyle = [{
            '.amap-logo': {
                'display': 'none'
            },
            '.amap-copyright': {
                display: 'none'
            }
        }]
        let center = [this.state.rowData.lon, this.state.rowData.lat];
        const style = {
            fillOpacity: 0.8,
            fillColor: '#87CEEB',
            strokeColor: '#87CEEB'
        }
        if (this.state.syno) {
            return (
                <Map
                    plugins={plugins}
                    amapkey={'6f3678d577c3367347962b83b9e247fd'}
                    version='1.4.0'
                    center={center}
                    zoom={14}
                >
                    <Markers
                        markers={this.state.showNet}
                        // markers={this.state.mapData}
                        render={this.renderCarPosition}
                    />
                    <Circle
                        center={center}
                        radius={1500}
                        style={style}
                    ></Circle>
                </Map >
            );
        } else {
            <Map
                plugins={plugins}
                amapkey={'6f3678d577c3367347962b83b9e247fd'}
                version='1.4.0'
                center={center}
                zoom={14}
            >
                <Markers
                    // markers={this.state.showNet}
                    // markers={this.state.mapData}
                    render={this.renderCarPosition}
                />
                <Circle
                    center={center}
                    radius={1500}
                ></Circle>
            </Map>
        }


    };

    onClose = () => {
        if (this.props.setMapShow) {
            this.props.setMapShow(false)
        }
    };

    render() {
        return (
            <Drawer
                title="企业位置及周边网点"
                width={800}
                visible={this.props.mapVisible}
                onClose={this.onClose}
            >
                <div
                    className={styles.mapContainer}
                >
                    {this.renderMap()}
                </div>
            </Drawer>
        )
    }
}