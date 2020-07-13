<template>
  <section class="projects">
    <h2 class="subheading projects__title">
      {{ title }}
    </h2>

    <article v-for="(item, index) in projects" :key="index" class="projects__article">
      <a :href="`projects/${item.slug}`" class="projects__link">
        <img class="projects__image" :src="`http://localhost:1337${item.cover.url}`" alt="">
        <h3>{{ item.title }}</h3>
        <p>{{ item.role }}</p>
      </a>
    </article>
  </section>
</template>

<script>
import homeProjectsQuery from '~/apollo/home_projects'

export default {
  data () {
    return {
      projects: [],
      title: 'Selected work'
    }
  },
  apollo: {
    projects: {
      prefetch: false,
      query: homeProjectsQuery
    }
  }
}
</script>

<style lang="scss" scoped>
.projects {
  padding: rem(180px) #{rem($narrow-container-padding)};
}

.projects__title {
  margin-bottom: rem(60px);

  font-size: rem(60px);
}

.projects__article {
  margin-bottom: rem(60px);
}

.projects__link {
  text-decoration: none;
}

.projects__image {
  width: 100%;
}
</style>
