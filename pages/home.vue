<template>
  <div class="max-w-1200 mx-auto mt-12">
    <div class="text-2xl font-bold text-center">Hello! Welcome</div>
    <p class="text-xl text-center mt-4">You account has been created and you have access to your home directory</p>
    <p class="text-xl mt-4 text-center">Path to your home directory: {{ `/home/${user}` }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
  export default {
    asyncData({route}) {
      let user = route.query.username
      return { user }
    },
    computed: {
      ...mapState('user', ['username', 'password'])
    }
  }
</script>

<style lang="scss" scoped>
.max-w-1200 {
  max-width: 1200px;
}
</style>