<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title v-t="'sections.journal.tab'" />
      </ion-toolbar>
      <ion-toolbar>
        <ion-searchbar animated @ion-change="search = $event.detail.value"></ion-searchbar>
      </ion-toolbar>

      <ion-toolbar>
        <ion-segment v-model="section">
          <ion-segment-button value="all">
            <ion-label v-t="'journal.tabs.all'" />
          </ion-segment-button>
          <ion-segment-button value="tags">
            <ion-label v-t="'journal.tabs.tags'" />
          </ion-segment-button>
        </ion-segment>
      </ion-toolbar>
    </ion-header>

    <ion-content class="content" fullscreen>
      <journal-items-list v-show="section === 'all'" :search="search" :active-id="$route.params.id" />
      <journal-tags-list v-show="section === 'tags'" :search="search" :active-id="$route.params.id" />
    </ion-content>
  </ion-page>
</template>

<script>
import JournalItemsList from '../../components/journal-items-list'
import JournalTagsList from '../../components/journal-tags-list'

export default {
  components: {
    JournalItemsList,
    JournalTagsList,
  },

  data: () => ({
    /**
     * Section selected
     * @type {'all' | 'tags'}
     */
    section: 'all',

    /**
     * Current search.
     *
     * @returns {String}
     */
    search: '',
  }),
}
</script>

<style>
ion-app.ios .android-only {
  display: none;
}
</style>
