<template>
  <div  class="home">
    <div v-if="loaded">
      <HomeHeader :hero-props="homeData.hero"/>
      <HomeProjects :projects-props="homeData.projects"/>
     <!--<Footer /> -->
    </div>
  </div>
</template>

<script>
import locomotive from '~/mixins/locomotiveScroll.js'
import HomeQuery from '~/apollo/home'

import HomeHeader from '~/components/sections/home-header.vue'
import HomeProjects from '~/components/sections/home-projects.vue'
// import Footer from '~/components/sections/footer.vue'

export default {
  components: {
    HomeHeader,
    HomeProjects
    // Footer
  },
  mixins: [locomotive],
  data () {
    return {
      homeData: {},
      loaded: false
    }
  },
  apollo: {
    homeData: {
      prefetch: true,
      query: HomeQuery,
      update ({ projects, homeHero }) {
        return {
          projects: {
            ...projects
          },
          hero: {
            ...homeHero,
            text_first: this.$md.render(homeHero.text_first),
            text_second: this.$md.render(homeHero.text_second)
          }
        }
      }
    }
  },
  watch: {
    homeData () {
      this.$data.loaded = true
      this.initScroll()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
