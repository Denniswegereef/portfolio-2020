<!-- eslint-disable vue/no-v-html -->

<template>
  <section class="hero">
    <div class="hero__container">
      <h1 class="heading hero__title" data-scroll data-scroll-speed="1.15" ref="title">
        {{ heroProps.title_main }} {{ heroProps.title_second }} <br>
        <span class="subheading hero__subheading" data-scroll data-scroll-speed="1.1" ref="subtitle">
          {{ heroProps.title_payoff | removeLastWord }} <span class="hero__subheading-last">{{ heroProps.title_payoff | getLastWord }}</span>
        </span>
      </h1>

      <div class="hero__content" ref="content">
        <div class="rich-text hero__richt-text" v-html="heroProps.text_first" data-scroll data-scroll-speed="1.2" ref="text_first"/>
        <div class="rich-text hero__richt-text" v-html="heroProps.text_second" data-scroll data-scroll-speed="1.15" ref="text_second"/>

        <nuxt-link :to="'/about'" class="button hero__button">
          {{ heroProps.link_text }}
        </nuxt-link>
      </div>
    </div>

    <span class="button hero__down-button" ref="scroll_down" @click="_scrollDown">{{ scrollDown }}</span>
  </section>
</template>

<script>
import { gsap } from 'gsap'

export default {
  props: {
    heroProps: {
      type: Object,
      default: () => null
    },
    lmS: {
      type: Object,
      default: () => null
    }
  },
  data () {
    return {
      tl: gsap.timeline({ paused: true, delay: 0.0 }),
      scrollDown: 'Scroll down'
    }
  },

  mounted () {
    this._setupTimeline()
    const refs = this.$refs
    gsap.set([refs.title, refs.subtitle, refs.text_first, refs.text_second], { opacity: 0 })

    this.start()
  },

  methods: {
    start () {
      this.tl.play()
    },

    _scrollDown (e) {
      this.$props.lmS.scrollTo(document.getElementById('projects'))
    },

    _setupTimeline () {
      this.tl.eventCallback('onComplete', this._timelineCompleteHandler)

      this.tl.to(this.$refs.title, { opacity: 1, duration: 0.0 }, 0.0)
      this.tl.to(this.$refs.subtitle, { opacity: 1, duration: 0.0 }, 0.0)
      this.tl.to(this.$refs.text_first, { opacity: 1, duration: 0.0 }, 0.0)
      this.tl.to(this.$refs.text_second, { opacity: 1, duration: 0.0 }, 0.0)
    },

    _timelineCompleteHandler () {
      this.tl.kill()
    }
  },

  filters: {
    removeLastWord (value) {
      return value.split(' ').slice(0, -1).join(' ')
    },

    getLastWord (value) {
      const n = value.split(' ')
      return n[n.length - 1]
    }
  }
}
</script>

<style lang="scss" scoped>
.hero {
  position: relative;
  width: 100%;
}

.hero__container {
  padding: rem(150px) #{rem($narrow-container-padding)};
}

.hero__title {
  margin-bottom: 0;

  font-size: rem(20px);
  line-height: rem(25px);

  color: $color-white;
}

.hero__subheading {
  display: block;
  position: relative;

  padding: rem(5px) 0 0 rem(30px);

  font-size: rem(40px);
  line-height: rem(110px);

  &:before {
    position: absolute;
    top: calc(50% - 2px);
    left: 0;

    width: rem(25px);
    height: 4px;

    background: $color-secondary;

    content: '';
  }
}

.hero__subheading-last {
  position: relative;

  &:before {
    position: absolute;
    bottom: rem(5px);
    left: 0;

    width: 100%;
    height: 4px;

    background: $color-secondary;

    content: '';
  }
}

.hero__richt-text {
  margin-bottom: rem(24px);

  color: $color-white;
}

.hero__button {
  color: $color-white;
}

.hero__down-button {
  @include unselectable;

  position: absolute;
  bottom: rem(24px);
  right: rem(80px);

  color: $color-white;

  cursor: pointer;

  &:before {
    background: $color-white;
  }
}

@include mq-regular {
  .hero {
    display: flex;
    align-items: center;
    justify-content: center;

    min-height: 100vh;
  }

  .hero__container {
    padding: 0 10%;
  }

  .hero__title {
    margin-bottom: rem(60px);

    font-size: rem(35px);
    line-height: rem(90px);
  }

  .hero__subheading {
    font-size: rem(85px);
  }

  .hero__content {
    display: flex;

    padding-left: rem(90px);
  }

  .hero__richt-text {
    padding-right: rem(30px);
    margin: 0;

    &:nth-child(2) {
      padding-top: rem(60px);
    }
  }

  .hero__button {
    align-self: center;

    min-width: fit-content;

    padding-bottom: 0;

    text-align: center;
  }
}

@include mq-wide {
  .hero__container {
    max-width: rem(1100px);

    padding: 0 rem(60px);
  }

  .hero__title {
    margin-bottom: rem(80px);

    font-size: rem(45px);
    line-height: rem(120px);
  }

  .hero__subheading {
    font-size: rem(110px);
  }
}
</style>
