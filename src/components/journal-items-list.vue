<template>
  <div class="items-list">
    <ion-list>
      <ion-item-sliding v-for="result in filteredResults" :key="result.id">
        <ion-item
          button
          @click="$router.push(`/journal/${result.id}`)"
          :color="result.id === activeId ? 'primary' : undefined"
        >
          <ion-label v-text="result.question" />
          <div slot="start">
            <hexagram-figure
              slot="start"
              class="hexagram-figure"
              :lines="result.hexagram.lines"
              highlight-mutations
              size="xs"
            />
          </div>
        </ion-item>

        <ion-item-options side="end">
          <ion-item-option color="danger" @click="showDeletePopup(result.id)">Delete</ion-item-option>
        </ion-item-options>
      </ion-item-sliding>
    </ion-list>

    <ion-button v-if="shouldShowShowAllButton" @click="showAll = true" expand="block" fill="clear" v-t="'showMore'" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import { alertController } from '@ionic/vue'
import HexagramFigure from '../components/hexagram-figure.vue'
import { filterResults } from '../util/results'

export default {
  components: {
    HexagramFigure,
  },

  data: () => ({
    /**
     * Whether all the results should be shown.
     * Default to false to prevent long rendering periods.
     */
    showAll: false,
  }),

  props: {
    /**
     * Search string, used to filter results.
     */
    search: {
      type: String,
      default: '',
    },

    tag: {
      type: String,
      default: '',
    },

    /**
     * Id of the active result.
     */
    activeId: {
      type: String,
      default: null,
    },
  },

  computed: {
    ...mapGetters(['config', 'results']),

    /**
     * Whether the button to show all should be visible
     *
     * @returns {Boolean}
     */
    shouldShowShowAllButton() {
      return this.filteredResultsWithoutSlice.length > 10 && !this.showAll
    },

    /**
     * Filtered results.
     *
     * @returns {OracleResult[]}
     */
    filteredResults() {
      return filterResults(this.results, this.search, this.tag, this.showAll)
    },

    filteredResultsWithoutSlice() {
      return filterResults(this.results, this.search, this.tag, true)
    },
  },

  methods: {
    ...mapActions(['removeResult']),

    /**
     * Shows a popup to delete the result.
     *
     * @TODO Actually the popup only shows if it's configured like that.
     */
    async showDeletePopup(id) {
      if (!this.config.journal.confirmDeletion) {
        return await this.removeResult(id)
      }

      const alert = await alertController.create({
        header: this.$t('delete.title'),
        message: this.$t('delete.message'),
        buttons: [
          {
            text: this.$t('delete.cancel'),
            role: 'cancel',
          },
          {
            text: this.$t('delete.accept'),
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
