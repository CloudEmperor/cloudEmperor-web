import React from 'react';
const routes=[
    {
        title: '登录页面',
        path:'/',
        layoutType: 'FullScreenLayout',
        component: React.lazy(() => import('../pages/login')
        )
    },
    {
        title: 'demo',
        path: '/demo',
        layoutType: 'FullScreenLayout',
        component: React.lazy(() => import('../pages/demo')
        )
    },
    {
        title: '不存在的页面', 
        path: '/404',
        layoutType: 'FullScreenLayout',
        component: React.lazy(() => import('../pages/error/err404')
        )
    },
    {
        title: '数据看板',
        path: '/home',
        menuKey: 'home',
        layoutType: 'HasHeadLayout',
        component: React.lazy(() => import('../pages/home')
        )
    },
    {
        title: '新闻政务',
        path: '/news',
        layoutType: 'HasHeadLayout',
        component: React.lazy(() => import('../pages/news')
        )
    },
    {
        title: '创建用户',
        path: '/userModules/userManagement',
        layoutType: 'HasSiderHeadLayout',
        component: React.lazy(() => import('../pages/userModules/userManagement')
        )
    },
    {
        title: '目录管理',
        path: '/systemModules/directoryManagement',
        layoutType: 'HasSiderHeadLayout',
        component: React.lazy(() => import('../pages/systemModules/directoryManagement')
        )
    }
]

export default routes