export const state = () => ({
  username: '',
  password: '',
  counter: 0
})

export const mutations = {
  setUsername(state, val) {
    state.username = val
  },
  setPassword(state, val) {
    state.password = val
  },
  setCounter(state, val) {
    state.counter = val
  }
}

export const actions = {
  setUserDetails({commit}, userInfo) {
    commit('setUsername', userInfo.username)
    commit('setPassword', userInfo.password) 
  },
  setCounter({commit}, val) {
    commit('setCounter', val)
  }
}