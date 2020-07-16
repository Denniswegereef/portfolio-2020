<template>
  <div  class="home">
    <PreLoader ref="loader"/>
    <div v-if="loaded">
      <HomeHeader :hero-props="homeData.hero"/>
      <HomeProjects ref="projectsComponent" :projects-props="homeData.projects"/>
     <!--<Footer /> -->
    </div>
  </div>
</template>

<script>
import locomotive from '~/mixins/locomotiveScroll.js'
import HomeQuery from '~/apollo/home'

import HomeHeader from '~/components/sections/home-header.vue'
import HomeProjects from '~/components/sections/home-projects.vue'

import PreLoader from '~/components/partials/pre-loader.vue'
// import Footer from '~/components/sections/footer.vue'

export default {
  components: {
    HomeHeader,
    HomeProjects,
    PreLoader
    // Footer
  },
  mixins: [locomotive],
  data () {
    return {
      homeData: null,
      loaded: false,
      title: 'Portfolio - Dennis',
      currentIndex: 0
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
  methods: {
    startIntroAnimation () {
      this.lmS.stop()

      this.$refs.loader.start(this.lmS)
    },
    single (el) {
      this.$refs.projectsComponent.animateIn(el.dataset.index)
    }
  },
  watch: {
    homeData () {
      if (this.$data.homeData) {
        this.$data.loaded = true

        this.$nextTick(() => {
          this.initScroll()

          this.$nextTick(() => {
            this.startIntroAnimation()
          })
        })
      }
    }
  },
  head () {
    return {
      title: this.title
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
