<template>
  <div class="hexagram-figure" :class="size">
    <div
      v-for="(line, index) in allLines"
      :key="line"
      class="line"
      :class="{
        [line.value]: true,
        highlighted: (highlightMutations && line.value.includes('mutable')) || highlightLine === index + 1,
      }"
    >
      <template v-if="line.value === 'yin' || line.value === 'mutable-yin'">
        <div class="bar bar-left" />
        <div class="bar bar-right" />
      </template>
      <template v-else-if="line.value !== 'empty'">
        <div class="bar full-bar" />
      </template>
      <template v-if="line.value === 'mutable-yang'">
        <div class="circle"></div>
      </template>
      <template v-if="line.value === 'mutable-yin'">
        <div class="cross"></div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    lines: {
      type: Array,
      defualt: () => [],
    },

    size: {
      type: String,
      default: 'md',
    },

    highlightMutations: {
      type: Boolean,
      default: false,
    },

    highlightLine: {
      type: Number,
      default: null,
    },
  },

  computed: {
    allLines() {
      const result = [...this.lines]
      while (result.length < 6) {
        result.push({ value: 'empty' })
      }

      return result
    },
  },
}
</script>

<style scoped>
.hexagram-figure {
  display: flex;
  flex-direction: column-reverse;
  align-content: space-around;
  justify-content: space-around;
  max-width: 200px;
  margin: 1em auto;
  padding: 0 10px;
}

.line {
  position: relative;
  height: 15px;
  margin-bottom: 10px;
}

.line.empty {
  border: 1px solid var(--ion-text-color);
  opacity: 0.1;
}

.line .bar {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 40%;
  background: var(--ion-text-color);
}

.line .full-bar {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  background: var(--ion-text-color);
}

.line.highlighted .bar {
  background: var(--color-highlighted-line);
}

.line .circle,
.line .cross {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
}

.line .circle {
  width: 10px;
  height: 10px;
  border-radius: 100%;
  background: var(--ion-background-color);
}

.line .cross::before,
.line .cross::after {
  content: ' ';
  position: absolute;
  top: -6px;
  left: -1px;
  width: 2px;
  height: 12px;
  background-color: var(--ion-text-color);
}
.line .cross::before {
  transform: rotate(45deg);
}
.line .cross::after {
  transform: rotate(-45deg);
}

.line.highlighted .cross::before,
.line.highlighted .cross::after {
  background: var(--color-highlighted-line);
}

.line .bar-left {
  left: 0;
}
.line .bar-right {
  right: 0;
}

/** Size: xs */
.hexagram-figure.xs {
  width: 50px;
  margin: 0 auto;
  padding: 0;
}
.hexagram-figure.xs .line {
  height: 5px;
  margin-bottom: 3px;
}

.hexagram-figure.xs .line .cross::before,
.hexagram-figure.xs .line .cross::after {
  top: -3px;
  left: -1px;
  width: 1px;
  height: 6px;
}

.hexagram-figure.xs .line .circle {
  width: 4px;
  height: 4px;
}
</style>
