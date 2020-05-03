<template>
  <div>
    <search /> 
    <div class="page-container mx-auto mt-32 font-mono">
      <div>
        <h2 class="text-4xl">Recommended Courses</h2>
      </div>
      <div>
        <h2 class="text-4xl">Recommended Practices</h2>
      </div>
      <div>
        <h2 class="text-4xl">Recommended Resources</h2>
      </div>
    </div>
  </div>
</template>

<script>
import Search from '../components/Search'
export default {
  components: {
    Search
  }  
}
</script>

<style lang="scss" scoped>
.page-container {
  width: 1200px;
}
</style>