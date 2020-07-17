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

        this.$data.lmS.on('call', (eventName, state, event) => {
          if (!this[`_${eventName}`]) {
            console.log('No event found with the name' + eventName)
            return
          }

          this[`_${eventName}`](event)
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
