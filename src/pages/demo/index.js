import React from 'react'
import { connect } from 'react-redux'
import { setButton } from '../../redux/actions/button'
import './index.less'
import { Button, Input, notification } from 'antd'
import API from '../../api'
import {post} from '../../service/request'
import Editor from '../../components/Editor'

const mapStateToProps = state => ({
    buttonInfo: state
})

const mapDispatchToProps = dispatch => ({
    setButton: num => dispatch(setButton(num))
})

const openNotification = (type, msg, title ) => {
    notification[type]({
        message: title || type,
        description: msg
    });
}

class Demo extends React.Component{
    constructor(props){
        super(props)
        this.state={
            roles:[],
            content:'默认赋值'
        }
    }
    buttonClick = () => {
        this.props.setButton(this.props.buttonInfo.button)
    }

    login=()=>{
        const postData={
            username: "root",
            password: "123"
        }

        post(API.login.login(), postData).then(res =>{
               console.log(res)
            if (res.status === 1){
                openNotification('success', res.message)
                this.setSate = ({
                    roles: res.data.roles
                })
            }else{
                openNotification('error', res.message)
            }
           
        })
    }

    editorChange=(value)=>{
        console.log('value', value)
    }
     render(){
         return (
             <div className="page demo">
                 <div className="demo_head"></div> 
                 <div className="demo_body">
                     <h3>redux使用方法</h3>
                     <Button type="danger" onClick={this.buttonClick}>按钮</Button>
                     <Input value={this.props.buttonInfo.button} />
                     <h3>接口请求方式</h3>
                     <Button type="primary" onClick={this.login}>登录调接口</Button>
                     <h3>富文本</h3>
                     <Editor
                         onChange={this.editorChange}
                         contentElement={this.state.content ? this.state.content : ''}
                         placeholder="请在这里输入文章正文，包括文字、图片、视频等"
                     />
                 </div>
             </div>
         )
     }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Demo)