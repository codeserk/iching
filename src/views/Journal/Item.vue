<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button />
        </ion-buttons>
        <ion-title>Hello</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content fullscreen class="ion-padding">
      <p>Some description</p>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonBackButton, IonPage, IonButtons, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue'

export default {
  components: {
    IonBackButton,
    IonPage,
    IonButtons,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
  },
}
</script>

<style scoped>
.content {
  background: red;
  color: blue !important;
}
</style>
