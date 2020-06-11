<template>
  <div class="container">
    <logo />
    {{ socials }}
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import socialQuery from '~/apollo/socials'

export default {
  components: {
    Logo
  },
  data () {
    return {
      socials: []
    }
  },
  apollo: {
    socials: {
      prefetch: true,
      query: socialQuery
    }
  }
}
</script>

<style>
</style>
