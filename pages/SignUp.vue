<template>
  <div>
    <div v-if="error" class="flex items-center error-box">
      <div class="text-center text-red-400">There was an error creating the user with username {{username}}, please contact system adminstrator for assistance</div>
    </div>
    <div v-else>
      <ValidationObserver  v-slot="{ invalid }">
        <form class="flex flex-col w-full">
          <validation-provider rules="required|alpha|min:3" v-slot="{ errors }">
            <div class="flex flex-col relative mt-8">
              <div class="flex items-center">
                <label class="mr-4 flex-basis-25">First Name:</label>
                <input class="flex-basis-75" v-model="firstName" type="text" name="firstName" placeholder="First Name" />
              </div>
              <span class="absolute text-red-700 text-xs pin-b mt-2 error-text">{{ errors[0] }}</span>
            </div>
          </validation-provider>
          <validation-provider rules="required" v-slot="{ errors }" class="mt-8">
            <div class="flex flex-col relative">
              <div class="flex items-center">
                <label class="mr-4 flex-basis-25">Last Name:</label>
                <input class="flex-basis-75" v-model="lastName" name="lastName" placeholder="Last Name" />
              </div>
              <span class="absolute text-red-700 text-xs pin-b mt-2 error-text">{{ errors[0] }}</span>
            </div>
          </validation-provider>
          <validation-provider rules="required" v-slot="{ errors }" class="mt-8">
            <div class="flex flex-col relative">
              <div class="flex items-center">
                <label class="mr-4 flex-basis-25">Email:</label>
                <input class="flex-basis-75" v-model="email" name="email" placeholder="Email" />
              </div>
              <span class="absolute text-red-700 text-xs pin-b mt-2 error-text">{{ errors[0] }}</span>
            </div>
          </validation-provider>
          <validation-provider rules="required" v-slot="{ errors }" class="mt-8">
            <div class="flex flex-col relative">
              <div class="flex items-center">
                <label class="mr-4 flex-basis-25">User Name:</label>
                <input class="flex-basis-75" v-model="username" name="username" placeholder="User Name" />
              </div>
              <span class="absolute text-red-700 text-xs pin-b mt-2 error-text">{{ errors[0] }}</span>
            </div>
          </validation-provider>
          <validation-provider rules="required" v-slot="{ errors }" class="mt-8">
            <div class="flex flex-col relative">
              <div class="flex items-center">
                <label class="mr-4 flex-basis-25">Password:</label>
                <input class="flex-basis-75" type="password" v-model="password" name="password" placeholder="Password" />
              </div>
              <span class="absolute text-red-700 text-xs pin-b mt-2 error-text">{{ errors[0] }}</span>
            </div>
          </validation-provider>
        </form>
        <div class="flex justify-center mt-16">
          <button class="text-center" @click="onSubmit" type="submit" :disabled="invalid || isLockedOut">Create Account</button>
        </div>
        <span v-if="isLockedOut" class="block text-red-700 pt-2 text-center">Your login attempts exceeded with wrong username/password</span>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate"
import { mapActions } from 'vuex'
export default {
  components: {
    ValidationObserver: ValidationObserver,
    ValidationProvider: ValidationProvider
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      counter: 0,
      isLockedOut: false,
      error: ''
    }
  },
  methods: {
    ...mapActions('user', ['setUserDetails']),
    async onSubmit() {
      let response = await this.$axios.$post('/api/users', {
        'username': this.username, 
        'password': this.password
      })
      if(response.statusCode === 200) {
        this.$router.push(`/home?username=${this.username}`)
      } else if (response.statusCode === 500) {
        this.error = 'There was an error in creating user'
      }
      let userInfo = {username: this.username, password: this.password}
      this.setUserDetails(userInfo)
      this.counter++

      if(this.counter >= 5) {
        this.isLockedOut = true
      }

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

.error-box {
  height: 425px;
}
</style>