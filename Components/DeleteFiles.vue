<template>
  <div>
    <div v-if="files && !loadedMessage" class="mt-8">
      <div v-if="files.length > 0">
        <h1 class="text-xl font-bold">Files under folder</h1>
        <span v-if="responseMessage" class="text-xl mt-8 text-blue-500 block">{{ responseMessage }}</span>
        <div v-for="file in files" :key="file" class="flex items-center mt-8">
          <span class="block text-xl mt-4 mr-16">{{ file }}</span>
          <button @click="deleteFile(file)">Delete File</button>
        </div>
      </div>
    </div>
    <div v-else class="text-xl mt-8 text-center">{{ loadedMessage }}</div>
  </div>
</template>

<script>
import _get from 'lodash/get'
import _remove from 'lodash/remove'
  export default {
    name: 'DeleteFiles',
    data() {
      return {
        files: [],
        loadedMessage: '',
        responseMessage: ''
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
      async deleteFile(file) {
        let response = await this.$axios.$post('/api/delete-files', {
          username: this.username,
          password: this.password,
          file: file
        })

        if(response.statusCode === 200) {
          this.files.splice(this.files.indexOf(file), 1);
          this.responseMessage = `Deleted ${file} file successfully`
        } else {
          this.responseMessage = `Error in deleting ${file} file`
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
</style>