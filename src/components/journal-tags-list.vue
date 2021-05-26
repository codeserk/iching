<template>
  <div class="JournalTagsList">
    <ion-list>
      <ion-item>
        <ion-button slot="start" fill="clear" v-show="!!currentTag" @click="currentTag = null">
          <ion-icon name="arrow-back-outline" />
        </ion-button>

        <ion-label v-show="!currentTag" v-t="'journal.selectTag'" />
        <ion-label v-show="currentTag" v-text="currentTag" />
      </ion-item>

      <template v-if="!currentTag">
        <ion-item
          v-for="tag in tagsWithQuantity"
          :key="tag.tag"
          button
          :disabled="tag.quantity === 0"
          @click="currentTag = tag.tag"
        >
          <ion-label v-text="tag.tag" />
          <ion-badge slot="end" :color="tag.quantity > 0 ? 'primary' : 'light'" v-text="tag.quantity" />
        </ion-item>

        <ion-item v-if="tags.length === 0">
          {{ $t('hexagram.tags.noTags') }}
        </ion-item>

        <ion-item>
          <ion-button fill="clear" @click="$router.push(`/settings#tags`)">{{ $t('hexagram.tags.manage') }}</ion-button>
        </ion-item>
      </template>

      <journal-items-list v-show="currentTag" :search="search" :tag="currentTag" :active-id="$route.params.id" />
    </ion-list>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import JournalItemsList from './journal-items-list'
import { filterResults } from '../util/results'

export default {
  components: {
    JournalItemsList,
  },

  data: () => ({
    /**
     * Currently selected tag
     * @type {string | null}
     */
    currentTag: null,
  }),

  props: {
    /**
     * Search string, used to filter results.
     */
    search: {
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
    ...mapGetters(['tags', 'results']),

    /**
     * Filtered results.
     *
     * @returns {HexagramResult[]}
     */
    tagsWithQuantity() {
      return this.tags.map(tag => {
        const results = filterResults(this.results, this.search, tag, true)

        return {
          tag,
          quantity: results.length,
        }
      })
    },
  },
}
</script>
