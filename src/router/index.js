import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/login', component: () => import('../views/login.vue') },
  {
    path: '/home', component: () => import('../views/home'), redirect: '/home/cover',
    children: [
      { path: '/home/cover', component: () => import('../components/cover') },
      { path: '/home/preface', component: () => import('../components/preface') },
      { path: '/home/catalog', component: () => import('../components/catalog') },
      { path: '/home/copyright', component: () => import('../components/copyright') },
      { path: '/home/record', component: () => import('../components/record') },
      { path: '/home/message', component: () => import('../components/message') },
      { path: '/home/title', component: () => import('../components/title') },
      { path: '/home/detail', name: "detail", component: () => import('../components/detail') },
    ]
  },
  {
    path: '/admin', component: () => import('../views/adminhome'), redirect: "/admin/blogwrite",
    children: [
      { path: "/admin/blogwrite", component: () => import('../components/blogwrite'), meta: { requireAuth: true } },
      { path: "/admin/resourse", component: () => import('../components/resourse'), meta: { requireAuth: true } }
    ]
  },
  { path: '*', component: () => import("../views/error") }

]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (sessionStorage.getItem("user")) {
      next()
    } else {
      next('/login')
    }
  }
  if (to.path === '/login') {
    if (sessionStorage.getItem("user")) {
      next('/admin')
    } else {
      next()
    }
  }
  next()
})
export default router
