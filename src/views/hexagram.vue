<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar>
        <ion-title v-text="title" />

        <ion-buttons slot="end">
          <ion-button @click="$router.push(`/hexagram/${id + 1}`)">
            <ion-icon slot="start" name="trash-outline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content fullscreen class="ion-padding">
      <template v-if="hexagram">
        <hexagram-details :number="hexagram.number" :lines="hexagram.lines" show-all-mutations />
      </template>
      <div v-else>wtf</div>
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
    ...mapGetters(['getHexagramDetails', 'hexagramTitle']),

    id() {
      return parseInt(this.$route.params.id)
    },

    details() {
      if (!this.id) {
        return
      }

      return this.getHexagramDetails(this.id)
    },

    hexagram() {
      return Hexagram.fromNumber(this.id)
    },

    title() {
      return this.hexagramTitle(this.id)
    },
  },
}
</script>
