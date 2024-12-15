<template>
  <div id="app">
    <!-- Barra de navegación que estará disponible en todas las vistas -->
    <header class="navbar">
      <nav>
        <ul>
          <li><router-link to="/">Inicio</router-link></li>
          <li><router-link to="/paquetes">Paquetes</router-link></li>
          <li><router-link to="/servicios">Servicios</router-link></li>
          <li><router-link to="/eventos">Eventos</router-link></li>
          <li><a href="#conocenos">Conócenos</a></li>
          <li><a href="#contactanos">Contáctanos</a></li>
          <li v-if="!isAuthenticated"><router-link to="/login">Entrar</router-link></li>
          <li v-if="!isAuthenticated"><router-link to="/registrate">Regístrate</router-link></li>
          <li v-if="isAuthenticated"><button @click="logout">Cerrar Sesión</button></li>
          <li v-if="isGerente">
            <router-link to="/VistaGerente">Panel de control</router-link>
          </li>
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
import { useRouter } from 'vue-router' // Importa el router

const store = useStore()
const router = useRouter() // Crea una instancia del router

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
  background-color: #333; /* Color de fondo de la barra */
  overflow: hidden; /* Evita que el contenido se desborde */
  width: 100%; /* Ocupa el ancho completo de la pantalla */
  position: fixed; /* Fija la barra en la parte superior */
  top: 0; /* Se alinea al borde superior */
  left: 0; /* Se alinea al borde izquierdo */
  z-index: 1000; /* Asegura que esté por encima de otros elementos */
}

.navbar nav ul {
  list-style-type: none; /* Elimina los puntos de la lista */
  margin: 0; /* Elimina el margen por defecto */
  padding: 0; /* Elimina el padding por defecto */
  display: flex; /* Muestra los elementos de la lista en línea */
  justify-content: space-around; /* Espaciado uniforme entre elementos */
}

.navbar nav ul li {
  float: left; /* Alinea los elementos a la izquierda */
}

.navbar nav ul li a,
.navbar nav ul li button {
  display: block; /* Hace que el enlace sea un bloque */
  color: white; /* Color del texto */
  text-align: center; /* Centra el texto dentro del enlace */
  padding: 14px 16px; /* Espaciado dentro del enlace */
  text-decoration: none; /* Elimina el subrayado del enlace */
}

.navbar nav ul li a:hover,
.navbar nav ul li button:hover {
  background-color: #575757; /* Color de fondo al pasar el mouse */
}

/* Agrega un margen superior al contenido principal para que no quede oculto detrás de la barra */
main {
  margin-top: 60px; /* Ajusta este valor según la altura de tu barra de navegación */
}
</style>
