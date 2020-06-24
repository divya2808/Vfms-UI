<template>
  <div>
    <h1 class="text-xl mt-12 text-center">Create empty file</h1>
    <p class="text-xl mt-4 text-center">Currently there are {{ files.length }} files in this folder</p>
    <p class="text-xl mt-4 text-center">You can create {{ 7 - files.length }} more files</p>
    <div class="flex justify-center mt-8">
      <input placeholder="name of file" v-model="file" @change="createMessage = ''" class="mr-8 px-4" />
      <button class="mt-4" :disabled="file === '' || remainingFiles === 0" @click="createEmptyFile">Create an empty file</button>
    </div>
    <div v-if="createMessage" :style="{'color': color}" class="text-xl text-center mt-8">{{ createMessage }}</div>
  </div>
</template>

<script>
import _get from 'lodash/get'
import _includes from 'lodash/includes'
  export default {
    name: 'CreateFile',
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
    data() {
      return {
        files: {},
        file: '',
        createMessage: '',
        fileExists: false,
        color: '',
        includesFile: false
      }
    },
    computed: {
      remainingFiles() {
        return 7 - this.files.length
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
    },
    methods: {
      async createEmptyFile() {
        let includesFile = _includes(this.files, this.file)

        if(includesFile) {
          this.createMessage = 'File already exists'
          this.includesFile = true
          this.color = '#0081da'
          return
        }

        let response = await this.$axios.$post('/api/create-empty-file', {
          username: this.username,
          password: this.password,
          file: this.file
        })

        if(response.statusCode === 200) {
          this.createMessage = response.message
          this.color = '#0081da'
        } else {
          this.createMessage = response.message
          this.color = '#FF0000'
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
.max-w-1200 {
  max-width: 1200px;
}

.max-w-925 {
  max-width: 925px;
}

input {
  border: 1px solid #0081da;
  padding: 5px;
  width: 30%;
}

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

.active {
  border-bottom: 2px solid #0081da;
  color: #0081da;
}
</style>