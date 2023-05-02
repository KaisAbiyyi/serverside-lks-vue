import { createRouter, createWebHistory } from 'vue-router'

const isLoggedIn = () => {
  return localStorage.getItem('token') !== null
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/login.vue')
    },
    {
      path: '/',
      name: "dashboard",
      component: () => import('@/views/dashboard.vue'),
      meta: {
        auth: true
      }
    },
    {
      path: '/consultation',
      name: 'consultation',
      component: () => import('@/views/consultation.vue'),
      meta: {
        auth: true
      }
    },
    {
      path: '/spots',
      name: 'spots',
      component: () => import('@/views/spots/index.vue'),
      meta: {
        auth: true
      }
    },
    {
      path: '/spots/:id',
      name: 'spotsDetail',
      component: () => import('@/views/spots/detail.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(e => e.meta.auth)) {
    if (isLoggedIn()) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
