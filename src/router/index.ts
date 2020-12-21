import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'
import Tabs from '../views/router.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Tabs,
    redirect: '/oracle',
    children: [
      {
        path: '/oracle',
        component: () => import('@/views/oracle.vue'),
      },
      {
        path: '/journal',
        component: () => import('@/views/journal.vue'),
        children: [
          {
            path: ':id',
            component: () => import('@/views/journal/item.vue'),
          },
        ],
      },
      {
        path: '/settings',
        component: () => import('@/views/SettingsView.vue'),
      },
    ],
  },
  {
    path: '/hexagram/:id',
    component: () => import('@/views/hexagram.vue'),
  },
  {
    path: '/introduction',
    component: () => import('@/views/introduction.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
