<template>
  <section class="project">
    <div v-if="loaded">
      <div class="project__cover-header"></div>

      <div class="project__container">

        <h1 class="subheading project__title">{{ projectData.title }}</h1>

        <div class="project__container-list">
          <ul class="project__list project__list-info">
            <template v-for="(value, key, index) in projectData.list">
              <li :key="index" class="project__list-item" v-if="value">
                <span class="heading project__list-subtitle">{{ key }}</span>
                <p class="subheading project__list-title">{{ value }}</p>
              </li>
            </template>
          </ul>

          <ul class="project__list-links">
            <li class="project__list-item">
              <a :href="projectData.link" target="_blank" class="button project__list-link">{{ github_text }}</a>
            </li>
            <li class="project__list-item">
              <a :href="projectData.link" target="_blank" class="button project__list-link">{{ online_text }}</a>
            </li>
          </ul>
        </div>

        <p class="paragraph projects__description" v-html="projectData.description"/>

        <img class="project__image" :src="`${api_url}${projectData.cover.url}`" :alt="`${projectData.title} photo`">
      </div>

      <project-next />
    </div>
  </section>
</template>

<script>
import locomotive from '~/mixins/locomotiveScroll.js'
import projectsQuery from '~/apollo/project_individual'

import ProjectNext from '~/components/partials/project-next.vue'

export default {
  mixins: [locomotive],
  components: {
    ProjectNext
  },
  data () {
    return {
      projectData: {},
      api_url: process.env.strapiBaseUri,
      loaded: false,
      online_text: 'Online link',
      github_text: 'View repository'
    }
  },
  apollo: {
    projectData: {
      prefetch: true,
      variables () {
        return { slug: this.$route.params.slug }
      },
      query: projectsQuery,
      update ({ projects }) {
        return (projects === undefined || projects.length === 0) ? this.$router.push('/404') : {
          ...projects[0],
          description: this.$md.render(projects[0].description),
          list: {
            agency: projects[0].agency,
            role: projects[0].role,
            year: projects[0].date
          }
        }
      }
    }
  },
  watch: {
    projectData () {
      this.$data.loaded = true
      this.initScroll()
    }
  }
}
</script>

<style lang="scss" scoped>
.project {
  min-height: 100vh;
}

.project__cover-header {
  width: 100%;
  height: 60vh;

  margin-bottom: rem(60px);

  background: $color-primary;
}

.project__container {
  padding: 0 rem($narrow-container-padding) rem(120px);
}

.project__title {
  font-size: rem(50px);

  margin-bottom: rem(40px);
}

.project__list {
  display: flex;
  flex-wrap: wrap;
}

.project__list-item {
  display: block;

  width: 50%;

  margin-bottom: rem(24px);
}

.project__list-info {
  margin-bottom: rem(20px);
}

.project__list-links {
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;

  .project__list-item {
    width: auto;
  }
}

.project__list-subtitle {
  display: block;

  margin-bottom: rem(8px);

  color: $color-primary;

  font-size: rem(12px);
  text-transform: uppercase;
}

.project__list-title {
  font-size: rem(18px);
}

.project__list-link {
  padding: 0;

  color: $color-primary;

  font-size: rem(16px);
}

.projects__description {
  margin-bottom: rem(40px);
}

.project__image {
  width: calc(100% + #{rem(30px)});
  margin-left: rem(-15px);
}

@include mq-regular {
  .project__cover-header {
    width: 95%;

    margin: rem(50px) auto rem(100px);
  }

  .project__title {
    font-size: rem(90px);

    margin-bottom: rem(80px);
  }

  .project__container {
    width: 100%;

    padding: 0 rem(90px);
  }

  .project__container-list {
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: rem(80px);
  }

  .project__list {
    flex-wrap: nowrap;
  }

  .project__list-item {
    display: inline-block;
    width: auto;

    margin: 0;
    padding-right: rem(60px);
  }

  .projects__description {
    width: g(8, 12);

    margin: 0 auto rem(60px);
  }

  .project__image {
    width: g(10, 12);
    margin-left: g(1, 12);
    margin-bottom: rem(120px);
  }
}

@include mq-wide {
  .project__container {
    max-width: $container-wide;

    margin: 0 auto;
    padding: 0 rem($container-wide-padding);
  }
}
</style>
