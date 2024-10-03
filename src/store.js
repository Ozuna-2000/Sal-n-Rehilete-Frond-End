import { createStore } from 'vuex'

export default createStore({
  state: {
    token: localStorage.getItem('token') || null, // Cargar el token desde localStorage
    role: localStorage.getItem('role') || null // Cargar el rol desde localStorage
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setRole(state, role) {
      state.role = role
    },
    clearAuth(state) {
      state.token = null
      state.role = null
    }
  },
  actions: {
    login({ commit }, { token, role }) {
      commit('setToken', token)
      commit('setRole', role)
      localStorage.setItem('token', token) // Guardar el token en localStorage
      localStorage.setItem('role', role) // Guardar el rol en localStorage
    },
    logout({ commit }) {
      commit('clearAuth')
      localStorage.removeItem('token')
      localStorage.removeItem('role')
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    userRole: (state) => state.role,
    isGerente: (state) => state.role === 'Gerente' // Computar si el usuario es gerente
  }
})
