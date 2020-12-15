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

            <ion-button @click="phase = 2">Click</ion-button>
          </ion-text>
        </ion-slide>
        <ion-slide>
          <ion-text color="medium">
            <h1>Boom.</h1>

            <ion-button @click="phase = 0">Click</ion-button>
          </ion-text>
        </ion-slide>
      </ion-slides>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { ref } from 'vue'
import { IonButton, IonSlides, IonSlide, IonText, IonInput, IonPage, IonContent } from '@ionic/vue'

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
  }),

  watch: {
    phase(newPhase) {
      const byId = document.getElementById('slides') as any
      byId.swiper.slideTo(newPhase)
    },
  },
}
</script>

<style scoped>
.ion-slides {
  height: 100%;
  text-align: left;
}

.swiper-slide {
  justify-content: flex-start;
}
</style>
