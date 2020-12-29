<template>
  <ion-page>
    <ion-header collapse class="condensed-only">
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
          <ion-title size="large">
            <span class="condensed-only">Journal</span>
          </ion-title>
        </ion-toolbar>
        <ion-toolbar class="condensed-only">
          <ion-searchbar animated @ion-change="search = $event.detail.value"></ion-searchbar>
        </ion-toolbar>
      </ion-header>

      <journal-items-list class="condensed-only" :search="search" />

      <div class="journal-text container full-only">
        <ion-icon class="icon-journal" name="book-outline" size="large" />

        <div class="text-content">
          <h2 v-t="'introduction.slides.5.title'" />
          <p v-html="$t('introduction.slides.5.description')" />
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import JournalItemsList from '../components/journal-items-list'

export default {
  components: {
    JournalItemsList,
  },

  data: () => ({
    /**
     * Current search.
     *
     * @returns {String}
     */
    search: '',
  }),
}
</script>

<style lang="scss" scoped>
ion-app.ios .android-only {
  display: none;
}

.journal-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100% - 200px);
  text-align: center;

  .text-content {
    max-width: 400px;
  }

  ion-icon.icon-journal {
    width: 150px;
    height: 150px;
  }
}
</style>
