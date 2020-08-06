<template>
  <section class="projects" id="projects">
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
        data-scroll-position="bottom"
        :data-index="index"
        :data-scroll-speed="index * 2"
        data-scroll-call="project_item_animation"
        :ref="`item`">

        <a :href="`projects/${item.slug}`" class="projects__article-link" @click="handler(`projects/${item.slug}`, $event)">
          <img class="projects__article-image" :src="`${api_url}${item.cover.url}`" :alt="item.title">
          <div class="projects__article-container">
            <h3 class="subheading projects__article-title">{{ item.title }}</h3>
            <p class="paragraph projects__article-text">{{ item.date }}</p>
          </div>
        </a>
      </article>
    </div>
  </section>
</template>

<script>
import { gsap } from 'gsap'

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
      api_url: process.env.strapiBaseUri,
      tl: []
    }
  },
  mounted () {
    this._setupTimelines()
  },

  methods: {
    handler (param, e) {
      e.preventDefault()

      this.$router.push(param)
    },

    enter_item_animation (index) {
      this.tl[index].play()
    },

    _setupTimelines () {
      console.log(this.$refs.item)
      for (let i = 0; i < this.$refs.item.length; i++) {
        const tl = gsap.timeline({ paused: true })
        const el = this.$refs.item[i]

        // tl.eventCallback('onComplete', this._timelineCompleteHandler, i)

        tl.to(el, { duration: 1.0, delay: 0.5 })

        this.tl.push(tl)
      }
    }

    // _timelineCompleteHandler (i) {
    //   console.log(`Killed ${i}`)

    //   // this.tl[i].kill()
    // }
  }
}
</script>

<style lang="scss" scoped>
.projects {
  position: relative;

  padding: rem(180px) #{rem($narrow-container-padding)};
}

.projects__title {
  margin-bottom: rem(60px);

  color: $color-white;

  font-size: rem(60px);
  line-height: 0.6;
  text-align: right;
}

.projects__subtitle {
  color: $color-white;

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
    height: 2px;

    background: red;

    content: '';
  }
}

.projects__article-title {
  margin-bottom: rem(6px);

  font-size: rem(24px);

  color: $color-white;
}

.projects__article-text {
  color: $color-white;

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
      top: rem(18px);

      width: rem(50px);
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
    max-width: $container-wide;

    margin: 0 auto;
    padding: rem(100px) rem($container-wide-padding);
  }
}
</style>
