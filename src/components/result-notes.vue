<template>
  <div class="ResultNotes" v-if="result">
    <div class="header">
      <h2 v-t="'hexagram.notes.title'"></h2>

      <div class="spinner" :class="{ active: isUpdating }">
        <ion-spinner animated />
      </div>
    </div>

    <ion-textarea
      :placeholder="$t('hexagram.notes.placeholder')"
      :value="localNotes"
      :rows="5"
      @input="ev => updateNotes(ev.target.value)"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { wait } from '../util/time'
import { debounce } from 'lodash'

export default {
  props: {
    resultId: {
      type: String,
    },
  },

  data: () => ({
    localNotes: '',
    isUpdating: false,
  }),

  computed: {
    ...mapGetters(['resultById']),

    result() {
      return this.resultById(this.resultId)
    },

    notes() {
      if (!this.result) {
        return
      }

      return this.result.notes
    },
  },

  methods: {
    ...mapActions(['updateResultNotes']),

    async saveNotes() {
      this.isUpdating = true

      await this.updateResultNotes({ id: this.resultId, notes: this.localNotes })
      // Local save is probably very fast, so let's show the loading icon for a
      // bit longer
      await wait(1000)

      this.isUpdating = false
    },

    updateNotes(notes) {
      this.localNotes = notes

      this.debounceSaveNotes()
    },

    debounceSaveNotes: debounce(function() {
      this.saveNotes()
    }, 1000),
  },

  mounted() {
    this.localNotes = this.notes
  },
}
</script>

<style lang="scss" scoped>
.ResultNotes {
  margin-bottom: 1em;
}

.header {
  display: flex;
  align-items: center;
}

.spinner {
  margin-top: 10px;
  margin-left: 1em;
  opacity: 0;
  transition: opacity 0.4s ease-in-out;

  &.active {
    opacity: 1;
  }
}

ion-textarea {
  --padding-start: 0;
  --padding-end: 0;

  text-align: left;
}
</style>
