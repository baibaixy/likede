import router from '@/router'
import store from '@/store'

const whiteList = ['/login', '/404']
router.beforeEach((to, from, next) => {
  const token = store.state.user.UserInfo
  if (token) {
    store.dispatch('user/getUserService')
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    const isClude = whiteList.includes(to.path)
    if (isClude) {
      next()
    } else {
      next('/login')
    }
  }
})
