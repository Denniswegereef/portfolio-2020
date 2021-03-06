<template>
  <div
    v-if="!isTouch"
    ref="mouse_element"
    class="mouse-move"
    data-scroll
    data-scroll-sticky
    data-scroll-target="#js-scroll">
    <div ref="pointer" class="mouse-move__pointer" />
  </div>
</template>

<script>
import { gsap } from 'gsap'

import lerp from '~/helpers/lerp'
import isTouch from '~/helpers/isTouch'

export default {
  data () {
    return {
      hoverElements: 'a:hover',
      hoverActive: false,
      active: false,
      positionX: 0,
      positionY: 0,
      offset: {
        width: 12,
        height: 12
      },
      lerpAlpha: 0.15,
      isTouch: false,
      classSubPage: 'sub-page'
    }
  },

  watch: {
    $route () {
      this._checkSubPage()
    }
  },

  mounted () {
    const isScreenTouch = isTouch()

    if (isScreenTouch) this.$data.isTouch = true
    if (isScreenTouch) return

    this._setupEventListeners()
    this._checkSubPage()
  },

  methods: {
    _setupEventListeners () {
      this._mouseMoveHandler()
      this._mouseLeaveHandler()
      this._tickHandler()
    },

    _checkSubPage () {
      Object.keys(this.$route.params).length === 0 ? this.$refs.pointer.classList.remove(this.$data.classSubPage) : this.$refs.pointer.classList.add(this.$data.classSubPage)
    },

    _updateMousePositions (e) {
      this.$data.positionX = e.clientX
      this.$data.positionY = e.clientY

      this._isHover(this.$data.hoverElements)
    },

    _updateElementPosition () {
      if (this.$data.positionX === 0 && this.$data.positionY === 0 && !this.$data.active) {
        this.$refs.mouse_element.style.opacity = 0
        return
      }

      if (!this.$data.active) {
        gsap.to(this.$refs.mouse_element, { duration: 0.5, opacity: 0.4 })
        this.$data.active = true
      }

      const newPositionX = this.$data.positionX - this.$data.offset.width
      const newPositionY = this.$data.positionY - this.$data.offset.height

      const lerpX = lerp(this.$refs.mouse_element.getBoundingClientRect().left, newPositionX, this.$data.lerpAlpha)
      const lerpY = lerp(this.$refs.mouse_element.getBoundingClientRect().top, newPositionY, this.$data.lerpAlpha)

      this.$refs.mouse_element.style.transform = `translate(${lerpX}px, ${lerpY}px)`

      // Hover
      this.$data.hoverActive ? this.$refs.mouse_element.classList.add('js-active-hover') : this.$refs.mouse_element.classList.remove('js-active-hover')
    },

    _isHover (element) {
      document.querySelectorAll(element).length >= 1 ? this.$data.hoverActive = true : this.$data.hoverActive = false
    },

    _mouseLeave (event) {
      if (event.clientY <= 0 || event.clientX <= 0 || (event.clientX >= window.innerWidth || event.clientY >= window.innerHeight)) {
        this.$data.active = false
        this.$data.positionX = 0
        this.$data.positionY = 0

        gsap.to(this.$refs.mouse_element, { duration: 0.5, opacity: 0.0 })
      }
    },

    // Handlers

    _mouseMoveHandler () {
      window.addEventListener('mousemove', this._updateMousePositions)
    },

    _mouseLeaveHandler () {
      document.addEventListener('mouseleave', this._mouseLeave)
    },

    _tickHandler () {
      gsap.ticker.add(this._updateElementPosition)
    }
  }
}
</script>

<style lang="scss" scoped>
.mouse-move {
  @include unselectable();

  position: absolute;
  top: 0;
  left: 0;

  height: rem(24px);
  width: rem(24px);

  pointer-events: none;
  transition: background 0.3s;
}

.mouse-move__pointer {
  height: 100%;
  width: 100%;

  border-radius: 100%;

  background: $color-black;

  transition: transform 0.3s, background 0.3s;
}

.sub-page {
  background: $color-primary;
  border: 2px solid $color-black;
}

.js-active-hover {
  .mouse-move__pointer {
    background: $color-primary;

    transform: scale(1.5);
  }

  .sub-page {
    background: $color-background
  }
}
</style>
