export const navItems = [
    {
        title: 'HOME',
        link: '/',
        submenu:[]
    },
    {
        title: 'ATTENDANCE',
        link: '/attendance',
        submenu:[]
    },
    {
        title: 'SALARY',
        link: '/salary/view',
        submenu:[
            {
                title: 'View Salary',
                link: '/salary/view'
            },
            {
                title: 'Admin View',
                link: '/salary/adminview'
            },
            {
                title: 'Benefits',
                link: '/salary/benefits'
            },
            {
                title: 'Process Salary',
                link: '/salary/process'
            },
            {
                title: 'Assign Benefits',
                link: '/salary/assign'
            }
        ]
    },
    {
        title: 'INFORMATION',
        link: '/info/employeeList',
        submenu:[]
    },
    {
        title: 'COMMUNITY',
        link: '/community',
        submenu:[]
    },
    {
        title: 'HELPDESK',
        link: '/helpdesk',
        submenu:[]
    }
]