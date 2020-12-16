<template>
  <div class="hexagram-details" v-if="details">
    <ion-text>
      <h2>{{ number }}. {{ details.name.chinese }} / {{ details.name.pinyin }} / {{ details.name.translated }}</h2>
    </ion-text>

    <ion-text>
      <h3>Judgement</h3>
      <blockquote v-text="details.judgement.quote" />

      <h3>Images</h3>
      <blockquote v-text="details.images.quote" />
    </ion-text>

    <template v-if="mutatedLines.length > 0">
      <ion-text>
        <h3>Mutations</h3>
      </ion-text>

      <ion-text v-for="mutatedLine in mutatedLines" :key="mutatedLine">
        <h4>Line {{ mutatedLine }}</h4>
        <blockquote v-text="details.mutations[mutatedLine].quote" />
      </ion-text>
    </template>
  </div>
</template>

<script>
import { IonText } from '@ionic/vue'
import { informationOutline } from 'ionicons/icons'

import { mapGetters } from 'vuex'

export default {
  components: {
    IonText,
  },

  props: {
    number: {
      type: Number,
      default: () => null,
    },

    mutatedLines: {
      type: Array,
      default: () => [],
    },
  },

  data: () => ({
    informationOutline,
  }),

  computed: {
    ...mapGetters(['getHexagramDetails']),

    details() {
      if (!this.number) {
        return
      }

      return this.getHexagramDetails(this.number)
    },
  },
}
</script>

<style scoped>
.hexagram-details {
  text-align: left;
}

blockquote {
  position: relative;
  margin: 0;
  margin-left: 1em;
  line-height: 1.5em;
}

blockquote::before {
  content: '';
  position: absolute;
  top: 0.25em;
  bottom: 0.25em;
  left: calc(-1em + 4px);
  border-right: 4px solid black;
}
</style>
