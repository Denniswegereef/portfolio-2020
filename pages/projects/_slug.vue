<template>
  <div class="container">
    <!-- <span v-if="projects">{{ projects }}</span> -->
    <!-- <h1>{{ projects }}</h1>
    <span>{{ api_url }}</span>
    {{ project }} -->
    <nuxt-link to="/">gob ack</nuxt-link>
  </div>
</template>

<script>
import locomotive from '~/mixins/locomotiveScroll.js'
// import projectsQuery from '~/apollo/project_individual'

export default {
  // data () {
  //   return {
  //     projects: 'test',
  //     api_url: process.env.strapiBaseUri
  //   }
  // },
  // computed: {
  //   project () {
  //     return JSON.parse(JSON.stringify(this.$data.projects))[0]
  //   }
  // },
  // apollo: {
  //   projects: {
  //     prefetch: true,
  //     variables () {
  //       return { slug: this.$route.params.slug }
  //     },
  //     query: projectsQuery
  //   }
  // },
  mixins: [locomotive],
  layout: 'default'
}
</script>
