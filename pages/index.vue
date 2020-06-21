<template>
  <div v-if="!isSignedIn" class="mt-16 modal-container p-16">
    <div class="flex justify-center">
      <span class="text-2xl font-normal mr-2 cursor-pointer" @click="currentSubTab = 'SignUp'" :class="{'tab-active': currentSubTab === 'SignUp'}">Sign Up</span>
      <span class="text-2xl font-normal">/</span>
      <span class="text-2xl font-normal ml-2 cursor-pointer" @click="currentSubTab = 'SignIn'" :class="{'tab-active': currentSubTab === 'SignIn'}">Sign In</span>
    </div>
    <sign-up v-if="currentSubTab === 'SignUp'" />
    <sign-in @signed-in="toggleSignIn" v-if="currentSubTab === 'SignIn'" />
  </div>
  <div v-else class="max-w-1200">
    <div class="text-center">{{ `You are currently in: /home/${username}` }}</div>
    <div class="text-center">List of files under your home:</div>
    <div class="text-center">{{ files }}</div>
    <div class="text-center font-bold text-2xl mt-8">Manage User permissions</div>
    <div class="flex mt-12 justify-around">
      <input class="input" type="text" name="directoryName" v-model="directoryName" placeholder="Path to Directory" />
      <input class="input" type="text" name="accessUser" v-model="accessUser" placeholder="User name" />
      <button class="manage-access mx-4" @click="userPermissions('user-d-r')">Read Access</button>
      <button class="manage-access mx-4" @click="userPermissions('user-d-r-w')">Read/Write Access</button>
      <button class="manage-access mx-4" @click="userPermissions('user-d-r-w-x')">Read/Write/execute</button>
    </div>
    <div class="flex mt-12 justify-around">
      <input class="input" type="text" name="fileName" v-model="fileName" placeholder="Path to File" />
      <input class="input" type="text" name="accessUser" v-model="accessUser" placeholder="User name" />
      <button class="manage-access mx-4" @click="userPermissions('user-f-r')">Read Access</button>
      <button class="manage-access mx-4" @click="userPermissions('user-f-r-w')">Read/Write Access</button>
      <button class="manage-access mx-4" @click="userPermissions('user-f-r-w-x')">Read/Write/execute</button>
    </div>
  </div>
</template>

<script>
import SignUp from '~/pages/SignUp'
import SignIn from '~/pages/SignIn'

export default {
  components: {
    SignUp,
    SignIn
  },
  data() {
    return {
      username: '',
      password: '',
      counter: 0,
      isLockedOut: false,
      currentSubTab: 'SignUp',
      isSignedIn: false,
      files: null,
      directoryName: '',
      accessUser: '',
      fileName: '',
      permissions: [
        {
          givenPermission: 'user-f-r',
          setPermission: 'r--',
          accessTo: 'file'
        },
        {
          givenPermission: 'user-f-r-w',
          setPermission: 'rw-',
          accessTo: 'file'
        },
        {
          givenPermission: 'user-f-r-w-x',
          setPermission: 'rwx',
          accessTo: 'file'
        },
        {
          givenPermission: 'user-d-r',
          setPermission: 'r--',
          accessTo: 'directory'
        },
        {
          givenPermission: 'user-d-r-w',
          setPermission: 'rw-',
          accessTo: 'directory'
        },
        {
          givenPermission: 'user-d-r-w-x',
          setPermission: 'rwx',
          accessTo: 'directory'
        },
      ]
    }
  },
  methods: {
    onSubmit() {
      this.counter++

      if(this.counter >= 5) {
        this.isLockedOut = true
      }

    },
    toggleSignIn(event) {
      this.isSignedIn = true
      this.username = event.username
      this.password = event.password
      this.loadFiles()
    },
    async loadFiles() {
      let response = await this.$axios.$get('/api/users/files', {
        headers: {
          username: this.username,
          password: this.password
        }
      })
      if(response.statusCode === 200) {
        this.files = response.response
      }
    },
    async createFolder() {
      if(!this.folderName) return
      let response = await this.$axios.$post('/api/users/create-directory', {
        username: this.username,
        password: this.password,
        folderName: this.folderName
      })
    }, 
    async userPermissions(userPermission) {
      let permissionObj = this.permissions.find(permission => permission.givenPermission === userPermission)
      let accessTo = permissionObj.accessTo
      let permission = permissionObj.setPermission

      if(accessTo === 'directory') {
        await this.$axios.$post('/api/users/change-permissions', {
          username: this.username,
          password: this.password,
          directoryName: this.directoryName,
          accessUser: this.accessUser,
          permission: permission
        })
      } else if (accessTo === 'file') {
        await this.$axios.$post('/api/users/change-permissions', {
          username: this.username,
          password: this.password,
          fileName: this.fileName,
          accessUser: this.accessUser,
          permission: permission
        })
      }
    }
  }  
}
</script>

<style lang="scss" scoped>
body {
  @apply font-mono;
}
.modal-container {
  width: 600px;
  box-shadow: 0 4px 8px 0 rgba(27,43,52,.12), 0 2px 4px 0 rgba(27,43,52,.08);
  height: 75vh;
  margin-left: auto;
  margin-right: auto;
}

input {
  border-bottom: 1px solid rgba(27,43,52,.12);
  max-width: 600px;
  padding: 4px 8px 4px;

  &:focus {
    outline: none;
    border: 1px solid #0081da;
  }
}

.log-in, .sign-up {
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

.error-text {
  top: 100%;
}

.tab-active {
  color: #0081da;
  border-bottom: 1px solid #0081da;
}

.max-w-1200 {
  max-width: 1200px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 24px;
  font-size: 24px;
}

.input {
  border: 1px solid #0081da;
  padding: 8px;
  font-size: 16px;
  margin-right: 16px;
}

.manage-access {
  font-size: 16px;
  padding: 8px 24px;
  align-self: center;
  background-color: #0081da;
  border-radius: 40px;
  color: white;

  &:hover {
    background-color: #002D5C;
  }
}
</style>