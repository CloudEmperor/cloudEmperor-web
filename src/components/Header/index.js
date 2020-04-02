/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { connect } from 'react-redux'
import { setSiderMenu } from '../../redux/actions/userInfo'
import { Layout, Menu} from 'antd'
import { withRouter } from 'react-router-dom';
import './index.less'
import SvgIcon from '../SvgIcon';
const { Header } = Layout;

const mapStateToProps = state => ({
    headerMenus: state.userInfo.headerMenus
})

const mapDispatchToProps = dispatch => ({
    setSiderMenuFn: scope => dispatch(setSiderMenu(scope))
})


class MyHeader extends React.Component {
    constructor(props){
        super(props);
        this.state={
            userName: localStorage.getItem('userName') || '',
            selectedKeys: localStorage.getItem('activeRouteIndex') || '0'
        }
    }
    componentDidMount(){
        console.log('header组件', this.props.headerMenus)
        //判断用户是否登录
        if (!this.state.userName){
            this.props.history.push('/')
            return
         }

    }

    jump= e =>{
        const index = + e.key
        const routeData = this.props.headerMenus[index]
        this.props.setSiderMenuFn(routeData.children)
        this.setState({
            selectedKeys: e.key
        })
        localStorage.setItem('activeRouteIndex', e.key)
        if (routeData.path && routeData.children.length ===0){
            this.props.history.push(routeData.path)
        } else {
            const nowPath = routeData.children[0].path && routeData.children[0].children.length === 0 ? routeData.children[0].path : routeData.children[0].children[0].path
            this.props.history.push(nowPath)
        }
       
    } 
    dropOut=()=>{
        this.props.history.push('/')
        localStorage.removeItem('userName')
    }
    render() {
        return (
            <Header className="header" style={{ backgroundImage:'linear-gradient(to right, #2a53aa, #2495aa)', height: '70px', lineHeight:'70px'}}>
                <div className="logo"><img src={require('../../assets/images/logo.png')} /></div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={[this.state.selectedKeys]}>
                    {this.props.headerMenus.map((item, index) => 
                        <Menu.Item key={index} onClick={this.jump}>
                            <div className="header-item">
                                <SvgIcon iconClass={item.icon} size="24px"></SvgIcon>
                                <label> {item.name}</label>
                         </div>         
                    </Menu.Item>)}
                </Menu>
            </Header >
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(MyHeader))