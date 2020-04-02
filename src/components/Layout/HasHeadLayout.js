import React from 'react'
import { Route } from 'react-router-dom'
import { Layout } from 'antd'
import MyHeader from '../Header'
const { Content } = Layout

const HasHeadLayout = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={matchProps => (
                <Layout style={{ height: '100%' }}>
                    <MyHeader />             
                    <Content style={{
                        padding: 24,
                        margin: 0,
                        background: '#fff',
                        minHeight: 300,
                        overflow: 'auto'
                    }}>
                        <Component {...matchProps} />
                    </Content>                 
                </Layout>
            )}
        />
    )
}

export default HasHeadLayout
