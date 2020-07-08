<template>
  <section class="hero">
    <h1 class="heading hero__title">
      {{ homeHero.title_main }} <br>
      {{ homeHero.title_second }} <br>
      <span class="subheading hero__subheading">
        {{ homeHero.title_payoff }}
      </span>
    </h1>
    <!-- eslint-disable vue/no-v-html -->
    <div class="paragraph rich-text hero__richt-text" v-html="homeHero.text_first"/>
    <div class="paragraph rich-text hero__richt-text" v-html="homeHero.text_second"/>

    <nuxt-link :to="'/about'">{{ homeHero.link_text }}</nuxt-link>
    <div class="test-object" />
  </section>
</template>

<script>
import homeHeroQuery from '~/apollo/home_hero'

export default {
  data () {
    return {
      homeHero: {}
    }
  },
  apollo: {
    homeHero: {
      prefetch: true,
      query: homeHeroQuery,

      update ({ homeHero }) {
        return {
          ...homeHero,
          text_first: this.$md.render(homeHero.text_first),
          text_second: this.$md.render(homeHero.text_second)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.hero {
  padding-top: 350px;
  min-height: 100vh;

  background: $color-primary;
}

.hero__title {
  margin-bottom: 50px;

  color: $color-tertiary;
}

.hero__richt-text {
  color: $color-white;
  line-height: rem(25px);
  max-width: 500px;
  padding-left: 50px;
  margin-bottom: 30px;
}

.test-object {
  height: 500vh;
}
</style>
