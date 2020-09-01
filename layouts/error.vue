<template>
  <div class="error">
    <div class="error__header-container">
      <h1 v-if="error.statusCode === 404" ref="header" class="heading error__header">
        <template v-for="(letter, index) in content.fourofour.split('')">
          <span :key="index" ref="letter"> {{ letter }}</span>
        </template>
      </h1>
      <h1 v-else>
        <h1 ref="header" class="heading error_header">
          {{ content.other }}
        </h1>
      </h1>
    </div>
    <nuxt-link ref="back" to="/" class="button subheading error__back">
      {{ content.back }}
    </nuxt-link>
  </div>
</template>

<script>
import { gsap } from 'gsap'

export default {
  props: {
    error: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      content: {
        fourofour: '404',
        other: 'Well..',
        back: 'Go home'
      },
      tl: gsap.timeline({ paused: true, delay: 0.5 }),
      meta: {
        title: 'Page not fond | Dennis Wegereef'
      }
    }
  },

  mounted () {
    this._setupTimeLines()

    this.$data.tl.play()

    document.title = this.$data.meta.title
  },

  methods: {
    _setupTimeLines () {
      const tl = this.$data.tl
      gsap.set(this.$refs.letter[2], { scaleX: -1 })
      gsap.set([this.$refs.letter[0], this.$refs.letter[1], this.$refs.letter[2]], { yPercent: 130, opacity: 1 })
      gsap.set(this.$refs.back.$el, { opacity: 0, yPercent: 50 })

      tl.to(this.$refs.letter[1], { duration: 1.1, yPercent: 0 }, 0.2)
      tl.to([this.$refs.letter[0], this.$refs.letter[2]], { duration: 1.1, yPercent: 0 }, 0.5)

      tl.to(this.$refs.back.$el, { duration: 0.3, yPercent: 0, opacity: 1 }, 0.7)
    }
  }
}
</script>

<style lang="scss" scoped>
.error {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 100%;
  min-height: 100vh;

  background: $color-background;
}

.error__header-container {
  overflow: hidden;
}

.error__header {
  margin-bottom: 3vh;
  color: $color-black;

  font-size: 20vw;

  span {
    opacity: 0;
    display: inline-block;
  }
}

.error__back {
  color: $color-primary;

  text-transform: uppercase;
}
</style>
