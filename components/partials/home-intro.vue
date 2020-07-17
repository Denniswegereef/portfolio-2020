<template>
  <div v-if="loader">
    <div ref="item_one" class="loader loader-one"/>
    <div ref="item_two" class="loader loader-two"/>
  </div>
</template>

<script>
import { gsap } from 'gsap'

export default {
  data () {
    return {
      loader: true,
      tl: gsap.timeline({ paused: true }),
      lmS: null
    }
  },
  mounted () {
    this._setupTimeline()
  },
  methods: {
    start (lmS) {
      this.lmS = lmS

      this.lmS.stop()
      this.tl.play()
    },

    _setupTimeline (lmS) {
      const easing = 'power3'

      this.tl.eventCallback('onComplete', this._timelineCompleteHandler)

      this.tl.to(this.$refs.item_one, { scaleY: 0.0, duration: 0.2, ease: easing.easeOuteaseOut }, 0.1)
      this.tl.to(this.$refs.item_two, { scaleY: 0.0, duration: 0.3, ease: easing.easeOuteaseOut }, 0.2)
    },

    _timelineCompleteHandler () {
      this.lmS.start()
      this.lmS.update()

      this.tl.kill()
    }
  }
}
</script>

<style lang="scss" scoped>
.loader {
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100vh;

  transform-origin: bottom center;
  transform: scaleY(1.0);

  &-one {
    z-index: 4;
    background: $color-black;
  }

  &-two {
    z-index: 3;
    background: $color-secondary;
  }
}
</style>
