<template>
  <div>
    <!-- <topHeader /> -->
    <main class="default-layout" id="js-scroll">
      <nuxt />
    </main>
    <socialComponent />
    <mouseMove />
  </div>
</template>

<script>
import SocialComponent from '~/components/partials/socials.vue'
import MouseMove from '~/components/partials/mouse-move.vue'
// import TopHeader from '~/components/partials/top-header.vue'

export default {
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  components: {
    MouseMove,
    SocialComponent
    // TopHeader
  },
  mounted () {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }
}
</script>

<style lang="scss" scoped>
.default-layout {
  background: $color-background;
}
</style>
