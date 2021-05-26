<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button />
        </ion-buttons>
        <ion-title v-text="title" />
        <ion-buttons slot="end">
          <ion-button @click="showDeletePopup">
            <ion-icon slot="start" name="trash-outline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content fullscreen>
      <ion-toolbar v-if="hexagram && hexagram.hasSecondary" color="">
        <ion-segment :value="activeHexagram" @ion-change="activeHexagram = $event.detail.value">
          <ion-segment-button value="primary" v-t="'hexagram.primary'" />
          <ion-segment-button value="secondary" v-t="'hexagram.secondary'" />
        </ion-segment>
      </ion-toolbar>

      <div class="ion-padding">
        <template v-if="hexagram">
          <hexagram-details
            v-if="hexagram.hasSecondary && activeHexagram === 'secondary'"
            :number="hexagram.secondaryNumber"
            :lines="hexagram.secondaryLines"
          />
          <hexagram-details
            v-else
            :number="hexagram.number"
            :lines="hexagram.lines"
            :mutated-lines="hexagram.mutatedLines"
          />

          <result-tags :result-id="id" />
          <result-notes :result-id="id" />
        </template>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { alertController } from '@ionic/vue'
import { mapActions, mapGetters } from 'vuex'

import HexagramDetails from '../../components/hexagram-details.vue'
import ResultTags from '../../components/result-tags.vue'
import ResultNotes from '../../components/result-notes.vue'

export default {
  components: {
    HexagramDetails,
    ResultTags,
    ResultNotes,
  },

  data: () => ({
    /**
     * Hexagram active
     *
     * @var {'primary'|'secondary}
     */
    activeHexagram: 'primary',
  }),

  computed: {
    ...mapGetters(['config', 'resultById']),

    /**
     * Oracle result id.
     *
     * @returns {String|undefined}
     */
    id() {
      return this.$route.params.id
    },

    /**
     * Hexagram result
     *
     * @returns {HexagramResult|undefined}
     */
    result() {
      if (!this.id) {
        return
      }

      return this.resultById(this.id)
    },

    /**
     * Toolbar title: question asked.
     *
     * @returns {String|undefined}
     */
    title() {
      return this.result?.question
    },

    /**
     * Hexagram in the result.
     *
     * @returns {Hexagram|undefined}
     */
    hexagram() {
      return this.result?.hexagram
    },
  },

  methods: {
    ...mapActions(['removeResult']),

    /**
     * Shows a popup to delete the result.
     *
     * @TODO Actually the popup only shows if it's configured like that.
     */
    async showDeletePopup() {
      if (!this.config.journal.confirmDeletion) {
        await this.removeResult(this.id)
        this.$nextTick(() => {
          this.$router.back()
        })

        return
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
              await this.removeResult(this.id)
              this.$nextTick(() => {
                this.$router.back()
              })
            },
          },
        ],
      })
      return alert.present()
    },
  },

  watch: {
    /**
     * Changes the active hexagram to the primary if the active result changes.
     */
    id() {
      this.activeHexagram = 'primary'
    },
  },
}
</script>
