<template>
  <div class="practices-container flex flex-wrap mx-auto mt-20">
    <nuxt-link v-for="resource in resourcesList" :key="resource.id" :to="`/practices/${resource.id}`" class="my-8 practice-card p-4 cursor-pointer mx-8">
      <h2 class="text-blue-900 text-2xl">{{ resource.name }}</h2>
      <p class="flex-1">{{ resource.description }}</p>
    </nuxt-link>
  </div>
</template>

<script>
import resourcesList from '../data/resourcesList.js'
export default {
  data() {
    return {
      resourcesList: resourcesList
    }
  }  
}
</script>

<style lang="scss" scoped>
.practices-container {
  max-width: 1392px;
}

.practice-card {
  position: relative;
  box-shadow: 0 1rem 1.5rem 0 rgba(26, 35, 63, 0.1),
      0 0.25rem 0.5rem 0 rgba(27, 43, 52, 0.06);
  background-color: white;
  width: 400px;
  height: 200px;

  &:before {
    content: '';
    position: absolute;
    z-index: -1;
    background-color: #3182ce;
    height: 100%;
    width: 100%;
    transition: transform 0.3s ease;
    top: 0;
    left: 0;
  }
}

.practice-card:hover:before {
  transform: rotate(3deg);
}
</style>