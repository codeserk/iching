<template>
  <ion-page>
    <ion-content class="content" :fullscreen="true">
      <ion-slides class="ion-slides">
        <ion-slide>
          <div class="slide container">
            <img :src="`/assets/img/header-${isDarkMode ? 'white' : 'black'}.png`" />
            <h2>Welcome</h2>
            <p>
              The <b>ionic conference app</b> is a practical preview of the ionic framework in action, and a
              demonstration of proper code use.
            </p>
          </div>
        </ion-slide>

        <ion-slide>
          <div class="slide">
            <!-- <img src="./slide-2.png"/> -->
            <h2>What is Ionic?</h2>
            <p>
              <b>Ionic Framework</b> is an open source SDK that enables developers to build high quality mobile apps
              with web technologies like HTML, CSS, and JavaScript.
            </p>
          </div>
        </ion-slide>

        <ion-slide>
          <div class="slide">
            <!-- <img src="./slide-3.png"/> -->
            <h2>What is Ionic Appflow?</h2>
            <p>
              <b>Ionic Appflow</b> is a powerful set of services and features built on top of Ionic Framework that
              brings a totally new level of app development agility to mobile dev teams.
            </p>
          </div>
        </ion-slide>

        <ion-slide>
          <div class="slide">
            <!-- <img src="./slide-4.png"/> -->
            <h2>Ready to Play?</h2>
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

<style scoped>
.ion-slides {
  height: 100%;
}

.slide {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.swiper-slide {
  display: block;
}

.swiper-slide img {
  max-width: 80%;
  max-height: 50%;
  margin: 60px 0 20px;
  pointer-events: none;
}

b {
  font-weight: 500;
}

p {
  padding: 0 40px;
  color: var(--ion-color-step-600, #60646b);
  font-size: 14px;
  line-height: 1.5;
}

p b {
  color: var(--ion-text-color, #000);
}
</style>
