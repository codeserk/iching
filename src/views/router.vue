<template>
  <ion-page class="app-router">
    <div class="side-panel">
      <div class="tabs-inner">
        <journal side-menu />
      </div>
      <ion-tab-bar>
        <ion-tab-button tab="journal" href="/journal">
          <ion-icon name="book-outline" />
          <ion-label v-t="'sections.journal.tab'" />
        </ion-tab-button>

        <ion-tab-button tab="oracle" href="/oracle">
          <ion-icon name="stop-circle-outline" />
          <ion-label v-t="'sections.oracle.tab'" />
        </ion-tab-button>

        <ion-tab-button tab="settings" href="/settings">
          <ion-icon name="options-outline" />
          <ion-label v-t="'sections.settings.tab'" />
        </ion-tab-button>
      </ion-tab-bar>
    </div>
    <ion-tabs class="tabs">
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="journal" href="/journal">
          <ion-icon name="book-outline" />
          <ion-label v-t="'sections.journal.tab'" />
        </ion-tab-button>

        <ion-tab-button tab="oracle" href="/oracle">
          <ion-icon name="stop-circle-outline" />
          <ion-label v-t="'sections.oracle.tab'" />
        </ion-tab-button>

        <ion-tab-button tab="settings" href="/settings">
          <ion-icon name="options-outline" />
          <ion-label v-t="'sections.settings.tab'" />
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage } from '@ionic/vue'
import Journal from './side-panel/journal.vue'

export default {
  components: { Journal, IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage },
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
