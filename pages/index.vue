!<template>
  <div ref="intro" class="intro">
    <h1 ref="heading" class="heading intro__heading">
      Dennis <br>Wegereef<br>
      <span ref="small" class="smallheading">Portfolio 2020</span>
    </h1>
  </div>
</template>

<script>
import { gsap } from 'gsap'

export default {
  data () {
    return {
      tl: gsap.timeline({ paused: true })
    }
  },
  mounted () {
    const color = '#A7ADA9'
    const tl = this.$data.tl

    gsap.set(this.$refs.heading, { opacity: 0, yPercent: 5 })
    gsap.set(this.$refs.small, { opacity: 0, y: '-15' })

    tl.to(this.$refs.intro, { duration: 2.5, background: color }, 1.1)
    tl.to(this.$refs.heading, { duration: 1.5, opacity: 1, yPercent: 0, easing: 'Power3.easeInOut' }, 1.2)
    tl.to(this.$refs.small, { duration: 1.5, opacity: 1, y: 0, easing: 'Power3.easeOut' }, 1.7)

    tl.play()
  }
}
</script>

<style lang="scss" scoped>
.intro {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  text-align: center;

  background: $color-black;

  h1 {
    opacity: 0;
    font-size: 20vw;
  }

  span {
    position: relative;
    display: inline-block;
    font-size: 4vw;
  }
}

@include mq-regular {
  .intro {
    h1 {
      font-size: 16vw;
    }

    span {
      font-size: 3vw;
    }
  }
}

@include mq-wide {
  .intro {
    h1 {
      font-size: 12vw;
    }

    span {
      font-size: 2vw;
    }
  }
}
</style>
