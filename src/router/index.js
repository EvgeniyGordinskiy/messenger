import Vue from 'vue'
import VueRouter from 'vue-router'

// Routes
import messenger from '../views/messenger/router'

Vue.use(VueRouter)

const defaultRoute = {
  path: '*',
  redirect: '/',
}

const routes = [messenger, defaultRoute]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router
