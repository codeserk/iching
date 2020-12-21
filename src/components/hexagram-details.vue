<template>
  <div class="hexagram-details" v-if="details">
    <ion-grid>
      <ion-row>
        <ion-col :size="12" size-sm class="ion-align-self-center ion-justify-content-center">
          <hexagram-figure class="hexagram-figure" :lines="lines" highlight-mutations with-images with-reveal-delay />
        </ion-col>
        <ion-col :size="12" size-sm class="ion-align-self-center ion-justify-content-center">
          <ion-text class="title">
            <h2 v-text="title" />
          </ion-text>

          <div v-if="config.display.trigrams" class="title">
            <h4>
              <strong v-t="`trigrams.${details.trigram.above}.name`" />,
              <span v-t="`trigrams.${details.trigram.above}.image`" />
            </h4>
            <h4>
              <strong v-t="`trigrams.${details.trigram.below}.name`" />,
              <span v-t="`trigrams.${details.trigram.below}.image`" />
            </h4>
          </div>
        </ion-col>
      </ion-row>
    </ion-grid>

    <ion-text v-if="config.display.name.description">
      <p v-text="details.name.description" />
    </ion-text>

    <div class="section-judgmenet" v-if="config.display.judgement.quote || config.display.judgement.description">
      <h3>Judgement</h3>
      <blockquote v-text="details.judgement.quote" v-if="config.display.judgement.quote" />
      <p v-text="details.judgement.description" v-if="config.display.judgement.description" />
    </div>

    <div class="section-image" v-if="config.display.images.quote || config.display.images.description">
      <h3>Image</h3>
      <blockquote v-text="details.images.quote" v-if="config.display.images.quote" />
      <p v-text="details.images.description" v-if="config.display.images.description" />
    </div>

    <template v-if="mutations.length > 0 && (config.display.mutations.quote || config.display.mutations.description)">
      <ion-text>
        <h3>Mutations</h3>
      </ion-text>

      <div v-for="mutatedLine in mutations" :key="mutatedLine" class="mutations-line">
        <div class="mutation-line-header">
          <div class="mutation-line-header-content">
            <h4>Line {{ mutatedLine }}</h4>
            <blockquote v-text="details.mutations[mutatedLine].quote" v-if="config.display.mutations.quote" />
          </div>
          <div class="hexagram-figure-container">
            <hexagram-figure class="hexagram-figure" :lines="lines" size="sm" :highlight-line="mutatedLine" />
          </div>
        </div>
        <p v-text="details.mutations[mutatedLine].description" v-if="config.display.mutations.description" />
      </div>
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
    ...mapGetters(['config', 'getHexagramDetails', 'hexagramTitle']),

    details() {
      if (!this.number) {
        return
      }

      return this.getHexagramDetails(this.number)
    },

    title() {
      return this.hexagramTitle(this.number)
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
  top: 0;
  bottom: 0;
  left: -1em;
  border-right: 5px solid var(--ion-text-color);
}

.mutations-line h4 {
  margin-top: 0;
}
.mutations-line {
  margin-bottom: 1.5em;
  padding-bottom: 1em;
  border-bottom: 1px solid var(--ion-color-step-500);
}
.mutations-line:last-child {
  border: none;
}
.mutation-line-header {
  display: flex;
  align-items: center;
  min-height: 80px;
}

.mutation-line-header .mutation-line-header-content {
  flex: 1;
}

.mutation-line-header .hexagram-figure-container {
  margin-left: 24px;
}

p,
blockquote {
  white-space: pre-line;
}

@media (min-width: 1120px) {
  .hexagram-details {
    width: 820px;
    margin: auto;
  }
}
</style>
