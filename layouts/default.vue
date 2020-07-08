<template>
  <div>
    <div id="js-scroll">
      <nuxt />
    </div>
    <socialComponent />
  </div>
</template>

<script>
import SocialComponent from '~/components/partials/socials.vue'

export default {
  components: {
    SocialComponent
  }
}
</script>

<style>
</style>
