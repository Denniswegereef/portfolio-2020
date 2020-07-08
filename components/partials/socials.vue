<template>
  <div class="socials">
    <ul class="socials__list">
      <no-ssr>
        <li v-for="(item, index) in socials" :key="index" class="socials__item">
          <a :href="item.link" target="_blank">{{ item.name }}</a>
        </li>
      </no-ssr>
    </ul>
  </div>
</template>

<script>
import { gsap } from 'gsap/dist/gsap'
import socialQuery from '~/apollo/socials'

export default {
  data () {
    return {
      socials: []
    }
  },
  apollo: {
    socials: {
      prefetch: false,
      query: socialQuery
    }
  },
  mounted () {
    console.log(gsap)
  }
}
</script>

<style lang="scss" scoped>
.socials {
  position: fixed;;
  top: 50%;
  right: 0;
}
</style>
