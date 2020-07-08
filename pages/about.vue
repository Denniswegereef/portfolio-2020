<template>
  <div class="container">
    <h1>ABOUT</h1>
    <nuxt-link :to="'/'">
      BACK
    </nuxt-link>

    <div class="test-object" />
  </div>
</template>

<script>
import locomotive from '~/mixins/locomotiveScroll.js'

export default {
  mixins: [locomotive]
}
</script>

<style lang="scss" scoped>
.container {
  padding-bottom: 300px;
}
.test-object {
  // margin: 150px auto;

  height: 200vh;
  width: 90%;
  background: rgb(238,15,196);
  background: -moz-linear-gradient(0deg, rgba(238,15,196,1) 0%, rgba(3,169,208,1) 100%);
  background: -webkit-linear-gradient(0deg, rgba(238,15,196,1) 0%, rgba(3,169,208,1) 100%);
  background: linear-gradient(0deg, rgba(238,15,196,1) 0%, rgba(3,169,208,1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ee0fc4",endColorstr="#03a9d0",GradientType=1);
}
</style>
