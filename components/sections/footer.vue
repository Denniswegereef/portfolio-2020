<template>
  <footer
    class="footer"
    data-scroll
    data-scroll-offset="100px 0"
    data-scroll-call="footer_intro_animation">
    <div ref="line" class="footer__line" />
    <div class="footer__content">
      <a ref="mail" class="button smallheading footer__mail" :href="`mailto:${content.mail}`">{{ content.mail }}</a>
      <ul class="footer__list">
        <li v-for="(item, index) in socials" :key="index" ref="link" class="footer__item">
          <a ref="footer__anchor" :href="item.link" target="_blank" class="button smallheading footer__item">{{ item.name }}</a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script>
import { gsap } from 'gsap'

export default {
  data () {
    return {
      content: {
        mail: 'Denniswegereef@gmail.com'
      },
      tl: gsap.timeline({ paused: true }),
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
      ]
    }
  },

  mounted () {
    this._setUpTimelines()
  },

  methods: {
    startAnimateInto () {
      this.$data.tl.play()
    },

    _setUpTimelines () {
      const tl = this.$data.tl
      const links = [this.$refs.mail, ...this.$refs.link]

      gsap.set(links, { opacity: 0, yPercent: 100 }, 0.0)

      tl.eventCallback('onComplete', this._timelineCompleteHandler)
      tl.to(this.$refs.line, { duration: 0.9, scaleX: 1 }, 0.0)
      tl.to(links, { duration: 0.5, yPercent: 0, opacity: 1, stagger: 0.15 }, 0.4)
      tl.to([this.$refs.mail, ...this.$refs.footer__anchor], { duration: 0.5, color: process.env.colorPrimary }, 1.0)
    },

    _timelineCompleteHandler () {
      this.$data.tl.kill()
    }
  }
}
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;

  width: g(10, 12);
  margin: 0 auto;
  padding: rem($narrow-spacing / 4) 0;
}

.footer__line {
  width: 100%;
  height: 2px;

  background: $color-black;

  margin-bottom: rem($narrow-spacing / 5);

  transform: scaleX(0.0);
  transform-origin: left;
}

.footer__content {
  display: flex;
  justify-content: space-between;
}

.footer__list {
  display: flex;
}

.footer__mail {
  color: $color-black;
}

.footer__item {
  margin-right: rem(25px);

  color: $color-black;

  &:last-of-type {
    margin-right: 0;
  }
}

@include mq-regular {
  .footer {
    width: g(11, 12);
    margin: 0 auto;
    padding: rem($regular-spacing / 4) 0;
  }

  .footer__line {
    margin-bottom: rem($regular-spacing / 5);
  }
}

@include mq-wide {
  .footer {
    width: 100%;
    max-width: rem($wide-container);

    padding: 0 g(1, 24) $wide-spacing / 4;
    margin: 0 auto;
  }

  .footer__line {
    margin-bottom: rem($wide-spacing / 5);
  }
}
</style>
