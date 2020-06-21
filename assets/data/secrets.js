let secrets = {
  username: '',
  password: ''
}

export default {
  get() {
    return secrets
  },
  set(val) {
    secrets = val
  }
}