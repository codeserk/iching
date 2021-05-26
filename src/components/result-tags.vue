<template>
  <div class="ResultTags" v-if="result">
    <div class="header">
      <h2 v-t="'hexagram.tags.title'"></h2>

      <div class="spinner" :class="{ active: isUpdating }">
        <ion-spinner animated />
      </div>
    </div>

    <ion-item v-if="hasTags">
      <ion-label color="translucent" v-t="'hexagram.tags.label'" />
      <ion-select
        multiple
        :cancel-text="$t('cancel')"
        :ok-text="$t('ok')"
        :placeholder="$t('hexagram.tags.placeholder')"
        :value="result.tags"
        @ion-change="({ detail }) => onTagsChanged(detail.value)"
      >
        <ion-select-option v-for="tag in tags" :key="tag" :value="tag">{{ tag }}</ion-select-option>
      </ion-select>
    </ion-item>
    <ion-item v-else>
      {{ $t('hexagram.tags.noTags') }}
    </ion-item>

    <ion-item color="translucent" lines="none">
      <ion-button slot="end" fill="clear" @click="$router.push(`/settings#tags`)">{{
        $t('hexagram.tags.manage')
      }}</ion-button>
    </ion-item>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { wait } from '../util/time'

export default {
  props: {
    resultId: {
      type: String,
    },
  },

  data: () => ({
    isUpdating: false,
  }),

  computed: {
    ...mapGetters(['tags', 'resultById']),

    result() {
      return this.resultById(this.resultId)
    },

    hasTags() {
      return this.tags.length > 0
    },
  },

  methods: {
    ...mapActions(['updateResultTags']),

    async onTagsChanged(newTags) {
      this.isUpdating = true

      await this.updateResultTags({ id: this.resultId, tags: newTags })
      // Local save is probably very fast, so let's show the loading icon for a
      // bit longer
      await wait(1000)

      this.isUpdating = false
    },
  },
}
</script>

<style lang="scss" scoped>
.ResultTags {
  margin-bottom: 2em;
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 0.5em;
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

ion-select {
  --padding-start: 0;
  --padding-end: 0;

  text-align: left;
}

ion-label {
  display: none;
}
</style>
