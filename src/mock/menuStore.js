//header导航菜单
export const menus= [
    {
        name: '数据看板',
        icon: 'icon-jifen',
        path: '/home',
        children:[]
    },
    {
        name: '新闻政务',
        icon: 'icon-office',
        path: '/news',
        children: []
    },
    {
        name: '用户管理',
        icon: 'icon-supplierfeatures',
        path: '',
        children: [
            {
                path: "",
                icon: "icon-imagetext",
                name: "信息维护",
                children: [
                    {
                        path: "/userModules/userManagement",
                        name: "创建用户",
                    },
                    {
                        path: "/news/industryNews",
                        name: "角色管理",
                    }
                ]
            },
            {
                path: "/demo",
                icon: "icon-libra",
                name: "个人信息",
                children: []
            }
        ]
    },
    {
        name: '系统管理',
        icon: 'icon-set',
        path: '',
        children: [
            {
                path: "",
                icon: "icon-electronics",
                name: "系统权限",
                children: [
                    {
                        path: "/systemModules/directoryManagement",
                        name: "目录管理",
                    },
                    {
                        path: "/business/smartCampusfr",
                        name: "日志管理",
                    },
                    {
                        path: "/business/governmentAffairs",
                        name: "字典管理",
                    }
                ]
            }
           
        ]
    }
]
