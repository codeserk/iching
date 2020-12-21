<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title v-text="title" />

        <ion-buttons slot="start" v-if="phase > 0">
          <ion-button @click="restart">
            <ion-icon slot="start" name="refresh"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-buttons slot="end" v-if="phase === 2">
          <ion-button @click="showDeletePopup">
            <ion-icon slot="start" name="trash-outline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="content page-oracle" fullscreen>
      <ion-slides id="slides" ref="slides" class="ion-slides" :options="slidesOptions">
        <ion-slide class="slide-question ion-padding">
          <div class="container">
            <ion-text class="text-heading">
              <h1>Think about your question...</h1>
            </ion-text>

            <ion-text class="text-instructions" color="medium">
              <ul>
                <li>
                  Ask about one thing at a time. Instead of <em>Should I do this, or that?</em> ask
                  <em>What if I do this?</em>
                </li>
                <li>
                  Don’t ask for a <em>yes</em> or <em>no</em>. Instead of <em>Should I…?</em> ask
                  <em>What if I…?</em> Instead of <em>Will it happen?</em> you could ask <em>What will happen?</em>.
                </li>
                <li>
                  Make a habit of asking about your own choices and feelings, not other people’s.
                </li>
                <li>
                  Write your question down before you cast the reading, and keep thinking about it while you are tossing
                  the coins.
                </li>
              </ul>
            </ion-text>

            <div class="fill" />

            <div class="question-input">
              <ion-input :placeholder="questionPlaceholder" v-model="question" />
              <ion-button size="small" @click="saveQuestion">
                <ion-icon slot="icon-only" size="small" name="arrow-forward-outline"></ion-icon>
              </ion-button>
            </div>
          </div>
        </ion-slide>
        <ion-slide class="slide-coins ion-padding">
          <div class="container">
            <div class="toss-coins" @click="tossAll">
              <div class="button-toss" :class="{ 'has-tossed': hasTossed || !needsMoreLines }">
                <h3>Press to toss the coins.</h3>
              </div>
              <div class="coins">
                <div
                  class="coin coin-1"
                  :style="{
                    'background-image': `url(/assets/img/${
                      coins[0] ? (coins[0]?.position === 'heads' ? 'yin' : 'yang') : 'line-full-1'
                    }.png)`,
                  }"
                />
                <div
                  class="coin coin-2"
                  :style="{
                    'background-image': `url(/assets/img/${
                      coins[1] ? (coins[1]?.position === 'heads' ? 'yin' : 'yang') : 'line-full-2'
                    }.png)`,
                  }"
                />
                <div
                  class="coin coin-3"
                  :style="{
                    'background-image': `url(/assets/img/${
                      coins[2] ? (coins[2]?.position === 'heads' ? 'yin' : 'yang') : 'line-full-3'
                    }.png)`,
                  }"
                />
              </div>
            </div>

            <hexagram-figure :lines="lines" with-images />
          </div>
        </ion-slide>
        <ion-slide class="slide-result">
          <ion-toolbar v-if="hexagram && hexagram.hasSecondary">
            <ion-segment :value="activeHexagram" @ion-change="activeHexagram = $event.detail.value">
              <ion-segment-button value="primary">Primary</ion-segment-button>
              <ion-segment-button value="secondary">Secondary</ion-segment-button>
            </ion-segment>
          </ion-toolbar>

          <div v-if="hexagram" class="ion-padding">
            <hexagram-details
              v-if="hexagram.hasSecondary && activeHexagram === 'secondary'"
              :number="hexagram.secondaryNumber"
              :lines="hexagram.secondaryLines"
            />
            <hexagram-details
              v-else
              :number="hexagram.number"
              :mutated-lines="hexagram.mutatedLines"
              :lines="hexagram.lines"
            />
          </div>
        </ion-slide>
      </ion-slides>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonTitle,
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
import HexagramFigure from '../components/hexagram-figure.vue'
import { mapActions, mapGetters } from 'vuex'
import { alertController } from '@ionic/vue'

