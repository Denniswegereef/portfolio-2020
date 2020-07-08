<template>
  <div class="container">
    <h1>{{ projects }}</h1>
    <span>{{ api_url }}</span>
    {{ project }}
  </div>
</template>

<script>
import projectsQuery from '~/apollo/project_individual'

export default {
  data () {
    return {
      projects: null,
      api_url: process.env.strapiBaseUri
    }
  },
  computed: {
    project () {
      return JSON.parse(JSON.stringify(this.$data.projects))[0]
    }
  },
  apollo: {
    projects: {
      prefetch: true,
      variables () {
        return { slug: this.$route.params.id }
      },
      query: projectsQuery
    }
  }
}
</script>
