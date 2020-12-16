<template>
  <ion-page>
    <ion-content class="content ion-padding" fullscreen>
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
        <ion-slide>
          <ion-text color="medium">
            <h1>Boom.</h1>

            <div v-if="hexagram">{{ hexagram.code }}</div>
            <div v-if="hexagram">{{ hexagram.secondaryCode }}</div>
          </ion-text>
        </ion-slide>
      </ion-slides>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { ref } from 'vue'
import { IonButton, IonSlides, IonSlide, IonText, IonInput, IonPage, IonContent } from '@ionic/vue'

import { Coin } from '../models/coin'
import { Hexagram, HexagramLine, SixHexagramLines } from '../models/hexagram'
import { getRandomNumber } from '../util/random'
import { wait } from '../util/time'

enum Phase {
  ThinkQuestion,
  TossCoins,
  Result,
}

export default {
  components: {
    IonButton,
    IonSlides,
    IonSlide,
    IonText,
    IonInput,
    IonContent,
    IonPage,
  },

  setup: () => ({
    slides: ref(null) as any,
  }),

  data: () => ({
    slidesOptions: {
      allowTouchMove: false,
    },

    /**
     * @var {Phase} phase Current phase
     */
    phase: Phase.ThinkQuestion,

    /**
     * @var {String} question Question for the I Ching.
     */
    question: '',

    hasTossed: false,

    coins: [] as Coin[],
    lines: [] as HexagramLine[],
    hexagram: null as Hexagram | null,
  }),

  computed: {
    numLines(): number {
      return this.lines.length
    },

    needsMoreLines(): boolean {
      return this.numLines < 6
    },

    numCoins(): number {
      return this.coins.filter(Boolean).length
    },

    needsMoreCoins(): boolean {
      return this.numCoins < 3
    },
  },

  methods: {
    tossCoin(position: number) {
      this.coins[position] = Coin.fromToss()

      if (!this.needsMoreCoins) {
        this.addHexagramLine()
      }
    },

    async tossAll() {
      this.hasTossed = true
      this.coins = []

      await wait(getRandomNumber(0, 1) * 1000)
      this.$nextTick(() => this.tossCoin(0))

      await wait(getRandomNumber(0, 1) * 1000)
      this.$nextTick(() => this.tossCoin(1))

      await wait(getRandomNumber(0, 1) * 1000)
      this.$nextTick(() => this.tossCoin(2))

      this.hasTossed = false
    },

    addHexagramLine() {
      const [coinA, coinB, coinC] = this.coins
      const line = HexagramLine.fromCoins(coinA, coinB, coinC)

      this.lines.push(line)

      if (!this.needsMoreLines) {
        this.hexagram = new Hexagram(this.lines as SixHexagramLines)

        this.phase = Phase.Result
      }
    },
  },

  watch: {
    phase(newPhase: Phase) {
      const byId = document.getElementById('slides') as any
      byId.swiper.slideTo(newPhase)
    },
  },
}
</script>

<style scoped>
.ion-slides {
  height: 100%;
}
</style>
