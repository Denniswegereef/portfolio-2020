<template>
  <div class="home">
    <HomeHeader />
    <HomeProjects />
    <Footer />
  </div>
</template>

<script>
import locomotive from '~/mixins/locomotiveScroll.js'

import HomeHeader from '~/components/sections/home-header.vue'
import HomeProjects from '~/components/sections/home-projects.vue'
import Footer from '~/components/sections/footer.vue'

export default {
  components: {
    HomeHeader,
    HomeProjects,
    Footer
  },
  mixins: [locomotive]
}
</script>

<style lang="scss" scoped>
</style>
