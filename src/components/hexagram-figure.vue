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
    /**
     * All the lines, ensures there are 6 lines using "empty".
     *
     * @returns {HexagramLine[]}
     */
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

<style lang="scss" scoped>
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
  max-width: 300px;
  margin: 10px auto;
  padding: 0 10px;

  .line {
    position: relative;
    height: 15px;
    margin-bottom: 10px;

    .bar {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 40%;
      background: var(--ion-text-color);

      &.full-bar {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        background: var(--ion-text-color);
      }

      &.bar-left {
        left: 0;
      }

      &.bar-right {
        right: 0;
      }
    }

    &.highlighted {
      .bar {
        background: var(--color-highlighted-line);
      }

      .cross::before,
      .cross::after {
        background: var(--color-highlighted-line);
      }
    }

    .circle,
    .cross {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
    }

    .circle {
      width: 10px;
      height: 10px;
      border-radius: 100%;
      background: var(--ion-background-color);
    }

    .cross::before,
    .cross::after {
      content: ' ';
      position: absolute;
      top: -6px;
      left: -1px;
      width: 2px;
      height: 12px;
      background-color: var(--ion-text-color);
    }
    .cross::before {
      transform: rotate(45deg);
    }
    .cross::after {
      transform: rotate(-45deg);
    }

    &.empty {
      border: 1px solid var(--ion-text-color);
      opacity: 0.1;
    }
  }

  /** With images */
  &.with-images {
    padding: 0;

    .line {
      height: 30px;
      margin-bottom: 5px;
      background: none;
      background-position: top;
      background-size: cover;
      background-repeat: no-repeat;
      animation: reveal-right-to-left 200ms;
      animation-timing-function: cubic-bezier(0.5, 0.25, 0.5, 0.75);
      animation-fill-mode: both;

      .bar {
        display: none;
      }

      .cross {
        top: calc(50% + 1px);
        left: calc(50% - 1px);
        width: 18px;
        height: 18px;
        background-image: url('/assets/img/yang.png');
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;

        &::after,
        &::before {
          display: none;
        }
      }

      .circle {
        top: calc(50% + 2px);
        width: 15px;
        height: 15px;
      }

      &.empty {
        border: none;
        animation: none;
      }

      &.line-full {
        &.line-1 {
          background-image: url('/assets/img/line-full-1.png');
        }
        &.line-2 {
          background-image: url('/assets/img/line-full-2.png');
        }
        &.line-3 {
          background-image: url('/assets/img/line-full-3.png');
        }
        &.line-4 {
          background-image: url('/assets/img/line-full-4.png');
        }
        &.line-5 {
          background-image: url('/assets/img/line-full-5.png');
        }
        &.line-6 {
          background-image: url('/assets/img/line-full-6.png');
        }
      }

      &.line-split {
        &.line-1 {
          background-image: url('/assets/img/line-split-1.png');
        }
        &.line-2 {
          background-image: url('/assets/img/line-split-5.png');
        }
        &.line-3 {
          background-image: url('/assets/img/line-split-3.png');
        }
        &.line-4 {
          background-image: url('/assets/img/line-split-4.png');
        }
        &.line-5 {
          background-image: url('/assets/img/line-split-5.png');
        }
        &.line-6 {
          background-image: url('/assets/img/line-split-6.png');
        }
      }

      @media (prefers-color-scheme: dark) {
        filter: invert(100%);

        .circle {
          filter: invert(100%);
        }
      }
    }

    &.with-reveal-delay {
      .line.line-2 {
        animation-delay: 200ms;
      }
      .line.line-3 {
        animation-delay: 400ms;
      }
      .line.line-4 {
        animation-delay: 600ms;
      }
      .line.line-5 {
        animation-delay: 800ms;
      }
      .line.line-6 {
        animation-delay: 1000ms;
      }
    }

    @media (min-width: 620px) and (min-height: 500px) {
      width: 300px;

      .line {
        height: 40px;
        margin-bottom: 7px;

        .cross {
          top: calc(50% + 1px);
          width: 20px;
          height: 20px;
        }
        .circle {
          top: calc(50% + 3px);
          width: 20px;
          height: 20px;
        }
      }
    }

    @media (min-width: 820px) and (min-height: 500px) {
      width: 400px;
      max-width: 400px;

      .line {
        height: 50px;
        margin-bottom: 10px;

        .cross {
          top: calc(50% + 5px);
          width: 30px;
          height: 30px;
        }
        .circle {
          top: calc(50% + 5px);
          width: 25px;
          height: 25px;
        }
      }
    }
  }

  /** Sizes */

  &.sm {
    width: 50px;
    margin: 0 auto;
    padding: 0;

    .line {
      height: 5px;
      margin-bottom: 3px;

      .cross::before,
      .cross::after {
        top: -3px;
        left: -1px;
        width: 1px;
        height: 6px;
      }

      .circle {
        width: 4px;
        height: 4px;
      }
    }
  }

  &.xs {
    width: 30px;
    margin: 0 auto;
    padding: 0;

    .line {
      height: 3px;
      margin-bottom: 1px;
    }

    .circle,
    .cross {
      display: none;
    }
  }
}
</style>
