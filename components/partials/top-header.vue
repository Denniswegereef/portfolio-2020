<template>
  <header class="header">
    <span ref="logo">
      <nuxt-link :to="logo.link" class="button header__link header__logo">{{ logo.name }}</nuxt-link>
    </span>

    <ul class="header__list">
      <li v-for="(item, index) in links" :key="index" class="header__item" ref="link">
        <nuxt-link :to="item.link" class="button header__link">{{ item.name }}</nuxt-link>
      </li>
    </ul>
  </header>
</template>

<script>
import { gsap } from 'gsap'

export default {
  data () {
    return {
      logo: {
        name: 'Dennis Wegereef',
        link: '/'
      },
      links: [
        {
          name: 'Projects',
          link: '/'
        },
        {
          name: 'About',
          link: '/about'
        }
      ],
      tl: gsap.timeline({ paused: true })
    }
  },

  mounted () {
    gsap.set([this.$refs.logo, ...this.$refs.link], { opacity: 0, y: '-10px' })
    this._setupTimeLine()

    this.tl.play()
  },

  methods: {
    _setupTimeLine () {
      this.tl.eventCallback('onComplete', this._timelineCompleteHandler)

      this.tl.to([this.$refs.logo, ...this.$refs.link], { y: '0', opacity: 1, stagger: 0.2 }, 2.5)
    },

    _timelineCompleteHandler () {
      console.log('Done')

      this.tl.kill()
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: rem(18px);
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 2;

  padding: 0 rem(50px);

  width: 100%;
}

.header__logo {
  display: none;
}

.header__list {
  display: flex;
}

.header__item {
  margin-right: rem(24px);

  &:last-of-type {
    margin-right: 0;
  }
}

.header__link {
  @include unselectable;

  color: $color-secondary;

  &:before {
    background: $color-secondary;
  }
}

@include mq-regular {
  .header {
    justify-content: space-between;
  }

  .header__logo {
    display: block;
  }

  .header__link {
    font-size: rem(20px);
  }
}
</style>
