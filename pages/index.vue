<template>
  <div v-if="loaded">
    <Header />
    <Hero />
    <Work :workProps="homeData.projects" />
    <About :aboutProps="homeData.about"/>
    <Experiences :experiencesProps="homeData.experiences"/>
    <Footer />
  </div>
</template>

<script>
import locomotive from '~/mixins/locomotiveScroll.js'
import HomeQuery from '~/apollo/home_2'

import Header from '~/components/sections/header.vue'
import Hero from '~/components/sections/hero.vue'
import Work from '~/components/sections/work.vue'
import About from '~/components/sections/about.vue'
import Experiences from '~/components/sections/experiences.vue'
import Footer from '~/components/sections/footer.vue'

export default {
  components: {
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

          // this.$nextTick(() => {
          //   this.startIntroAnimation()
          // })
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
