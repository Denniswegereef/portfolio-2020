<template>
  <div class="socials">
    <ul class="socials__list">
      <li v-for="(item, index) in socials" :key="index" class="socials__item">
        <a :href="item.link" target="_blank" class="button socials__link">{{ item.name }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      socials: [
        {
          name: 'Fb',
          link: 'https://www.linkedin.com/in/dennis-wegereef-84bb9ba7'
        },
        {
          name: 'Git',
          link: 'https://www.linkedin.com/in/dennis-wegereef-84bb9ba7'
        },
        {
          name: 'In',
          link: 'https://www.linkedin.com/in/dennis-wegereef-84bb9ba7'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.socials {
  position: fixed;;
  top: 50%;
  right: rem(10px);
}

.socials__list {
  text-align: right;
}

.socials__item {
  padding-bottom: rem(6px);

  &:last-of-type {
    padding-bottom: 0;
  }
}

.socials__link {
  padding: 0;

  color: $color-secondary;

  &:before {
    background:$color-secondary;
  }
}
</style>
