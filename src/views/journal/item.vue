<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button />
        </ion-buttons>
        <ion-title v-text="title" />
        <ion-buttons slot="end">
          <ion-button @click="showDeletePopup">
            <ion-icon slot="start" name="trash-outline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content fullscreen>
      <ion-toolbar v-if="hexagram && hexagram.hasSecondary" color="">
        <ion-segment :value="activeHexagram" @ion-change="activeHexagram = $event.detail.value">
          <ion-segment-button value="primary">Primary</ion-segment-button>
          <ion-segment-button value="secondary">Secondary</ion-segment-button>
        </ion-segment>
      </ion-toolbar>

      <div class="ion-padding">
        <template v-if="hexagram">
          <hexagram-details
            v-if="hexagram.hasSecondary && activeHexagram === 'secondary'"
            :number="hexagram.secondaryNumber"
            :lines="hexagram.secondaryLines"
          />
          <hexagram-details
            v-else
            :number="hexagram.number"
            :lines="hexagram.lines"
            :mutated-lines="hexagram.mutatedLines"
          />
        </template>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonSegment,
  IonSegmentButton,
  IonBackButton,
  IonIcon,
  IonButton,
  IonPage,
  IonButtons,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  alertController,
} from '@ionic/vue'
import { mapActions, mapGetters } from 'vuex'

import HexagramDetails from '../../components/hexagram-details.vue'

export default {
  components: {
    IonSegment,
    IonSegmentButton,
    IonIcon,
    IonButton,
    IonBackButton,
    IonPage,
    IonButtons,
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
    ...mapGetters(['config', 'resultById']),

    id() {
      return this.$route.params.id
    },

    result() {
      if (!this.id) {
        return
      }

      return this.resultById(this.id)
    },

    title() {
      return this.result?.question
    },

    hexagram() {
      return this.result?.hexagram
    },
  },

  methods: {
    ...mapActions(['removeResult']),

    async showDeletePopup() {
      if (!this.config.journal.confirmDeletion) {
        await this.removeResult(this.id)
        this.$nextTick(() => {
          this.$router.back()
        })

        return
      }

      const alert = await alertController.create({
        header: 'Confirm deletion',
        message: 'Are you sure you want to delete this answer from the Oracle?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
          },
          {
            text: 'Yes',
            handler: async () => {
              await this.removeResult(this.id)
              this.$nextTick(() => {
                this.$router.back()
              })
            },
          },
        ],
      })
      return alert.present()
    },
  },
}
</script>
