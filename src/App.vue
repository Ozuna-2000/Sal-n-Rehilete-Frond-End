<template>
  <div class="main-container">
    <!-- Barra de navegación superior -->
    <header class="navbar">
      <nav>
        <ul>
          <li><router-link to="/">Inicio</router-link></li>
          <li><router-link to="/paquetes">Paquetes</router-link></li>
          <li><router-link to="/servicios">Servicios</router-link></li>
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
      <transition name="fade">
        <div class="welcome-message">
          <p>{{ currentMessage }}</p>
          <p v-if="isAuthenticated">Bienvenido, {{ userRole }}!</p>
          <p v-else>Por favor, inicia sesión para más funciones.</p>
        </div>
      </transition>

      <router-view></router-view>

      <!-- Sección Conócenos -->
      <section class="conocenos" id="conocenos" v-if="!hiddenRoutes.includes($route.path)">
        <h2>Conócenos</h2>
        <p>Esta es la sección donde te contamos sobre nuestro salón de eventos</p>
      </section>

      <!-- Sección Contáctanos -->
      <section class="contactanos" id="contactanos" v-if="!hiddenRoutes.includes($route.path)">
        <h2>Contáctanos</h2>
        <p>
          Para contactarnos, puedes llamarnos al +52 123 456 7890 o enviarnos un correo a
          contacto@rehilete.mx.
        </p>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const hiddenRoutes = ref([
  '/paquetes',
  '/registrate',
  '/login',
  '/VistaGerente/paquetes',
  '/VistaGerente/servicios'
])

const store = useStore()
const router = useRouter()

const isAuthenticated = computed(() => store.getters.isAuthenticated)
const userRole = computed(() => store.getters.userRole)
const isGerente = computed(() => userRole.value === 'Gerente')

// Mensajes de bienvenida
const currentMessage = ref('Bienvenidos a Salón de Eventos Rehilete')
const messages = [
  'Donde tus sueños se hacen realidad',
  'El mejor lugar para celebrar tus momentos',
  'Nos encargamos de que todo sea perfecto',
  'Salón de fiestas Rehilete, donde la magia sucede'
]

const startMessageRotation = () => {
  let index = 0
  setInterval(() => {
    index = (index + 1) % messages.length
    currentMessage.value = messages[index]
  }, 5000) // Cambia el mensaje cada 5 segundos
}

// Función para cerrar sesión
const logout = () => {
  store.dispatch('logout').then(() => {
    router.push('/') // Redirigir a la página de inicio
  })
}

onMounted(() => {
  startMessageRotation()
})
</script>

<style scoped>
/* Estilo para el contenedor principal */
* {
  box-sizing: border-box;
}

.main-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-image: url('@/imagenes/imagen-rehilete.jpg'); /* Cambia esta ruta por la de tu imagen */
  background-size: cover; /* Hace que la imagen cubra todo el fondo */
  background-position: center; /* Centra la imagen */
  background-attachment: fixed; /* Hace que la imagen sea estática al hacer scroll */
  overflow-x: hidden;
  position: fixed;
  top: 0;
  left: 0;
}

/* Estilo para la barra de navegación */
.navbar {
  height: 60px;
  background-color: rgba(51, 51, 51, 0.8); /* Color de fondo semitransparente */
  display: flex;
  align-items: center;
}

.navbar nav ul {
  display: flex;
  justify-content: space-around;
  list-style-type: none;
  padding: 0;
  margin: 0;
  width: 100%;
}

.navbar nav ul li {
  color: white;
  font-size: 18px;
  margin: 0 20px;
}

.navbar nav ul li a {
  color: white;
  text-decoration: none;
  transition:
    transform 0.3s ease,
    color 0.3s ease;
}

.navbar nav ul li a:hover {
  text-decoration: underline;
  transform: scale(1.1); /* Ampliar ligeramente al pasar el ratón */
  color: #ff69b4; /* Cambiar color a rosado */
}

/* Contenido principal */
main {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* Mensaje de bienvenida */
.welcome-message {
  text-align: center;
  font-size: 30px;
  font-style: italic;
  animation: fadeIn 2s ease-in-out;
  background-color: rgba(255, 255, 255, 0); /* Fondo blanco opaco */
  padding: 20px;
  border-radius: 10px;
}

/* Secciones de "Conócenos" y "Contáctanos" con animación en hover */
section {
  padding: 50px;
  text-align: center;
  background-color: rgba(255, 105, 180, 0.8); /* Fondo rosado semitransparente */
  border-radius: 10px;
  margin: 20px 0; /* Espaciado vertical entre secciones */
  width: 80%; /* Ancho del contenedor de las secciones */
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

section:hover {
  transform: scale(1.05); /* Aumenta el tamaño en hover */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3); /* Agrega sombra */
}

section h2 {
  font-size: 28px;
  margin-bottom: 10px;
}

section p {
  font-size: 20px;
}

/* Animación para el mensaje */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Animación de desvanecimiento para transiciones */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  /* .fade-leave-active en versiones anteriores de Vue */
  opacity: 0;
}
</style>
