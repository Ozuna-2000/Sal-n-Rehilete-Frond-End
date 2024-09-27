<template>
  <div class="main-container">
    <!-- Barra de navegación superior -->
    <header class="navbar">
      <nav>
        <ul>
          <li><router-link to="/servicios">Servicios</router-link></li>
          <li><router-link to="/paquetes">Paquetes</router-link></li>
          <li><router-link to="/login">Acceder</router-link></li>
        </ul>
      </nav>
    </header>

    <!-- Contenido principal -->
    <main>
      <div class="welcome-message">
        <p>{{ currentMessage }}</p>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  setup() {
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

    onMounted(() => {
      startMessageRotation()
    })

    return {
      currentMessage
    }
  }
}
</script>

<style scoped>
/* Estilo para el contenedor principal */
* {
  box-sizing: border-box; /* Incluir padding y border en el cálculo de ancho y alto */
}

.main-container {
  display: flex;
  flex-direction: column;
  height: 100vh; /* Ocupar toda la altura de la pantalla */
  width: 100vw; /* Ocupar toda la anchura de la pantalla */
  background-color: #007bff; /* Color de fondo azul */
  overflow-x: hidden; /* Evitar desplazamiento horizontal */
  position: fixed; /* Hacer el contenedor estático */
  top: 0; /* Alinear en la parte superior */
  left: 0; /* Alinear a la izquierda */
}
/* Estilo para la barra de navegación */
.navbar {
  height: 60px; /* Altura de la barra de navegación */
  background-color: #333; /* Color de fondo de la barra */
  display: flex;
  align-items: center; /* Centrar verticalmente el contenido */
}

/* Estilo para la lista de navegación */
.navbar nav ul {
  display: flex;
  justify-content: space-around;
  list-style-type: none;
  padding: 0; /* Eliminar padding */
  margin: 0; /* Eliminar margen */
  width: 100%; /* Ocupar todo el ancho */
}

.navbar nav ul li {
  color: white;
  font-size: 18px;
  margin: 0 20px; /* Espaciado horizontal entre los elementos */
}

.navbar nav ul li a {
  color: white;
  text-decoration: none;
}

.navbar nav ul li a:hover {
  text-decoration: underline;
}

/* Contenido principal */
main {
  flex: 1; /* Para ocupar el espacio restante */
  display: flex;
  justify-content: center;
  align-items: center; /* Centrar verticalmente */
}

/* Mensaje de bienvenida */
.welcome-message {
  text-align: center;
  font-size: 30px;
  font-style: italic;
  animation: fadeIn 2s ease-in-out; /* Añadir animación */
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
</style>
