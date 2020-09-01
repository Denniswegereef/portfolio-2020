<template>
  <section id="js-work" class="work">
    <div class="preload_images">
      <img v-for="(item, index) in data.work" :key="index" ref="preload_images" :src="`/images/${item.cover.url}`">
    </div>

    <div ref="hover_container" class="work__hover-container" data-scroll data-scroll-sticky data-scroll-target="#js-scroll">
      <div ref="hover_element" class="work__hover-element">
        <img ref="hover_image" src="" alt="" class="work__hover-image" rel="preload">
      </div>

      <div ref="transition_element" class="work__transistion_element" />
    </div>

    <ul ref="work_list" class="work__list">
      <li
        v-for="(item, index) in data.work"
        :key="index"
        class="work__list-item"
        data-scroll
        :data-index="index"
        data-scroll-offset="100px 0"
        data-scroll-call="project_item_animation">
        <a
          class="work__link"
          :href="`projects/${item.slug}`"
          @click="(event) => _mouseClickHandler(event, index, `projects/${item.slug}`)"
          @mouseover="(event) => _mouseOverHandler(event, index)"
          @mouseleave="_mouseLeaveHandler">

          <h3 ref="title" class="heading work__heading" :data-text="item.date">{{ item.title }}</h3>
        </a>
        <div ref="line" class="work__line-border" />
        <div v-if="index + 1 === data.work.length" ref="lastLine" class="work__line-border work__line-border_last" />
      </li>
    </ul>
  </section>
</template>

<script>
/* eslint curly: [2, "multi"] */

import { gsap } from 'gsap'
import debounce from 'lodash.debounce'

import lerp from '~/helpers/lerp'
import isTouch from '~/helpers/isTouch'

import data from '~/static/data/work.json'

