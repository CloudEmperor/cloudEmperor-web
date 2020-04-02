/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { setBreadcrumb } from '../../redux/actions/userInfo'
import './index.less';
import SvgIcon from '../SvgIcon';
import { Layout, Menu  } from 'antd';
const { Sider } = Layout;
const { SubMenu } = Menu;

const mapStateToProps = state => ({
    siderMenus: state.userInfo.siderMenus
})

const mapDispatchToProps = dispatch => ({
    setBreadcrumbFn: scope => dispatch(setBreadcrumb(scope))
})

class SiderMenu extends React.Component {
    constructor(props){
        super(props);
        this.state={
            collapsed: false
        }

    }
    componentDidMount(){
        console.log('sider组件', this.props.siderMenus)
    }
    onCollapse = collapsed => {
        console.log('是否收起', collapsed);
        this.setState({ collapsed });
    }

    oneLevelJump= e =>{
      const pathIndex= + e.key
      const routeData = this.props.siderMenus[pathIndex]

       if (routeData.path && routeData.children.length === 0){
           this.props.history.push(routeData.path)
       }
    }
    secondLevelJump = e =>{
      this.props.history.push(e.key)
    }

    render() {
        let selectedKey = this.props.location.pathname
        let openKey = this.props.siderMenus[0].children.length === 0 ? '' : this.props.siderMenus[0].children[0].path
        let crumbArr =[]
        this.props.siderMenus.forEach((item, index) => {
            if (item.path && item.children.length === 0 && item.path === selectedKey){           
                    crumbArr = [item.name]        
            }
            item.children.forEach(vo => {
                if (vo.path === selectedKey) {
                    openKey = `${index}`
                    crumbArr = [item.name,vo.name]
                }
            })
        }) 

        this.props.setBreadcrumbFn(crumbArr)

        return (
            <Sider 
                trigger={null} 
                collapsible 
                collapsed={this.state.collapsed} 
                onCollapse={this.onCollapse}
                width={200}
                // style={{ background: '#2a53aa'}}
                className="sider">
                <Menu 
                    theme="dark" 
                    mode="inline" 
                    defaultSelectedKeys={[selectedKey]} 
                    defaultOpenKeys={[openKey]}
                    // style={{ background: '#2a53aa' }}
                    >
                    {this.props.siderMenus.map((item, index) => {
                        return item.children.length === 0 ? 
                            <Menu.Item key={index} style={{ fontSize: '14px' }} onClick={this.oneLevelJump}>
                                <SvgIcon iconClass={item.icon} size="14px"></SvgIcon>  
                                <span style={{ fontSize: '14px' }}>
                                    {item.name}
                                </span>
                            </Menu.Item>
                            :        
                            <SubMenu
                                key={index}                        
                                title={
                                <span>
                                    <SvgIcon iconClass={item.icon} size="14px"></SvgIcon>  
                                    <span style={{ fontSize: '14px' }}>
                                        {item.name}
                                    </span>
                                </span>
                                }
                            >
                            {item.children.map(vo=>{
                                return (
                                    <Menu.Item key={vo.path} onClick={this.secondLevelJump}>
                                        <span style={{ fontSize: '14px' }}>
                                            {vo.name}
                                        </span>
                                    </Menu.Item>
                                )
                            })}
                           </SubMenu>               
                    })}
                </Menu>
            </Sider>
        )
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(SiderMenu))