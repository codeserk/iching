<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title v-t="'settings.title'" />
      </ion-toolbar>
      <ion-toolbar>
        <ion-segment v-model="section">
          <ion-segment-button value="config">
            <ion-label v-t="'settings.tabs.config'" />
          </ion-segment-button>
          <ion-segment-button value="about">
            <ion-label v-t="'settings.tabs.about'" />
          </ion-segment-button>
        </ion-segment>
      </ion-toolbar>
    </ion-header>
    <ion-content ref="content" class="content" fullscreen>
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large" v-t="'settings.title'" />
        </ion-toolbar>
      </ion-header>

      <ion-list v-show="section === 'config'">
        <ion-list-header v-t="'settings.config.display'" />

        <ion-item>
          <ion-label v-t="'settings.config.language.label'" />
          <ion-select
            :placeholder="$t('settings.config.language.placeholder')"
            :value="configKey('language')"
            @ion-change="updateLanguage($event.target.value)"
            :cancel-text="$t('cancel')"
            :ok-text="$t('ok')"
          >
            <ion-select-option value="en" v-t="'settings.config.language.en'" />
            <ion-select-option value="es" v-t="'settings.config.language.es'" />
          </ion-select>
        </ion-item>

        <ion-item lines="full">
          <ion-label v-t="'settings.config.darkMode'" />
          <ion-toggle
            :checked="hasDarkModeClass"
            slot="end"
            @ionChange="ev => setDarkMode(ev.detail.checked)"
          ></ion-toggle>
        </ion-item>

        <ion-item-group>
          <ion-item-divider>
            <ion-label v-t="'settings.config.hexagramHeader'" />
          </ion-item-divider>
          <ion-item>
            <ion-label v-t="'settings.config.chineseName'" />
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
            <ion-label v-t="'settings.config.pinyinName'" />
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
            <ion-label v-t="'settings.config.description'" />
          </ion-item>
        </ion-item-group>
        <ion-item-group>
          <ion-item-divider v-t="'settings.config.trigrams'" />
          <ion-item lines="none">
            <ion-label v-t="'settings.config.trigrams'" />
            <ion-checkbox
              color="primary"
              :checked="configKey('display.trigrams')"
              @ion-change="updateKey({ key: 'display.trigrams', value: !configKey('display.trigrams') })"
              slot="start"
            ></ion-checkbox>
          </ion-item>
        </ion-item-group>
        <ion-item-group>
          <ion-item-divider v-t="'settings.config.judgement'" />
          <ion-item>
            <ion-checkbox
              color="primary"
              :checked="configKey('display.judgement.quote')"
              @ion-change="updateKey({ key: 'display.judgement.quote', value: !configKey('display.judgement.quote') })"
              slot="start"
            ></ion-checkbox>
            <ion-label v-t="'settings.config.quote'" />
          </ion-item>
          <ion-item lines="none">
            <ion-label v-t="'settings.config.explanation'" />
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
          <ion-item-divider v-t="'settings.config.image'" />
          <ion-item>
            <ion-checkbox
              color="primary"
              :checked="configKey('display.images.quote')"
              @ion-change="updateKey({ key: 'display.images.quote', value: !configKey('display.images.quote') })"
              slot="start"
            ></ion-checkbox>
            <ion-label v-t="'settings.config.quote'" />
          </ion-item>
          <ion-item lines="none">
            <ion-label v-t="'settings.config.explanation'" />
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
          <ion-item-divider v-t="'settings.config.mutations'" />
          <ion-item>
            <ion-checkbox
              color="primary"
              :checked="configKey('display.mutations.quote')"
              @ion-change="updateKey({ key: 'display.mutations.quote', value: !configKey('display.mutations.quote') })"
              slot="start"
            ></ion-checkbox>
            <ion-label v-t="'settings.config.quote'" />
          </ion-item>
          <ion-item lines="none">
            <ion-label v-t="'settings.config.explanation'" />
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
        <ion-list-header v-t="'settings.config.journal'" />
        <ion-item lines="none">
          <ion-label v-t="'settings.config.confirmDeletion'" />
          <ion-checkbox
            color="primary"
            :checked="configKey('journal.confirm-deletion')"
            @ion-change="updateKey({ key: 'journal.confirm-deletion', value: !configKey('journal.confirm-deletion') })"
            slot="start"
          ></ion-checkbox>
        </ion-item>

        <ion-list-header v-t="'settings.tags.title'" />

        <ion-reorder-group id="tags" :disabled="false" @ion-item-reorder="({ detail }) => onReordered(detail)">
          <ion-item v-for="(tag, index) in tags" :key="tag">
            <ion-reorder slot="start" />

            <ion-input :value="tag" readonly />
            <ion-button shape="round" fill="block" autocapitalize="on" @click="removeTag(index)">
              <ion-icon name="trash-outline" color="danger" slot="icon-only" />
            </ion-button>
          </ion-item>
        </ion-reorder-group>

        <ion-item>
          <ion-input :placeholder="$t('settings.tags.new')" v-model="newTag" @keyup.enter="addTagHandle" />
          <ion-button shape="round" fill="block" autocapitalize="on" @click="addTagHandle" :disabled="!isValidNewTag">
            <ion-icon name="add-outline" slot="icon-only" />
          </ion-button>
        </ion-item>
      </ion-list>

      <div v-show="section === 'about'" class="about-me">
        <div class="header ion-padding">
          <ion-img src="/assets/img/avatar.png" />
          <h3 v-t="'settings.about.thanks'" />
          <h3>José Cámara <strong>[@codeserk]</strong></h3>
        </div>

        <ion-list>
          <ion-item button @click="openLink('https://www.codeserk.es/project/android/i-ching')">
            <ion-icon slot="start" name="home-outline" />
            <ion-label v-t="'settings.about.website'" />
          </ion-item>
          <ion-item button @click="openLink('https://www.codeserk.es/project/android/i-ching/privacy-policy')">
            <ion-icon slot="start" name="document-outline" />
            <ion-label v-t="'settings.about.privacyPolicy'" />
          </ion-item>
          <ion-item
            button
            @click="openLink('https://play.google.com/store/apps/details?id=es.codeserk.iching')"
            color="primary"
          >
            <ion-icon slot="start" name="logo-android" />
            <ion-label v-t="isBrowser ? 'settings.about.android.download' : 'settings.about.android.rate'" />
          </ion-item>
          <ion-item button @click="openLink('https://www.buymeacoffee.com/codeserk')" color="tertiary">
            <ion-icon slot="start" name="cafe-outline" />
            <ion-label v-t="'settings.about.coffee'" />
          </ion-item>
        </ion-list>

        <p class="text-free" v-t="'settings.about.free'" />
      </div>
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

    newTag: '',
  }),

  computed: {
    ...mapGetters(['configKey', 'tags']),

    isValidNewTag() {
      return this.newTag.length > 0 && !this.tags.includes(this.newTag)
    },
  },

  methods: {
    ...mapActions(['updateKey', 'updateLanguage', 'addTag', 'removeTag', 'setTags']),

    openLink(link) {
      this.track(`open-link`, { link })
      Browser.open({ url: link })
    },

    addTagHandle() {
      if (!this.isValidNewTag) {
        return
      }

      this.addTag(this.newTag)
      setTimeout(() => {
        document.querySelector('ion-content.content').scrollToBottom(400)
      }, 100)

      this.newTag = ''
    },

    onReordered(detail) {
      const { from, to } = detail
      const tags = [...this.tags]
      tags.splice(to, 0, tags.splice(from, 1)[0])

      this.setTags(tags)

      detail.complete(true)
    },
  },

  watch: {
    section() {
      this.track(`settings-section:${this.section}`)
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
  display: flex;
  flex-direction: column;
  min-height: calc(100% - 50px);

  .header {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: auto;
    text-align: center;

    ion-img {
      width: 250px;
      height: 250px;
      image-rendering: pixelated;
    }
  }

  .text-free {
    padding: 0 1em;
  }
}
</style>
