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
        <ion-buttons slot="end">
          <ion-button @click="onRightIconClicked">
            <ion-icon slot="start" :name="phase === 2 ? 'share-social-outline' : 'help-circle-outline'"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-modal :is-open="showHelp" @onDidDismiss="showHelp = false">
      <help-modal @close="showHelp = false" />
    </ion-modal>

    <ion-content class="content page-oracle" fullscreen>
      <ion-slides id="slides" ref="slides" class="ion-slides" :options="slidesOptions">
        <ion-slide class="slide-question ion-padding">
          <div class="container">
            <ion-text class="text-heading">
              <h1 v-t="'oracle.question.title'" />
            </ion-text>

            <ion-text class="text-instructions" color="medium">
              <ul>
                <li v-html="$t('questions.tip.0')" />
                <li v-html="$t('questions.tip.1')" />
                <li v-html="$t('questions.tip.2')" />
                <li v-html="$t('questions.tip.3')" />
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
              <ion-text class="text-heading">
                <h1>{{ $t('oracle.toss.title', { step: numLines }) }}</h1>
              </ion-text>

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
              <ion-button class="button-toss" fill="solid" :class="{ 'has-tossed': hasTossed || !needsMoreLines }">
                <span v-t="'oracle.toss.button'" />
                <ion-icon slot="end" name="dice-outline" />
              </ion-button>
            </div>

            <hexagram-figure :lines="lines" with-images />
          </div>
        </ion-slide>
        <ion-slide class="slide-result">
          <ion-toolbar v-if="hexagram && hexagram.hasSecondary">
            <ion-segment :value="activeHexagram" @ion-change="activeHexagram = $event.detail.value">
              <ion-segment-button value="primary" v-t="'hexagram.primary'" />
              <ion-segment-button value="secondary" v-t="'hexagram.secondary'" />
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

            <result-tags :result-id="resultId" />
            <result-notes :result-id="resultId" />
          </div>
        </ion-slide>
      </ion-slides>
    </ion-content>

    <div id="share-container">
      <div class="share" width="600" height="600" v-if="hexagram">
        <div class="question">
          <h1 v-text="question" />
        </div>

        <hexagram-figure id="main-figure" class="hexagram-figure" :lines="lines" with-images light-theme />

        <div class="title">
          <h2 v-text="detailsTitle" />
        </div>

        <div class="title">
          <h4>
            <strong v-t="`trigrams.${details.trigram.above}.name`" />,
            <span v-t="`trigrams.${details.trigram.above}.image`" />
          </h4>
          <h4>
            <strong v-t="`trigrams.${details.trigram.below}.name`" />,
            <span v-t="`trigrams.${details.trigram.below}.image`" />
          </h4>
        </div>
      </div>
    </div>
  </ion-page>
</template>

