<template>
  <div class="servicios-container">
    <!-- Barra superior -->
    <div class="navbar">
      <h1>Servicios Disponibles</h1>
      <button v-if="isGerente" @click="redirigirAGrabarServicio">Agregar Servicio</button>
    </div>

    <div v-if="servicios.length">
      <Serviciositem v-for="servicio in servicios" :key="servicio.id" :servicio="servicio" />
    </div>
    <div v-else>
      <p>No hay servicios disponibles.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue' // Asegúrate de importar computed
import { useStore } from 'vuex' // Importamos useStore para acceder a Vuex
import { mostrarServicios } from '@/Apis/api' // Importamos la API para mostrar los servicios
import Serviciositem from '@/components/serviciositem.vue' // Importamos el componente de servicios
import { useRouter } from 'vue-router' // Importamos useRouter

// Usamos el store de Vuex
const store = useStore()
// Referencia para almacenar la lista de servicios
const servicios = ref([])
// Router para redirigir
const router = useRouter()

// Computed para verificar si el usuario es gerente
const isGerente = computed(() => {
  const role = store.getters.userRole
  console.log('Es gerente:', role === 'Gerente') // Agregamos un console.log para verificar
  return role === 'Gerente'
})

// Función para cargar los servicios desde la API
const cargarServicios = async () => {
  try {
    const data = await mostrarServicios()
    servicios.value = data
  } catch (error) {
    console.error('Error al cargar los servicios:', error) // Mejor manejo de errores
  }
}

// Función para redirigir a la página de agregar servicio
const redirigirAGrabarServicio = () => {
  router.push('/agregarservicio') // Redirigir a la página de agregar servicio
}

// Ejecutamos cargarServicios cuando se monte el componente
onMounted(() => {
  cargarServicios()
})
</script>

<style scoped>
/* Estilos para la barra superior */
.navbar {
  background-color: #2c3e50; /* Color de fondo más atractivo */
  color: white;
  padding: 20px 30px; /* Mejora el espaciado */
  text-align: left; /* Alinear texto a la izquierda */
  font-size: 24px; /* Tamaño de fuente más manejable */
  font-weight: bold; /* Mantener el texto en negrita */
  margin-bottom: 30px; /* Espaciado inferior */
  border-radius: 5px; /* Bordes redondeados */
}

/* Estilo para el botón en la barra de navegación */
.navbar button {
  margin-top: 10px;
  padding: 10px 15px;
  font-size: 16px; /* Tamaño de fuente más pequeño */
  color: white;
  background-color: #3498db; /* Color de fondo atractivo */
  border: none; /* Sin borde */
  border-radius: 5px; /* Bordes redondeados */
  cursor: pointer;
  transition: background-color 0.3s; /* Transición suave */
}

/* Estilo del botón al pasar el mouse */
.navbar button:hover {
  background-color: #2980b9; /* Color más oscuro al pasar el mouse */
}

/* Contenedor de servicios */
.servicios-container {
  padding: 20px;
  text-align: center;
  width: 600%; /* Ajusta el ancho según sea necesario */

  max-width: 1200px; /* Limitar el ancho máximo */
  margin: 0 auto; /* Centrar el contenedor */
  background-color: #ecf0f1; /* Color de fondo suave */
  border-radius: 10px; /* Bordes redondeados */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Sombra sutil */
}

/* Estilo para cada servicio */
.servicio-item {
  background-color: white; /* Fondo blanco para los elementos de servicio */
  border: 1px solid #bdc3c7; /* Borde sutil */
  border-radius: 10px; /* Bordes redondeados */
  padding: 15px;
  margin-bottom: 20px; /* Espacio entre los servicios */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Sombra */
  transition: transform 0.2s; /* Efecto de transición */
}

.servicio-item:hover {
  transform: translateY(-5px); /* Levanta el elemento al pasar el mouse */
}

/* Títulos */
h1 {
  font-size: 28px;
  margin-bottom: 20px;
  color: #565e34; /* Color de texto atractivo */
}

/* Estilo para los botones en general */
button {
  margin-bottom: 20px;
  padding: 10px 15px;
  background-color: #2ecc71; /* Color de fondo verde */
  border: none; /* Sin borde */
  border-radius: 5px; /* Bordes redondeados */
  color: white; /* Color del texto */
  transition: background-color 0.3s; /* Transición suave */
}

button:hover {
  background-color: #27ae60; /* Color más oscuro al pasar el mouse */
}
</style>
