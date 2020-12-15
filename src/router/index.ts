import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'
import Tabs from '../views/Tabs.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Tabs,
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
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
