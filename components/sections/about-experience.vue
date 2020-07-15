<template>
  <section class="experiences">
    <h3 class="subheading experiences__heading">
      {{ title_first }} <br>
      {{ title_second}}
    </h3>

    <ul class="experiences__list">
      <li v-for="(item, index) in experiencesProps" :key="index" class="experiences__item">
        <div class="experiences__list-left">
          <div class="experiences__year">{{ item.year }}</div>
          <div class="experiences__role"> {{ item.role }}</div>
        </div>
        <div class="experiences__list-right">
          <h3 class="subheading experiences__title">{{ item.title }}</h3>
          <p class="paragraph experiences__description">{{ item.description }}</p>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    experiencesProps: {
      type: Object,
      default: () => null
    }
  },
  data () {
    return {
      title_first: 'Recent',
      title_second: 'experiences'
    }
  }
}
</script>

<style lang="scss" scoped>
.experiences {
  padding: 0 #{rem($narrow-container-padding)} rem(120px);
}

.experiences__heading {
  margin-bottom: rem(50px);

  font-size: rem(60px);
  text-align: center;
}

.experiences__list {
  &-left {
    display: flex;
  }
}

.experiences__item {
  display: flex;
  flex-direction: column-reverse;

  border-bottom: 1px solid $color-black;

  padding-bottom: rem(12px);
  margin-bottom: rem(36px);
}

.experiences__year {
  padding-right: rem(12px);

  &:after {
    content: ' /'
  }
}

.experiences__title {
  margin-bottom: rem(12px);

  font-size: rem(30px);
}

.experiences__description {
  margin-bottom: rem(18px);
}

@include mq-regular {
  .experiences {
    max-width: rem(1100px);

    margin: 0 auto;
  }

  .experiences__heading {
    padding-left: rem(120px);
    margin-bottom: rem(90px);

    text-align: left;
  }

  .experiences__list {
    padding-left: rem(300px);

    &-left {
      display: block;

      flex-basis: rem(350px);

      padding-right: rem(30px);
    }
  }

  .experiences__item {
    display: flex;
    flex-direction: row;
  }

  .experiences__year, .experiences__title {
    margin-bottom: rem(18px);

    font-size: rem(24px);
  }

  .experiences__year {
    &:after {
      content: none;
    }
  }
}
</style>
