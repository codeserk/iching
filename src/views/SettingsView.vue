<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Settings</ion-title>
      </ion-toolbar>
      <ion-toolbar>
        <ion-segment v-model="section">
          <ion-segment-button value="config">
            <ion-label v-text="'Configuration'" />
          </ion-segment-button>
          <ion-segment-button value="about">
            <ion-label>About me</ion-label>
          </ion-segment-button>
        </ion-segment>
      </ion-toolbar>
    </ion-header>
    <ion-content class="content" :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Settings</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-list v-show="section === 'config'">
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
        <ion-list-header>
          Journal
        </ion-list-header>
        <ion-item lines="none">
          <ion-label>Confirm deletion</ion-label>
          <ion-checkbox
            color="primary"
            :checked="configKey('journal.confirm-deletion')"
            @ion-change="updateKey({ key: 'journal.confirm-deletion', value: !configKey('journal.confirm-deletion') })"
            slot="start"
          ></ion-checkbox>
        </ion-item>
      </ion-list>

      <ion-list v-if="section === 'about'" class="about-me">
        <div class="header ion-padding">
          <ion-img src="/assets/img/avatar.png" />
          <h3>Thanks for using my app :)</h3>
          <h3>Jose Camara <strong>[@codeserk]</strong></h3>
        </div>

        <ion-item button @click="openLink('https://www.codeserk.es/project/android/i-ching')">Website</ion-item>
        <ion-item button @click="openLink('https://www.codeserk.es/project/android/i-ching/privacy-policy')"
          >Privacy Policy</ion-item
        >
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { Plugins } from '@capacitor/core'

const { Browser } = Plugins

export default {
  data: () => ({
    section: 'config',
  }),

  computed: {
    ...mapGetters(['configKey']),
  },

  methods: {
    ...mapActions(['updateKey']),

    openLink(link) {
      Browser.open({ url: link })
    },
  },
}
</script>

<style lang="scss" scoped>
ion-list-header {
  margin-bottom: 10px;
}
ion-item-divider {
  padding-top: 10px;
  padding-bottom: 10px;
}

.about-me {
  .header {
    text-align: center;

    ion-img {
      max-width: 250px;
      margin: auto;
      image-rendering: pixelated;
    }
  }
}
</style>
