<template>
  <ion-page>
    <ion-button class="button-skip" fill="clear" size="small" @click="finish">
      <ion-text color="primary" v-t="'skip'" />
    </ion-button>
    <div class="dots">
      <div v-for="(dot, index) in [1, 2, 3, 4, 5]" :key="dot" class="dot" :class="{ active: currentSlide === index }" />
    </div>

    <ion-content class="content" :fullscreen="true">
      <ion-slides class="ion-slides" @ionSlideDidChange="onSlideChanged">
        <ion-slide>
          <div class="slide container">
            <img class="image-header" :src="`/assets/img/header-black.png`" />

            <div class="text-content">
              <h2 v-t="'introduction.slides.1.title'" />
              <p v-html="$t('introduction.slides.1.description')" />
            </div>
          </div>
        </ion-slide>

        <ion-slide>
          <div class="slide">
            <ion-icon class="icon-oracle" name="stop-circle-outline" size="large" />

            <div class="text-content">
              <h2 v-t="'introduction.slides.2.title'" />
              <p v-html="$t('introduction.slides.2.description')" />
            </div>

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
          </div>
        </ion-slide>

        <ion-slide>
          <div class="slide">
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

            <div class="text-content">
              <h2 v-t="'introduction.slides.3.title'" />
              <p v-html="$t('introduction.slides.3.description')" />
            </div>
          </div>
        </ion-slide>

        <ion-slide>
          <div class="slide container">
            <ion-icon class="icon-settings" name="options-outline" size="large" />

            <div class="text-content">
              <h2 v-t="'introduction.slides.4.title'" />
              <p v-html="$t('introduction.slides.4.description')" />
            </div>
          </div>
        </ion-slide>

        <ion-slide>
          <div class="slide container">
            <ion-icon class="icon-journal" name="book-outline" size="large" />

            <div class="text-content">
              <h2 v-t="'introduction.slides.5.title'" />
              <p v-html="$t('introduction.slides.5.description')" />
            </div>
            <ion-button fill="clear" @click="finish">
              {{ $t('start') }} <ion-icon slot="end" name="arrow-forward-circle" />
            </ion-button>
          </div>
        </ion-slide>
      </ion-slides>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonSlides, IonIcon, IonSlide, IonButton, IonPage, IonContent } from '@ionic/vue'
import { wait } from '../util/time'
import { getRandomNumber } from '../util/random'
import { Coin } from '../models/coin'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: { IonSlides, IonSlide, IonIcon, IonButton, IonContent, IonPage },

  data: () => ({
    coins: [],

    currentSlide: 0,
  }),

  computed: {
    ...mapGetters(['config']),
  },

  methods: {
    ...mapActions(['updateKey']),

    async onSlideChanged(event, b) {
      this.currentSlide = await event.target.getActiveIndex()
    },

    async tossCoin(position) {
      this.coins[position] = Coin.fromToss()
    },

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

    async finish() {
      await this.updateKey({ key: 'introduction.seen', value: true })

      this.$router.replace('/oracle')
    },
  },

  async mounted() {
    await this.tossCoins()
  },
}
</script>

<style lang="scss" scoped>
.ion-slides {
  height: 100%;

  .slide {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;

    .text-content {
      max-width: 400px;
    }
  }

  .swiper-slide {
    display: block;

    img {
      width: 70vw;
      max-width: 350px;
      margin-bottom: 20px;
      pointer-events: none;

      @media (prefers-color-scheme: dark) {
        filter: invert(100%);
      }
    }
  }

  p {
    padding: 0 40px;
    color: var(--ion-color-step-600, #60646b);
    font-size: 14px;
    line-height: 1.5;

    strong {
      color: var(--ion-text-color, #000);
    }
  }

  .text-instructions {
    overflow: scroll;
    max-width: 400px;
    margin: 10px 10vw;
    font-size: 0.6em;
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

  .coins {
    display: flex;
    flex-direction: column;
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

  ion-icon.icon-settings,
  ion-icon.icon-journal,
  ion-icon.icon-oracle {
    width: 150px;
    height: 150px;
  }

  @media (min-width: 520px) {
    h2 {
      font-size: 2em;
    }
    p {
      padding: 0;
      font-size: 1.25em;
    }
  }

  @media (max-height: 500px) {
    .swiper-slide img {
      width: 35vw;
    }
    .text-content {
      margin-left: 10px;
    }
    .slide {
      flex-direction: row;
      justify-content: space-around;
    }
  }
}

.button-skip {
  position: fixed;
  top: 6px;
  left: 6px;
  z-index: 1;
}

.dots {
  position: fixed;
  top: 6px;
  left: 50%;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100px;
  height: 2.1em;
  transform: translate3d(-50%, 0, 0);

  .dot {
    width: 12px;
    height: 12px;
    border: 1px solid var(--ion-color-primary);
    border-radius: 50%;
    background: transparent;
    transition: background-color 0.4s ease-in-out;

    &.active {
      background: var(--ion-color-primary);
    }
  }
}
</style>
