<template>
  <div id="app">
    <!-- Barra de navegación que estará disponible en todas las vistas -->
    <header class="navbar">
      <nav>
        <ul>
          <li><router-link to="/">Inicio</router-link></li>
          <li><router-link to="/paquetes">Paquetes</router-link></li>
          <li><router-link to="/servicios">Servicios</router-link></li>

          <!-- Mostrar solo si el usuario está autenticado -->
          <li v-if="isAuthenticated">
            <router-link to="/eventos">Eventos</router-link>
          </li>

          <li><a href="#conocenos">Conócenos</a></li>
          <li><a href="#contactanos">Contáctanos</a></li>

          <!-- Mostrar opciones de inicio de sesión y registro solo si el usuario no está autenticado -->
          <li v-if="!isAuthenticated"><router-link to="/login">Entrar</router-link></li>
          <li v-if="!isAuthenticated"><router-link to="/registrate">Regístrate</router-link></li>

          <!-- Mostrar solo si el usuario tiene el rol de "Gerente" -->
          <li v-if="isGerente">
            <router-link to="/ListaUsuarios">Usuarios</router-link>
          </li>

          <!-- Mostrar botón de cerrar sesión solo si el usuario está autenticado -->
          <li v-if="isAuthenticated"><button @click="logout">Cerrar Sesión</button></li>
        </ul>
      </nav>
    </header>

    <!-- Contenido principal -->
    <main>
      <router-view></router-view>
      <!-- Aquí se renderizarán los componentes según la ruta -->
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const isAuthenticated = computed(() => store.getters.isAuthenticated)
const userRole = computed(() => store.getters.userRole)
const isGerente = computed(() => userRole.value === 'Gerente')

// Función para cerrar sesión
const logout = () => {
  store.dispatch('logout')
  router.push('/') // Redirige a la página de inicio
}
</script>

<style scoped>
/* Estilos generales para la barra de navegación */
.navbar {
  background-color: #333;
  overflow: hidden;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

.navbar nav ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-around;
}

.navbar nav ul li {
  float: left;
}

.navbar nav ul li a,
.navbar nav ul li button {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

.navbar nav ul li a:hover,
.navbar nav ul li button:hover {
  background-color: #575757;
}

main {
  margin-top: 60px;
}
</style>
