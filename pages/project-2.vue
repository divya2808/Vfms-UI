<template>
  <div class="max-w-925 mx-auto mt-16">
    <div v-if="credsMessage" class="text-xl text-center">
      {{ credsMessage }}
    </div>
    <div v-else>
      <div v-if="pathMessage === ''" class="flex items-center">
        <h1 class="text-xl">Provide the path for the testing folder</h1>
        <input placeholder="Path to testing folder" class="ml-8" v-model="path" />
        <button class="ml-8" :disabled="path === ''" @click="setPath">Enter</button>
      </div>
      <div v-else class="text-xl text-center">
        <span class="block text-center">{{ `${pathMessage} to ${path}` }}</span>
        <div class="flex items-center mt-8">
          <h1 class="text-xl">Provide path for the file to {{ path }} upload with SFTP</h1>
          <input placeholder="provide path for file to upload to with SFTP" v-model="uploadFilePath" />
          <button class="ml-8" :disabled="uploadFilePath === ''" @click="uploadFile">Upload</button>
        </div>
      </div>
      <div v-if="uploadMessage" :style="{'color': color}" class="text-xl mt-6 text-center">{{ `Status: ${uploadMessage}` }}</div>
    </div>
  </div>
</template>

<script>
import secrets from '~/assets/data/secrets.js'
export default {
  data() {
    return {
      path: '',
      username: '',
      password: '',
      pathMessage: '',
      credsMessage: '',
      uploadFilePath: '',
      uploadMessage: '',
      color: ''
    }
  },
  created() {
    let creds = secrets.get()
    this.username = creds.username
    this.password = creds.password

    if(!this.username && !this.password) {
      this.credsMessage = 'Sorry please login again, your username and password are not available to proceed'
    }
  },
  methods: {
    setPath() {
      this.pathMessage = 'Testing folder path has been set'
    },
    async uploadFile() {
      let response = await this.$axios.$post('/api/users/upload-file', {
        path: this.path,
        uploadFilePath: this.uploadFilePath,
        username: this.username,
        password: this.password
      })
      if(response.statusCode === 200) {
        this.uploadMessage = response.message
        this.color = '#0081da'
      } else {
        this.uploadMessage = response.message
        this.color = '#FF0000'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.max-w-925 {
  max-width: 925px;
}

input {
  border: 1px solid #0081da;
  padding: 5px;
  width: 50%;
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
</style>