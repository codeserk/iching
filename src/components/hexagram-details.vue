<template>
  <div class="hexagram-details" v-if="details">
    <ion-grid>
      <ion-row>
        <ion-col :size="12" size-sm class="ion-align-self-center ion-justify-content-center">
          <hexagram-figure class="hexagram-figure" :lines="lines" />
        </ion-col>
        <ion-col :size="12" size-sm class="ion-align-self-center ion-justify-content-center">
          <ion-text class="title">
            <h2>
              {{ number }}. {{ details.name.chinese }} / {{ details.name.pinyin }} / {{ details.name.translated }}
            </h2>
          </ion-text>
        </ion-col>
      </ion-row>
    </ion-grid>

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
import { IonGrid, IonRow, IonCol, IonText } from '@ionic/vue'
import { informationOutline } from 'ionicons/icons'
import { mapGetters } from 'vuex'

import HexagramFigure from './hexagram-figure.vue'

export default {
  components: {
    IonText,
    IonGrid,
    IonRow,
    IonCol,
    HexagramFigure,
  },

  props: {
    number: {
      type: Number,
      default: () => null,
    },

    lines: {
      type: Array,
      default: () => [],
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

.title {
  text-align: center;
}
.title h2 {
  margin-top: 0;
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
  left: -1em;
  border-right: 4px solid var(--ion-color-primary-contrast);
}
</style>
