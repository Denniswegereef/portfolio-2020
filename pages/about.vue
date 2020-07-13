<template>
  <section class="about">
    <div class="about__content">
      <h1>{{ about.title_intro }}</h1>

      <!-- eslint-disable vue/no-v-html -->
      <div class="paragraph rich-text about__richt-text" v-html="about.text_intro" />
      <div class="paragraph rich-text about__richt-text" v-html="about.text_body" />
    </div>
    <div class="about__experience">
      <h1>{{ about.title_experience_first }} {{ about.title_experience_second }}</h1>
    </div>
  </section>
</template>

<script>
import locomotive from '~/mixins/locomotiveScroll.js'
import aboutQuery from '~/apollo/about'

export default {
  mixins: [locomotive],
  data () {
    return {
      about: {}
    }
  },
  apollo: {
    about: {
      prefetch: true,
      query: aboutQuery,
      update ({ about }) {
        return {
          ...about,
          text_intro: this.$md.render(about.text_intro),
          text_body: this.$md.render(about.text_body)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.about {
  background: $color-black;
  color: $color-white;
}

.about__richt-text {
  margin-bottom: rem(40px);
}
</style>
