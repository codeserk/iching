<template>
  <ion-page>
    <ion-header collapse>
      <ion-toolbar>
        <ion-title>Journal</ion-title>
      </ion-toolbar>
      <ion-toolbar class="android-only">
        <ion-searchbar animated @ion-change="search = $event.detail.value"></ion-searchbar>
      </ion-toolbar>
    </ion-header>
    <ion-content class="content" :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Journal</ion-title>
        </ion-toolbar>
        <ion-toolbar>
          <ion-searchbar animated @ion-change="search = $event.detail.value"></ion-searchbar>
        </ion-toolbar>
      </ion-header>

      <ion-list>
        <ion-item-sliding v-for="result in filteredResults" :key="result.id">
          <ion-item button @click="$router.push(`/journal/${result.id}`)">
            <ion-label v-text="result.question" />
          </ion-item>

          <ion-item-options side="end">
            <ion-item-option color="danger" @click="showDeletePopup(result.id)">Delete</ion-item-option>
          </ion-item-options>
        </ion-item-sliding>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import {
  IonSearchbar,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonList,
  IonItem,
  IonLabel,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  alertController,
} from '@ionic/vue'

export default {
  components: {
    IonSearchbar,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonList,
    IonItem,
    IonLabel,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
  },

  data: () => ({
    search: '',
  }),

  computed: {
    ...mapGetters(['results']),

    filteredResults() {
      if (!this.search) {
        return this.results
      }

      const search = this.search.toLowerCase()
      return this.results.filter(result => result.question.toLowerCase().includes(search))
    },
  },

  methods: {
    ...mapActions(['removeResult']),

    async showDeletePopup(id) {
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
              await this.removeResult(id)
            },
          },
        ],
      })
      return alert.present()
    },
  },
}
</script>

<style>
ion-app.ios .android-only {
  display: none;
}
</style>
