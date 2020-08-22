<template>
  <div v-if="loader">
    <div ref="background_one" class="loader loader-one"/>
    <div ref="background_two" class="loader loader-two"/>
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
    play (lmS) {
      this.lmS = lmS

      this.lmS.stop()
      this.tl.play()
    },

    _setupTimeline (lmS) {
      this.tl.eventCallback('onComplete', this._timelineCompleteHandler)
      console.log(this.$refs.background_two)
      this.tl.to(this.$refs.background_two, { duration: 1.2, scaleY: 1.0, ease: 'Expo.easeInOuteaseInOut' }, 0.3)
      this.tl.set(this.$refs.background_one, { opacity: 0 }, 1.4)
      this.tl.to(this.$refs.background_two, { duration: 0.4, opacity: 0 }, 1.5)
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

  pointer-events: none;

  &-one {
    z-index: 3;

    background: $color-black;
  }

  &-two {
    z-index: 4;

    background: $color-background;

    transform: scaleY(0.0);
  }
}
</style>
