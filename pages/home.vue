<template>
  <div>
    <div>Home page</div>
  </div>
</template>

<script>
  export default {
    asyncData({route}) {
      console.log(route.query)
    }
  }
</script>

<style lang="scss" scoped>

</style>