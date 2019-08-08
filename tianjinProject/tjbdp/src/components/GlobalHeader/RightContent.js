import React, { PureComponent } from 'react';
import { FormattedMessage, formatMessage, setLocale, getLocale } from 'umi/locale';
import { Spin, Icon, Divider, Avatar, Tooltip,Dropdown,Menu, Button } from 'antd';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import NoticeIcon from '../NoticeIcon';
import HeaderSearch from '../HeaderSearch';
import styles from './index.less';

export default class GlobalHeaderRight extends PureComponent {

  componentDidMount(){
    const {dispatch,currentUser} = this.props;
    if(typeof currentUser === 'undefined' || typeof currentUser.chnName === 'undefined'){
      dispatch({
        type: 'login/reloadLogin',
        payload:{
          token:sessionStorage.getItem('sys-token'),
        }
      });
    }
  }

  getNoticeData() {
    const { notices = [] } = this.props;
    if (notices.length === 0) {
      return {};
    } 
    const newNotices = notices.map(notice => {
      const newNotice = { ...notice };
      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime).fromNow();
      }
      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }
      if (newNotice.extra && newNotice.status) {
        const color = {
          todo: '',
          processing: 'blue',
          urgent: 'red',
          doing: 'gold',
        }[newNotice.status];
        newNotice.extra = (
          <Tag color={color} style={{ marginRight: 0 }}>
            {newNotice.extra}
          </Tag>
        );
      }
      return newNotice;
    });
    return groupBy(newNotices, 'type');
  }

  changLang = () => {
    const locale = getLocale();
    if (!locale || locale === 'zh-CN') {
      // setLocale('en-US');
      setLocale('zh-CN');
    } else {
      setLocale('zh-CN');
    }
  };

  render() {

    const {
      currentUser,
      fetchingNotices,
      onNoticeVisibleChange,
      onMenuClick,
      onNoticeClear,
      theme,
      dispatch,
    } = this.props;

    const menuItem = (
      <Menu>
        <Menu.Item>
          <a onClick={()=>{onMenuClick({key:2})}}>
            <Icon type="key" />
            <Divider type="vertical" />
            密码修改
          </a>
        </Menu.Item>
        <Menu.Item>
          <a onClick={()=>{onMenuClick({key:1})}}>
            <Icon type="logout" />
            <Divider type="vertical" />
            退出登入
          </a>
        </Menu.Item>
      </Menu>
    );

    const noticeData = this.getNoticeData();
    let className = styles.right;
    if (theme === 'dark') {
      className = `${styles.right}  ${styles.dark}`;
    }

    return (
      <div className={className}>
        {/*<Button*/}
        {/*  size="small"*/}
        {/*  ghost={theme === 'dark'}*/}
        {/*  style={{*/}
        {/*    margin: '0 8px',*/}
        {/*  }}*/}
        {/*  onClick={() => {*/}
        {/*    this.changLang();*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <FormattedMessage id="navbar.lang" />*/}
        {/*</Button>*/}
        {typeof currentUser !== 'undefined' && typeof currentUser.chnName !== 'undefined' ? (
          <div>
            <Dropdown overlay={menuItem} placement="bottomCenter">
              <span className={`${styles.action} ${styles.account}`}>
                <Avatar
                  size="small"
                  className={styles.avatar}
                  src={currentUser.avatar}
                  alt="avatar"
                />
                <span className={styles.name}>{currentUser.chnName}</span>
              </span>
            </Dropdown>
          </div>
        ) : (
          <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
        )}
      </div>
    );
  }
}