export default {
  components: {
    IonTitle,
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
    HexagramFigure,
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

    createdAt: new Date(),
    coins: [],
    lines: [],
    hexagram: null,
    activeHexagram: 'primary',
    result: null,
  }),

  computed: {
    ...mapGetters(['config', 'configKey']),

    title() {
      if (this.phase !== 0) {
        return this.question
      }

      return this.question || 'Ask the Oracle'
    },

    questionPlaceholder() {
      return `Question from ${this.createdAt.toLocaleString()}`
    },

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
    ...mapActions(['addResult', 'removeResult']),

    saveQuestion() {
      if (!this.question) {
        this.question = this.questionPlaceholder
      }

      this.phase = 1
    },

    async tossCoin(position) {
      this.coins[position] = Coin.fromToss()

      if (!this.needsMoreCoins) {
        await this.addHexagramLine()
      }
    },

    async tossAll() {
      if (this.hasTossed || !this.needsMoreLines) {
        return
      }

      this.hasTossed = true
      this.coins = []

      await wait(getRandomNumber(1, 2) * 500)
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
        setTimeout(async () => {
          this.hexagram = new Hexagram(this.lines)
          this.result = await this.addResult({
            question: this.question,
            hexagram: this.hexagram,
            createdAt: this.createdAt,
          })

          this.phase = 2
        }, 1000)
      }
    },

    restart() {
      this.hasTossed = false
      this.question = ''
      this.createdAt = new Date()
      this.coins = []
      this.lines = []
      this.hexagram = null
      this.result = null
      this.activeHexagram = 'primary'
      this.phase = 0
    },

    async showDeletePopup() {
      if (!this.config.journal.confirmDeletion) {
        await this.removeResult(this.result?.id)
        this.restart()

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
              await this.removeResult(this.result?.id)
              this.restart()
            },
          },
        ],
      })
      return alert.present()
    },
  },

  mounted() {
    if (!this.configKey('introduction.seen')) {
      this.$router.push('/introduction')
    }
  },

  watch: {
    phase(newPhase) {
      const byId = document.getElementById('slides')
      byId.swiper.slideTo(newPhase)
    },

    $route(newRoute) {
      if (newRoute.path === '/oracle') {
        this.$nextTick(() => {
          if (this.phase === 2) {
            this.restart()
          }
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.ion-slides {
  height: 100%;
}

.page-oracle .slide-question {
  .container {
    display: flex;
    flex-direction: column;
    height: 100%;
    text-align: left;

    .text-instructions {
      overflow: scroll;
      font-size: 0.8em;

      ul {
        padding: 0;
        list-style: none;

        li {
          margin-bottom: 10px;
        }
      }
    }

    .question-input {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 1em;
    }
  }
}

.page-oracle .slide-coins {
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 100%;

    .hexagram-figure {
      width: 400px;
    }

    .toss-coins {
      position: relative;
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: space-around;
      width: 100%;
      max-height: 300px;
      margin-top: 1em;

      .button-toss {
        flex: 1;
        transition: opacity 0.4s ease-in-out;

        &.has-tossed {
          opacity: 0.4;
        }

        h3 {
          text-align: right;
        }
      }

      .coins {
        display: flex;
        flex: 1;
        flex-direction: column;
        height: 100%;

        .coin {
          flex: 1;
          width: 100px;
          height: 100px;
          margin: 0 1em;
          background-position: center;
          background-size: contain;
          background-repeat: no-repeat;

          @media (prefers-color-scheme: dark) {
            filter: invert(100%);
          }
        }
      }
    }

    @media (max-height: 500px) {
      flex-direction: row;

      .toss-coins .coins .coin {
        width: 50px;
        min-height: 50px;
        margin: auto;
      }
    }
  }
}

.page-oracle .slide-result {
  display: block;
  overflow: auto;

  .ion-padding {
    padding-top: 0;
  }
}

.page-oracle .slide-result .toolbar {
  margin-top: 1em;
}
</style>
