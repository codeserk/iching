<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar>
        <ion-title v-text="title" />

        <ion-buttons slot="start">
          <ion-button @click="$router.push(`/app/oracle`)">
            <ion-icon slot="start" name="home-outline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content fullscreen v-if="details">
      <div class="ion-padding">
        <ion-text class="text-heading text-center" v-if="question">
          <h1 v-text="question" />
        </ion-text>

        <hexagram-details :number="hexagram.number" :lines="hexagram.lines" :mutated-lines="hexagram.mutatedLines" />
      </div>

      <ion-list class="container">
        <ion-item button @click="openLink('https://www.codeserk.es/project/android/i-ching')">
          <ion-icon slot="start" name="home-outline" />
          <ion-label v-t="'settings.about.website'" />
        </ion-item>
        <ion-item button @click="openLink('https://www.codeserk.es/project/android/i-ching/privacy-policy')">
          <ion-icon slot="start" name="document-outline" />
          <ion-label v-t="'settings.about.privacyPolicy'" />
        </ion-item>
        <ion-item
          button
          @click="openLink('https://play.google.com/store/apps/details?id=es.codeserk.iching')"
          color="primary"
        >
          <ion-icon slot="start" name="logo-android" />
          <ion-label v-t="'settings.about.android.download'" />
        </ion-item>
        <ion-item button @click="openLink('https://www.buymeacoffee.com/codeserk')" color="tertiary">
          <ion-icon slot="start" name="cafe-outline" />
          <ion-label v-t="'settings.about.coffee'" />
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
import { mapGetters } from 'vuex'

import HexagramDetails from '../components/hexagram-details.vue'
import { Hexagram } from '../models/hexagram'
import { Plugins } from '@capacitor/core'

const { Browser } = Plugins

export default {
  components: {
    HexagramDetails,
  },

  data: () => ({
    /**
     * Active hexagram
     *
     * @var {'primary'|'secondary'}
     */
    activeHexagram: 'primary',
  }),

  computed: {
    ...mapGetters(['getHexagramDetails', 'hexagramTitle']),

    /**
     * @returns {String|undefined} Hexagram id (hexagram number)
     */
    id() {
      return parseInt(this.$route.params.id)
    },

    /**
     * @returns {String|undefined} Hexagram uri
     */
    uri() {
      return this.$route.params.uri
    },

    /**
     * @returns {String|undefined} question
     */
    question() {
      return this.$route.query.q
    },

    /**
     * Gets the details of the hexagram
     *
     * @returns {HexagramDetails|undefined}
     */
    details() {
      if (!this.hexagram) {
        return
      }

      return this.getHexagramDetails(this.hexagram.number)
    },

    /**
     * Creates the hexagram from the number.
     *
     * @TODO Check this, I think this has linear complexity while it could be
     * constant.
     *
     * @returns {Hexagram}
     */
    hexagram() {
      if (this.id) {
        return Hexagram.fromNumber(this.id)
      }
      if (this.uri) {
        return Hexagram.fromUri(this.uri)
      }

      return undefined
    },

    /**
     * Gets the title of the hexagram.
     *
     * @returns {String}
     */
    title() {
      if (!this.hexagram) {
        return
      }

      return this.hexagramTitle(this.hexagram.number)
    },
  },

  methods: {
    openLink(link) {
      Browser.open({ url: link })
    },
  },
}
</script>

<style lang="scss" scoped>
.text-heading {
  text-align: center;
}
</style>
