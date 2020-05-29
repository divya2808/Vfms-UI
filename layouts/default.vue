<template>
  <div>
    <div class="bg-blue-900">
      <div class="flex w-5/6 h-24 mx-auto text-white items-center font-mono">
        <nuxt-link to="/" class="flex-1 text-5xl font-hairline relative cursor-pointer">
          <span class="mr-2">VFMS</span>
        </nuxt-link>
        <ul class="flex flex-end">
          <nuxt-link :to="item.link" v-for="item in navItems" :key="item.id" class="mx-8 cursor-pointer hover:text-pink-300 nav-item relative no-underline" :class="{'active': activeNavItem === item}" @click="activeNavItem = item">{{ item.name }}</nuxt-link>
        </ul>
      </div>
    </div>
    <nuxt />
  </div>
</template>
<script>
export default {
  data() {
    return {
      navItems: [
        {
          id: '1',
          name: 'Sign In',
          link: '/sign-in'
        },
        {
          id: '2',
          name: 'Sign up',
          link: '/sign-up'
        },
      ],
      activeNavItem: null
    }
  }
}
</script>
<style lang="scss">
.nav-item {
  transition: color 0.5s ease;
}

.dropdown-menu {
  top: 100%;
  min-width: 120px;
}

.active {
  @apply text-pink-300;
}
</style>
