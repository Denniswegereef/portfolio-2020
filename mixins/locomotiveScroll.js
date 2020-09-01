import debounce from 'lodash.debounce'

export default {
  data () {
    return {
      lmS: null,
      scrolltrigger: null,
      scrollActive: true
    }
  },
  mounted () {
    this._setupEventListenersLmS()
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
          // if (!this[`_${eventName}`]) {
          //   console.log('No event found with the name' + eventName)
          //   return
          // }

          if (!this[`_${eventName}`]) return

          this[`_${eventName}`](event)
        })
      })
    },

    updateScroll () {
      this.$data.lmS.update()
    },

    toggleScroll () {
      setTimeout(() => {
        this.$data.scrollActive = !this.$data.scrollActive
        this.$data.scrollActive ? this.$data.lmS.start() : this.$data.lmS.stop()
      })
    },

    _setupEventListenersLmS () {
      this._resizeHandlerLmS()
    },

    // Handlers

    _resizeHandlerLmS () {
      this.$data.debounceResize = debounce(this.updateScroll.bind(this), 250)
      window.addEventListener('resize', this.$data.debounceResize)
    }
  },

  destroyed () {
    window.removeEventListener('resize', this.$data.debounceResize)
    this.lmS ? this.lmS.destroy() : this.lmS = null
  }
}
