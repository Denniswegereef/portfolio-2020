<template>
  <div class="project">
    <div class="project__container">
      <nuxt-link class="button smallheading project__back" :prefetch="false" :to="content.back.href">{{ content.back.text }}</nuxt-link>
      <!-- <h1>{{ data.cover.url }}</h1> -->
      <div class="project__image-container">
        <!-- <img class="project__image-cover" :src="imageCover" alt=""> -->
      </div>
      <h1 class="heading project__title">{{ work.title }}</h1>

      <p class="subheading project__body">{{ work.description }}</p>
      {{ work }}
    </div>
  </div>
</template>

<script>
import locomotive from '~/mixins/locomotiveScroll.js'
import data from '~/static/data/work.json'

export default {
  validate ({ params, route }) {
    if (data.work.find(item => item.slug === params.slug)) return true
  },

  asyncData () {
    return { data }
  },

  data () {
    return {
      work: {},
      imageCover: null,
      routeBefore: false,
      queryToCheck: 'routeBefore',
      content: {
        back: {
          href: '/',
          text: 'Go home'
        }
      }
    }
  },

  mixins: [locomotive],

  beforeMount () {
    this.$data.work = data.work.find(item => item.slug === this.$route.params.slug)

    // Some query checking if route is coming form a page or a hard refresh
    const checkQuery = this.$data.queryToCheck in this.$route.query
    checkQuery ? this.$data.routeBefore = true : this.$data.routeBefore = false
    if (this.$data.routeBefore || checkQuery) this.$router.replace({ query: null })
  },

  mounted () {
    this.initScroll()
  },

  watch: {
    work () {
      this.$data.imageCover = require(`~/assets/images/${this.$data.work.cover.url}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.project {
  min-height: 100vh;
  width: 100%;
  background: $color-black;
}

.project__container {
  position: relative;
  width: 100%;

  padding: 35vh g(2, 24) rem($narrow-spacing);
}

.project__back {
  position: absolute;
  top: 5vh;
  left: 0;
  right: 0;

  text-align: center;

  color: $color-background;
}

.project__image-container {
  // position: absolute;
  // display: flex;
  // align-items: center;
  // justify-content: center;
  // text-align: center;

  // top: 13vh;
  // left: g(2, 24);

  // width: g(10, 12);
}

.project__image-cover {
  width: 100%;
}

.project__title {
  font-size: rem(50px);

  color: $color-background;
}

.project__body {
  color: $color-background;
}

@include mq-regular {
  .project__container {
    padding: 0 g(2, 24) rem($regular-spacing);
  }
}

@include mq-wide {
  .project__container {
    max-width: rem($wide-container);

    padding: 0;
    margin: 0 g(2, 24) rem($wide-spacing);
  }
}
</style>
