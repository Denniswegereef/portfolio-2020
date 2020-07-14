<!-- eslint-disable vue/no-v-html -->

<template>
  <section class="info">
    <h1 class="subheading info__title">
      <span class="heading info__title-small">{{ heroProps.title_intro }}</span>
      <span class="info__title-first">{{ first_name }}</span><br>
      {{ last_name }}
    </h1>

    <div class="info__content">
      <div class="paragraph rich-text info__richt-text" v-html="heroProps.text_intro" />
      <div class="paragraph rich-text info__richt-text" v-html="heroProps.text_body" />
    </div>

    <img class="info__cover" :src="`${api_url}${heroProps.cover.url}`" :alt="`${first_name} ${last_name} photo`">
  </section>
</template>

<script>
export default {
  props: {
    heroProps: {
      type: Object,
      default: () => null
    }
  },
  data () {
    return {
      first_name: 'Dennis',
      last_name: 'Wegereef',
      api_url: process.env.strapiBaseUri
    }
  }
}
</script>

<style lang="scss" scoped>
.info {
  padding: rem(150px) #{rem($narrow-container-padding)};
}

.info__content {
  margin-bottom: rem(60px);
}

.info__title {
  margin-bottom: rem(36px);

  font-size: rem(60px);
  line-height: 0.9;
}

.info__title-small {
  display: none;
  font-size: rem(18px);
}

.info__cover {
  width: 100%;
}

@include mq-regular {
  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;

    max-width: rem(1100px);

    padding: rem(250px) rem(30px);
    margin: 0 auto;
  }

  .info__title {
    display: inline-block;
    position: relative;

    margin: 0 auto rem(150px);

    font-size: rem(150px);
    line-height: 0.75;
  }

  .info__title-small {
    display: block;
    position: absolute;
    top: 23%;
    left: rem(15px);

    font-size: rem(40px);

    color: $color-secondary;
  }

  .info__title-first {
    padding-left: rem(140px);
  }

  .info__content {
    display: flex;

    margin-bottom: rem(150px);
  }

  .info__richt-text {
    &:first-of-type {
      margin-top: rem(30px);
      padding-right: rem(60px);
    }
  }

  .info__cover {
    width: 60%;

    margin-left: 10%;
  }
}
</style>
