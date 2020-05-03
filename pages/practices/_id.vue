<template>
  <div class="max-w-1200 mx-auto mt-20">
    <h1 class="font-bold font-mono text-3xl">{{ `Practice ${practiceId}: Decipher the cipher` }}</h1>
    <h2 class="font-bold font-mono text-xl mt-4">Steps to solve: </h2>
    <ul class>
      <li>Scan through the cipher, looking for single-letter words.</li>
      <li>Count how many times each symbol appears in the puzzle.</li>
      <li>Pencil in your guesses over the ciphertext. Look for apostrophes.</li>
      <li>Look for repeating letter patterns.</li>
      <li>Try to decipher two-, three-, and four-letter words.</li>
      <li>Scan for double letters.</li>
    </ul>
    <div class="flex items-center mt-12">
      <div class="cipher-text-container p-8">
        <h3 class="mb-4 text-xl font-bold font-mono">Solve the cipher below</h3>
        <span class="cipher-text block p-4 font-mono">{{ encryptedText }}</span>
      </div>
      <div class="flex flex-col justify-center text-center">
        <input v-model="shift" placeholder="Enter Shift" class="input-shift block px-2" />
        <button class="enter-button bg-blue-700 text-white hover:bg-blue-900 mt-4" @click="checkAnswer()">Enter</button>
        <span v-if="message" class="mt-4" :class="wrongShift ? 'text-red-500' : 'text-blue-600'">{{ message }} </span>
      </div>
      <div class="cipher-text-container p-8">
        <h3 class="mb-4 text-xl font-bold font-mono">Check your answer here</h3>
        <div class="cipher-text block p-4 font-mono">
          <span v-if="isRight" class="p-4 font-mono">{{ decryptedText }}</span> 
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import practicesList from '../../data/practicesList.js'
const { Cipher } = require("js-cipher");
export default {
  data() {
    return {
      currentPractice: null,
      encryptedText: 'Pm ol ohk hufaopun jvumpkluaphs av zhf, ol dyval pa pu jpwoly, aoha pz, if zv johunpun aol vykly vm aol slaalyz vm aol hswohila, aoha uva h dvyk jvbsk il thkl vba.',
      decryptedText: '',
      shift: 0,
      showMessage: null,
      message: '',
      isRight: null,
      wrongShift: false
    }
  },
  created() {
    const practiceId = this.$route.params.id
    this.currentPractice = practicesList.find(practice => { return practice.id === practiceId })

    const cipher = new Cipher()

    this.decryptedText = cipher.decrypt(this.encryptedText, 7)
  },
  methods: {
    checkAnswer() {
      const cipher = new Cipher()
      if(isNaN(parseInt(this.shift))) {
        this.showMessage = true
        this.message = 'Please enter number between 1 and 26'
        return 
      }
      const numberShift = parseInt(this.shift)
      const usersAnswer = cipher.decrypt(this.encryptedText, numberShift)
      this.showMessage = usersAnswer === this.decryptedText
      this.isRight = usersAnswer === this.decryptedText
      this.wrongShift = !this.showMessage

      if(this.wrongShift) {
        this.message = 'Wrong. Please try again.'
      } else {
        this.message = 'Right answer. Well done'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.max-w-1200 {
  max-width: 1200px;
}

.cipher-text {
  border: solid 1px black;
  width: 420px;
  height: 220px;
}

.input-shift {
  border: 1px solid black;
  outline: none;
  height: 40px;
  width: 200px;
}

.enter-button {
  height: 40px;
  width: 200px;
  transition: all 0.3s ease;
}
</style>