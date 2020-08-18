<template>
  <header class="header">
    <p class="header__text smallheading">{{ content.text_one }}</p>
    <p class="header__text smallheading">{{ content.text_two }}</p>
    <ul class="header__list">
      <li v-for="(item, index) in content.links" :key="index" class="header__list-item">
        <a :href="item.text" class="header__link button smallheading">{{ item.text }}</a>
      </li>
    </ul>

    <div class="square header__square"/>
  </header>
</template>

<script>
export default {
  data () {
    return {
      content: {
        text_one: 'Just graduated and looking for a job',
        text_two: 'Portfolio selected work',
        links: [
          {
            href: '#',
            text: 'Projects'
          },
          {
            href: '#',
            text: 'About'
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  width: g(10, 12);

  padding: rem($narrow-spacing) / 2 0 0 0;
  margin:  0 auto 10vh;
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

    width: g(11, 12);

    margin:  0 auto 30vh;
    padding: rem($regular-spacing) / 2 0 0 0;
  }

  .header__text {
    max-width: g(2, 10);

    margin-right: g(1, 10);
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
    max-width: rem($wide-container);

    padding: rem($wide-spacing) / 2 g(1, 24) 0;
  }

  .header__square {
    top: rem($wide-spacing / 2);
    right: g(1, 24);
  }
}
</style>
