import router from './router'
import store from './store'

router.beforeEach((to, from, next) => {
  const isLogin = store.getters.user.isLogin
  if (!isLogin) {
    if (to.meta.auth) next('/auth/login')
    else next()
    return
  }
  if (to.path === '/auth/login') next('/')
  else next()
})
