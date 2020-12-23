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
import { mapGetters } from 'vuex'

import HexagramDetails from '../components/hexagram-details.vue'
import { Hexagram } from '../models/hexagram'

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
     * Gets the details of the hexagram
     *
     * @returns {HexagramDetails|undefined}
     */
    details() {
      if (!this.id) {
        return
      }

      return this.getHexagramDetails(this.id)
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
      return Hexagram.fromNumber(this.id)
    },

    /**
     * Gets the title of the hexagram.
     *
     * @returns {String}
     */
    title() {
      return this.hexagramTitle(this.id)
    },
  },
}
</script>
