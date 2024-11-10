<template>
  <div class="main-container">
    <transition name="fade">
      <div class="welcome-message" v-if="isAuthenticated || currentMessage">
        <p>{{ currentMessage }}</p>
        <p v-if="isAuthenticated">Bienvenido, {{ userRole }}!</p>
        <p v-else>Por favor, inicia sesión para más funciones.</p>
      </div>
    </transition>

    <!-- Sección Conócenos -->
    <section class="conocenos" id="conocenos">
      <h2>Conócenos</h2>
      <p>Esta es la sección donde te contamos sobre nuestro salón de eventos</p>
    </section>

    <!-- Sección Contáctanos -->
    <section class="contactanos" id="contactanos">
      <h2>Contáctanos</h2>
      <p>
        Para contactarnos, puedes llamarnos al +52 123 456 7890 o enviarnos un correo a
        contacto@rehilete.mx.
      </p>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const currentMessage = ref('Bienvenidos a Salón de Eventos Rehilete')
const messages = [
  'Donde tus sueños se hacen realidad',
  'El mejor lugar para celebrar tus momentos',
  'Nos encargamos de que todo sea perfecto',
  'Salón de fiestas Rehilete, donde la magia sucede'
]

// Usar getters de Vuex
const isAuthenticated = computed(() => store.getters.isAuthenticated)
const userRole = computed(() => store.getters.userRole)

const startMessageRotation = () => {
  let index = 0
  setInterval(() => {
    index = (index + 1) % messages.length
    currentMessage.value = messages[index]
  }, 5000) // Cambia el mensaje cada 5 segundos
}

onMounted(() => {
  startMessageRotation()
})
</script>

<style scoped>
/* Asegúrate de que html y body ocupen el 100% de la altura */
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Asegura que el contenido esté centrado */
  background-image: url('@/imagenes/imagen-rehilete.jpg'); /* Ruta de la imagen */
  background-size: cover; /* Cubre todo el contenedor */
  background-position: center; /* Centra la imagen */
  padding: 20px; /* Espaciado interno */
  border-radius: 0; /* Bordes sin redondear para ocupar todo el espacio */
  box-shadow: none; /* Sin sombra para evitar efectos de elevación */
  width: 100vw; /* Ancho para ocupar todo el ancho de la ventana */
  height: 100vh; /* Altura para ocupar toda la altura de la ventana */
  color: white; /* Color del texto si deseas que sea blanco sobre fondo oscuro */
  position: absolute; /* Para asegurarte de que ocupe todo el espacio */
  top: 0; /* Ajusta la posición superior al 0 */
  left: 0; /* Ajusta la posición izquierda al 0 */
  overflow: hidden; /* Opcional: oculta cualquier desbordamiento del contenido */
}

.welcome-message {
  text-align: center;
  font-size: 30px;
  font-style: italic;
  margin-bottom: 20px; /* Espacio debajo del mensaje */
}

/* Estilos para secciones "Conócenos" y "Contáctanos" */
.conocenos,
.contactanos {
  background-color: rgba(255, 255, 255, 0.8); /* Fondo blanco semi-transparente */
  border-radius: 5px; /* Bordes redondeados */
  padding: 15px; /* Espaciado interno */
  margin: 10px 0; /* Espaciado vertical entre secciones */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra sutil */
  width: 80%; /* Ancho de la sección */
}

.conocenos h2,
.contactanos h2 {
  color: #4caf50; /* Color verde para los encabezados */
  margin-bottom: 10px; /* Espacio debajo de los encabezados */
}
</style>
