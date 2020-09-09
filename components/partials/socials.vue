<template>
  <div class="socials">
    <ul class="socials__list">
      <li v-for="(item, index) in socials" :key="index" ref="link" class="socials__item">
        <a ref="link_anchor" :href="item.link" target="_blank" class="button smallheading socials__link">{{ item.name }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { gsap } from 'gsap'

export default {
  data () {
    return {
      socials: [
        {
          name: 'Fb',
          link: 'https://www.facebook.com/dennis.wegereef/'
        },
        {
          name: 'Git',
          link: 'https://github.com/Denniswegereef'
        },
        {
          name: 'In',
          link: 'https://www.linkedin.com/in/dennis-wegereef-84bb9ba7'
        }
      ],
      tl: gsap.timeline({ paused: true })
    }
  },

  mounted () {
    gsap.set(this.$refs.link, { opacity: 0, xPercent: 20 })
    this._setupTimeLine()

    this.$data.tl.play()
  },

  methods: {
    _setupTimeLine () {
      const tl = this.$data.tl

      tl.eventCallback('onComplete', this._timelineCompleteHandler)
      tl.to(this.$refs.link, { duration: 1, xPercent: 0, opacity: 1, stagger: 0.2 }, 4.5)
      tl.to(this.$refs.link_anchor, { duration: 0.5, color: process.env.colorPrimary }, 5.6)
    },

    _timelineCompleteHandler () {
      this.$data.tl.kill()
    }
  }
}
</script>

<style lang="scss" scoped>
.socials {
  display: none;
}

@include mq-regular {
  .socials {
    position: fixed;
    display: flex;
    align-items: center;
    top: 0;
    bottom: 0;
    right: g(1, 24);
  }

  .socials__list {
    text-align: right;
  }

  .socials__item {
    padding-bottom: rem(20px);

    &:last-of-type {
      padding-bottom: 0;
    }
  }

  .socials__link {
    @include unselectable;

    padding: 0;

    color: $color-black;

    &:before {
      background:$color-primary;
    }
  }
}

@include mq-wide {
  .socials {
    right: g(0.5, 24);
  }
}
</style>
