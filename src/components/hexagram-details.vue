<template>
  <div class="hexagram-details" v-if="details">
    <ion-grid>
      <ion-row>
        <ion-col :size="12" size-sm class="ion-align-self-center ion-justify-content-center">
          <hexagram-figure class="hexagram-figure" :lines="lines" highlight-mutations />
        </ion-col>
        <ion-col :size="12" size-sm class="ion-align-self-center ion-justify-content-center">
          <ion-text class="title">
            <h2>
              {{ number }}. {{ details.name.chinese }} / {{ details.name.pinyin }} / {{ details.name.translated }}
            </h2>
            <h3>
              <strong v-t="`trigrams.${details.trigram.above}.name`" />,
              <span v-t="`trigrams.${details.trigram.above}.image`" />
            </h3>
            <h3>
              <strong v-t="`trigrams.${details.trigram.below}.name`" />,
              <span v-t="`trigrams.${details.trigram.below}.image`" />
            </h3>
          </ion-text>
        </ion-col>
      </ion-row>
    </ion-grid>

    <ion-text>
      <p v-text="details.name.description" />
    </ion-text>

    <ion-text>
      <h3>Judgement</h3>
      <blockquote v-text="details.judgement.quote" />
      <p v-text="details.judgement.description" />

      <h3>Images</h3>
      <blockquote v-text="details.images.quote" />
      <p v-text="details.images.description" />
    </ion-text>

    <template v-if="mutations.length > 0">
      <ion-text>
        <h3>Mutations</h3>
      </ion-text>

      <ion-grid>
        <ion-row v-for="mutatedLine in mutations" :key="mutatedLine" class="mutations-line">
          <ion-col :size="3" class="ion-align-self-center ion-justify-content-center">
            <hexagram-figure class="hexagram-figure" :lines="lines" size="xs" :highlight-line="mutatedLine" />
          </ion-col>
          <ion-col :size="9" class="ion-align-self-center ion-justify-content-center">
            <ion-text>
              <h4>Line {{ mutatedLine }}</h4>
              <blockquote v-text="details.mutations[mutatedLine].quote" />
              <p v-text="details.mutations[mutatedLine].description" />
            </ion-text>
          </ion-col>
        </ion-row>
      </ion-grid>
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

    showAllMutations: {
      type: Boolean,
      defauilt: false,
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

    mutations() {
      if (this.showAllMutations) {
        return [1, 2, 3, 4, 5, 6]
      }

      return this.mutatedLines
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
  border-right: 6px solid var(--ion-text-color);
}

.mutations-line h4 {
  margin-top: 0;
}
.mutations-line {
  margin-bottom: 1em;
}

p {
  white-space: pre-line;
}
</style>
