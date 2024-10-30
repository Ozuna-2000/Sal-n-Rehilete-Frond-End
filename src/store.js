import { createStore } from 'vuex'
import { cerrarSesion } from './Apis/api'

export default createStore({
  state: {
    token: localStorage.getItem('token') || null,
    role: localStorage.getItem('role') || null
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
    async login({ commit }, { token, role }) {
      commit('setToken', token)
      commit('setRole', role)
      localStorage.setItem('token', token)
      localStorage.setItem('role', role)
    },
    async logout({ commit }) {
      const token = localStorage.getItem('token')
      try {
        await cerrarSesion(token)
        commit('clearAuth')
        localStorage.removeItem('token')
        localStorage.removeItem('role')
      } catch (error) {
        console.error('Error al cerrar sesión:', error)
      }
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    userRole: (state) => state.role,
    isGerente: (state) => state.role === 'Gerente'
  }
})
