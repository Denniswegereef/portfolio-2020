<template>
  <section class="projects">
    <h2 class="subheading projects__title" ref="title">
      {{ title }} <br>
      <span class="heading projects__subtitle">{{ subtitle }}</span>
    </h2>

    <div class="projects__articles-container">
      <article
        v-for="(item, index) in projectsProps"
        :key="index"
        class="projects__article"
        data-scroll
        :data-index="index"
        :data-scroll-speed="index"
        data-scroll-call="single"
        :ref="`item_${index}`">

        <a :href="`projects/${item.slug}`" class="projects__article-link">
          <img class="projects__article-image" :src="`${api_url}${item.cover.url}`" :alt="item.title">
          <div class="projects__article-container">
            <h3 class="subheading projects__article-title">{{ item.title }}</h3>
            <p class="paragraph projects__article-text">{{ item.role }}</p>
          </div>
        </a>
      </article>
    </div>
  </section>
</template>

<script>
// import { gsap } from 'gsap/dist/gsap'
// import { ScrollTrigger } from 'gsap/dist/ScrollTrigger.js'
// import LocomotiveScroll from 'locomotive-scroll'

export default {
  props: {
    projectsProps: {
      type: Object,
      default: () => null
    }
  },
  data () {
    return {
      projects: [],
      title: 'Some selected work',
      subtitle: '2018-2020',
      api_url: process.env.strapiBaseUri
    }
  },
  methods: {
    animateIn (index) {
      console.log(this.$refs[`item_${index}`])
    }
  }
}
</script>

<style lang="scss" scoped>
.projects {
  padding: rem(180px) #{rem($narrow-container-padding)};
}

.projects__title {
  margin-bottom: rem(60px);

  font-size: rem(60px);
  line-height: 0.6;
  text-align: right;
}

.projects__subtitle {
  font-size: rem(30px);
}

.projects__article {
  margin-bottom: rem(60px);

  &:nth-of-type(1) {
    .projects__article-image {
      padding: 0 6%;
    }
  }

  &:nth-of-type(2) {
    .projects__article-image {
      padding: 0 15% 0 0;
    }
  }

  &:nth-of-type(3) {
    .projects__article-image {
      padding: 0 10% 0 5%;
    }
  }
}

.projects__article-link {
  text-decoration: none;
}

.projects__article-image {
  width: 100%;

  margin-bottom: rem(12px);
}

.projects__article-container {
  position: relative;

  padding-left: rem(36px);

  &:before {
    position: absolute;
    top: rem(14px);
    left: 0;

    width: rem(30px);
    height: 1px;

    background: $color-black;

    content: '';
  }
}

.projects__article-title {
  margin-bottom: rem(6px);

  font-size: rem(24px);
}

.projects__article-text {
  font-size: rem(18px);
}

@include mq-regular {
  .projects {
    width: 100%;

    margin: 0 auto;
    padding: rem(250px) rem(50px);
  }

  .projects__title {
    margin-bottom: rem(90px);
  }

  .projects__articles-container {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-auto-rows: minmax(rem(100px), auto);
    column-gap: rem(18px);
  }

  .projects__article {
    padding: 0;
    width: 100%;

    @for $i from 1 through 4 {
      &:nth-of-type(#{$i}) {
        .projects__article-image {
          padding: 0;
        }
      }
    }

    &:nth-of-type(1) {
      grid-column: 4 / 7;
      grid-row: 1 / 2;

      padding-left: 10%;
    }

    &:nth-of-type(2) {
      grid-column: 1 / 4;
      grid-row: 1 / 3;

      margin-top: rem(90px);
      padding-right: 25%;
    }

    &:nth-of-type(3) {
      grid-column: 4 / 7;
      grid-row: 2 / 3;

      margin-top: rem(90px);
      padding-right: 10%;
    }
  }

  .projects__article-container {
    position: relative;

    padding-left: rem(60px);

    &:before {
      position: absolute;
      top: rem(18px);
      left: 0;

      width: rem(50px);
      height: 1px;

      background: $color-black;

      content: '';
    }
  }

  .projects__article-image {
    margin-bottom: rem(30px);
  }

  .projects__article-title {
    margin-bottom: rem(6px);

    font-size: rem(36px);
  }

  .projects__article-text {
    font-size: rem(20px);
  }
}

@include mq-wide {
  .projects {
    max-width: rem(1400px);

    padding: rem(250px) rem(25px) rem(150px);
  }
}
</style>