<script>
import { Coin } from '../models/coin'
import { Hexagram, HexagramLine } from '../models/hexagram'
import { getRandomNumber } from '../util/random'
import { wait } from '../util/time'
import { mapActions, mapGetters } from 'vuex'
import { alertController, toastController } from '@ionic/vue'
import html2canvas from 'html2canvas'
import { Plugins, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core'
import { writeFile } from 'capacitor-blob-writer'
import { b64toBlob } from '@/util/binary'

import HexagramFigure from '../components/hexagram-figure.vue'
import HexagramDetails from '../components/hexagram-details.vue'
import ResultTags from '../components/result-tags.vue'
import ResultNotes from '../components/result-notes.vue'
import HelpModal from '@/views/HelpModal'

const { Share, Browser } = Plugins

export default {
  components: {
    HexagramDetails,
    HexagramFigure,
    HelpModal,
    ResultTags,
    ResultNotes,
  },

  data: () => ({
    /** Whether the help modal is active */
    showHelp: false,

    /**
     * Options for the slider.
     *
     * @var {Object}
     */
    slidesOptions: {
      allowTouchMove: false,
    },

    /**
     * Current phase.
     * This was an enum before, but TS was adding more problems than solutions.
     *
     * 0: Question
     * 1: Coins
     * 2: Result
     *
     * @var {Number}
     */
    phase: 0,

    /**
     * @var {String} question Question for the I Ching.
     */
    question: '',

    /**
     * Whether the user has tossed the coins
     *
     * @var {Boolean}
     */
    hasTossed: false,

    /**
     * Time when the question was created.
     *
     * @var {Date}
     */
    createdAt: new Date(),

    /**
     * Already tossed coins
     *
     * @var {Coin[]}
     */
    coins: [],

    /**
     * Revealed hexagram lines
     *
     * @var {HexagramLine[]}
     */
    lines: [],

    /**
     * Resulting hexagram
     *
     * @var {Hexagram|null}
     */
    hexagram: null,

    /**
     * Hexagram active
     *
     * @var {'primary'|'secondary}
     */
    activeHexagram: 'primary',

    /**
     * Final result
     *
     * @var {HexagramResult|null}
     */
    result: null,
  }),

  computed: {
    ...mapGetters(['config', 'configKey', 'results', 'getHexagramDetails', 'hexagramTitle']),

    /**
     * Id of the result, in case the result has been created
     * @returns {string | undefined}
     */
    resultId() {
      if (!this.result) {
        return
      }

      return this.result.id
    },

    /**
     * Page title (to show in the top toolbar). Depends on the current phase
     *
     * @returns {String}
     */
    title() {
      if (this.phase !== 0) {
        return this.question
      }

      return this.question || this.$t('oracle.title')
    },

    /**
     * Placeholder for the question, before the user writes anything.
     *
     * @returns {String}
     */
    questionPlaceholder() {
      return this.$t('oracle.question.name', { date: this.createdAt.toLocaleString() })
    },

    /**
     * Number of hexagram lines revealed
     *
     * @returns {Number}
     */
    numLines() {
      return this.lines.length
    },

    /**
     * Whether the user needs to reveal more lines
     *
     * @returns {Boolean}
     */
    needsMoreLines() {
      return this.numLines < 6
    },

    /**
     * Number of coins that have been flipped.
     *
     * @returns {Number}
     */
    numCoins() {
      return this.coins.filter(Boolean).length
    },

    /**
     * Whether the user is waiting for more coins to be flipped
     *
     * @returns {Boolean}
     */
    needsMoreCoins() {
      return this.numCoins < 3
    },

    /**
     * Hexagram details.
     *
     * @returns {HexagramDetails|undefined}
     */
    details() {
      if (!this.hexagram || !this.hexagram.number) {
        return
      }

      return this.getHexagramDetails(this.hexagram.number)
    },

    /**
     * Gets the hexagram title
     *
     * @returns {String|undefined}
     */
    detailsTitle() {
      if (!this.hexagram || !this.hexagram.number) {
        return
      }

      return this.hexagramTitle(this.hexagram.number)
    },
  },

  methods: {
    ...mapActions(['addResult', 'removeResult', 'updateKey']),

    /**
     * Saves the question in the store and moves to the next phase.
     */
    saveQuestion() {
      if (!this.question) {
        this.question = this.questionPlaceholder
      }

      this.phase = 1
    },

    /**
     * Tosses a coin in a given position.
     *
     * @param {Number} position.
     */
    async tossCoin(position) {
      this.coins[position] = Coin.fromToss()

      if (!this.needsMoreCoins) {
        await this.addHexagramLine()
      }
    },

    /**
     * Tosses all the coins.
     */
    async tossAll() {
      if (this.hasTossed || !this.needsMoreLines) {
        return
      }

      this.hasTossed = true
      this.coins = []

      await wait(getRandomNumber(1, 2) * 350)
      this.$nextTick(() => this.tossCoin(0))

      await wait(getRandomNumber(0, 1) * 350)
      this.$nextTick(() => this.tossCoin(1))

      await wait(getRandomNumber(0, 1) * 350)
      this.$nextTick(() => this.tossCoin(2))

      this.hasTossed = false
    },

    /**
     * Adds a new hexagram line from the tossed coins.
     */
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
          this.track('hexagram:result', { number: this.hexagram.number })

          this.showRateApp()
        }, 1000)
      }
    },

    /**
     * Shows rate app popup
     */
    showRateApp() {
      if (!this.configKey('rate.asked') && this.results.length > 1) {
        try {
          Plugins.CapacitorRateApp.requestReview().catch(console.error)
          this.updateKey({ key: 'rate.asked', value: true })
        } catch (error) {
          console.error(error)
        }
      }
    },

    onRightIconClicked() {
      if (this.phase === 2) {
        this.track('share')
        this.share()
      } else {
        this.track('show-help')
        this.showHelp = true
      }
    },

    async share() {
      if (this.isApp) {
        return this.generateImage()
      }

      Browser.open({
        url: `https://i-ching.codeserk.es/result/${this.hexagram.uri}?q=${encodeURIComponent(this.question)}`,
      })
    },

    async generateImage() {
      try {
        const element = document.getElementById('html2canvas')
        element.innerHTML = ''
        const targetElement = document.getElementById('share-container').firstChild.cloneNode(true)
        element.appendChild(targetElement)

        const canvas = await html2canvas(element.firstChild)
        const dataUrl = canvas.toDataURL()
        const data = dataUrl.split(',')[1]
        const blob = b64toBlob(data, 'UTF-8')
        const title = `i-ching-${new Date().getMilliseconds()}`

        const result = await writeFile({
          path: `${title}.png`,
          data: blob,
          directory: FilesystemDirectory.Cache,
          encoding: FilesystemEncoding.UTF8,
        })

        await Share.share({
          title: this.$t('share.title'),
          text: this.$t('share.text', {
            question: this.question,
            link: `https://i-ching.codeserk.es/result/${this.hexagram.uri}?q=${encodeURIComponent(this.question)}`,
          }),
          url: result.uri,
          dialogTitle: this.$t('share.title'),
        })
      } catch (error) {
        const toast = await toastController.create({
          message: this.$t('error.share'),
          duration: 5000,
          color: 'danger',
        })
        return toast.present()
      }
    },

    /**
     * Restarts the oracle (sets all the values to the initial ones).
     */
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

    /**
     * Shows a popup to delete the result.
     *
     * @TODO Actually the popup only shows if it's configured like that.
     */
    async showDeletePopup() {
      if (!this.config.journal.confirmDeletion) {
        await this.removeResult(this.result?.id)
        this.restart()

        return
      }

      const alert = await alertController.create({
        header: this.$t('delete.title'),
        message: this.$t('delete.message'),
        buttons: [
          {
            text: this.$t('delete.cancel'),
            role: 'cancel',
          },
          {
            text: this.$t('delete.accept'),
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

  /**
   * Handles mounted life-cycle event.
   */
  mounted() {
    if (!this.configKey('introduction.seen')) {
      this.$router.push('/introduction')
    }
  },

  watch: {
    /**
     * Changes the active slide (ionic component) when the phase changes.
     */
    phase(newPhase) {
      const byId = document.getElementById('slides')
      byId.swiper.slideTo(newPhase)
    },

    /**
     * Restarts the oracle if the user comes back to this page after showing
     * the result page.
     */
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
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;
      width: 100%;
      max-height: 300px;

      .button-toss {
        transition: opacity 0.4s ease-in-out;

        &.has-tossed {
          opacity: 0.4;
        }
      }

      .coins {
        display: flex;
        flex: 1;
        flex-direction: row;
        align-items: center;

        .coin {
          flex: 1;
          width: 80px;
          height: 80px;
          background-position: center;
          background-size: contain;
          background-repeat: no-repeat;

          @media (prefers-color-scheme: dark) {
            filter: invert(100%);
          }

          body.dark & {
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

#share-container {
  position: fixed;
  top: 100px;
  right: 0;
  z-index: -10000;
  width: 400px;
  height: 400px;
  border: 1px solid black;
}

.share {
  position: relative;
  display: flex;
  flex-direction: column;
  align-content: space-around;
  justify-content: center;
  width: 600px;
  height: 600px;
  margin: auto;
  background: white;
  color: black;
  text-align: center;

  .hexagram-figure {
    width: 300px;
    height: 250px;

    .circle {
      filter: none !important;
    }
  }

  .question {
    h1 {
      margin-top: 0;
      margin-bottom: 1em;
      font-weight: bold;
    }
  }

  .title {
    color: black;
    text-align: center;

    h2 {
      margin-top: 1em;
      margin-bottom: 0;
    }
  }
}
</style>
