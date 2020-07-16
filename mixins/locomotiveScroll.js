// import { gsap } from 'gsap/dist/gsap'
// import { ScrollTrigger } from 'gsap/dist/ScrollTrigger.js'

export default {
  data () {
    return {
      lmS: null,
      scrolltrigger: null
    }
  },
  watch: {
    $route () {
      this.updateScroll()
    }
  },
  methods: {
    initScroll () {
      this.$nextTick(() => {
        const scrollerElement = document.getElementById('js-scroll')

        this.$data.lmS = new this.LocomotiveScroll({
          el: scrollerElement,
          smooth: true
        })
      })
    },
    updateScroll () {
      this.$data.lmS.update()
    }
  },

  destroyed () {
    this.lmS ? this.lmS.destroy() : this.lmS = null
  }
}
