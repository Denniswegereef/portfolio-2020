<template>
  <section class="work" id="js-work">
    <div class="work__hover-container" data-scroll data-scroll-sticky data-scroll-target="#js-scroll">
      <div class="work__hover-element" ref="hover_element">
        <img src="" alt="" class="work__hover-image" rel="preload" ref="hover_image">
      </div>
    </div>
    <ul class="work__list" ref="work_list">
      <li
        v-for="(item, index) in workProps"
        :key="index"
        class="work__list-item"
        data-scroll
        :data-index="index"
        data-scroll-offset="100px 0"
        data-scroll-call="project_item_animation">
        <a
          class="work__link"
          :href="`projects/${item.slug}`"
          @click.native="(event) => _mouseClickHandler(event, `projects/${item.slug}`)"
          @mouseover.native="(event) => _mouseOverHandler(event, index)"
          @mouseleave.native="_mouseLeaveHandler">
          <h3 class="heading work__heading" :data-text="item.date" ref="title">{{ item.title }}</h3>
        </a>
        <div class="work__line-border" ref="line"/>
        <div v-if="index + 1 === workProps.length" class="work__line-border work__line-border_last" ref="lastLine"/>
      </li>
    </ul>
  </section>
</template>

<script>
/* eslint curly: [2, "multi"] */

// TODO
// MOBILE DISABLING!
// OPTIMIZE WHEN NOT IN VIEW?

import { gsap } from 'gsap'

import lerp from '~/helpers/lerp'

export default {
  props: {
    workProps: {
      type: Array,
      default: () => null
    }
  },
  data () {
    return {
      content: {
        title: 'Work'
      },
      timelines: {
        hoverEnter: gsap.timeline({ paused: true }),
        hoverLeave: gsap.timeline({ paused: true }),
        enterTitle: []
      },
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
      },
      api_url: process.env.strapiBaseUri
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
    this._setupEventListeners()
    this._setUpTimelines()
  },

  methods: {
    _setupEventListeners () {
      this._mouseMoveHandler()
      this._tickHandler()
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

        tl.from(item, { duration: 0.8, delay: 0.25, translateY: '100%' }, 0.0)
        tl.to(line, { duration: 0.9, scaleX: 1 }, 0.4)

        if (i + 1 === this.$refs.title.length) tl.to(this.$refs.lastLine, { duration: 0.9, scaleX: 1 }, 0.9)
      }
    },

    enterAnimation (e) {
      this.$data.timelines.enterTitle[Number(e.el.dataset.index)].play()
    },

    _updateMousePositions (e) {
      this.$data.hoverElement.positionX = e.clientX
      this.$data.hoverElement.positionY = e.clientY
    },

    _updateElementPosition () {
      if (this.$data.transitionAnimation) return

      const hoverElement = this.$refs.hover_element

      const newPositionX = this.$data.hoverElement.positionX + this.$data.hoverElement.offSetX
      const newPositionY = this.$data.hoverElement.positionY + this.$data.hoverElement.offSetY - (this.$refs.hover_element.offsetHeight * 0.5)

      hoverElement.style.left = lerp(hoverElement.offsetLeft, newPositionX, this.$data.hoverElement.lerpAlpha) + 'px'
      hoverElement.style.top = lerp(hoverElement.offsetTop, newPositionY, this.$data.hoverElement.lerpAlpha) + 'px'
    },

    _transistionItem (e) {
      // e.preventDefault()
    },

    // Handlers

    _mouseOverHandler (e, i) {
      if (this.$data.transitionAnimation) return

      // this.$refs.hover_image.src = `${this.api_url}${this.$props.workProps[i].cover.url}`

      this.$data.hoverElement.show = true
      this.$data.timelines.hoverLeave.pause()
      this.$data.timelines.hoverEnter.play(0)
    },

    _mouseLeaveHandler () {
      if (!this.$data.transitionAnimation) {
        this.$data.hoverElement.show = false
        this.$data.timelines.hoverLeave.play(0)
      }
    },

    _mouseClickHandler (to) {
      this.$router.push(to)
    },

    _mouseMoveHandler () {
      window.addEventListener('mousemove', this._updateMousePositions)
    },

    _tickHandler () {
      gsap.ticker.add(this._updateElementPosition)
    }
  },

  beforeDestroy () {
    gsap.ticker.remove(this._updateElementPosition)
  }
}
</script>

<style lang="scss" scoped>
.work {
  width: g(10, 12);

  margin: 0 auto rem($narrow-spacing);
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

@include mq-regular {
  .work {
    width: g(11, 12);

    margin: 0 auto rem($regular-spacing);
  }

  .work__hover-container {
    @include unselectable();

    position: fixed;
    left: 0;
    top: 0;

    height: 100vh;
    width: 100vw;

    // background: rgba(255, 0, 0, 0.2);

    z-index: -1;
    pointer-events: none;
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
