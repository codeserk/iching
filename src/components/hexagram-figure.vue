<template>
  <div class="hexagram-figure" :class="[size, { 'with-images': withImages, 'with-reveal-delay': withRevealDelay }]">
    <div
      v-for="(line, index) in allLines"
      :key="line"
      class="line"
      :class="{
        [line.value]: true,
        [`line-${index + 1}`]: true,
        'line-split': line.value.includes('yin'),
        'line-full': line.value.includes('yang'),
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

    withImages: {
      type: Boolean,
      default: false,
    },

    withRevealDelay: {
      type: Boolean,
      default: false,
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
@keyframes reveal-right-to-left {
  0% {
    clip-path: inset(0% 0% 0% 100%);
  }
  100% {
    clip-path: inset(0% 0% 0% 0%);
  }
}
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

/** With images */
.hexagram-figure.with-images {
  padding: 0;
}

.hexagram-figure.with-images .line {
  height: 30px;
  margin-bottom: 0;
  background: none;
  background-position: top;
  background-size: cover;
  background-repeat: no-repeat;
  transition: all 1s;
  animation: reveal-right-to-left 200ms;
  animation-timing-function: cubic-bezier(0.5, 0.25, 0.5, 0.75);
  animation-fill-mode: both;
}
.hexagram-figure.with-images .line.empty {
  border: none;
  animation: none;
}

.hexagram-figure.with-images.with-reveal-delay .line.line-2 {
  animation-delay: 100ms;
}
.hexagram-figure.with-images.with-reveal-delay .line.line-3 {
  animation-delay: 200ms;
}
.hexagram-figure.with-images.with-reveal-delay .line.line-4 {
  animation-delay: 300ms;
}
.hexagram-figure.with-images.with-reveal-delay .line.line-5 {
  animation-delay: 400ms;
}
.hexagram-figure.with-images.with-reveal-delay .line.line-6 {
  animation-delay: 500ms;
}

.hexagram-figure.with-images .line .bar {
  display: none;
}
.hexagram-figure.with-images .line.line-full.line-1 {
  background-image: url('/assets/img/line-full-1.png');
}
.hexagram-figure.with-images .line.line-full.line-2 {
  background-image: url('/assets/img/line-full-2.png');
}
.hexagram-figure.with-images .line.line-full.line-3 {
  background-image: url('/assets/img/line-full-3.png');
}
.hexagram-figure.with-images .line.line-full.line-4 {
  background-image: url('/assets/img/line-full-4.png');
}
.hexagram-figure.with-images .line.line-full.line-5 {
  background-image: url('/assets/img/line-full-5.png');
}
.hexagram-figure.with-images .line.line-full.line-6 {
  background-image: url('/assets/img/line-full-6.png');
}

.hexagram-figure.with-images .line.line-split.line-1 {
  background-image: url('/assets/img/line-split-1.png');
}
.hexagram-figure.with-images .line.line-split.line-2 {
  background-image: url('/assets/img/line-split-5.png');
}
.hexagram-figure.with-images .line.line-split.line-3 {
  background-image: url('/assets/img/line-split-3.png');
}
.hexagram-figure.with-images .line.line-split.line-4 {
  background-image: url('/assets/img/line-split-4.png');
}
.hexagram-figure.with-images .line.line-split.line-5 {
  background-image: url('/assets/img/line-split-5.png');
}
.hexagram-figure.with-images .line.line-split.line-6 {
  background-image: url('/assets/img/line-split-6.png');
}

.hexagram-figure.with-images .line .cross {
  left: calc(50% - 1px);
  width: 15px;
  height: 15px;
  background-image: url('/assets/img/yang.png');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
.hexagram-figure.with-images .line .cross::after,
.hexagram-figure.with-images .line .cross::before {
  display: none;
}

.hexagram-figure.with-images .line .circle {
  top: calc(50% + 2px);
  width: 10px;
  height: 10px;
}

/** Size: sm */
.hexagram-figure.sm {
  width: 50px;
  margin: 0 auto;
  padding: 0;
}
.hexagram-figure.sm .line {
  height: 5px;
  margin-bottom: 3px;
}

.hexagram-figure.sm .line .cross::before,
.hexagram-figure.sm .line .cross::after {
  top: -3px;
  left: -1px;
  width: 1px;
  height: 6px;
}

.hexagram-figure.sm .line .circle {
  width: 4px;
  height: 4px;
}

/** Size: xs */
.hexagram-figure.xs {
  width: 30px;
  margin: 0 auto;
  padding: 0;
}
.hexagram-figure.xs .line {
  height: 3px;
  margin-bottom: 1px;
}

.hexagram-figure.xs .circle,
.hexagram-figure.xs .cross {
  display: none;
}
</style>
