<template>
  <div>
    <Header />
    <Hero />
    <Work ref="workComponent"/>

    <h1>test</h1>
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
h1 {
  height: 400vh;
  width: 50%;
  background: linear-gradient(0deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%);
}
</style>
