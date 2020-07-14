<template>
  <section class="about">
    <div v-if="loaded">
      <AboutInfo :hero-props="aboutData"/>
      <AboutExperience/>
    </div>
  </section>
</template>

<script>
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
      aboutData: {},
      name_first: 'Dennis',
      name_second: 'Wegereef',
      loaded: false
    }
  },
  apollo: {
    aboutData: {
      prefetch: true,
      query: aboutQuery,
      update ({ about }) {
        return {
          ...about,
          text_intro: this.$md.render(about.text_intro),
          text_body: this.$md.render(about.text_body)
        }
      }
    }
  },
  watch: {
    aboutData () {
      this.$data.loaded = true
      this.initScroll()
    }
  }
}
</script>

<style lang="scss" scoped>
.about {
  min-height: 100vh;
}

h1 {
  margin: 0;
}
</style>
