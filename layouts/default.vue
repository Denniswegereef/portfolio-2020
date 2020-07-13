<template>
  <div>
    <topHeader />
    <div id="js-scroll">
      <nuxt />
    </div>
    <socialComponent />
  </div>
</template>

<script>
import SocialComponent from '~/components/partials/socials.vue'
import TopHeader from '~/components/partials/top-header.vue'

export default {
  components: {
    SocialComponent,
    TopHeader
  }
}
</script>

<style>
</style>
