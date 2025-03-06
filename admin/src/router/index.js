import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import MainBox from '../views/MainBox.vue'
import routesconfig from './config'
import store from '@/store'
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/mainbox',
    name: 'mainbox',
    component: MainBox
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
/**
 * 在路由导航之前执行的钩子函数
 * 该函数用于全局守卫路由，根据用户是否登录来决定路由的去向
 * @param {Route} to 即将进入的目标路由对象
 * @param {Route} from 当前导航正要离开的路由对象
 * @param {Function} next 路由导航守卫的下一个钩子函数
 */
router.beforeEach((to, from, next) => {
  // 如果目标路由是登录页，则直接允许导航
  if (to.path === '/login') {
    next()
  } else {
    // 检查本地存储中是否有token，以判断用户是否已登录
    if (localStorage.getItem('token')) {
      // 如果store中未获取到路由，表示需要重新添加动态路由
      if (!store.state.isGetRouter) {
        // 移除已有的主路由
        router.removeRoute('mainbox')
        // 添加新的动态路由
        addRoutes()
        // 允许导航到原目标路由
        next(
          { path: to.fullPath }
        )
      } else {
        // 如果store中已获取到路由，直接允许导航
        next()
      }
    } else {
      // 如果本地存储中没有token，表示用户未登录，重定向到登录页
      next('/login')
    }
  }
})
const addRoutes = () => {
  // 检查是否存在名为'mainbox'的路由，如果不存在则添加
  if (!router.hasRoute('mainbox')) {
    router.addRoute({
      path: '/mainbox',
      name: 'mainbox',
      component: MainBox
    })
  }
  // 遍历路由配置项，根据权限动态添加到'mainbox'路由下
  routesconfig.forEach(item => {
    // 检查当前配置项是否有访问权限，如果有则添加到'mainbox'路由下
    checkPermissio(item) && router.addRoute('mainbox', item)
  })
  // 设置 Vuex store 中的路由获取状态为 true，表示路由已成功获取
  store.commit('setGetRouter', true)
}
/**
 * 检查用户是否有权限访问或操作某个项
 * 
 * @param {Object} item - 需要检查权限的项，包含属性requireAdmin指示是否需要管理员权限
 * @returns {boolean} - 如果项需要管理员权限，则返回用户角色是否为管理员（角色ID为1）；
 *                      如果项不需要管理员权限，则直接返回true，表示用户有权限
 */
const checkPermissio = (item) => {
  // 当项要求管理员权限时，检查当前用户是否为管理员
  if (item.requireAdmin) {
    return store.state.userInfo.role === 1
  } else {
    // 当项不要求管理员权限时，用户自动拥有权限
    return true
  }
}
export default router
