import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
 {
  path: '/',
  name: 'home',
  component: () => import('../views/HomeView.vue'),
 },
 {
  path: '/schedule',
  name: 'schedule',
  component: () => import('../views/Schedule.vue'),
 },
]

const router = createRouter({
 history: createWebHashHistory(),
 routes,
})

export default router
