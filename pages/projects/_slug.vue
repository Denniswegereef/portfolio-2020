<template>
  <div class="project">
    <canvas ref="canvas" class="project__canvas" data-scroll data-scroll-sticky data-scroll-target="#js-scroll" />

    <div ref="container" class="project__container">
      <a ref="back" class="button smallheading project__back" :href="content.back.href" @click="_backButtonHandler">{{ content.back.text }}</a>

      <div ref="title_container" class="project__title-container">
        <h1 ref="title" class="heading project__title">
          {{ work.title }}
          <span ref="date" class="subheading project__date">{{ work.date }}</span>
        </h1>
      </div>

      <p ref="body_text" class="subheading project__body">
        {{ work.description }}
      </p>

      <div ref="line" class="project__line" data-scroll data-scroll-ofset="100px 0" data-scroll-call="meta_container_animation" />

      <div class="project__link-container">
        <ul class="project__meta-list">
          <li v-for="(item, index) in work.meta" :key="index" ref="meta_item" class="project__meta-list-item">
            <p class="project__meta-title-small subheading">
              {{ item.title_small }}
            </p>
            <p class="project__meta-title-big subheading">
              {{ item.title_big }}
            </p>
          </li>
        </ul>
        <div class="project__meta-links">
          <a ref="meta_github" :href="work.github" target="_blank" class="smallheading button project__link">{{ content.github }}</a>
          <a ref="meta_online" :href="work.online" target="_blank" class="smallheading button project__link">
            {{ content.online }}
          </a>
        </div>
      </div>

      <div class="project__gif-container" />
    </div>
  </div>
</template>

<script>
import { gsap } from 'gsap'
import debounce from 'lodash.debounce'

import splitText from '~/helpers/splitText'

import locomotive from '~/mixins/locomotiveScroll.js'
import data from '~/static/data/work.json'

const CLASS_NAME_SPLIT_CONTAINER = 'js-split-container-intro'
const CLASS_NAME_SPLIT_CHILD = 'js-split-child-intro'

