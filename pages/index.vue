<template>
  <div class="home" ref="home">
    <HomeIntro ref="loader"/>
    <div v-if="loaded">
      <HomeHero :hero-props="homeData.hero" :lmS="lmS"/>
      <HomeProjects ref="projectsComponent" :projects-props="homeData.projects"/>
      <Footer />
    </div>
  </div>
</template>

<script>
// import { gsap } from 'gsap'

import locomotive from '~/mixins/locomotiveScroll.js'
import HomeQuery from '~/apollo/home'

import HomeHero from '~/components/sections/home-hero.vue'
import HomeProjects from '~/components/sections/home-projects.vue'

import HomeIntro from '~/components/partials/home-intro.vue'
import Footer from '~/components/sections/footer.vue'

export default {
  components: {
    HomeHero,
    HomeProjects,
    HomeIntro,
    Footer
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
      this.$refs.loader.start(this.lmS)
    },

    _project_item_animation (event) {
      console.log(this.$refs.projectsComponent)
      this.$refs.projectsComponent.enter_item_animation(event.el.dataset.index)
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
.home {
  background: $color-primary;
}
</style>
