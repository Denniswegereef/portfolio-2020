<template>
  <section class="hero" id="js-hero">
    <h1 class="heading hero__text" ref="title_container">
      <span class="hero__text-item" :data-text="content.small_one">
        <span class="hidden">{{ content.title_one }}</span>
        <span class="hero__text-show" ref="title_one">
          {{ content.title_one }}
        </span>
      </span>
      <span class="hero__text-item">
        <span class="hidden">{{ content.title_two }}</span>
        <span class="hero__text-show" ref="title_two">
          {{ content.title_two }}
        </span>
      </span>
      <span class="hero__text-item" :data-text="content.small_two">
        <span class="hidden">{{ content.title_three }}</span>
        <span class="hero__text-show" ref="title_three">
          {{ content.title_three }}
        </span>
      </span>
      <span class="hero__text-item" :data-text="content.small_three">
        <span class="hidden">{{ content.title_four }}</span>
        <span class="hero__text-show" ref="title_four">
          {{ content.title_four }}
        </span>
      </span>
    </h1>
  </section>
</template>

<script>
import { gsap } from 'gsap'

export default {
  data () {
    return {
      tl: gsap.timeline({ paused: true }),
      content: {
        title_one: 'Dennis',
        title_two: 'Wegereef',
        title_three: 'Creative',
        title_four: 'Developer',
        small_one: '1996',
        small_two: 'junior',
        small_three: '2020'
      }
    }
  },
  mounted () {
    this._setupTimelines()
  },
  methods: {
    playIntro () {
      this.$data.tl.play()
    },

    _setupTimelines () {
      const tl = this.$data.tl
      const titleRefs = [this.$refs.title_one, this.$refs.title_two, this.$refs.title_three, this.$refs.title_four]

      tl.from(titleRefs, { y: '100%', duration: 1.2, stagger: 0.2, delay: 0.4, ease: 'Expo.easeOut' }, 1.2)
      tl.eventCallback('onComplete', this._onComplete)

      this.playIntro()
    },

    _onComplete () {
      // this.$refs.title_container.classList.add('js-done-animating')
    }
  }
}
</script>

<style lang="scss" scoped>
.hero__text-item {
  overflow: hidden;
}

.js-done-animating {
  .hero__text-item {
    &:before, &:after {
      color: $color-black;

      opacity: 1;

      transform: translateY(0);
    }
  }
}

.hero__text-show {
  position: absolute;
  top: 0;
  left: 0;
}

.hidden {
  @include unselectable();

  opacity: 0;
}

.hero {
  width: g(11, 12);

  margin: 0 auto rem($narrow-spacing);
}

.hero__text {
  display: flex;
  flex-direction: column;

  font-size: 17vw;
}

%hero__text-small {
    @include font-favorit-bold();

    position: absolute;
    bottom: 0;

    font-size: 1vw;
}

.hero__text-item {
  position: relative;

  &:before, &:after {
    color: $color-background;

    opacity: 0;

    transform: translateY(rem(15px));
    transition: color 0.3s, transform 0.6s;
  }

  &:nth-of-type(1) {
    margin-left: g(1, 24);

    &:after {
      @extend %hero__text-small;

      padding-left: 0.5vw;

      content: attr(data-text);
    }
  }

  &:nth-of-type(2) {
    margin-left: -#{g(1, 24)};
  }

  &:nth-of-type(3) {
    margin-left: auto;
    margin-right: -#{g(1, 24)};

    &:before {
      @extend %hero__text-small;

      left: -5vw;

      content: attr(data-text);
    }
  }

  &:nth-of-type(4) {
    margin-left: g(1, 24);

    &:after {
      @extend %hero__text-small;

      padding-left: 0.5vw;

      content: attr(data-text);
    }
  }
}

@include mq-regular {
  .hero {
    margin: 0 auto rem($regular-spacing);
  }
}

@include mq-wide {
  .hero {
    margin: 0 auto rem($wide-spacing);
  }
}
</style>
