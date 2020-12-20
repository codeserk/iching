<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="journal" href="/journal">
          <ion-icon :icon="bookOutline" />
          <ion-label v-t="'sections.journal.tab'" />
        </ion-tab-button>

        <ion-tab-button tab="oracle" href="/oracle">
          <ion-icon :icon="stopCircleOutline" />
          <ion-label v-t="'sections.oracle.tab'" />
        </ion-tab-button>

        <ion-tab-button tab="settings" href="/settings">
          <ion-icon :icon="optionsOutline" />
          <ion-label v-t="'sections.settings.tab'" />
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage } from '@ionic/vue'

export default {
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage },
}
</script>
