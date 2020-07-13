export default {
  data () {
    return {
      lmS: null
    }
  },
  watch: {
    $route () {
      this.lmS.update()
    }
  },

  mounted () {
    this.initScroll()
  },

  methods: {
    initScroll () {
      this.$nextTick(() => {
        this.lmS = new this.LocomotiveScroll({
          el: document.querySelector('#js-scroll'),
          smooth: false
        })
      })
    }
  },

  destroyed () {
    this.lmS.destroy()
  }
}
