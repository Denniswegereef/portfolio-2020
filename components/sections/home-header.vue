<!-- eslint-disable vue/no-v-html -->

<template>
  <section class="hero">
    <div class="hero__container">
      <h1 class="heading hero__title">
        {{ heroProps.title_main }} <br>
        {{ heroProps.title_second }} <br>
        <span class="subheading hero__subheading">
          {{ heroProps.title_payoff }}
        </span>
      </h1>

      <div class="hero__content">
        <div class="rich-text hero__richt-text" v-html="heroProps.text_first" />
        <div class="rich-text hero__richt-text" v-html="heroProps.text_second" />

        <nuxt-link :to="'/about'" class="button hero__button">
          {{ heroProps.link_text }}
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    heroProps: {
      type: Object,
      default: () => null
    }
  }
}
</script>

<style lang="scss" scoped>
.hero {
  width: 100%;

  background: $color-primary;
}

.hero__container {
  padding: rem(150px) #{rem($narrow-container-padding)};
}

.hero__title {
  margin-bottom: rem(36px);

  font-size: rem(45px);

  color: $color-white;
}

.hero__subheading {
  display: block;
  position: relative;

  padding: rem(5px) 0 0 rem(30px);

  font-size: rem(50px);

  &:before {
    position: absolute;
    top: calc(50% - 2px);
    left: 0;

    width: rem(25px);
    height: 4px;

    background: $color-white;

    content: '';
  }
}

.hero__richt-text {
  margin-bottom: rem(24px);

  color: $color-white;
}

.hero__button {
  color: $color-white;
}

@include mq-regular {
  .hero {
    display: flex;
    align-items: center;
    justify-content: center;

    min-height: 100vh;
  }

  .hero__container {
    padding: 0 10%;
  }

  .hero__title {
    margin-bottom: rem(60px);

    font-size: rem(80px);
  }

  .hero__subheading {
    font-size: rem(85px);
  }

  .hero__content {
    display: flex;

    padding-left: rem(90px);
  }

  .hero__richt-text {
    padding-right: rem(30px);
    margin: 0;

    &:nth-child(2) {
      padding-top: rem(60px);
    }
  }

  .hero__button {
    align-self: center;

    min-width: fit-content;

    padding-bottom: 0;

    text-align: center;
  }
}

@include mq-wide {
  .hero__container {
    max-width: rem(1100px);

    padding: 0 rem(60px);
  }

  .hero__title {
    margin-bottom: rem(80px);

    font-size: rem(100px);
  }

  .hero__subheading {
    font-size: rem(110px);
  }
}
</style>
