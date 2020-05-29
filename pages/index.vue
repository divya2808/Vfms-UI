<template>
  <div class="mt-16 modal-container p-16">
    <div class="flex justify-center">
      <span class="text-2xl font-normal mr-2 cursor-pointer" @click="currentTab = 'SignUp'" :class="{'tab-active': currentTab === 'SignUp'}">Sign Up</span>
      <span class="text-2xl font-normal">/</span>
      <span class="text-2xl font-normal ml-2 cursor-pointer" @click="currentTab = 'SignIn'" :class="{'tab-active': currentTab === 'SignIn'}">Sign In</span>
    </div>
    <sign-up v-if="currentTab === 'SignUp'" />
    <sign-in v-if="currentTab === 'SignIn'" />
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
      currentTab: 'SignUp'
    }
  },
  methods: {
    onSubmit() {
      this.counter++

      if(this.counter >= 5) {
        this.isLockedOut = true
      }

    }
  }  
}
</script>

<style lang="scss">
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

.error-text {
  top: 100%;
}

.tab-active {
  color: #0081da;
  border-bottom: 1px solid #0081da;
}
</style>