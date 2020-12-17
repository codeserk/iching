<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar>
        <ion-title v-text="title" />
      </ion-toolbar>
    </ion-header>
    <ion-content fullscreen class="ion-padding">
      <template v-if="hexagram">
        <hexagram-details :number="hexagram.number" :lines="hexagram.lines" show-all-mutations />
      </template>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue'
import { mapGetters } from 'vuex'

import HexagramDetails from '../components/hexagram-details.vue'
import { Hexagram } from '../models/hexagram'

export default {
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,

    HexagramDetails,
  },

  data: () => ({
    activeHexagram: 'primary',
  }),

  computed: {
    ...mapGetters(['getHexagramDetails']),

    id() {
      return this.$route.params.id
    },

    details() {
      if (!this.id) {
        return
      }

      return this.getHexagramDetails(this.id)
    },

    hexagram() {
      return Hexagram.fromNumber(parseInt(this.id))
    },

    title() {
      return `${this.id}. ${this.details?.name.chinese} / ${this.details?.name.pinyin} / ${this.details?.name.translated}`
    },
  },
}
</script>
