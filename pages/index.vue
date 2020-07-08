<template>
  <div class="container">
    <HomeHeader />>
    <nuxt-link :to="'all'">
      Projects
    </nuxt-link>
    <nuxt-link :to="'about'">
      ABOUGT
    </nuxt-link>
  </div>
</template>

<script>
import locomotive from '~/mixins/locomotiveScroll.js'

import HomeHeader from '~/components/sections/home-header.vue'

export default {
  components: {
    HomeHeader
  },
  mixins: [locomotive]
}
</script>
