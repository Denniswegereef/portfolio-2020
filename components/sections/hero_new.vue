<template>
  <section class="hero" id="js-hero">
    <div class="hero__cover-start" ref="cover_start"/>
    <div class="hero__cover" v-for="index in 2" :key="index" :class="{ 'hero__cover-second' : index === 1 }" ref="hero_cover">
      <canvas v-if="index === 1" ref="canvas" class="hero__canvas"/>

      <h1 class="heading hero__text" ref="title_container">
        <span class="hero__text-item" :data-text="content.small_one" ref="text_item">
          <span class="hidden">{{ content.title_one }}</span>
          <span class="hero__text-show" ref="title_one">
            {{ content.title_one }}
          </span>
        </span>
        <span class="hero__text-item" ref="text_item">
          <span class="hidden">{{ content.title_two }}</span>
          <span class="hero__text-show" ref="title_two">
            {{ content.title_two }}
          </span>
        </span>
        <span class="hero__text-item" :data-text="content.small_two" ref="text_item">
          <span class="hidden">{{ content.title_three }}</span>
          <span class="hero__text-show" ref="title_three">
            {{ content.title_three }}
          </span>
        </span>
        <span class="hero__text-item" :data-text="content.small_three" ref="text_item">
          <span class="hidden">{{ content.title_four }}</span>
          <span class="hero__text-show" ref="title_four">
            {{ content.title_four }}
          </span>
        </span>
      </h1>
    </div>
  </section>
</template>

<script>
import { gsap } from 'gsap'
import debounce from 'lodash.debounce'

export default {
  props: {
    lmS: {
      type: Object,
      default: () => null
    }
  },

  data () {
    return {
      tl: gsap.timeline({ paused: true }),
      dev: false,
      animationComplete: false,
      content: {
        title_one: 'Dennis',
        title_two: 'Wegereef',
        title_three: 'Creative',
        title_four: 'Developer',
        small_one: '1996',
        small_two: 'front /',
        small_three: '2020'
      },
      canvas: {
        ctx: null,
        noiseData: [],
        frame: 0
      }
    }
  },
  mounted () {
    this._setupEventListeners()
    this._setCanvas()
    this._setupTimelines()
    this._setCoverStyles()
  },

  methods: {
    playIntro () {
      this.$data.dev ? this.$data.tl.play(this.$data.tl.duration() - 0.1) : this.$data.tl.play()
    },

    _setupEventListeners () {
      this._resizeHandler()
      this._tickHandler()
    },

    _setupTimelines () {
      const tl = this.$data.tl
      const titleRefsFirst = [this.$refs.title_one[0], this.$refs.title_two[0], this.$refs.title_three[0], this.$refs.title_four[0]]

      tl.eventCallback('onComplete', this._timelineCompleteHandler)
      tl.add(this.$parent.toggleScroll(), 0.0)
      tl.set(titleRefsFirst, { yPercent: 100 }, 0.0)
      tl.set(this.$refs.cover_start, { opacity: 0 }, 0.0)
      tl.to(this.$refs.canvas[0], { duration: 1.5, opacity: 0.3 }, 0.2)
      tl.to(titleRefsFirst, { yPercent: 0, duration: 0.9, stagger: 0.2, delay: 0.7, ease: 'Expo.easeOut' }, 0.4)
      tl.to(this.$refs.hero_cover[0], { duration: 2.4, clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)', ease: 'Power4.easeInOut' }, 2.4)
      tl.to(this.$refs.title_container, { duration: 1.1, yPercent: -5, ease: 'Power1.easeInOut' }, 2.6)
      tl.set(this.$refs.text_item, { overflow: 'visible' }, 2.6)

      this.playIntro()
    },

    _setCanvas () {
      this.$data.canvas.el = this.$refs.canvas[0]
      this.$data.canvas.el.width = window.innerWidth
      this.$data.canvas.el.height = window.innerHeight

      this.$data.canvas.ctx = this.$data.canvas.el.getContext('2d')

      for (let i = 0; i < 10; i++) this._createNoise()
    },

    _createNoise () {
      const idata = this.$data.canvas.ctx.createImageData(window.innerWidth, window.innerHeight)
      const buffer32 = new Uint32Array(idata.data.buffer)
      const len = buffer32.length

      for (let i = 0; i < len; i++) if (Math.random() < 0.5) buffer32[i] = 0xFF000000

      this.$data.canvas.noiseData.push(idata)
    },

    _paintNoise () {
      this.$data.canvas.frame++
      if (this.$data.canvas.frame === 9) this.$data.canvas.frame = 0

      this.$data.canvas.ctx.putImageData(this.$data.canvas.noiseData[this.$data.canvas.frame], 0, 0)
    },

    _drawCanvas () {
      this._paintNoise(this.$data.canvas.frame)
    },

    _setCoverStyles () {
      const coverElement = this.$refs.hero_cover[0]
      const percentHeight = Math.ceil(window.innerHeight / this.$refs.hero_cover[0].getBoundingClientRect().height * 100)

      gsap.set(coverElement, { clipPath: `polygon(0% 0%, 100% 0%, 100% ${percentHeight}%, 0% ${percentHeight}%)` })
    },

    _timelineCompleteHandler () {
      this.$data.animationComplete = true
      this.$refs.hero_cover[1].classList.add('js-done-animating')
      this.$parent.toggleScroll()
      this.$data.tl.kill()

      gsap.ticker.remove(this._drawCanvas)
    },

    _resizeOnIntro () {
      if (this.$data.animationComplete) return

      this.$router.go()
    },

    // Handlers
    _tickHandler () {
      gsap.ticker.add(this._drawCanvas)
    },

    _resizeHandler () {
      window.addEventListener('resize', debounce(this._resizeOnIntro.bind(this), 250))
    }
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.$data.debounceResize)
  }
}
</script>

