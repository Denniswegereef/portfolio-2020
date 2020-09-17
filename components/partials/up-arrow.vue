<template>
  <div
    class="arrow"
    data-scroll
    data-scroll-sticky
    data-scroll-target="#js-scroll"
    @click="_clickHandler">
    <svg
      ref="arrow"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      class="arrow__svg"
      viewBox="0 0 512 512"
      xml:space="preserve">
      <path d="M441.156,322.876l-48.666-47.386c-3.319-3.243-8.619-3.234-11.93,0.017l-81.894,80.299V8.533 c0-4.71-3.823-8.533-8.533-8.533h-68.267c-4.71,0-8.533,3.823-8.533,8.533v347.273l-81.894-80.299 c-3.311-3.243-8.602-3.251-11.921-0.017l-48.666,47.386c-1.655,1.604-2.586,3.806-2.586,6.11c0,2.304,0.939,4.506,2.586,6.11 l179.2,174.481c1.655,1.613,3.806,2.423,5.948,2.423c2.15,0,4.292-0.811,5.956-2.423l179.2-174.481 c1.647-1.604,2.577-3.806,2.577-6.11C443.733,326.682,442.803,324.48,441.156,322.876z" />
    </svg>
  </div>
</template>

<script>
import { gsap } from 'gsap'

export default {
  watch: {
    '$parent.lmS': {
      handler () {
        this._setupEventListeners()
      }
    }
  },

  mounted () {
    gsap.set(this.$refs.arrow, { opacity: 0, yPercent: 50 })
  },

  methods: {
    _clickHandler () {
      this.$parent.scrollTo('#js-hero')
    },

    _scrollEventHandler (scrollObj) {
      const scrollYPosition = scrollObj.scroll.y
      const scrollMinimum = window.innerHeight / 2
      const arrow = this.$refs.arrow

      scrollYPosition < scrollMinimum ? gsap.to(arrow, { duration: 0.5, yPercent: 50, opacity: 0 }) : gsap.to(arrow, { duration: 0.5, yPercent: 0, opacity: 1 })
    },

    _setupEventListeners () {
      this.$parent.lmS.on('scroll', this._scrollEventHandler)
    }
  }
}
</script>

<style lang="scss" scoped>
.arrow {
  position: fixed;
  top: 95vh;
  right: rem(10px);

  height: rem(30px);
  width: rem(30px);

  padding: rem(5px);

  cursor: pointer;
}

.arrow__svg {
  transform: rotate(180deg);
}
</style>
