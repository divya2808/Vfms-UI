<template>
  <div class="max-w-925 mx-auto mt-16">
    <div v-if="credsMessage" class="text-xl text-center">
      {{ credsMessage }}
    </div>
    <div v-else>
      <div>
        <div class="text-xl text-center">
          <div class="flex items-center mt-8">
            <h1 class="text-xl">Provide path for the file to upload to the folder</h1>
            <input placeholder="provide path for file to upload to with SFTP" v-model="uploadFilePath" />
            <button class="ml-8" :disabled="uploadFilePath === ''" @click="uploadFile">Upload</button>
          </div>
        </div>
        <div v-if="uploadMessage" :style="{'color': color}" class="text-xl mt-6 text-center">{{ `Status: ${uploadMessage}` }}</div>
      </div>
      <ul class="max-w-1200 mx-auto flex items-center justify-between mt-16">
        <li v-for="item in subNav" :key="item.id" @click="currentNav === item.id" class="cursor-pointer text-xl" :class="{'active': currentNav === item.id}">{{ item.title }}</li>
      </ul>
      <component :is="getComponent()" :username="username" :password="password" />
    </div>
  </div>
</template>

<script>
import secrets from '~/assets/data/secrets.js'
import ListFiles from '~/components/ListFiles'
export default {
  data() {
    return {
      username: '',
      password: '',
      pathMessage: '',
      credsMessage: '',
      uploadFilePath: '',
      uploadMessage: '',
      color: '',
      subNav: [
        {
          id: 1,
          name: 'ListFiles',
          title: 'List Files'
        }
      ],
      currentNav: 1
    }
  },
  components: {
    ListFiles
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
    async uploadFile() {
      let response = await this.$axios.$post('/api/users/upload-file', {
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
    },
    getComponent() {
      let activeItem = this.subNav.find(it => it.id === this.currentNav)
      return activeItem.name
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

.active {
  border-bottom: 2px solid #0081da;
}
</style>