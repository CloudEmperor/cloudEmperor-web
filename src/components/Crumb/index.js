import React from 'react';
import { Breadcrumb } from 'antd'
import { connect } from 'react-redux'
import './index.less';

const mapStateToProps = state => ({
    crumb: state.userInfo.crumb
})

class Crumb extends React.Component {
    render() {
        return (
            <Breadcrumb style={{ margin: '16px 0' }}>
                {this.props.crumb.map((item, index) =>{
                    return (
                    <Breadcrumb.Item key={index} >{item}</Breadcrumb.Item>
                    )
                })}
            </Breadcrumb>
        )
    }
}

export default connect(
    mapStateToProps
)(Crumb)