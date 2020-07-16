<template>
  <div v-if="loader">
    <div ref="item" class="loader"></div>
  </div>
</template>

<script>
import { gsap } from 'gsap'

export default {
  data () {
    return {
      loader: true
    }
  },
  methods: {
    start (lmS) {
      gsap.to(this.$refs.item, {
        opacity: 0,
        duration: 1,
        delay: 1,
        onComplete: () => {
          lmS.update()
          lmS.start()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.loader {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;

  width: 100%;
  height: 100vh;

  background: red;
}
</style>
