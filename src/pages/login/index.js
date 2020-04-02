/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { connect } from 'react-redux'
import { setHeaderMenu, setSiderMenu} from '../../redux/actions/userInfo'
import './index.less'
import { withRouter } from 'react-router-dom'
import { Form, Icon, Input, Button, notification} from 'antd'
import API from '../../api'
import { post } from '../../service/request'
import { menus } from '../../mock/menuStore';

const loginBg = require('../../assets/images/bg-login.jpg')

const mapStateToProps = state => ({
     
})

const mapDispatchToProps = dispatch => ({
  setHeaderMenuFn: scope => dispatch(setHeaderMenu(scope)),
  setSiderMenuFn: scope => dispatch(setSiderMenu(scope))
})

const openNotification = (type, msg, title) => {
    notification[type]({
        message: title || type,
        description: msg
    });
}

class Login extends React.Component {
  componentDidMount() {
    localStorage.removeItem("userName");
    localStorage.removeItem("modules");
    localStorage.removeItem("activeRouteIndex")
  }
  
  getMenus= () =>{
    setTimeout(()=>{
      localStorage.setItem('modules', JSON.stringify(menus))
      this.props.setHeaderMenuFn(menus)
      this.props.setSiderMenuFn(menus[0].children)
      let firstPath=''
      if (menus[0].path){
            firstPath = menus[0].path
      }else{
        firstPath = menus[0].children[0].path
      }
      this.props.history.push( firstPath );
    },500)
  }
  
  handleSubmit = e => {
    e.preventDefault();
    this.props.history.push("/home");
    this.props.form.validateFields((err, values) => {
      if (!err) {
        post(API.login.login(), values)
          .then(res => {
            console.log(res);
            if (res.status === 200) {
              localStorage.setItem("userName", res.data.userName);
              openNotification("success", res.message);
              this.getMenus()      
            } else {
              openNotification("error", res.message);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="loginBox" >
        <header className="login-header">
            <img src={require("../../assets/images/logo.png")} />
            <span>CloudEmperor管理系统</span>
        </header>
        <section className="login-section" style={{
            background: `url(${loginBg}) no-repeat center center`,
            backgroundSize:`cover`
           }}>
          <div className="login-content">
            <Form onSubmit={this.handleSubmit} className="loginForm">
              <p className="enter-title">登&nbsp;录</p>
              <Form.Item>
                {getFieldDecorator("userName", {
                  rules: [{ required: true, message: "请输入账号" }]
                })(
                  <Input
                    prefix={
                      <Icon
                        type="user"
                        style={{ color: "rgba(0,0,0,.25)" }}
                      />
                    }
                    placeholder="账号"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("passWord", {
                  rules: [{ required: true, message: "请输入密码" }]
                })(
                  <Input
                    onPressEnter={this.handleSubmit}
                    prefix={
                      <Icon
                        type="lock"
                        style={{ color: "rgba(0,0,0,.25)" }}
                      />
                    }
                    type="password"
                    placeholder="密码"
                  />
                )}
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  登&nbsp;&nbsp;&nbsp;&nbsp;录
                    </Button>
                </Form.Item>
            </Form>
          </div>
        </section>
        <footer className="login-footer">
          <p>西安CloudEmperor科技有限公司 ®版权所有 ©2020-2038，保留所有权利。</p>
          <p>CloudEmperor——全面安全，超越所想！</p>
        </footer>
     </div>
    );
  }
}

const WrappedLogin = Form.create({ name: 'normal_login' })(Login);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(WrappedLogin))