<template>
  <div class="max-w-925 mx-auto mt-8">
    <div v-if="credsMessage" class="text-xl text-center">
      {{ credsMessage }}
    </div>
    <div v-else>
      <ul class="max-w-1200 mx-auto flex items-center justify-between mt-8">
        <li v-for="item in subNav" :key="item.id" @click="getComponent(item.id)" class="cursor-pointer text-xl" :class="{'active': currentNav === item.id}">{{ item.title }}</li>
      </ul>
      <component :is="currentComponent" :key="currentComponent" :username="username" :password="password" />
    </div>
  </div>
</template>

<script>
import secrets from '~/assets/data/secrets.js'
import ListFiles from '~/components/ListFiles'
import CatFiles from '~/components/CatFiles'
import DeleteFiles from '~/components/DeleteFiles'
import ReplaceFiles from '~/components/ReplaceFiles'
import UploadFiles from '~/components/UploadFiles'
import CreateFile from '~/components/CreateFile'
export default {
  data() {
    return {
      username: '',
      password: '',
      credsMessage: '',
      subNav: [
        {
          id: 1,
          name: 'ListFiles',
          title: 'List Files'
        },
        {
          id: 2,
          name: 'CatFiles',
          title: 'Cat File'
        },
        {
          id: 3,
          name: 'DeleteFiles',
          title: 'Delete Files'
        },
        {
          id: 4,
          name: 'ReplaceFiles',
          title: 'Replace Files'
        },
        {
          id: 5,
          name: 'UploadFiles',
          title: 'Upload Files'
        },
        {
          id: 6,
          name: 'CreateFile',
          title: 'Create Empty File'
        }
      ],
      currentNav: 1,
      currentComponent: 'ListFiles'
    }
  },
  components: {
    ListFiles,
    CatFiles,
    DeleteFiles,
    ReplaceFiles,
    UploadFiles,
    CreateFile
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
    getComponent(id) {
      this.currentNav = id
      let activeItem = this.subNav.find(it => it.id === this.currentNav)
      this.currentComponent = activeItem.name
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
  color: #0081da;
  font-weight: 600;
}
</style>