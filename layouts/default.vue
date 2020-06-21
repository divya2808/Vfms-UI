<template>
  <div>
    <div class="bg-blue-900">
      <div class="flex w-5/6 h-24 mx-auto text-white items-center font-mono">
        <nuxt-link to="/" class="flex-1 text-5xl font-hairline relative cursor-pointer">
          <span class="mr-2">VFMS</span>
        </nuxt-link>
        <nuxt-link to="/" @click="currentTab = 'ACL Manager'" class="mr-16 text-lg uppercase cursor-pointer" :class="{'active-link': currentTab === 'ACL Manager'}">ACL Manager</nuxt-link>
        <nuxt-link to="/project-2" @click="currentTab = 'Project-2'" class="mr-8 text-lg uppercase cursor-pointer" :class="{'active-link': currentTab === 'Project-2'}">Project 2</nuxt-link>
      </div>
    </div>
    <nuxt />
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentTab: ''
    }
  }
}
</script>
<style lang="scss">
.active-link, .nuxt-active-link {
  border-bottom: 1px solid white;
}
</style>
