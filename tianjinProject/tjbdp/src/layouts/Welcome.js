import React, { Component } from 'react';
import styles from './welcome.less'
import logo from '../assets/logo.svg';

/**
 * 欢迎页面
 */
class welcomeComponent extends Component {

    render() {

        console.log(styles.title)

        return (
            <div>
                <h1 className={styles.title}>天津市邮政管理局电商与快递信息公益性服务平台</h1>
                <h2 className={styles.subTitle}>欢迎您</h2>
                <div className={styles.imgStyle}>
                    <img src={logo} />
                </div>
            </div>
        )
    }

}
export default welcomeComponent;