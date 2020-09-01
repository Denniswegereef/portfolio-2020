<template>
  <header id="js-header" class="header">
    <p ref="heading_one" class="header__text smallheading">
      {{ content.text_one }}
    </p>
    <p ref="heading_two" class="header__text smallheading">
      {{ content.text_two }}
    </p>
    <ul ref="list" class="header__list">
      <li v-for="(item, index) in content.links" :key="index" class="header__list-item">
        <a href="#" :data-link="item.href" class="header__link button smallheading" @click="_linkHandler">{{ item.text }}</a>
      </li>
    </ul>
  </header>
</template>

<script>
import { gsap } from 'gsap'

export default {
  data () {
    return {
      timelines: {
        intro: gsap.timeline({ paused: true })
      },
      content: {
        text_one: 'Just graduated and looking for a job',
        text_two: 'Portfolio selected work',
        links: [
          {
            href: '#js-work',
            text: 'Work'
          },
          {
            href: '#js-about',
            text: 'About'
          }
        ]
      }
    }
  },

  mounted () {
    this._setupTimelines()

    this.$data.timelines.intro.play()
  },

  methods: {
    _setupTimelines () {
      const tlIntro = this.$data.timelines.intro
      const allElements = [this.$refs.heading_one, this.$refs.heading_two, this.$refs.list]

      tlIntro.eventCallback('onComplete', this._timelineCompleteHandler)
      tlIntro.set(allElements, { opacity: 0, yPercent: 100 }, 0.0)
      tlIntro.to(allElements, { duration: 0.5, yPercent: 0, opacity: 1, stagger: 0.2 }, 3.8)
    },

    // Handlers

    _timelineCompleteHandler () {
      this.$data.timelines.intro.kill()
    },

    _linkHandler (e) {
      e.preventDefault()
      this.$parent.scrollTo(e.target.dataset.link)
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: column;
  align-items: center;

  position: absolute;
  left: 0;
  top: 0;

  width: 100%;
  height: 100vh;

  padding: 85vh g(1, 24) 0;
}

.header__text {
  padding-bottom: rem(12px);
}

.header__list {
  display: flex;
}

.header__list-item {
  &:first-of-type {
    padding-right: rem(12px);
  }
}

.header__link {
  color: $color-primary;

  cursor: pointer;
}

.header__square {
  position: absolute;
  top: rem($narrow-spacing / 2);
  right: g(1, 24);

  transition: transform 0.3s ease-out;

  &:hover {
    transform: rotate(90deg);
  }
}

@include mq-regular {
  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    top: 0;
    bottom: auto;

    height: auto;

    padding: rem($regular-spacing) / 2 g(1, 24) 0;
  }

  .header__text {
    max-width: g(2, 10);
  }

  .header__list {
    display: flex;
    flex-direction: column;
  }

  .header__list-item {
    display: flex;

    margin-bottom: rem(12px);

    &:first-of-type {
      padding-right: 0;
    }

    &:last-of-type {
      margin-bottom: 0;
    }
  }

  .header__text {
    padding: 0;
  }

  .header__square {
    top: $regular-spacing / 2;
  }
}

@include mq-wide {
  .header {
    width: 100%;

    padding: rem($wide-spacing) / 3 g(4, 24) 0;
  }
}
</style>
