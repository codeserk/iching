<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Journal</ion-title>
      </ion-toolbar>
      <ion-toolbar>
        <ion-searchbar animated @ion-change="search = $event.detail.value"></ion-searchbar>
      </ion-toolbar>
    </ion-header>

    <ion-content class="content" :fullscreen="true">
      <journal-items-list :search="search" :active-id="$route.params.id" />
    </ion-content>
  </ion-page>
</template>

<script>
import { IonSearchbar, IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue'
import JournalItemsList from '../../components/journal-items-list'

export default {
  components: {
    IonSearchbar,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,

    JournalItemsList,
  },

  data: () => ({
    search: '',
  }),
}
</script>

<style>
ion-app.ios .android-only {
  display: none;
}
</style>
