<template>
  <div class="practices-container flex flex-wrap mx-auto mt-20">
    <div v-for="practice in practicesList" :key="practice.id" class="my-8 practice-card p-4 cursor-pointer mx-8">
      <h2 class="text-blue-900 text-2xl">{{ practice.name }}</h2>
      <p class="mt-4">{{ practice.description }}</p>
    </div>
  </div>
</template>

<script>
import practicesList from '../data/practicesList.js'
export default {
  data() {
    return {
      practicesList: practicesList
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