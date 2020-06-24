<template>
  <div>
    <div class="text-xl text-center">
      <div class="mt-16">
        <h1 class="text-xl font-bold">Provide localhost path for the file to upload to the folder in ubuntu server</h1>
        <input placeholder="provide path for file to upload to with SFTP" v-model="uploadFilePath" class="mt-8" />
        <button class="ml-8 mt-8" :disabled="uploadFilePath === ''" @click="uploadFile">Upload</button>
      </div>
    </div>
    <div v-if="uploadMessage" :style="{'color': color}" class="text-xl mt-6 text-center">{{ `Status: ${uploadMessage}` }}</div>
  </div>
</template>

<script>
  export default {
    name: 'UploadFiles',
    data() {
      return {
        pathMessage: '',
        uploadFilePath: '',
        uploadMessage: '',
        color: ''
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
  width: 70%;
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