<template>
  <div>
    <ValidationObserver v-slot="{ invalid }">
      <form class="flex flex-col w-full">
        <validation-provider rules="required" v-slot="{ errors }">
          <div class="flex flex-col relative mt-8">
            <div class="flex items-center">
              <label class="mr-4 flex-basis-25">User Name:</label>
              <input class="flex-basis-75" v-model="username" type="text" name="username" placeholder="User Name" @change="hideMessage" />
            </div>
            <span class="absolute text-red-700 text-xs pin-b mt-2 error-text">{{ errors[0] }}</span>
          </div>
        </validation-provider>
        <validation-provider rules="required" v-slot="{ errors }" class="mt-8">
          <div class="flex flex-col relative">
            <div class="flex items-center">
              <label class="mr-4 flex-basis-25">Password:</label>
              <input class="flex-basis-75" v-model="password" type="password" name="password" placeholder="Password" @change="hideMessage" />
            </div>
            <span class="absolute text-red-700 text-xs pin-b mt-2 error-text">{{ errors[0] }}</span>
          </div>
        </validation-provider>
      </form>
      <div class="flex justify-center mt-16">
        <button class="text-center" @click="onSubmit" type="submit" :disabled="invalid || isLockedOut">Log in</button>
      </div>
      <span v-if="showMessage" class="block text-red-700 pt-2 text-center mt-4">{{ message }}</span>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { mapActions, mapState } from 'vuex'
export default {
  components: {
    ValidationObserver: ValidationObserver,
    ValidationProvider: ValidationProvider
  },
  data() {
    return {
      username: '',
      password: '',
      isLockedOut: false,
      localCounter: 0,
      message: '',
      showMessage: false,
    }
  },
  computed: {
    ...mapState('user', ['counter'])
  },
  methods: {
    ...mapActions('user', ['setCounter']),
    async onSubmit() {
      let response = await this.$axios.$post('/api/users/authenticate', {
        username: this.username,
        password: this.password
      })
      if(response.statusCode !== 200) {
        this.showMessage = true
        this.message = 'Authentication Failed'
        this.localCounter++
        this.setCounter(this.localCounter)
        if(this.counter == 5) {
          this.isLockedOut = true
          this.message = 'You have exceeded maximum number of invalid login attempts'
        }
      } else if (response.statusCode === 200) {
        this.$emit('signed-in', {username: this.username, password: this.password})
      }
    },
    hideMessage() {
      this.showMessage = false
    }
  }  
}
</script>

<style lang="scss" scoped>
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

.flex-basis-25 {
  flex-basis: 25%;
}

.flex-basis-75 {
  flex-basis: 75%;
}
</style>