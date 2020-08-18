<template>
  <section class="experiences">
    <h1 class="smallheading experience__heading">{{ content.title }}</h1>
    <ul class="experiences__list">
      <li v-for="(item, index) in experiencesProps" :key="index" class="experiences__list-item">
        <div class="experiences__left">
          <div class="smallheading experiences__date">{{ item.year }}</div>
          <div class="smallheading experiences__role"> {{ item.role }}</div>
        </div>
        <div class="experiences__right">
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
      type: Array,
      default: () => null
    }
  },
  data () {
    return {
      content: {
        title: 'Experiences'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.experiences {
  width: g(10, 12);

  margin:  0 auto;
}

.experience__heading {
  margin-bottom: rem($narrow-spacing / 3);

  font-size: rem(20px);
  text-align: right;
}

.experiences__list-item {
  padding: rem(30px) 0;

  border-bottom: 2px solid $color-black;

  &:first-of-type {
    border-top: 2px solid $color-black;
  }
}

.experiences__left {
  display: flex;

  margin-bottom: rem(12px);
}

.experiences__date {
  position: relative;

  margin-right: rem(20px);

  &:after {
    position: absolute;
    top: calc(50% - #{rem(2px)});
    right: rem(-15px);

    height: rem(2px);
    width: rem(10px);

    background: $color-black;

    content: '';
  }
}

.experiences__right {
}

.experiences__title {
  margin-bottom: rem(12px);

  font-size: rem(25px);
  text-transform: uppercase;
}

@include mq-regular {
  .experiences {
    width: g(11, 12);

    margin:  0 auto;
  }

  .experiences__list {
    margin-left: auto;
    width: g(8, 12);
  }

  .experiences__title {
    margin-bottom: rem(8px);
  }
}

@include mq-wide {
  .experiences {
    width: 100%;
    max-width: rem($wide-container);

    padding: 0 g(1, 24) 0;
  }

  .experiences__description {
    font-size: rem(18px);
    line-height: rem(28px);
  }
}
</style>
