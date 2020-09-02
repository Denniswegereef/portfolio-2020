<template>
  <footer class="footer">
    <div class="footer__line" />
    <div class="footer__content">
      <a class="button smallheading footer__mail" :href="`mailto:${content.mail}`">{{ content.mail }}</a>
      <ul class="footer__list">
        <li v-for="(item, index) in socials" :key="index" ref="link" class="footer__item">
          <a :href="item.link" target="_blank" class="button smallheading footer__item">{{ item.name }}</a>
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
  }
}
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;

  width: g(10, 12);
  margin: 0 auto;
  padding: rem($narrow-spacing / 4) 0;

  color: $color-primary;
}

.footer__line {
  width: 100%;
  height: 2px;

  background: $color-black;

  margin-bottom: rem($narrow-spacing / 5);
}

.footer__content {
  display: flex;
  justify-content: space-between;
}

.footer__list {
  display: flex;
}

.footer__item {
  margin-right: rem(25px);

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
