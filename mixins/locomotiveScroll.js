export default {
  data () {
    return {
      lmS: null
    }
  },
  watch: {
    $route () {
      this.updateScroll()
    }
  },

  methods: {
    initScroll () {
      setTimeout(() => {
        this.$nextTick(() => {
          this.lmS = new this.LocomotiveScroll({
            el: document.getElementById('js-scroll'),
            smooth: true
          })
        })
      }, 25)
    },
    updateScroll () {
      this.lmS.update()
    }
  },

  destroyed () {
    this.lmS ? this.lmS.destroy() : this.lmS = null
  }
}
