<template>
  <div class="project">
    <div class="project__container">
      <nuxt-link class="button smallheading project__back" :prefetch="false" :to="content.back.href">{{ content.back.text }}</nuxt-link>
      <!-- <h1>{{ data.cover.url }}</h1> -->
      <div class="project__image-container">
        <!-- <img class="project__image-cover" :src="imageCover" alt=""> -->
      </div>
      <h1 class="heading project__title" :data-text="work.date">{{ work.title }}</h1>

      <div class="project__meta">
        <ul class="project__meta-list">
           <li v-for="(item, index) in work.meta" :key="index" class="project__meta-list-item">
             <p class="project__meta-title-small subheading">{{ item.title_small }}</p>
             <p class="project__meta-title-big subheading">{{ item.title_big }}</p>
           </li>
        </ul>
      </div>

      <p class="subheading project__body">{{ work.description }}</p>

      <div class="project__link-container">
        <a :href="work.github" target="_blank" class="smallheading button project__link">{{ content.github }}</a>
        <a :href="work.online" target="_blank" class="smallheading button project__link">{{ content.online }}</a>
      </div>

      <div class="project__gif-container">

      </div>
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
        },
        online: 'Online link',
        github: 'Github'
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

  padding: 25vh g(2, 24) 10vh;
}

.project__back {
  position: absolute;
  top: 5vh;

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
  position: relative;

  margin-bottom: rem(30px);

  font-size: rem(60px);
  color: $color-background;

  &:after {
    @extend .smallheading;

    margin-left: rem(5px);

    content: attr(data-text);
  }
}

.project__meta {
  margin-bottom: rem(40px);
}

.project__meta-list {
  display: flex;
}

.project__meta-list-item {
  color: $color-background;

  &:first-of-type {
    margin-right: rem(25px);
  }
}

.project__meta-title-small {
  padding-bottom: rem(5px);

  font-size: rem(12px);
  line-height: rem(12px);

  opacity: 0.6;
}

.project__meta-title-big {
  font-size: rem(15px);
  line-height: rem(15px);
}

.project__body {
  margin-bottom: rem(50px);

  color: $color-background;
}

.project__link-container {
  margin-bottom: rem(50px);
}

.project__link {
  color: $color-primary;

  &:nth-child(2) {
    margin-left: rem(25px);
  }
}

.project__gif-container {
  width: 110%;
  min-height: rem(250px);

  margin-left: -5%;

  background: red;
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
