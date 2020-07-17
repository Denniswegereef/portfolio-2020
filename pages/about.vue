<template>
  <section class="about">
    <!-- <div class="curtain" ref="curtain"/> -->
    <div v-if="loaded">
      <AboutInfo :info-props="aboutData.about"/>
      <AboutExperience :experiences-props="aboutData.experiences"/>
    </div>
  </section>
</template>

<script>
// import { gsap } from 'gsap'

import locomotive from '~/mixins/locomotiveScroll.js'
import aboutQuery from '~/apollo/about'

import AboutInfo from '~/components/sections/about-info.vue'
import AboutExperience from '~/components/sections/about-experience.vue'

export default {
  components: {
    AboutInfo,
    AboutExperience
  },
  mixins: [locomotive],
  data () {
    return {
      aboutData: null,
      name_first: 'Dennis',
      name_second: 'Wegereef',
      loaded: false
    }
  },
  apollo: {
    aboutData: {
      prefetch: true,
      query: aboutQuery,
      update ({ about, experiences }) {
        return {
          about: {
            ...about,
            text_intro: this.$md.render(about.text_intro),
            text_body: this.$md.render(about.text_body)
          },
          experiences: {
            ...experiences
          }
        }
      }
    }
  },
  methods: {
    startIntroAnimation () {
      this.lmS.stop()

      setTimeout(() => {
        this.updateScroll()
        this.lmS.start()
      }, 1000)
    }
  },
  watch: {
    aboutData () {
      if (this.$data.aboutData) {
        this.$data.loaded = true

        this.$nextTick(() => {
          this.initScroll()

          this.$nextTick(() => {
            this.startIntroAnimation()
          })
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.curtain {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background: red;
  z-index: 3;
}
.about {
  min-height: 100vh;
}

h1 {
  margin: 0;
}
</style>