<style lang="scss" scoped>
.hero {
  min-height: 100vh;
  width: 100%;
}

.hero__cover-start {
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  min-height: 100vh;
  min-height: calc(var(--vh, 100vh) * 100);

  background: $color-black;

  z-index: 3;
  pointer-events: none;
}

.hero__cover {
  width: 100%;
  min-height: 100vh;

  padding: 35vh g(1, 24) rem($narrow-spacing);

  &-second {
    position: absolute;
    top: 0;
    left: 0;

    background: $color-black;

    z-index: 2;

    .hero__text {
      color: $color-background;
    }
  }
}

.hero__canvas {
  position: fixed;
  top: 0;
  left: 0;

  opacity: 0;
  z-index: -1;
}

.hero__text {
  display: flex;
  flex-direction: column;

  font-size: 17vw;
}

%hero__text-small {
    @include font-favorit-bold();

    position: absolute;
    bottom: 0;

    font-size: 1vw;
}

.hero__text-item {
  position: relative;

  &:before, &:after {
    color: $color-background;

    opacity: 0;

    transform: translateY(rem(15px));
    transition: color 0.3s, transform 0.6s;
  }

  &:nth-of-type(1) {
    margin-left: g(1, 24);

    &:after {
      @extend %hero__text-small;

      padding-left: 0.5vw;

      content: attr(data-text);
    }
  }

  &:nth-of-type(2) {
    margin-left: -#{g(1, 24)};
  }

  &:nth-of-type(3) {
    margin-left: auto;
    margin-right: -#{g(1, 24)};

    &:before {
      @extend %hero__text-small;

      left: -5vw;

      content: attr(data-text);
    }
  }

  &:nth-of-type(4) {
    margin-left: g(1, 24);

    &:after {
      @extend %hero__text-small;

      padding-left: 1vw;

      content: attr(data-text);
    }
  }
}

.hero__text-item {
  overflow: hidden;
}

.js-done-animating {
  .hero__text-item {
    &:before, &:after {
      color: $color-black;

      opacity: 1;

      transform: translateY(0);
    }
  }
}

.hero__text-show {
  position: absolute;
  top: 0;
  left: 0;
}

.hidden {
  @include unselectable();

  opacity: 0;
}

@include mq-regular {
  .hero__cover {
    padding: 55vh g(1, 24) rem($regular-spacing);
  }
}

@include mq-wide {
  .hero__cover {
    padding: 46vh g(1, 24) rem($wide-spacing);
  }
}
</style>
