<template>
  <div>
    <search /> 
    <div class="page-container mx-auto font-mono">
      <div class="mt-32">
        <h2 class="text-4xl text-blue-900">Recommended Courses</h2>
        <courses-card />
      </div>
      <div class="mt-32">
        <h2 class="text-4xl text-blue-900">Recommended Practices</h2>
        <practices-card />
      </div>
      <div class="mt-32">
        <h2 class="text-4xl text-blue-900">Recommended Resources</h2>
        <resources-card />
      </div>
    </div>
  </div>
</template>

<script>
import Search from '../components/Search'
import CoursesCard from '../components/CoursesCard'
import PracticesCard from '../components/PracticesCard'
import ResourcesCard from '../components/ResourcesCard'
export default {
  components: {
    Search,
    ResourcesCard,
    PracticesCard,
    CoursesCard
  }  
}
</script>

<style lang="scss" scoped>
.page-container {
  width: 1200px;
}
</style>