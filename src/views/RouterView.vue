<template>
  <ion-page class="app-router">
    <div class="side-panel">
      <div class="tabs-inner">
        <journal-view v-if="isJournal" />
        <oracle-view v-else-if="isOracle" />
      </div>
      <ion-tab-bar>
        <ion-tab-button tab="/app/journal" href="/app/journal">
          <ion-icon name="book-outline" />
          <ion-label v-t="'sections.journal.tab'" />
        </ion-tab-button>

        <ion-tab-button href="/app/oracle" tab="/app/oracle">
          <ion-icon name="stop-circle-outline" />
          <ion-label v-t="'sections.oracle.tab'" />
        </ion-tab-button>

        <ion-tab-button href="/app/settings" tab="/app/settings">
          <ion-icon name="options-outline" />
          <ion-label v-t="'sections.settings.tab'" />
        </ion-tab-button>
      </ion-tab-bar>
    </div>
    <ion-tabs class="tabs">
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="/app/journal" href="/app/journal">
          <ion-icon name="book-outline" />
          <ion-label v-t="'sections.journal.tab'" />
        </ion-tab-button>

        <ion-tab-button tab="/app/oracle" href="/app/oracle">
          <ion-icon name="stop-circle-outline" />
          <ion-label v-t="'sections.oracle.tab'" />
        </ion-tab-button>

        <ion-tab-button tab="/app/settings" href="/app/settings">
          <ion-icon name="options-outline" />
          <ion-label v-t="'sections.settings.tab'" />
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script>
import { mapGetters } from 'vuex'
import JournalView from './side-panel/JournalView.vue'
import OracleView from './side-panel/OracleView.vue'

export default {
  components: { JournalView, OracleView },

  computed: {
    ...mapGetters(['configKey']),

    /**
     * Whether it's showing the journal view.
     *
     * @returns {Boolean}
     */
    isJournal() {
      return this.$route.path.includes('journal')
    },

    /**
     * Whether it's showing the oracle view
     *
     * @returns {Boolean}
     */
    isOracle() {
      return this.$route.path.includes('oracle')
    },

    /**
     * Whether it's showing the settings view.
     *
     * @returns {Boolean}
     */
    isSettings() {
      return this.$route.path.includes('settings')
    },
  },

  /**
   * Handles mounted life-cycle event.
   */
  mounted() {
    if (!this.configKey('introduction.seen')) {
      this.$router.push({ path: '/introduction', force: true })
    }
  },

  watch: {
    $route(to, from) {
      if (from.fullPath === '/introduction' && this.configKey('introduction.seen')) {
        this.$router.push({ path: '/app/oracle', force: true })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.app-router {
  .side-panel {
    position: absolute;
    left: 0;
    display: none;
    flex-direction: column;
    width: 300px;
    height: 100%;
    border-right: 1px solid var(--ion-color-light);

    .tabs-inner {
      position: relative;
      flex: 1;
      contain: layout size style;
    }
  }

  @media (min-width: 920px) {
    .side-panel {
      display: flex;
    }

    .tabs {
      right: 0 !important;
      left: 300px !important;
      width: auto !important;

      ion-tab-bar {
        display: none;
      }
    }
  }
}
</style>
