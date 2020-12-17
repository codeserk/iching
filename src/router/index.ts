import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'
import Tabs from '../views/Tabs.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Tabs,
    redirect: '/introduction',
    children: [
      {
        path: '/oracle',
        component: () => import('@/views/Oracle.vue'),
      },
      {
        path: '/journal',
        component: () => import('@/views/Journal.vue'),
        children: [
          {
            path: ':id',
            component: () => import('@/views/Journal/Item.vue'),
          },
        ],
      },
      {
        path: '/settings',
        component: () => import('@/views/Settings.vue'),
      },
    ],
  },
  {
    path: '/hexagram/:id',
    component: () => import('@/views/HexagramView.vue'),
  },
  {
    path: '/introduction',
    component: () => import('@/views/Introduction.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
