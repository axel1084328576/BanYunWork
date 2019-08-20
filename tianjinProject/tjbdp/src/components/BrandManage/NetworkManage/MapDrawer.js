import React from 'react';
import { Drawer, Icon, Row } from "antd";
import { Map, Markers } from "react-amap";
import styles from "./HighSearch.less";

export default class MapDrawer extends React.Component {

  renderCarPosition = (item) => {
    return (
      <div className={styles.markerContent}>
        <div
          className={styles.markerIcon}
        >
          <Icon className={styles.carIcon} type="environment" />
        </div>
        <div
          className={styles.carNumber}
        >
          {item.name}
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

    console.log(this.props.mapData)

    return (
      <Map
        plugins={plugins}
        amapkey={'6f3678d577c3367347962b83b9e247fd'}
        version='1.4.0'
        center={this.props.mapData[0].position}
        zoom={20}
      >
        <Markers
          markers={this.props.mapData}
          render={this.renderCarPosition}
        />
      </Map>
    );
  };

  onClose = () => {
    if (this.props.setMapDrawer) {
      this.props.setMapDrawer(false)
    }
  };

  render() {
    return (
      <Drawer
        title="网点位置"
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