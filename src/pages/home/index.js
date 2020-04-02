/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import './index.less'
import { withRouter } from 'react-router-dom'
//import API from '../../api'
//import { post } from '../../service/request'



class Home extends React.Component {


    render() {
        return (
            <div className="home">
               数据看板
            </div>
        )
    }
}

export default withRouter(Home)