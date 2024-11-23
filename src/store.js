import { createStore } from 'vuex'
import { cerrarSesion } from './Apis/api'

export default createStore({
  state: {
    // Inicializar el estado con los valores de localStorage
    token: localStorage.getItem('token') || null,
    role: localStorage.getItem('role') || null
  },
  mutations: {
    // Mutación para establecer el token
    setToken(state, token) {
      state.token = token
    },
    // Mutación para establecer el rol
    setRole(state, role) {
      state.role = role
    },
    // Mutación para limpiar la autenticación
    clearAuth(state) {
      state.token = null
      state.role = null
    }
  },
  actions: {
    // Acción para realizar el login
    async login({ commit }, { token, role }) {
      commit('setToken', token)
      commit('setRole', role)

      // Guardar token y rol en localStorage
      localStorage.setItem('token', token)
      localStorage.setItem('role', role)

      console.log('Rol guardado en localStorage:', role) // Verifica que se guarde correctamente
    },
    // Acción para realizar el logout
    async logout({ commit }) {
      const token = localStorage.getItem('token')
      try {
        // Llamada a la API para cerrar sesión (asegúrate de que `cerrarSesion` funcione correctamente)
        await cerrarSesion(token)

        // Limpiar el estado y el localStorage
        commit('clearAuth')
        localStorage.removeItem('token')
        localStorage.removeItem('role')
      } catch (error) {
        console.error('Error al cerrar sesión:', error)
      }
    }
  },
  getters: {
    // Verificar si el usuario está autenticado
    isAuthenticated: (state) => !!state.token,

    // Obtener el rol del usuario
    userRole: (state) => state.role,

    // Verificar si el rol es 'Gerente'
    isGerente: (state) => state.role === 'Gerente',

    // Obtener el token
    token: (state) => state.token
  }
})
