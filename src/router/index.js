import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/home', component: () => import('../views/home'), redirect: '/home/cover',
    children: [
      { path: '/home/cover', component: () => import('../components/cover') },
      { path: '/home/preface', component: () => import('../components/preface') },
      { path: '/home/catalog', component: () => import('../components/catalog') },
      { path: '/home/copyright', component: () => import('../components/copyright') },
      { path: '/home/lastpage', component: () => import('../components/lastpage') },
      { path: '/home/message', component: () => import('../components/message') },
      { path: '/home/title', component: () => import('../components/title') },
      { path: '/home/detail', name: "detail", component: () => import('../components/detail') },
    ]
  },
  {
    path: '/admin', component: () => import('../views/adminhome'),
    children: [
      { path: "/admin/blogwrite", component: () => import('../components/blogwrite') }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
