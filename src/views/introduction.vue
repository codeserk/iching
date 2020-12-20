<template>
  <ion-page>
    <ion-content class="content" :fullscreen="true">
      <ion-slides class="ion-slides">
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
            <img class="image-header" :src="`/assets/img/header-black.png`" />

            <div class="text-content">
              <h2 v-t="'introduction.slides.2.title'" />
              <p v-html="$t('introduction.slides.2.description')" />
            </div>
          </div>
        </ion-slide>

        <ion-slide>
          <div class="slide">
            <img class="image-header" :src="`/assets/img/header-black.png`" />

            <div class="text-content">
              <h2 v-t="'introduction.slides.3.title'" />
              <p v-html="$t('introduction.slides.3.description')" />
            </div>
          </div>
        </ion-slide>

        <ion-slide>
          <div class="slide">
            <img class="image-header" :src="`/assets/img/header-black.png`" />

            <div class="text-content">
              <h2 v-t="'introduction.slides.3.title'" />
              <p v-html="$t('introduction.slides.3.description')" />
            </div>
          </div>
        </ion-slide>

        <ion-slide>
          <div class="slide">
            <img class="image-header" :src="`/assets/img/header-black.png`" />

            <div class="text-content">
              <h2>Welcome</h2>
              <p>
                The <strong>ionic conference app</strong> is a practical preview of the ionic framework in action, and a
                demonstration of proper code use.
              </p>
            </div>
            <ion-button fill="clear" @click="$router.push('/oracle')">
              Continue <ion-icon slot="end" :icon="arrowForwardCircle" />
            </ion-button>
          </div>
        </ion-slide>
      </ion-slides>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonSlides, IonIcon, IonSlide, IonButton, IonPage, IonContent } from '@ionic/vue'
import { arrowForwardCircle } from 'ionicons/icons'

export default {
  components: { IonSlides, IonSlide, IonIcon, IonButton, IonContent, IonPage },

  data: () => ({
    arrowForwardCircle,
  }),
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

  @media (min-width: 520px) {
    h2 {
      font-size: 2em;
    }
    p {
      padding: 0;
      font-size: 1.25em;
    }
  }
}
</style>