export default {
  validate ({ params, route }) {
    if (data.work.find(item => item.slug === params.slug)) return true
  },

  mixins: [locomotive],

  asyncData () {
    return { data }
  },

  data () {
    return {
      work: {},
      imageCover: null,
      routeBefore: false,
      queryToCheck: 'routeBefore',
      leaveDuration: 2.2,
      timelines: {
        enter: gsap.timeline({ paused: true }),
        enterMeta: gsap.timeline({ paused: true }),
        leave: gsap.timeline({ paused: true })
      },
      canvas: {
        ctx: null,
        noiseData: [],
        frame: 0
      },
      content: {
        back: {
          href: '/test',
          text: 'Go back'
        },
        online: 'Online link',
        github: 'Github'
      },
      colorLink: '#E10E12',
      spanTagOpening: `<span class="${CLASS_NAME_SPLIT_CONTAINER}"><span class="${CLASS_NAME_SPLIT_CHILD}">`,
      spanTagClosing: '</span></span>',
      split: {
        container: [],
        child: []
      }
    }
  },

  watch: {
    work: {
      handler () {
        this._splitText()
      }
    }
  },

  beforeMount () {
    this.$data.work = data.work.find(item => item.slug === this.$route.params.slug)

    // Some query checking if route is coming form a page or a hard refresh
    const checkQuery = this.$data.queryToCheck in this.$route.query
    checkQuery ? this.$data.routeBefore = true : this.$data.routeBefore = false
    if (this.$data.routeBefore || checkQuery) this.$router.replace({ query: null })
  },

  mounted () {
    this.initScroll()
    this._setupEventListeners()
    this._setCanvas()
  },

  beforeDestroy () {
    gsap.ticker.remove(this._drawCanvas)
    window.removeEventListener('resize', this.$data.debounceResize)
  },

  methods: {
    _setupEventListeners () {
      this._resizeHandler()
      this._tickHandler()
    },

    _setUpTimelines () {
      const tl = this.$data.timelines.enter

      tl.eventCallback('onComplete', this._onCompleteTimelineEnterHandler, [tl])
      tl.set(this.$refs.title, { yPercent: 100 }, 0.0)
      tl.set(this.$refs.container, { opacity: 1 }, 0.0)
      tl.set(this.$refs.back, { xPercent: 25 }, 0.5)
      tl.set(this.$refs.date, { opacity: 0, yPercent: 25 }, 0.0)
      tl.to(this.$refs.canvas, { duration: 1.5, opacity: 0.3 }, 0.2)
      tl.to(this.$refs.title, { duration: 1.0, yPercent: 0, ease: 'power4', stagger: 0.1 }, 0.9)
      tl.to(this.$data.split.child, { duration: 1.0, yPercent: 0, ease: 'power4', stagger: 0.1 }, 1.3)
      tl.set(this.$refs.title_container, { overflow: 'visible' }, 1.9)
      tl.to(this.$refs.date, { duration: 0.5, opacity: 1, yPercent: 0 }, 2.0)
      tl.to(this.$refs.back, { duration: 0.5, opacity: 1, xPercent: 0 }, 2.2)
      tl.to(this.$refs.back, { duration: 0.5, color: this.$data.colorLink }, 2.9)

      tl.play()

      // Enter meta timeline
      const tlEnter = this.$data.timelines.enterMeta

      const metaLinks = [this.$refs.meta_github, this.$refs.meta_online]

      tlEnter.eventCallback('onComplete', this._onCompleteTimelineMetalHandler, [tlEnter])
      tlEnter.to(this.$refs.line, { duration: 0.9, scaleX: 1 }, 0.0)
      tlEnter.from([...this.$refs.meta_item, ...metaLinks], { duration: 0.3, y: '40px', stagger: 0.2, delay: 0.1, opacity: 0 }, 0.2)
      tlEnter.to(metaLinks, { duration: 0.5, color: this.$data.colorLink }, 1.6)

      // Leave timeline
      const tlLeave = this.$data.timelines.leave

      tlLeave.eventCallback('onComplete', this._onCompleteTimelineLeaveHandler, [tlLeave])
      tlLeave.set(this.$refs.title_container, { overflow: 'hidden' }, 0.5)
      tlLeave.to(this.$refs.date, { duration: 0.5, opacity: 0 }, 0.5)
      // tlLeave.to(this.$refs.container, { duration: this.$data.leaveDuration, opacity: 0.5 }, 0.0)
      tlLeave.to(this.$refs.back, { duration: 0.5, opacity: 0, yPercent: -20 }, 0.0)
      tlLeave.to(this.$data.split.child, { duration: 0.4, yPercent: -50, ease: 'power4', opacity: 0, stagger: 0.04 }, 0.2)
      tlLeave.to(this.$refs.title, { duration: 1.2, yPercent: 100, ease: 'power4Out' }, 0.4)
      tlLeave.to([...this.$refs.meta_item, ...metaLinks], { duration: 0.2, y: '40px', stagger: 0.2, delay: 0.1, opacity: 0, ease: 'power4Out' }, 0.5)
      // tlLeave.to(this.$refs.canvas, { duration: this.$data.leaveDuration, opacity: 0.0 }, 0.0)
    },

    _meta_container_animation () {
      this.$data.timelines.enterMeta.play()
    },

    _splitText () {
      this.$nextTick(() => {
        splitText(this.$refs.body_text, this.$data.spanTagOpening, this.$data.spanTagClosing)

        this.$data.split.container = document.querySelectorAll('.project__body .' + CLASS_NAME_SPLIT_CONTAINER)
        this.$data.split.child = document.querySelectorAll('.project__body .' + CLASS_NAME_SPLIT_CHILD)

        gsap.set(this.$data.split.container, { overflow: 'hidden', display: 'block' })
        gsap.set(this.$data.split.child, { yPercent: 100, display: 'block' })

        this._setUpTimelines()
      })
    },

    _setCanvas () {
      this.$refs.canvas.width = window.innerWidth
      this.$refs.canvas.height = window.innerHeight

      this.$data.canvas.ctx = this.$refs.canvas.getContext('2d')

      gsap.set(this.$refs.canvas, { top: `${Math.abs(this.$refs.canvas.getBoundingClientRect().top)}px` })

      this.$data.canvas.noiseData = []
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

    _leavePage (path) {
      this.toggleScroll()
      this.$data.timelines.leave.play()
    },
    // Handlers

    _resizeHandler () {
      this.$data.debounceResize = debounce(this._setCanvas.bind(this), 250)
      window.addEventListener('resize', this.$data.debounceResize)
    },

    _onCompleteTimelineLeaveHandler (tl) {
      this.$router.push(this.$data.content.back.href)

      tl.kill()
    },

    _onCompleteTimelineEnterHandler (tl) {
      this.$data.introComplete = true

      tl.kill()
    },

    _onCompleteTimelineMetalHandler (tl) {
      tl.kill()
    },

    _backButtonHandler (e) {
      e.preventDefault()

      this._leavePage()
    },

    _tickHandler () {
      gsap.ticker.add(this._drawCanvas)
    }
  }
}
</script>

<style lang="scss" scoped>
.project {
  min-height: 100vh;
  width: 100%;

  background: $color-black;
}

.project__canvas {
  @include unselectable();

  position: fixed;
  top: 0;
  left: 0;

  opacity: 0;

  pointer-events: none;
}

.project__container {
  position: relative;
  width: 100%;

  padding: 25vh g(2, 24) rem($narrow-spacing);

  opacity: 0;
}

.project__back {
  position: absolute;
  top: 5vh;

  text-align: center;

  color: $color-background;

  opacity: 0;
}

.project__image-cover {
  width: 100%;
}

.project__title-container {
  overflow: hidden;
  margin-bottom: rem($narrow-spacing / 2);
}

.project__title {
  position: relative;
  display: inline-block;

  font-size: rem(60px);
  text-align: left;

  color: $color-background;
}

.project__date {
  position: absolute;
  top: rem(-20px);
  left: rem(3px);

  font-size: rem(10px);
}

.project__meta-list {
  display: flex;

  margin-bottom: rem($narrow-spacing / 4);
}

.project__meta-list-item {
  color: $color-background;

  &:first-of-type {
    padding-right: rem($narrow-spacing / 4);
  }
}

.project__meta-title-small {
  padding-bottom: rem(5px);

  font-size: rem(12px);
  line-height: rem(12px);
  font-weight: 100;

  opacity: 0.6;
}

.project__meta-title-big {
  font-size: rem(15px);
  line-height: rem(15px);
}

.project__body {
  position: relative;

  padding-bottom: rem($narrow-spacing / 2);

  font-size: rem(13px);
  line-height: rem(22px);

  color: $color-background;
}

.project__line {
  width: 100%;
  height: rem(2px);

  background: $color-background;

  transform: scaleX(0.0);
  transform-origin: left;
}

.project__link-container {
  display: flex;
  flex-direction: column;

  margin: rem($narrow-spacing / 2) 0;
}

.project__meta-links {
  display: flex;
}

.project__link {
  color: $color-background;

  &:nth-child(2) {
    margin-left: rem(25px);
  }
}

.project__gif-container {
  width: 110%;
  min-height: rem(250px);

  margin-left: -5%;

  background: red;
}

@include mq-regular {
  .project__title-container {
    margin-bottom: rem($regular-spacing / 2);
  }

  .project__title {
    font-size: rem(110px);
    line-height: rem(100px);
  }

  .project__date {
    top: rem(-30px);
    left: rem(6px);

    font-size: rem(20px);
  }

  .project__body {
    padding-bottom: rem($regular-spacing / 2);

    font-size: rem(20px);
    line-height: rem(30px);
  }

  .project__link-container {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;

    margin: rem($regular-spacing / 2) 0;
  }

  .project__meta-list {
    margin: 0;
  }
}

@include mq-wide {
  .project__container {
    max-width: rem($wide-container * 0.6);

    // padding: 0;
    padding-left: 0;
    padding-right: 0;
    margin: 0 auto rem($wide-spacing);
  }

  .project__title-container {
    margin-bottom: rem($wide-spacing / 2);
  }

  .project__title {
  }

  .project__body {
    // margin-bottom: rem($wide-spacing / 4);
    padding-bottom: rem($wide-spacing / 4);
  }

  .project__link-container {
    margin-bottom: rem($wide-spacing / 2);
  }

  .project__gif-container {
    width: 150%;
    min-height: rem(750px);

    margin-left: -25%;

    background: red;
  }
}
</style>
