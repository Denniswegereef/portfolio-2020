<template>
  <div>
    <!-- <topHeader /> -->
    <main class="default-layout" id="js-scroll">
      <nuxt />
    </main>
    <socialComponent />
  </div>
</template>

<script>
import SocialComponent from '~/components/partials/socials.vue'
// import TopHeader from '~/components/partials/top-header.vue'

export default {
  components: {
    SocialComponent
    // TopHeader
  }
}
</script>

<style lang="scss" scoped>
.default-layout {
  background: $color-background;
}
</style>
