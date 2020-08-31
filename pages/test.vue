<template>
  <div>
    <Header />
    <Hero />
    <Work ref="workComponent"/>
  </div>
</template>

<script>
import locomotive from '~/mixins/locomotiveScroll.js'

import Header from '~/components/sections/header.vue'
import Hero from '~/components/sections/hero_new.vue'
import Work from '~/components/sections/work_new.vue'
// import Work from '~/components/sections/work_new.vue'

export default {
  mixins: [locomotive],
  components: {
    Hero,
    Header,
    Work
    // Work
  },
  data () {
    return {
      scrollActive: true,
      breakpoint: {
        narrow: 480,
        regular: 767,
        wide: 1024
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
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
