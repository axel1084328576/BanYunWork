import React, { PureComponent } from 'react';
import Link from 'umi/link';
import { Menu, Dropdown, Icon, Col } from 'antd';
import RightContent from '../GlobalHeader/RightContent';
import BaseMenu from '../SiderMenu/BaseMenu';
import { getFlatMenuKeys } from '../SiderMenu/SiderMenuUtils';
import styles from './index.less';
import { connect } from 'dva';
import { title } from '../../defaultSettings';
import { thisExpression } from '@babel/types';

@connect(({}) => ({}))
export default class TopNavHeader extends PureComponent {
  state = {
    maxWidth: undefined,
  };

  static getDerivedStateFromProps(props) {
    return {
      maxWidth:
        (props.contentWidth === 'Fixed' && window.innerWidth > 1200 ? 1200 : window.innerWidth) -
        280 -
        120 -
        40,
    };
  }

  handleClick = e => {
    const { dispatch } = this.props;
    if (e.key == 1) {
      dispatch({
        type: 'global/jumpMenuOne',
      });
    } else if (e.key == 2) {
      dispatch({
        type: 'global/jumpMenuTwo',
      });
    } else if (e.key == 3) {
      dispatch({
        type: 'global/jumpMenuThree',
      });
    } else if (e.key == 4) {
      dispatch({
        type: 'global/jumpMenuFour',
      });
    } else if (e.key == 5) {
      dispatch({
        type: 'global/jumpMenuFive',
      });
    } else if (e.key == 6) {
      dispatch({
        type: 'global/jumpMenuSix',
      });
    }
  };

  render() {
    const { theme, contentWidth, menuData, logo } = this.props;
    const { maxWidth } = this.state;
    const flatMenuKeys = getFlatMenuKeys(menuData);
    const { SubMenu } = Menu;

    const menu = (
      <Menu>
        <Menu.Item>1st menu item</Menu.Item>
        <Menu.Item>2nd menu item</Menu.Item>
        <SubMenu title="sub menu">
          <Menu.Item>3rd menu item</Menu.Item>
          <Menu.Item>4th menu item</Menu.Item>
        </SubMenu>
        <SubMenu title="disabled sub menu" disabled>
          <Menu.Item>5d menu item</Menu.Item>
          <Menu.Item>6th menu item</Menu.Item>
        </SubMenu>
      </Menu>
    );

    return (
      <div className={`${styles.head} ${theme === 'light' ? styles.light : ''}`}>
        <div
          ref={ref => {
            this.maim = ref;
          }}
          className={`${styles.main} ${contentWidth === 'Fixed' ? styles.wide : ''}`}
        >
          <div className={styles.left}>
            {/*<div className={styles.logo} key="logo" id="logo">*/}
            {/*  <Link to="/">*/}
            {/*    <img src={logo} alt="logo" />*/}
            {/*    <h1>{title}</h1>*/}
            {/*  </Link>*/}
            {/*</div>*/}
            <div
              style={{
                // maxWidth,
                margin: '0 auto',
              }}
            >
              <div id="nav">
                <ul>
                  <li>
                    <a href="#">行业发展态势分析</a>
                    <ul>
                      <li>
                        <a href="#">普服发展分析</a>
                        <ul>
                          <li>
                            <a href="#">基础设施分析</a>
                          </li>
                          <li>
                            <a href="#">运行状况分析</a>
                          </li>
                          <li>
                            <a href="#">服务能力分析</a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a href="#">快递发展分析</a>
                        <ul>
                          <li>
                            <a href="#">基础设施分析</a>
                          </li>
                          <li>
                            <a href="#">运行状况分析</a>
                          </li>
                          <li>
                            <a href="#">服务能力分析</a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a href="#">行业贡献分析</a>
                        <ul>
                          <li>
                            <a href="#">基础设施分析</a>
                          </li>
                          <li>
                            <a href="#">运行状况分析</a>
                          </li>
                          <li>
                            <a href="#">服务能力分析</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#">行业安全态势分析</a>
                  </li>
                  <li>
                    <a href="#">政策成效分析</a>
                  </li>
                  <li style={{ fontSize: 36, color: '#fff' }}>国家邮政局决策支持系统</li>
                  <li>
                    <a href="#">企业综合分析</a>
                  </li>
                  <li>
                    <a href="#">公共服务贡献分析</a>
                  </li>
                  <li>
                    <a href="#">行业治理综合分析</a>
                    <ul>
                      <li>
                        <a href="#">许可审批效能</a>
                      </li>
                      <li>
                        <a href="#">申诉处置效能</a>
                      </li>
                      <li>
                        <a href="#">行政执法效能</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              {/* <Menu mode="horizontal" onClick={this.handleClick}> */}
              {/* <Menu.Item key="1">
                  行业发展态势分析 
                   </Menu.Item>*/}
              {/* <Menu.Item key="2">
                  行业安全态势分析
                </Menu.Item>
                <Menu.Item key="3">
                  政策成效分析
                </Menu.Item>
                <span style={{ fontSize: 36 }}>国家邮政局决策支持系统</span>
                <Menu.Item key="4">
                  企业综合分析
                </Menu.Item>
                <Menu.Item key="5">
                  公共服务贡献分析
                </Menu.Item>
                <Menu.Item key="6">
                  行业治理综合分析
                </Menu.Item>
              </Menu> */}

              {/* <this.MenuList /> */}
              {/*<BaseMenu {...this.props} flatMenuKeys={flatMenuKeys} className={styles.menu} />*/}
            </div>
          </div>
          <RightContent {...this.props} />
        </div>
      </div>
    );
  }
}
