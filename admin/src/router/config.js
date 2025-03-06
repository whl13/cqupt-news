const routes = [
    {
        path: '/index',
        component: () => import('@/views/home/home.vue')
    },
    {
        path: '/center',
        component: () => import('@/views/center/center.vue')
    },
    {
        path: '/user-manage',
        children: [
            {
                path: 'useradd',
                component: () => import('@/views/user-manage/userAdd.vue')
            },
            {
                path: 'userlist',
                component: () => import('@/views/user-manage/userList.vue')
            }
        ],
        requireAdmin: true
    },
    {
        path: '/news-manage',
        children: [
            {
                path: 'newsadd',
                component: () => import('@/views/news-manage/newsAdd.vue')
            },
            {
                path: 'newslist',
                component: () => import('@/views/news-manage/newsList.vue')
            },
            {
                path: 'newsedit/:id',
                component: () => import('@/views/news-manage/newsEdit.vue')
            }
        ]
    },
    {
        path: '/product-manage',
        children: [
            {
                path: 'productadd',
                component: () => import('@/views/product-manage/productAdd.vue')
            },
            {
                path: 'productlist',
                component: () => import('@/views/product-manage/productList.vue')
            },
            {
                path: 'productedit/:id',
                component: () => import('@/views/product-manage/productEdit.vue')
            }
        ]
    },
    {
        path: '/',
        redirect: '/index'
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'notFound',
        component: () => import('@/views/notFound/notFound.vue')
    }
]

export default routes