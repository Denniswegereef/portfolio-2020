<template>
  <div>
    <Intro-animation ref="introComponent"/>
    <div v-if="loaded">
      <Header />
      <Hero />
      <Work :workProps="homeData.projects" ref="workComponent"/>
      <About :aboutProps="homeData.about"/>
      <Experiences :experiencesProps="homeData.experiences"/>
      <Footer />
    </div>
  </div>
</template>

<script>
import locomotive from '~/mixins/locomotiveScroll.js'
import HomeQuery from '~/apollo/home_2'

import IntroAnimation from '~/components/partials/intro-animation.vue'

import Header from '~/components/sections/header.vue'
import Hero from '~/components/sections/hero.vue'
import Work from '~/components/sections/work.vue'
import About from '~/components/sections/about.vue'
import Experiences from '~/components/sections/experiences.vue'
import Footer from '~/components/sections/footer.vue'

export default {
  components: {
    IntroAnimation,
    Header,
    Hero,
    Work,
    About,
    Experiences,
    Footer
  },
  mixins: [locomotive],
  data () {
    return {
      homeData: null,
      loaded: false
    }
  },
  apollo: {
    homeData: {
      prefetch: true,
      query: HomeQuery,
      update ({ projects, about, experiences }) {
        return {
          projects: [
            ...projects
          ],
          about: {
            ...about
          },
          experiences: [
            ...experiences
          ]
        }
      }
    }
  },
  watch: {
    homeData () {
      if (this.$data.homeData) {
        this.$data.loaded = true

        this.$nextTick(() => {
          this.initScroll()

          this.$nextTick(() => {
            this._startIntroAnimation()
          })
        })
      }
    }
  },

  methods: {
    _startIntroAnimation () {
      this.$refs.introComponent.play(this.$data.lmS)
    },

    _project_item_animation (e) {
      this.$refs.workComponent.enterAnimation(e)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
