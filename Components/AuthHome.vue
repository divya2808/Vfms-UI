<template>
  <div>
    <div>{{username}}</div>
    <div>{{ password }}</div>
  </div>
</template>

<script>
export default {
  props: {
    username: {
      type: String,
      default: ''
    },
    password: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>

</style>