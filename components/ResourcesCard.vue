<template>
  <div class='flex my-8 -ml-8'>
    <div v-for="resource in resources" :key="resource.id" class="bg-white card shadow-md p-4 mx-8 cursor-pointer">
     <h2 class="text-2xl">{{ resource.name }}</h2>
     <p>{{ resource.description }}</p>
    </div>
  </div>
</template>

<script>
import resources from '../data/resources.js'
export default {
  data() {
    return {
      resources: resources
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  width: 320px;
  height: 220px;
  box-shadow: 0 1rem 1.5rem 0 rgba(26, 35, 63, 0.1),
      0 0.25rem 0.5rem 0 rgba(27, 43, 52, 0.06);
  transition: all 0.3s ease;

  &:hover {
    @apply bg-blue-900 text-white;
  }
}
</style>