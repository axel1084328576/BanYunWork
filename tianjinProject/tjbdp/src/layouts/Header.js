import React, { PureComponent } from 'react';
import { formatMessage } from 'umi/locale';
import { Layout, message ,Modal ,Form, Alert,Input, Icon} from 'antd';
import Animate from 'rc-animate';
import { connect } from 'dva';
import router from 'umi/router';
import GlobalHeader from '@/components/GlobalHeader';
import TopNavHeader from '@/components/TopNavHeader';
import styles from './Header.less';
import Authorized from '@/utils/Authorized';

const { Header } = Layout;
const FormItem = Form.Item;


@Form.create()
class HeaderView extends PureComponent {
  state = {
    visible: true,
    modalVisible:false,
  };

  static getDerivedStateFromProps(props, state) {
    if (!props.autoHideHeader && !state.visible) {
      return {
        visible: true,
      };
    }
    return null;
  }

  componentDidMount() {
    document.addEventListener('scroll', this.handScroll, { passive: true });
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handScroll);
  }

  getHeadWidth = () => {
    const { isMobile, collapsed, setting } = this.props;
    const { fixedHeader, layout } = setting;
    if (isMobile || !fixedHeader || layout === 'topmenu') {
      return '100%';
    }
    return collapsed ? 'calc(100% - 80px)' : 'calc(100% - 256px)';
  };

  handleNoticeClear = type => {
    message.success(`${formatMessage({ id: 'component.noticeIcon.cleared' })} ${type}`);
    const { dispatch } = this.props;
    dispatch({
      type: 'global/clearNotices',
      payload: type,
    });
  };

  handleMenuClick = ({ key }) => {
    const { dispatch } = this.props;
    if(key === 1){
      dispatch({
        type: 'login/logout',
      });
    }else if(key === 2){
      this.showModifyPasswordModal(true);
    }
  };

  handleNoticeVisibleChange = visible => {
    if (visible) {
      const { dispatch } = this.props;
      dispatch({
        type: 'global/fetchNotices',
      });
    }
  };

  showModifyPasswordModal = (show)=>{
    if(show){
      const {form} = this.props;
      form.setFieldsValue({
        oldPassword:'',
        newPassword:'',
        centerPassword:'',
      });
    }
    this.setState({
      modalVisible: show,
    });
  }

  centerModify = ()=>{
    const {form,dispatch} = this.props;
    form.validateFields((err,values)=>{
      if(!err){
        if(values.newPassword !== values.centerPassword){
          message.warning("两次密码不一致，请重新输入");
        }else{
          const payload = {
            userId:this.props.userId,
            oldPwd: values.oldPassword,
            newPwd: values.newPassword,
          };
          // console.log(payload);
          dispatch({
            type:'login/modifyPassword',
            payload:payload,
          })
        }
      }
    });
  }

  handScroll = () => {
    const { autoHideHeader } = this.props;
    const { visible } = this.state;
    if (!autoHideHeader) {
      return;
    }
    const scrollTop = document.body.scrollTop + document.documentElement.scrollTop;
    if (!this.ticking) {
      requestAnimationFrame(() => {
        if (this.oldScrollTop > scrollTop) {
          this.setState({
            visible: true,
          });
          this.scrollTop = scrollTop;
          return;
        }
        if (scrollTop > 300 && visible) {
          this.setState({
            visible: false,
          });
        }
        if (scrollTop < 300 && !visible) {
          this.setState({
            visible: true,
          });
        }
        this.oldScrollTop = scrollTop;
        this.ticking = false;
      });
    }
    this.ticking = false;
  };

  render() {
    const { isMobile, handleMenuCollapse, setting } = this.props;
    const { navTheme, layout, fixedHeader } = setting;
    const { visible } = this.state;
    const isTop = layout === 'topmenu';
    const width = this.getHeadWidth();
    const formItemLayout = {
      labelCol: {
        span:6,
        offset:1,
      },
      wrapperCol: {
        span:16,
      },
    };
    const {getFieldDecorator} = this.props.form;
    const modifyPasswordModal = (
      <Modal
        title="密码修改"
        cancelText="取消"
        okText="确认修改"
        confirmLoading={this.props.confirmLoading}
        visible={this.state.modalVisible}
        onOk={this.centerModify}
        onCancel={()=>{this.showModifyPasswordModal(false)}}
      >
        <Form>
          <FormItem
            {...formItemLayout}
            label="原密码"
          >
            {getFieldDecorator('oldPassword', {
              rules: [{ 
                required: true, 
                message: '请输入原密码' 
              },{ 
                min: 6,
                max: 24, 
                message: '密码长度至少6位，最多24位' 
              }],
            })(
              <Input type="password" placeholder="请输入原密码" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="新密码"
          >
            {getFieldDecorator('newPassword', {
              rules: [{ 
                required: true, 
                message: '请输入新密码' 
              },{ 
                min: 6,
                max: 24,
                message: '密码长度至少6位，最多24位' 
              }],
            })(
              <Input type="password" placeholder="请输入新密码" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="确认密码"
          >
            {getFieldDecorator('centerPassword', {
              rules: [{ 
                required: true, 
                message: '请输入确认密码' 
              },{ 
                min: 6,
                max: 24,
                message: '密码长度至少6位，最多24位' 
              },],
            })(
              <Input type="password" placeholder="请输入确认密码" />
            )}
          </FormItem>
        </Form>
      </Modal>
    );
    const HeaderDom = visible ? (
      <div>
        <Header style={{ padding: 0, width }} className={fixedHeader ? styles.fixedHeader : ''}>
          {isTop && !isMobile ? (
            <TopNavHeader
              theme={navTheme}
              mode="horizontal"
              Authorized={Authorized}
              onCollapse={handleMenuCollapse}
              onNoticeClear={this.handleNoticeClear}
              onMenuClick={this.handleMenuClick}
              onModifyPassword={this.showModifyPasswordModal}
              onNoticeVisibleChange={this.handleNoticeVisibleChange}
              {...this.props}
            />
          ) : (
            <GlobalHeader
              onCollapse={handleMenuCollapse}
              onNoticeClear={this.handleNoticeClear}
              onMenuClick={this.handleMenuClick}
              onNoticeVisibleChange={this.handleNoticeVisibleChange}
              {...this.props}
            />
          )}
        </Header>
        {modifyPasswordModal}
      </div>
    ) : null;
    return (
      <Animate component="" transitionName="fade">
        {HeaderDom}
      </Animate>
    );
  }
}

export default connect(({ login, user, global, setting, loading }) => ({
  currentUser: login.currentUser,
  collapsed: global.collapsed,
  confirmLoading: loading.effects['login/modifyPassword'],
  notices: global.notices,
  setting,
  userId:login.userId,
}))(HeaderView);
