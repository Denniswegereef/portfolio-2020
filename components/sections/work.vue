<template>
  <section class="work">
    <ul class="work__list">
      <li v-for="(item, index) in workProps" :key="index" class="work__list-item">
        <a :href="`projects/${item.slug}`" class="work__link">
          <h3 class="heading work__heading" :data-text="item.date">{{ item.title }}</h3>
        </a>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    workProps: {
      type: Array,
      default: () => null
    }
  },
  data () {
    return {
      content: {
        title: 'Work'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.work {
  width: g(10, 12);

  margin: 0 auto rem($narrow-spacing);
}

.work__list-item {
  padding: rem(24px) 0;

  border-bottom: rem(2px) solid $color-black;

  &:first-child {
    border-top: rem(2px) solid $color-black;
  }
}

.work__link {
  display: inline-block;

  text-decoration: none;
}

.work__heading {
  position: relative;

  font-size: rem(35px);
  line-height: 1;

  transition: color 0.3s ease-in-out;

  &:after {
    @extend .smallheading;

    position: absolute;
    top: rem(5px);

    width: rem(50px);

    margin-left: rem(8px);

    font-size: rem(9px);

    content: attr(data-text);
  }

  .work__link:hover & {
    color: $color-primary;
  }
}

@include mq-regular {
  .work {
    width: g(11, 12);

    margin: 0 auto rem($regular-spacing);
  }

  .work__list-item {
    padding: rem(40px) 0;
  }

  .work__heading {
    font-size: rem(80px);

    &:after {
      top: rem(14px);
    }
  }
}

@include mq-wide {
  .work {
    width: 100%;
    max-width: rem($wide-container);

    padding: 0 g(1, 24) 0;
    margin: 0 auto rem($wide-spacing);
  }

  .work__list-item {
    padding: rem(60px) 0;
  }

  .work__heading {
    font-size: rem(100px);

    &:after {
      top: rem(18px);
    }
  }
}
</style>
