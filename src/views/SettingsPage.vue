<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Settings</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="content" :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Settings</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-list>
        <ion-list-header>
          Display
        </ion-list-header>
        <ion-item-group>
          <ion-item-divider>
            <ion-label>Hexagram header</ion-label>
          </ion-item-divider>
          <ion-item>
            <ion-label>Chinese name</ion-label>
            <ion-checkbox
              color="primary"
              :checked="configKey('display.name.chinese')"
              @ion-change="updateKey({ key: 'display.name.chinese', value: !configKey('display.name.chinese') })"
              slot="start"
            ></ion-checkbox>
          </ion-item>
          <ion-item>
            <ion-checkbox
              color="primary"
              :checked="configKey('display.name.pinyin')"
              @ion-change="updateKey({ key: 'display.name.pinyin', value: !configKey('display.name.pinyin') })"
              slot="start"
            ></ion-checkbox>
            <ion-label>Pinyin name</ion-label>
          </ion-item>
          <ion-item lines="none">
            <ion-checkbox
              color="primary"
              :checked="configKey('display.name.description')"
              @ion-change="
                updateKey({ key: 'display.name.description', value: !configKey('display.name.description') })
              "
              slot="start"
            ></ion-checkbox>
            <ion-label>Description</ion-label>
          </ion-item>
        </ion-item-group>
        <ion-item-group>
          <ion-item-divider>Trigrams</ion-item-divider>
          <ion-item lines="none">
            <ion-label>Trigrams</ion-label>
            <ion-checkbox
              color="primary"
              :checked="configKey('display.trigrams')"
              @ion-change="updateKey({ key: 'display.trigrams', value: !configKey('display.trigrams') })"
              slot="start"
            ></ion-checkbox>
          </ion-item>
        </ion-item-group>
        <ion-item-group>
          <ion-item-divider>Judgement</ion-item-divider>
          <ion-item>
            <ion-checkbox
              color="primary"
              :checked="configKey('display.judgement.quote')"
              @ion-change="updateKey({ key: 'display.judgement.quote', value: !configKey('display.judgement.quote') })"
              slot="start"
            ></ion-checkbox>
            <ion-label>Quote</ion-label>
          </ion-item>
          <ion-item lines="none">
            <ion-label>Explanation</ion-label>
            <ion-checkbox
              color="primary"
              :checked="configKey('display.judgement.description')"
              @ion-change="
                updateKey({ key: 'display.judgement.description', value: !configKey('display.judgement.description') })
              "
              slot="start"
            ></ion-checkbox>
          </ion-item>
        </ion-item-group>
        <ion-item-group>
          <ion-item-divider>Image</ion-item-divider>
          <ion-item>
            <ion-checkbox
              color="primary"
              :checked="configKey('display.images.quote')"
              @ion-change="updateKey({ key: 'display.images.quote', value: !configKey('display.images.quote') })"
              slot="start"
            ></ion-checkbox>
            <ion-label>Quote</ion-label>
          </ion-item>
          <ion-item lines="none">
            <ion-label>Explanation</ion-label>
            <ion-checkbox
              color="primary"
              :checked="configKey('display.images.description')"
              @ion-change="
                updateKey({ key: 'display.images.description', value: !configKey('display.images.description') })
              "
              slot="start"
            ></ion-checkbox>
          </ion-item>
        </ion-item-group>
        <ion-item-group>
          <ion-item-divider>Mutations</ion-item-divider>
          <ion-item>
            <ion-checkbox
              color="primary"
              :checked="configKey('display.mutations.quote')"
              @ion-change="updateKey({ key: 'display.mutations.quote', value: !configKey('display.mutations.quote') })"
              slot="start"
            ></ion-checkbox>
            <ion-label>Quote</ion-label>
          </ion-item>
          <ion-item lines="none">
            <ion-label>Explanation</ion-label>
            <ion-checkbox
              color="primary"
              :checked="configKey('display.mutations.description')"
              @ion-change="
                updateKey({ key: 'display.mutations.description', value: !configKey('display.mutations.description') })
              "
              slot="start"
            ></ion-checkbox>
          </ion-item>
        </ion-item-group>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonList,
  IonListHeader,
  IonItemDivider,
  IonItemGroup,
  IonItem,
  IonLabel,
  IonCheckbox,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    IonList,
    IonListHeader,
    IonItemDivider,
    IonItemGroup,
    IonItem,
    IonLabel,
    IonCheckbox,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
  },

  computed: {
    ...mapGetters(['configKey']),
  },

  methods: {
    ...mapActions(['updateKey']),
  },
}
</script>

<style scoped>
ion-list-header {
  margin-bottom: 10px;
}
ion-item-divider {
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>
