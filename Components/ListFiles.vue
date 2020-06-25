<template>
  <div class="mt-8 max-w-1200 mx-auto">
    <div v-if="files && !loadedMessage">
      <h1 class="text-xl font-bold">Files under the current folder:</h1>
      <span v-for="file in files" :key="file" class="block text-xl mt-4">{{ file }}</span>
    </div>
    <div v-else class="text-xl mt-8 text-center">{{ loadedMessage }}</div>
  </div>
</template>

<script>
import _get from 'lodash/get'
export default {
  name: 'ListFiles',
  data() {
    return {
      files: null,
      loadedMessage: ''
    }
  },
  props: {
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  async created() {
    let response = await this.$axios.$post('/api/list-files', {
      username: this.username,
      password: this.password
    })
    if(response.statusCode === 200) {
      let files = _get(response, 'files') || ''
      if(!files) {
        this.loadedMessage = 'Currently there are no files under this folder'
      }
      let parsedFiles = files.split(/\r?\n/)
      this.files = parsedFiles
    } else {
      this.loadedMessage = 'Failed to load files'
    }
  }
}
</script>

<style lang="scss" scoped>
.max-w-1200 {
  max-width: 1200px;
}
</style>