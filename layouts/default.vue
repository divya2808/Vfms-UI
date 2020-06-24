<template>
  <div>
    <div class="bg-blue-900">
      <div class="flex w-5/6 h-24 mx-auto text-white items-center font-mono">
        <nuxt-link to="/" class="flex-1 text-5xl font-hairline relative cursor-pointer">
          <span class="mr-2">VFMS</span>
        </nuxt-link>
        <nuxt-link v-if="!quit" to="/" @click="currentTab = 'ACL Manager'" class="mr-16 text-lg uppercase cursor-pointer" :class="{'active-link': currentTab === 'ACL Manager'}">ACL Manager</nuxt-link>
        <nuxt-link v-if="!quit" to="/project-2" @click="currentTab = 'Project-2'" class="mr-16 text-lg uppercase cursor-pointer" :class="{'active-link': currentTab === 'Project-2'}">Project 2</nuxt-link>
        <span v-if="!quit && showQuit" class="mr-16 text-lg uppercase cursor-pointer" @click="setQuit">Quit</span>
      </div>
    </div>
    <nuxt v-if="!quit" @signed-in="setCreds" />
    <div v-else-if="quit && quitMessage" class="max-w-900 text-center mx-auto text-2xl mt-16">{{ quitMessage }}</div>
  </div>
</template>
<script>
import secrets from '~/assets/data/secrets.js'
export default {
  data() {
    return {
      currentTab: '',
      quit: false,
      showQuit: false,
      username: '',
      password: '',
      quitMessage: ''
    }
  },
  created() {
    this.$nuxt.$on('signed-in-index', this.setCreds)
  },
  methods: {
    async setQuit() {
      this.quit = true
      let response = await this.$axios.$post('/api/quit', {
        username: this.username,
        password: this.password
      })

      if(response.statusCode === 200) {
        this.quitMessage = response.message + ' Please reload and sign in to create a new session'
      } else {
        this.quitMessage = response.message
      }
    },
    setCreds(event) {
      this.showQuit = true
      this.username = event.username
      this.password = event.password
    }
  }
}
</script>
<style lang="scss">
.active-link, .nuxt-active-link {
  border-bottom: 1px solid white;
}

.max-w-900 {
  max-width: 900px;
}
</style>
