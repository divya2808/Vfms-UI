<template>
  <div>
    <div v-if="files && !loadedMessage" class="mt-8">
      <h1 class="text-xl font-bold">Text files that you can view:</h1>
      <div v-for="file in files" :key="file" class="flex items-center mt-8">
        <span class="block text-xl mt-4 mr-16">{{ file }}</span>
        <button @click="catFile(file)">View File</button>
      </div>
    </div>
    <div v-else class="text-xl mt-8 text-center">{{ loadedMessage }}</div>
    <div v-if="fileContent">
      <span class="text-xl mt-8 block font-bold">Contents of {{ currentFile }} file are: </span>
      <p class="text-xl mt-8 block contents-container">{{ fileContent }}</p>
      </div>
    <div v-else-if="catFileMessage" class="text-xl mt-8 text-center">{{ catFileMessage }}</div>
  </div>
</template>

<script>
import _get from 'lodash/get'
  export default {
    name: 'CatFiles',
    data() {
      return {
        files: null,
        loadedMessage: '',
        fileContent: '',
        catFileMessage: '',
        currentFile: ''
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
      let response = await this.$axios.$post('/api/cat-files', {
        username: this.username,
        password: this.password
      })
      if(response.statusCode === 200) {
        let files = _get(response, 'files') || ''
        if(!files) {
          this.loadedMessage = 'Currently there are no text files under this folder'
        }
        let parsedFiles = files.split(/\r?\n/)
        this.files = parsedFiles
      } else {
        this.loadedMessage = 'Failed to load files'
      }
    },
    methods: {
      async catFile(file) {
        this.currentFile = file
        let response = await this.$axios.$post('/api/cat-single-file', {
          username: this.username,
          password: this.password,
          file: file
        })

        if(response.statusCode === 200) {
          this.fileContent = response.content
        } else {
          this.catFileMessage = response.message
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
button {
  background-color: #0081da;
  padding: 8px 54px;
  border-radius: 20px;
  color: #fff;
  transition: all 0.2s ease;
  outline: none;

  &:hover {
    background-color: #002D5C;
  }

  &:disabled {
    @apply bg-gray-400;
    cursor: default;
  }
}

.contents-container {
  border: 1px solid black;
  padding: 32px;
}
</style>