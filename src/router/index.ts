import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'
import RouterView from '../views/RouterView.vue'

// Views
import OracleView from '@/views/OracleView.vue'
import JournalView from '@/views/JournalView.vue'
import JournalItemView from '@/views/journal/JournalItemView.vue'
import SettingsView from '@/views/SettingsView.vue'
import HexagramView from '@/views/HexagramView.vue'
import IntroductionView from '@/views/IntroductionView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: RouterView,
    redirect: '/oracle',
    children: [
      {
        path: '/oracle',
        component: OracleView,
      },
      {
        path: '/journal',
        component: JournalView,
        children: [
          {
            path: ':id',
            component: JournalItemView,
          },
        ],
      },
      {
        path: '/settings',
        component: SettingsView,
      },
    ],
  },
  {
    path: '/hexagram/:id',
    component: HexagramView,
  },
  {
    path: '/introduction',
    component: IntroductionView,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
