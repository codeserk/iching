<template>
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
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import { IonItemSliding, IonItemOptions, IonItemOption, IonList, IonItem, IonLabel, alertController } from '@ionic/vue'
import HexagramFigure from '../components/hexagram-figure.vue'

export default {
  components: {
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonList,
    IonItem,
    IonLabel,

    HexagramFigure,
  },

  props: {
    search: {
      type: String,
      default: '',
    },

    activeId: {
      type: String,
      default: null,
    },
  },

  computed: {
    ...mapGetters(['config', 'results']),

    filteredResults() {
      if (!this.search) {
        return this.results
      }

      const search = this.search.toLowerCase()
      return this.results.filter(result => result.question.toLowerCase().includes(search))
    },
  },

  methods: {
    ...mapActions(['removeResult']),

    async showDeletePopup(id) {
      if (!this.config.journal.confirmDeletion) {
        return await this.removeResult(id)
      }

      const alert = await alertController.create({
        header: 'Confirm deletion',
        message: 'Are you sure you want to delete this answer from the Oracle?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
          },
          {
            text: 'Yes',
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
