<template>
  <section class="hero">
    <h1 class="heading hero__text">
      <span class="hero__text-item" :data-text="content.small_one">{{ content.title_one }}</span>
      <span class="hero__text-item">{{ content.title_two }}</span>
      <span class="hero__text-item" :data-text="content.small_two">{{ content.title_three }}</span>
      <span class="hero__text-item" :data-text="content.small_three">{{ content.title_four }}</span>
    </h1>
  </section>
</template>

<script>
export default {
  data () {
    return {
      content: {
        title_one: 'Denins',
        title_two: 'Wegereef',
        title_three: 'Creative',
        title_four: 'Developer',
        small_one: '1996',
        small_two: 'junior',
        small_three: '2020'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
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
