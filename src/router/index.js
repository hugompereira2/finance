import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      alias: '/login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/finance',
      name: 'finance',
      alias: '/finance',
      component: () => import('../views/FinanceView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
  ]
})

router.beforeEach(async (to, from) => {
  const user = localStorage.getItem('user');

  if (!user && to?.name !== 'home' && to?.name !== 'register') {
    return { name: 'home' }
  }
})

export default router
