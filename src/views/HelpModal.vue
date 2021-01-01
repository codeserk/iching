<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title v-t="'help.title'" />
        <ion-buttons slot="start">
          <ion-button v-t="'close'" @click="$emit('close')" />
        </ion-buttons>
      </ion-toolbar>
      <ion-toolbar>
        <ion-segment v-model="section" scrollable>
          <ion-segment-button value="iching" v-t="'help.iching.title'" />
          <ion-segment-button value="question" v-t="'help.question.title'" />
          <ion-segment-button value="coins" v-t="'help.coins.title'" />
          <ion-segment-button value="hexagram" v-t="'help.hexagram.title'" />
        </ion-segment>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="section section-iching" v-show="section === 'iching'">
        <img class="image-header" :src="`/assets/img/header-black.png`" />

        <div class="section description">
          <p v-t="'help.iching.description.0'" />
          <p v-t="'help.iching.description.1'" />
        </div>

        <ion-list lines="full">
          <ion-item button @click="openLink($t('help.iching.moreInfo.link'))">
            <ion-label v-t="'help.iching.moreInfo.label'" />
            <ion-icon slot="start" name="globe-outline" />
          </ion-item>
        </ion-list>
      </div>

      <div class="section section-question" v-show="section === 'question'">
        <ion-icon class="icon" name="stop-circle-outline" size="large" />

        <div class="description">
          <p v-t="'help.question.description.0'" />
          <p v-t="'help.question.description.1'" />

          <ion-text class="text-instructions">
            <ul>
              <li v-html="$t('questions.tip.0')" />
              <li v-html="$t('questions.tip.1')" />
              <li v-html="$t('questions.tip.2')" />
              <li v-html="$t('questions.tip.3')" />
            </ul>
          </ion-text>
        </div>
      </div>

      <div class="section section-coins" v-show="section === 'coins'">
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

        <div class="description">
          <p v-t="'help.coins.description.0'" />
          <p v-t="'help.coins.description.1'" />
          <p v-t="'help.coins.description.2'" />

          <table>
            <thead>
              <tr>
                <th v-t="'help.coins.table.combo'" />
                <th v-t="'help.coins.table.number'" />
                <th v-t="'help.coins.table.line'" />
              </tr>
            </thead>
            <tbody>
              <tr>
                <th v-t="'help.coins.table.mutableYang'" />
                <td class="ion-text-center" v-text="'9'" />
                <td>
                  <div class="line">
                    <div class="bar full-bar" />
                    <div class="circle"></div>
                  </div>
                </td>
              </tr>
              <tr>
                <th v-t="'help.coins.table.yin'" />
                <td class="ion-text-center" v-text="'8'" />
                <td>
                  <div class="line">
                    <div class="bar bar-left" />
                    <div class="bar bar-right" />
                  </div>
                </td>
              </tr>
              <tr>
                <th v-t="'help.coins.table.yang'" />
                <td class="ion-text-center" v-text="'7'" />
                <td>
                  <div class="line">
                    <div class="bar full-bar" />
                  </div>
                </td>
              </tr>
              <tr>
                <th v-t="'help.coins.table.mutableYin'" />
                <td class="ion-text-center" v-text="'6'" />
                <td>
                  <div class="line">
                    <div class="bar bar-left" />
                    <div class="bar bar-right" />
                    <div class="cross"></div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="section section-hexagram" v-show="section === 'hexagram'">
        <hexagram-figure
          class="hexagram-figure"
          :lines="hexagram.lines"
          highlight-mutations
          with-images
          with-reveal-delay
        />

        <div class="description">
          <p v-t="'help.hexagram.description.0'" />
          <p v-t="'help.hexagram.description.1'" />
          <p v-t="'help.hexagram.description.2'" />
          <p v-t="'help.hexagram.description.3'" />
          <p v-t="'help.hexagram.description.4'" />
          <p v-t="'help.hexagram.description.5'" />
          <p v-t="'help.hexagram.description.6'" />
          <p v-t="'help.hexagram.description.7'" />
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { Plugins } from '@capacitor/core'
import { wait } from '../util/time'
import { getRandomInt, getRandomNumber } from '../util/random'
import { Coin } from '../models/coin'
import { Hexagram } from '../models/hexagram'

import HexagramFigure from '@/components/hexagram-figure'

const { Browser } = Plugins

export default {
  components: {
    HexagramFigure,
  },

  data: () => ({
    section: 'iching',

    /**
     * Coins, used in one of the slides.
     *
     * @var {Coin[]}
     */
    coins: [],

    hexagram: Hexagram.fromNumber(getRandomInt(1, 64)),
  }),

  methods: {
    openLink(link) {
      Browser.open({ url: link })
    },

    /**
     * Tosses the coin in a given position.
     *
     * @param {Number} position
     */
    async tossCoin(position) {
      this.coins[position] = Coin.fromToss()
    },

    /**
     * Tosses all the coins.
     */
    async tossCoins() {
      await wait(getRandomNumber(1, 2) * 500)
      this.$nextTick(() => this.tossCoin(0))

      await wait(getRandomNumber(0, 1) * 1000)
      this.$nextTick(() => this.tossCoin(1))

      await wait(getRandomNumber(0, 1) * 1000)
      this.$nextTick(() => this.tossCoin(2))

      await wait(getRandomNumber(0, 1) * 3000)
      this.coins = []

      await this.tossCoins()
    },
  },

  /**
   * Mounted life-cycle event.
   */
  async mounted() {
    await this.tossCoins()
  },
}
</script>

<style lang="scss" scoped>
.section {
  text-align: center;
  img {
    max-width: 250px;
    margin: auto;
    text-align: center;
    pointer-events: none;

    @media (prefers-color-scheme: dark) {
      filter: invert(100%);
    }
  }

  .icon {
    width: 150px;
    height: 150px;
  }

  .description {
    text-align: left;
  }
}

.section.section-question {
  .text-instructions {
    max-width: 400px;
    margin: 10px 10vw;
    text-align: left;

    ul {
      padding: 0;
      list-style: none;

      li {
        margin-bottom: 10px;
      }
    }

    @media (min-width: 600px) {
      font-size: 0.9em;
    }
  }
}

.section.section-coins {
  .coins {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 150px;
    margin-bottom: 10px;

    .coin {
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

  table {
    width: 100%;
    margin-top: 2em;

    thead {
      tr {
        th {
          padding-bottom: 10px;
          text-align: center;
        }
      }
    }

    .line {
      position: relative;
      width: 80px;
      height: 10px;
      margin: auto;
      margin-bottom: 3px;

      .bar {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 40%;
        background: var(--ion-text-color);

        &.full-bar {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: 100%;
          background: var(--ion-text-color);
        }

        &.bar-left {
          left: 0;
        }

        &.bar-right {
          right: 0;
        }
      }

      .circle,
      .cross {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
      }

      .circle {
        width: 10px;
        height: 20px;
        border-radius: 100%;
        background: var(--ion-background-color);
      }

      .cross::before,
      .cross::after {
        content: ' ';
        position: absolute;
        top: -6px;
        left: -1px;
        width: 2px;
        height: 12px;
        background-color: var(--ion-text-color);
      }
      .cross::before {
        transform: rotate(45deg);
      }
      .cross::after {
        transform: rotate(-45deg);
      }

      .cross::before,
      .cross::after {
        top: -3px;
        left: -1px;
        width: 1px;
        height: 6px;
      }

      .circle {
        width: 6px;
        height: 6px;
      }
    }
  }
}
</style>
