<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start" v-if="phase > 0">
          <ion-button @click="restart">
            <ion-icon slot="start" name="refresh"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-buttons slot="end" v-if="phase === 2">
          <ion-button>
            <ion-icon slot="start" name="trash-outline"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-segment
          :value="activeHexagram"
          v-if="phase === 2 && hexagram && hexagram.hasSecondary"
          @ion-change="activeHexagram = $event.detail.value"
        >
          <ion-segment-button value="primary">Primary</ion-segment-button>
          <ion-segment-button value="secondary">Secondary</ion-segment-button>
        </ion-segment>
      </ion-toolbar>
    </ion-header>

    <ion-content class="content ion-padding page-oracle" fullscreen>
      <ion-slides id="slides" ref="slides" class="ion-slides" :options="slidesOptions">
        <ion-slide>
          <ion-text color="medium">
            <h1>Think about your question...</h1>
            <ion-input placeholder="Write it down to remember it..." v-model="question"></ion-input>

            <ion-button @click="phase = 1">Click</ion-button>
          </ion-text>
        </ion-slide>
        <ion-slide>
          <ion-text color="medium">
            <h1>Toss the coins</h1>

            {{ lines }}
            <br />

            <ion-button v-if="!hasTossed" @click="tossAll">Toss ALL</ion-button>

            <br />

            {{ coins }}
          </ion-text>
        </ion-slide>
        <ion-slide class="result-slide">
          <template v-if="hexagram">
            <hexagram-details
              v-if="hexagram.hasSecondary && activeHexagram === 'secondary'"
              :number="hexagram.secondaryNumber"
            />
            <hexagram-details v-else :number="hexagram.number" :mutated-lines="hexagram.mutatedLines" />
          </template>
        </ion-slide>
      </ion-slides>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonHeader,
  IonToolbar,
  IonButton,
  IonIcon,
  IonSlides,
  IonSlide,
  IonButtons,
  IonText,
  IonInput,
  IonPage,
  IonContent,
  IonSegment,
  IonSegmentButton,
} from '@ionic/vue'

import { Coin } from '../models/coin'
import { Hexagram, HexagramLine } from '../models/hexagram'
import { getRandomNumber } from '../util/random'
import { wait } from '../util/time'
import HexagramDetails from '../components/hexagram-details.vue'

// enum Phase {
//   ThinkQuestion,
//   TossCoins,
//   Result,
// }

export default {
  components: {
    IonHeader,
    IonButton,
    IonSlides,
    IonSlide,
    IonIcon,
    IonButtons,
    IonText,
    IonInput,
    IonContent,
    IonPage,
    IonToolbar,
    IonSegment,
    IonSegmentButton,

    HexagramDetails,
  },

  data: () => ({
    slidesOptions: {
      allowTouchMove: false,
    },

    /**
     * @var {Phase} phase Current phase
     */
    phase: 0,

    /**
     * @var {String} question Question for the I Ching.
     */
    question: '',

    hasTossed: false,

    coins: [],
    lines: [],
    hexagram: null,
    activeHexagram: 'primary',
  }),

  computed: {
    numLines() {
      return this.lines.length
    },

    needsMoreLines() {
      return this.numLines < 6
    },

    numCoins() {
      return this.coins.filter(Boolean).length
    },

    needsMoreCoins() {
      return this.numCoins < 3
    },
  },

  methods: {
    tossCoin(position) {
      this.coins[position] = Coin.fromToss()

      if (!this.needsMoreCoins) {
        this.addHexagramLine()
      }
    },

    async tossAll() {
      this.hasTossed = true
      this.coins = []

      await wait(getRandomNumber(0, 1) * 100)
      this.$nextTick(() => this.tossCoin(0))

      await wait(getRandomNumber(0, 1) * 100)
      this.$nextTick(() => this.tossCoin(1))

      await wait(getRandomNumber(0, 1) * 100)
      this.$nextTick(() => this.tossCoin(2))

      this.hasTossed = false
    },

    addHexagramLine() {
      const [coinA, coinB, coinC] = this.coins
      const line = HexagramLine.fromCoins(coinA, coinB, coinC)

      this.lines.push(line)

      if (!this.needsMoreLines) {
        this.hexagram = new Hexagram(this.lines)

        this.phase = 2
      }
    },

    restart() {
      this.hasTossed = false
      this.coins = []
      this.lines = []
      this.hexagram = null
      this.phase = 0
    },

    setActive(event) {
      console.log(event)
    },
  },

  watch: {
    phase(newPhase) {
      const byId = document.getElementById('slides')
      byId.swiper.slideTo(newPhase)
    },

    $route(newRoute) {
      console.log(newRoute)
      this.$nextTick(this.routeLoaded)
    },
  },
}
</script>

<style scoped>
.ion-slides {
  height: 100%;
}

.page-oracle .result-slide {
  display: block;
  overflow: auto;
}

.page-oracle .result-slide .toolbar {
  margin-top: 1em;
}
</style>
