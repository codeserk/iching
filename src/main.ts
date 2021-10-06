import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import { i18n } from './locales'
import { store } from './store'

import {
  IonBadge,
  IonicVue,
  IonImg,
  IonReorder,
  IonReorderGroup,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonTextarea,
  isPlatform,
} from '@ionic/vue'
import Plausible from 'plausible-tracker'
import { Storage } from '@capacitor/core'

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

import './registerServiceWorker'

/* Theme variables */
import './theme/variables.css'

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(i18n)
  .use(store)

const plausible = Plausible({
  domain: 'i-ching.codeserk.es',
  trackLocalhost: true,
  apiHost: 'https://analytics.codeserk.es',
})
plausible.trackPageview()
plausible.enableAutoPageviews()

app.mixin({
  computed: {
    analytics() {
      return plausible
    },

    isAndroid() {
      return isPlatform('android')
    },

    isApp() {
      return this.isAndroid
    },

    isBrowser() {
      return !this.isApp
    },

    hasDarkModeClass(): boolean {
      return document.body.classList.contains('dark')
    },

    /**
     * Whether the dark mode is enabled.
     */
    isDarkMode(): boolean {
      return (
        document.body.classList.contains('dark') ||
        (!!window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
      )
    },
  },

  methods: {
    track(name: string, options: any) {
      return plausible.trackEvent(name, { props: options })
    },

    setDarkMode(enabled: boolean) {
      Storage.set({ key: 'darkMode', value: enabled.toString() })

      document.body.classList.toggle('dark', enabled)
    },
  },
})

router.isReady().then(() => {
  app.mount('#app')
})

// Ionic components
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
  IonSlides,
  IonSlide,
  IonButton,
  IonContent,
  IonTitle,
  IonHeader,
  IonToolbar,
  IonToggle,
  IonButtons,
  IonText,
  IonInput,
  IonSegment,
  IonSegmentButton,
  IonList,
  IonListHeader,
  IonItemDivider,
  IonItemGroup,
  IonItem,
  IonCheckbox,
  IonSearchbar,
  IonBackButton,
  IonGrid,
  IonRow,
  IonCol,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonModal,
} from '@ionic/vue'
app
  .component('IonTabBar', IonTabBar)
  .component('IonTabButton', IonTabButton)
  .component('IonTabs', IonTabs)
  .component('IonLabel', IonLabel)
  .component('IonIcon', IonIcon)
  .component('IonPage', IonPage)
  .component('IonSlides', IonSlides)
  .component('IonSlide', IonSlide)
  .component('IonButton', IonButton)
  .component('IonContent', IonContent)
  .component('IonTitle', IonTitle)
  .component('IonHeader', IonHeader)
  .component('IonToolbar', IonToolbar)
  .component('IonButtons', IonButtons)
  .component('IonText', IonText)
  .component('IonToggle', IonToggle)
  .component('IonInput', IonInput)
  .component('IonSegment', IonSegment)
  .component('IonSegmentButton', IonSegmentButton)
  .component('IonList', IonList)
  .component('IonListHeader', IonListHeader)
  .component('IonItemDivider', IonItemDivider)
  .component('IonItemGroup', IonItemGroup)
  .component('IonItem', IonItem)
  .component('IonCheckbox', IonCheckbox)
  .component('IonSearchbar', IonSearchbar)
  .component('IonBackButton', IonBackButton)
  .component('IonGrid', IonGrid)
  .component('IonRow', IonRow)
  .component('IonCol', IonCol)
  .component('IonItemSliding', IonItemSliding)
  .component('IonItemOptions', IonItemOptions)
  .component('IonItemOption', IonItemOption)
  .component('IonModal', IonModal)
  .component('IonTextarea', IonTextarea)
  .component('IonSpinner', IonSpinner)
  .component('IonSelect', IonSelect)
  .component('IonSelectOption', IonSelectOption)
  .component('IonReorder', IonReorder)
  .component('IonReorderGroup', IonReorderGroup)
  .component('IonBadge', IonBadge)
  .component('IonImg', IonImg)

// Icons
import { addIcons } from 'ionicons'
import {
  refresh,
  trashOutline,
  arrowForwardCircle,
  arrowForwardOutline,
  optionsOutline,
  bookOutline,
  stopCircleOutline,
  homeOutline,
  documentOutline,
  cafeOutline,
  diceOutline,
  globeOutline,
  helpCircleOutline,
  shareSocialOutline,
  logoAndroid,
  addOutline,
  arrowBackOutline,
} from 'ionicons/icons'

addIcons({
  refresh,
  'trash-outline': trashOutline,
  'arrow-forward-circle': arrowForwardCircle,
  'arrow-forward-outline': arrowForwardOutline,
  'options-outline': optionsOutline,
  'book-outline': bookOutline,
  'stop-circle-outline': stopCircleOutline,
  'home-outline': homeOutline,
  'document-outline': documentOutline,
  'cafe-outline': cafeOutline,
  'dice-outline': diceOutline,
  'globe-outline': globeOutline,
  'help-circle-outline': helpCircleOutline,
  'share-social-outline': shareSocialOutline,
  'logo-android': logoAndroid,
  'add-outline': addOutline,
  'arrow-back-outline': arrowBackOutline,
})
