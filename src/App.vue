<template>
  <ion-app>
    <ion-router-outlet />
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

  methods: {
    ...mapActions(['loadConfig', 'init']),
  },

  async mounted() {
    await Promise.all([this.loadConfig(), this.init()])
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

*::-webkit-scrollbar {
  width: 0;
  background: transparent;
}
</style>
