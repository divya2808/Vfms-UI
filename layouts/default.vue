<template>
  <div>
    <div class="bg-blue-900">
      <div class="flex w-5/6 h-24 mx-auto text-white items-center font-mono">
        <div class="flex-1 text-5xl font-hairline relative cursor-pointer">
          <span class="mr-2">Fun</span>
          <span class="absolute">Math</span>
        </div>
        <ul class="flex flex-end">
          <li v-for="item in navItems" :key="item.id" class="mx-8 cursor-pointer hover:text-pink-300 nav-item relative" @click="activeNavItem = item">{{ item.name }}</li>
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
          name: 'Courses',
          subNavItems: ['Affine cipher', 'Shift Cipher', 'Substitution cipher','Vigenere cipher']
        },
        {
          id: '2',
          name: 'Practices',
          subNavItems: ['Affine Cipher Practice', 'Shift Cipher Practice', 'Substitution Cipher Practice', 'Vigenere Cipher Practice']
        },
        {
          id: '3',
          name: 'Concepts',
          subNavItems: ['Affine Cipher Courses', 'Shift Cipher Courses', 'Subsitution Cipher Courses', 'Vigenere Cipher Courses']
        }
      ],
      activeNavItem: null
    }
  }
}
</script>
<style lang="scss">
.nav-item {
  transform: color 0.5s ease;
}

.dropdown-menu {
  top: 100%;
  min-width: 120px;
}
</style>
