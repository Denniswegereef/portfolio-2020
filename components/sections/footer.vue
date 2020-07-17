<template>
  <footer class="footer">
    <div class="footer__dash"/>

    <div class="footer__mail">
      <span class="footer__subtitle">{{ text.contact }}</span>
      <a class="button" :href="`mailto${mail}`">{{ mail }}</a>
    </div>
    <div class="footer__socials">
      <span class="footer__subtitle">{{ text.socials }}</span>
      <ul class="footer__list">
        <li v-for="(item, index) in socials" :key="index" class="footer__list-item" ref="link">
          <a :href="item.link" target="_blank" class="button socials__link">{{ item.name }}</a>
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
      mail: 'Denniswegereef@gmail.com',
      text: {
        contact: 'Contact',
        socials: 'Socials'
      },
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
  }
}
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  width: 100%;

  padding: rem(100px) rem($narrow-container-padding);

  color: $color-white;
}

.button {
  &:before {
    background: $color-white;
  }
}

.footer__dash {
  height: 2px;
  width: 100%;

  margin-bottom: rem(60px);

  opacity: 0.2;

  background: $color-secondary;
}

.footer__mail {
  display: flex;
  flex-direction: column;
}

.footer__socials {
  .footer__subtitle {
    width: 100%;

    text-align: right;
  }
}

.footer__subtitle {
  @include font-commons-medium();

  display: inline-block;

  margin-bottom: rem(6px);

  color: $color-secondary;

  text-transform: uppercase;
}

.footer__list {
  display: flex;
  justify-content: flex-end;

  &-item {
    padding-right: rem(18px);

    &:last-of-type {
      padding-right: 0;
    }
  }
}
</style>
