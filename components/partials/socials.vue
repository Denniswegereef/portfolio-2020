<template>
  <div class="socials">
    <ul class="socials__list">
      <li v-for="(item, index) in socials" :key="index" class="socials__item" ref="link">
        <a :href="item.link" target="_blank" class="button smallheading socials__link">{{ item.name }}</a>
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
          link: 'https://www.linkedin.com/in/dennis-wegereef-84bb9ba7'
        },
        {
          name: 'Git',
          link: 'https://www.linkedin.com/in/dennis-wegereef-84bb9ba7'
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
    gsap.set(this.$refs.link, { opacity: 0, x: '20px' })
    this._setupTimeLine()

    this.tl.play()
  },

  methods: {
    _setupTimeLine () {
      this.tl.eventCallback('onComplete', this._timelineCompleteHandler)

      this.tl.to(this.$refs.link, { x: '0', opacity: 1, stagger: 0.2 }, 3.0)
    },

    _timelineCompleteHandler () {
      this.tl.kill()
    }
  }
}
</script>

<style lang="scss" scoped>
.socials {
  position: fixed;;
  top: $narrow-spacing * 2;
  right: g(1, 24);
}

.socials__list {
  text-align: right;
}

.socials__item {
  padding-bottom: rem(10px);

  &:last-of-type {
    padding-bottom: 0;
  }
}

.socials__link {
  @include unselectable;

  padding: 0;

  color: $color-secondary;

  &:before {
    background:$color-secondary;
  }
}

@include mq-regular {
  .socials {
    top: $regular-spacing * 2;
  }

  .socials__item {
    padding-bottom: rem(20px);

    font-size: rem(20px);
  }
}

@include mq-wide {
  .socials {
    top: $wide-spacing * 2;
  }
}
</style>
