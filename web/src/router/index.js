import { createRouter, createWebHashHistory } from 'vue-router'
import home from '@/views/home.vue'
import news from '@/views/news.vue'
import product from '@/views/product.vue'
import newsitem from '@/views/newsitem.vue'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
const routes = [{
  path: '/',
  name: 'home',
  component: home
},
{
  path: '/news',
  name: 'news',
  component: news
},
{
  path: '/product',
  name: 'product',
  component: product
},
{
  path: '/newsitem/:id',
  name: 'newsitem',
  component: newsitem
}

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  nProgress.start()
  next()
})
router.afterEach(() => {
  nProgress.done()
})
export default router
