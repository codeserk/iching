import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import { i18n } from './locales'
import { store } from './store'

import { IonicVue } from '@ionic/vue'

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css'
import '@ionic/vue/css/structure.css'
import '@ionic/vue/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css'
import '@ionic/vue/css/float-elements.css'
import '@ionic/vue/css/text-alignment.css'
import '@ionic/vue/css/text-transformation.css'
import '@ionic/vue/css/flex-utils.css'
import '@ionic/vue/css/display.css'

/* Theme variables */
import './theme/variables.css'

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(i18n)
  .use(store)

app.mixin({
  computed: {
    /**
     * Whether the dark mode is enabled.
     */
    isDarkMode(): boolean {
      return !!window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    },
  },
})

router.isReady().then(() => {
  app.mount('#app')
})

// Icons
import { addIcons } from 'ionicons'
import { refresh, trashOutline, arrowForwardOutline } from 'ionicons/icons'

addIcons({
  refresh,
  'trash-outline': trashOutline,
  'arrow-forward-outline': arrowForwardOutline,
})
