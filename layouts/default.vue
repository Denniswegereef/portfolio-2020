<template>
  <div>
    <!-- <topHeader /> -->
    <main id="js-scroll" class="default-layout">
      <nuxt />
    </main>
    <socialComponent />
    <mouseMove />
  </div>
</template>

<script>
import SocialComponent from '~/components/partials/socials.vue'
import MouseMove from '~/components/partials/mouse-move.vue'

export default {
  components: {
    MouseMove,
    SocialComponent
  },
  mounted () {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  },

  head: {
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ]
  }
}
</script>

<style lang="scss" scoped>
.default-layout {
  background: $color-background;
}
</style>
