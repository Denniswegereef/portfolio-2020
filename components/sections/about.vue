<template>
  <section class="about">
    <p class="subheading about__intro">{{ aboutProps.text_intro }}</p>
    <div class="about__image"/>
    <p class="paragraph about__body">{{ aboutProps.text_body }}</p>
  </section>
</template>

<script>
export default {
  props: {
    aboutProps: {
      type: Object,
      default: () => null
    }
  }
}
</script>

<style lang="scss" scoped>
.about {
  position: relative;
  display: flex;
  flex-wrap: wrap;

  width: g(10, 12);

  margin: 0 auto calc(#{rem($narrow-spacing / 3)} + #{rem(270px)});
}

.about__intro {
  width: 100%;

  margin-bottom: rem($narrow-spacing / 3)
}

.about__image {
  position: absolute;
  bottom: rem(-270px);

  height: rem(250px);
  width: 100%;

  background: $color-primary;
}

@include mq-regular {
  .about {
    width: g(11, 12);

    margin: 0 auto rem($regular-spacing / 3);
  }

  .about__intro {
    margin-bottom: rem($regular-spacing / 3)
  }

  .about__image {
    position: initial;
    width: g(4, 12);
  }

  .about__body {
    width: g(7, 12);
    padding-left: g(1, 12);
  }
}

@include mq-wide {
  .about {
    width: 100%;
    max-width: rem($wide-container);

    padding: 0 g(1, 24) 0;
    margin: 0 auto rem($wide-spacing / 3);
  }

  .about__intro {
    margin-bottom: rem($wide-spacing / 3)
  }

  .about__image {
    width: g(3, 12);

    margin-left: g(1, 12);
  }

  .about__body {
    width: g(8, 12);

    padding-left: g(1, 12)
  }
}
</style>
