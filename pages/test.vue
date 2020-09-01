<template>
  <div>
    <Header />
    <Hero />
    <Work ref="workComponent" />
    <About ref="aboutComponent" />
    <Footer />
  </div>
</template>

<script>
import locomotive from '~/mixins/locomotiveScroll.js'

import Header from '~/components/sections/header.vue'
import Hero from '~/components/sections/hero_new.vue'
import Work from '~/components/sections/work_new.vue'
import About from '~/components/sections/about.vue'
import Footer from '~/components/sections/footer.vue'
// import Work from '~/components/sections/work_new.vue'

export default {
  components: {
    Hero,
    Header,
    Work,
    About,
    Footer
  },

  mixins: [locomotive],

  data () {
    return {
      scrollActive: true,
      breakpoint: {
        narrow: 480,
        regular: 767,
        wide: 1024
      },
      meta: {
        title: 'Dennis Wegereef | Creative developer portfolio',
        hid: 'description',
        name: 'description',
        content: 'asdf'
      }
    }
  },

  mounted () {
    this.initScroll()
  },

  methods: {
    scrollTo (target) {
      this.$data.lmS.scrollTo(target)
    },

    _project_item_animation (e) {
      this.$refs.workComponent.enterAnimation(e)
    },

    _about_intro_animation (e) {
      this.$refs.aboutComponent.startAnimateIntro(e)
    },

    _about_body_animation (e) {
      this.$refs.aboutComponent.startAnimateBody(e)
    }
  },

  head () {
    return {
      title: this.meta.title,
      meta: [
        {
          hid: this.meta.hid,
          name: this.meta.name,
          content: this.meta.content
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