// TODO
// MOBILE DISABLING!
// OPTIMIZE WHEN NOT IN VIEW?
export default {
  asyncData () {
    return { data }
  },
  data () {
    return {
      content: {
        title: 'Work'
      },
      shouldHover: false,
      isTouch: false,
      data,
      timelines: {
        hoverEnter: gsap.timeline({ paused: true }),
        hoverLeave: gsap.timeline({ paused: true }),
        transition: gsap.timeline({ paused: true }),
        enterTitle: []
      },
      nextRoute: null,
      transitionAnimation: false,
      hoverElement: {
        oldPositionX: 0,
        oldPositionY: 0,
        positionX: 0,
        positionY: 0,
        offSetX: 25,
        offSetY: 0,
        show: false,
        lerpAlpha: 0.25
      }
    }
  },

  watch: {
    hoverElement: {
      handler (newVal, oldVal) {
        this.$data.hoverElement.positionX = newVal.positionX
        this.$data.hoverElement.positionY = newVal.positionY
      },
      deep: true
    }
  },

  mounted () {
    this.$data.isTouch = isTouch()

    this._setupEventListeners()
    this._setUpTimelines()
    this._checkForHover()
  },

  beforeDestroy () {
    gsap.ticker.remove(this._updateElementPosition)
    window.removeEventListener('resize', this.$data.debounceResize)
  },

  methods: {
    _setupEventListeners () {
      this._mouseMoveHandler()
      this._tickHandler()
      this._resizeHandler()
    },

    _setUpTimelines () {
      const hoverElement = this.$refs.hover_element
      const hoverImage = this.$refs.hover_image

      const tlEnter = this.$data.timelines.hoverEnter
      const tlLeave = this.$data.timelines.hoverLeave

      // Enter hover
      tlEnter.set(hoverElement, { opacity: 1, scale: 0.95 })
      tlEnter.set(hoverImage, { scale: 1.35 })
      tlEnter.to(hoverElement, { duration: 0.6, scale: 1.1 }, 0.1)
      tlEnter.to(hoverImage, { duration: 1.2, scale: 1.1 }, 0.1)

      // Leave hover
      tlLeave.to(hoverElement, { duration: 0.1, opacity: 0 }, 0.0)

      // Enter animation title
      for (let i = 0; i < this.$refs.title.length; i++) {
        const item = this.$refs.title[i]
        const line = this.$refs.line[i]

        this.$data.timelines.enterTitle.push(gsap.timeline({ paused: true }))

        const tl = this.$data.timelines.enterTitle[i]

        tl.eventCallback('onComplete', this._onCompleteTimelineEnterHandler, [i])
        tl.from(item, { duration: 0.8, delay: 0.25, translateY: '100%' }, 0.0)
        tl.to(line, { duration: 0.9, scaleX: 1 }, 0.4)

        if (i + 1 === this.$refs.title.length) tl.to(this.$refs.lastLine, { duration: 0.9, scaleX: 1 }, 0.9)
      }

      // Transistion timeline
      const tlTransistion = this.$data.timelines.transition

      tlTransistion.eventCallback('onComplete', this._onCompleteTimelineTransistionHandler)

      const lines = [...this.$refs.line, this.$refs.lastLine]
      const sideElements = [document.getElementById('js-hero'), document.getElementById('js-header')]

      tlTransistion.to(sideElements, { duration: 0.5, opacity: 0 }, 0.3)
      tlTransistion.to(hoverElement, { duration: 1.0, scale: 1 }, 0.0)
      tlTransistion.to(hoverImage, { duration: 1.0, scale: 1 }, 0.0)
      tlTransistion.to(this.$refs.hover_element, { duration: 1.2, clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)', ease: 'Power4.easeInOut' }, 0.2)
      tlTransistion.to(lines, { duration: 1.2, scaleX: 0 }, 0.3)
      tlTransistion.to(this.$refs.title, { duration: 0.5, translateY: '100%' }, 0.5)
      tlTransistion.to(this.$refs.transition_element, { duration: 0.8, scaleY: 1 }, 1.2)
    },

    enterAnimation (e) {
      this.$data.timelines.enterTitle[Number(e.el.dataset.index)].play()
    },

    _updateMousePositions (e) {
      this.$data.hoverElement.positionX = e.clientX
      this.$data.hoverElement.positionY = e.clientY
    },

    _updateElementPosition () {
      if (!this.$data.shouldHover) return

      const hoverElement = this.$refs.hover_element

      const newPositionX = this.$data.hoverElement.positionX + this.$data.hoverElement.offSetX
      const newPositionY = this.$data.hoverElement.positionY + this.$data.hoverElement.offSetY - (this.$refs.hover_element.offsetHeight * 0.5)

      hoverElement.style.left = lerp(hoverElement.offsetLeft, newPositionX, this.$data.hoverElement.lerpAlpha) + 'px'
      hoverElement.style.top = lerp(hoverElement.offsetTop, newPositionY, this.$data.hoverElement.lerpAlpha) + 'px'
    },

    _transistionItem (path) {
      this.$data.transitionAnimation = true
      this.$data.nextRoute = path

      this.$parent.toggleScroll()
      this.$data.timelines.transition.play()
    },

    _checkForHover () {
      this.$data.shouldHover = !this.$data.isTouch && window.innerWidth >= this.$parent.$data.breakpoint.narrow
    },

    _resizeWindow () {
      this._checkForHover()

      gsap.set(this.$refs.hover_container, { top: `${Math.abs(this.$refs.hover_container.getBoundingClientRect().top)}px` })
    },

    // Handlers

    _mouseOverHandler (e, i) {
      if (this.$data.transitionAnimation) return
      if (!this.$data.shouldHover) return
      if (document.documentElement.classList.contains(this.$parent.$data.lmS.scrollingClass)) this.$data.timelines.hoverEnter.reverse()

      this.$refs.hover_image.src = `/images/${this.$data.data.work[i].cover.url}`

      this.$data.hoverElement.show = true
      this.$data.timelines.hoverLeave.pause()
      this.$data.timelines.hoverEnter.play(0)
    },

    _mouseLeaveHandler () {
      if (!this.$data.shouldHover) return

      if (!this.$data.transitionAnimation) {
        this.$data.hoverElement.show = false
        this.$data.timelines.hoverLeave.play(0)
      }
    },

    _mouseClickHandler (event, index, path) {
      event.preventDefault()

      window.removeEventListener('mousemove', this._updateMousePositions)
      this._transistionItem(path)
    },

    _mouseMoveHandler () {
      window.addEventListener('mousemove', this._updateMousePositions)
    },

    _onCompleteTimelineTransistionHandler () {
      this.$data.timelines.transition.kill()
      this.$data.timelines.hoverEnter.kill()
      this.$data.timelines.hoverLeave.kill()

      this.$router.push({ path: this.$data.nextRoute, query: { routeBefore: 'true' } })
    },

    _onCompleteTimelineEnterHandler (i) {
      this.$data.timelines.enterTitle[i].kill()
    },

    _tickHandler () {
      gsap.ticker.add(this._updateElementPosition)
    },

    _resizeHandler () {
      this.$data.debounceResize = debounce(this._resizeWindow.bind(this), 250)
      window.addEventListener('resize', this.$data.debounceResize)
    }
  }
}
</script>

<style lang="scss" scoped>
.work {
  width: g(10, 12);

  margin: 0 auto rem($narrow-spacing);
}

.preload_images {
  img {
    height: 0;
    width: 0;
  }
}

.work__list-item {
  position: relative;

  padding: rem(24px) 0;
}

.work__link {
  display: inline-block;
  overflow: hidden;

  text-decoration: none;
}

.work__heading {
  position: relative;
  overflow: hidden;

  font-size: rem(35px);
  line-height: 1;

  transition: opacity 0.3s ease-in-out;

  &:after {
    @extend .smallheading;

    width: rem(50px);

    margin-left: rem(8px);

    font-size: rem(9px);

    content: attr(data-text);
  }

  .work__link:hover & {
    opacity: 0.8;
  }
}

.work__line-border {
  position: absolute;
  height: rem(2px);
  width: 100%;

  left: 0;
  top: 0;

  background: $color-black;

  transform: scaleX(0.0);
  transform-origin: left;

  &_last {
    top: 100%;
  }
}

.work__transistion_element {
  position: absolute;
  top: 0;
  left: 0;

  height: 100vh;
  width: 100%;

  background: $color-black;

  z-index: -2;

  transform: scaleY(0);
  transform-origin : bottom left;
}

.work__hover-container {
  @include unselectable();
  position: fixed;
  left: 0;
  top: 0;

  height: 100vh;
  width: 100vw;

  z-index: -1;
  pointer-events: none;
}

.work__hover-element {
  display: none;
}

@include mq-regular {
  .work {
    width: g(11, 12);

    margin: 0 auto rem($regular-spacing);
  }

  .work__hover-element {
    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    top: 0;
    left: 0;

    height: rem(300px);
    width: rem(550px);

    background: red;

    opacity: 0;
    overflow: hidden;

    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
    transition: opacity 0.2s;
  }

  .work__hover-image {
    width: 100%;
  }

  .work__list-item {
    padding: rem(40px) 0;
  }

  .work__heading {
    font-size: rem(80px);

    &:after {
      top: rem(14px);
    }
  }
}

@include mq-wide {
  .work {
    width: 100%;
    max-width: rem($wide-container);

    padding: 0 g(1, 24) 0;
    margin: 0 auto rem($wide-spacing);
  }

  .work__list-item {
    padding: rem(60px) 0;
  }

  .work__heading {
    font-size: rem(100px);

    &:after {
      top: rem(18px);
    }
  }
}
</style>
