<template>
  <div class="search-container mx-auto mt-24 flex items-center px-4">
    <search class="text-black" />
    <input class="search-input" placeholder="Search courses, practices, resources and more..."/>
  </div>
</template>

<script>
// import Search from '../../static/search.svg'
  export default {
    // components: {
    //   Search
    // }
  }
</script>

<style lang="scss" scoped>
.search-container {
  width: 600px;
  height: 60px;
  border: 1px solid black;
}

.search-input {
  border: 0;
  width: 100%;
  font-size: 20px;
  outline: none;
}
</style>