<template>
  <div class="project">
    <div class="project__container" ref="container">
      <nuxt-link class="button smallheading project__back" :prefetch="false" :to="content.back.href">{{ content.back.text }}</nuxt-link>
      <!-- <h1>{{ data.cover.url }}</h1> -->
      <div class="project__image-container">
        <!-- <img class="project__image-cover" :src="imageCover" alt=""> -->
      </div>
      <h1 class="heading project__title">{{ work.title }} <span class="subheading project__date">{{ work.date }}</span></h1>

      <p class="subheading project__body">{{ work.description }}</p>

      <div class="project__link-container">
        <ul class="project__meta-list">
           <li v-for="(item, index) in work.meta" :key="index" class="project__meta-list-item">
             <p class="project__meta-title-small subheading">{{ item.title_small }}</p>
             <p class="project__meta-title-big subheading">{{ item.title_big }}</p>
           </li>
        </ul>
        <div class="project__meta-links">
          <a :href="work.github" target="_blank" class="smallheading button project__link">{{ content.github }}</a>
          <a :href="work.online" target="_blank" class="smallheading button project__link">{{ content.online }}</a>
        </div>
      </div>

      <div class="project__gif-container">

      </div>
    </div>
  </div>
</template>

<script>
import { gsap } from 'gsap'

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
          href: '/test',
          text: 'Go back'
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

    gsap.from(this.$refs.container, { duration: 1.3, opacity: 0, delay: 1, yPercent: 2 })
  },

  watch: {
    work () {
      // this.$data.imageCover = require(`~/assets/images/${this.$data.work.cover.url}`)
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

  padding: 25vh g(2, 24) rem($narrow-spacing);
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
  display: inline-block;

  margin: 0 0 rem($narrow-spacing / 2);

  font-size: rem(60px);
  color: $color-background;
}

.project__date {
  position: absolute;
  bottom: rem(-11px);
  right: rem(-30px);

  font-size: rem(10px);
}

.project__meta-list {
  display: flex;

  margin-bottom: rem($narrow-spacing / 4);
}

.project__meta-list-item {
  color: $color-background;

  &:first-of-type {
    padding-right: rem($narrow-spacing / 4);
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
  position: relative;

  margin-bottom: rem($narrow-spacing / 2);
  padding-bottom: rem($narrow-spacing / 2);

  font-size: rem(13px);
  line-height: rem(22px);

  color: $color-background;

  &:after {
    position: absolute;
    bottom: 0;
    left: 0;

    width: 100%;
    height: rem(2px);

    background: $color-background;

    content: '';
  }
}

.project__link-container {
  display: flex;
  flex-direction: column;

  margin-bottom: rem($narrow-spacing / 2);
}

.project__meta-links {
  display: flex;
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
  .project__title {
    text-align: center;
    font-size: rem(110px);

    margin-bottom: rem($regular-spacing / 2);
    margin-left: auto;
    margin-right: auto;
  }

  .project__date {
    right: rem(-70px);
    bottom: rem(-14px);

    font-size: rem(20px);
  }

  .project__body {
    margin-bottom: rem($regular-spacing / 2);
    padding-bottom: rem($regular-spacing / 2);

    font-size: rem(20px);
    line-height: rem(30px);
  }

  .project__link-container {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;

    margin-bottom: rem($regular-spacing / 2);
  }

  .project__meta-list {
    margin: 0;
  }
}

@include mq-wide {
  .project__container {
    max-width: rem($wide-container * 0.6);

    // padding: 0;
    padding-left: 0;
    padding-right: 0;
    margin: 0 auto rem($wide-spacing);
  }

  .project__title {
    margin-bottom: rem($wide-spacing / 2);
  }

  .project__body {
    margin-bottom: rem($wide-spacing / 4);
    padding-bottom: rem($wide-spacing / 4);
  }

  .project__link-container {
    margin-bottom: rem($wide-spacing / 2);
  }

  .project__gif-container {
    width: 150%;
    min-height: rem(750px);

    margin-left: -25%;

    background: red;
  }
}
</style>
