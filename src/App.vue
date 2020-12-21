<template>
  <ion-app>
    <ion-router-outlet v-if="ready" />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue'
import { defineComponent } from 'vue'
import { mapActions } from 'vuex'

export default defineComponent({
  name: 'App',

  components: {
    IonApp,
    IonRouterOutlet,
  },

  data: () => ({
    ready: false,
  }),

  methods: {
    ...mapActions(['loadConfig', 'init']),
  },

  async mounted() {
    await Promise.all([this.loadConfig(), this.init()])

    this.ready = true
  },
})
</script>

<style lang="scss">
.container {
  @media (min-width: 820px) {
    width: 820px;
    margin: auto;
  }
}

.fill {
  flex: 1;
}

@media (max-width: 919px) {
  .full-only {
    display: none !important;
    opacity: 0 !important;
  }
}

@media (min-width: 920px) {
  .condensed-only {
    display: none !important;
    opacity: 0 !important;
  }
}

*::-webkit-scrollbar {
  width: 0;
  background: transparent;
}
</style>
