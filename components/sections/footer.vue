<template>
  <footer class="footer">
    <div class="footer__mail">
      <a class="button subheading footer__mail" :href="`mailto:${content.mail}`">{{ content.mail }}</a>
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
      tl: gsap.timeline({ paused: true })
    }
  }
}
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;

  padding: rem(100px) 0;

  color: $color-primary;
}

.footer__mail {
  font-size: rem(25px);
  text-align: center;
  text-transform: uppercase;
}
</style>
