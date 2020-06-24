<template>
  <div>
    <div class="text-xl text-center">
      <div class="mt-16">
        <div class="flex items-center">
          <h1 class="text-xl inline-block text-left mr-8">Provide localhost path for the file to upload to the folder in ubuntu server</h1>
          <input placeholder="filename with extension on ubuntu" v-model="fileName" />
        </div>
        <div class="flex items-center mt-8">
          <h1 class="text-xl inline-block text-left mr-8">Provide localhost path for the file to upload to the folder in ubuntu server</h1>
          <input placeholder="provide path for file to upload to with SFTP" v-model="uploadFilePath" class="mt-8" />
        </div>
        <button class="ml-8 mt-8" :disabled="uploadFilePath === '' || fileName === ''" @click="replaceFile">Replace</button>
      </div>
    </div>
    <div v-if="replaceMessage" :style="{'color': color}" class="text-xl mt-6 text-center">{{ `Status: ${replaceMessage}` }}</div>
  </div>
</template>

<script>
  export default {
    name: 'ReplaceFiles',
    data() {
      return {
        fileName: '',
        uploadFilePath: '',
        replaceMessage: ''
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
      async replaceFile() {
        let response = await this.$axios.$post('/api/replace-file', {
          username: this.username,
          password: this.password,
          file: this.fileName,
          uploadFilePath: this.uploadFilePath
        }) 
        
        if(response.statusCode === 200) {
          this.replaceMessage = response.message
          this.color = '#0081da'
        } else {
          this.replaceMessage = response.message
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