<template>
  <header class="header">
    <ul class="header__list">
      <li v-for="(item, index) in links" :key="index" class="header__item">
        <a :href="item.link" target="_blank" class="button header__link">{{ item.name }}</a>
      </li>
    </ul>
  </header>
</template>

<script>
export default {
  data () {
    return {
      links: [
        {
          name: 'Projects',
          link: '/projects'
        },
        {
          name: 'About',
          link: '/about'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: rem(18px);
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0 rem(50px);

  width: 100%;
}

.header__logo {
  @include font-canela-regular();

  color: $color-tertiary;
}

.header__list {
  display: flex;
}

.header__item {
  margin-right: rem(24px);

  &:last-of-type {
    margin-right: 0;
  }
}

.header__link {
  color: $color-secondary;

  &:before {
    background: $color-secondary;
  }
}

@include mq-regular {
  .header {
    justify-content: flex-end;
  }
}
</style>
