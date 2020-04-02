import React from 'react'
import { Route } from 'react-router-dom'
import { Layout } from 'antd'
import SiderMenu from '../SiderMenu'
import MyHeader from '../Header'
import Crumb from '../Crumb'
const { Content } = Layout

const HasSiderHeadLayout = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={matchProps => (
                <Layout style={{ height: '100%' }}>
                    <MyHeader />
                    <Layout>
                        <SiderMenu />
                        <Layout style={{ padding: '0 24px 24px' }}>
                            <Crumb/>
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
                    </Layout>
                </Layout>
            )}
        />
    )
}

export default HasSiderHeadLayout
