import home from '@/views/home/home.vue'
import center from '@/views/center/center.vue'
import userAdd from '@/views/user-manage/userAdd.vue'
import userList from '@/views/user-manage/userList.vue'
import newsAdd from '@/views/news-manage/newsAdd.vue'
import newsList from '@/views/news-manage/newsList.vue'
import newsEdit from '@/views/news-manage/newsEdit.vue'
import productAdd from '@/views/product-manage/productAdd.vue'
import productList from '@/views/product-manage/productList.vue'
import notFound from '@/views/notFound/notFound.vue'
import productEdit from '@/views/product-manage/productEdit.vue'
const routes = [
    {
        path: '/index',
        component: home
    },
    {
        path: '/center',
        component: center
    },
    {
        path: '/user-manage',
        children: [
            {
                path: 'useradd',
                component: userAdd,
            },
            {
                path: 'userlist',
                component: userList,
            }
        ],
        requireAdmin: true
    },
    {
        path: '/news-manage',
        children: [
            {
                path: 'newsadd',
                component: newsAdd
            },
            {
                path: 'newslist',
                component: newsList
            },
            {
                path: 'newsedit/:id',
                component: newsEdit
            }
        ]
    },
    {
        path: '/product-manage',
        children: [
            {
                path: 'productadd',
                component: productAdd
            },
            {
                path: 'productlist',
                component: productList
            },
            {
                path: 'productedit/:id',
                component: productEdit
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
        component: notFound
    }

]
export default routes