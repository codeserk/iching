<template>
  <div class="oracle-result">
    <ion-text color="primary">
      <h1>Primary</h1>
    </ion-text>
    <hexagram-details v-if="hexagram.number" :number="hexagram.number" :mutated-lines="hexagram.mutatedLines" />

    <hr />

    <template v-if="hexagram.hasSecondary">
      <ion-text color="primary">
        <h1>Secondary</h1>
      </ion-text>
      <hexagram-details :number="hexagram.secondaryNumber" />
    </template>
  </div>
</template>

<script>
import { IonText } from '@ionic/vue'
import HexagramDetails from './hexagram-details.vue'

export default {
  components: {
    HexagramDetails,
    IonText,
  },

  props: {
    hexagram: {
      type: Object,
      default: () => null,
    },
  },
}
</script>

<style scoped>
.oracle-result {
  text-align: left;
}
</style>
