<template>
  <div v-if="paquete" class="paquete-item">
    <h2>{{ paquete.nombre }}</h2>
    <p>{{ paquete.descripcion }}</p>
    <p>Precio: {{ paquete.precio }} MXN</p>

    <button @click="mostrarServicios = !mostrarServicios">
      {{ mostrarServicios ? 'Ocultar Servicios' : 'Ver Servicios' }}
    </button>

    <!-- Mostrar servicios del paquete -->
    <div v-if="mostrarServicios" class="servicios-list">
      <ul v-if="paquete.servicios && paquete.servicios.length">
        <li v-for="servicio in paquete.servicios" :key="servicio.id">
          <strong>{{ servicio.nombre }}</strong
          >: {{ servicio.descripcion }} - ${{ servicio.precio }} MXN
        </li>
      </ul>
      <p v-else>No hay servicios disponibles en este paquete.</p>
    </div>
  </div>
  <p v-else>Cargando paquete...</p>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { obtenerPaquetePorId } from '@/Apis/api' // Ajusta la ruta de acuerdo a tu estructura de archivos

const route = useRoute()
const paqueteId = route.params.paqueteId
const mostrarServicios = ref(false)

// Definición de props
const props = defineProps({
  paquete: {
    type: Object,
    default: null // Cambiamos a null si el paquete no se pasa como prop
  }
})

const paquete = ref(props.paquete) // Inicializar paquete con el valor de props

// Cargar el paquete desde la API solo si no se pasa como prop
const cargarPaquete = async () => {
  try {
    paquete.value = await obtenerPaquetePorId(paqueteId)
  } catch (error) {
    console.error('Error al cargar el paquete:', error)
  }
}

// Ejecutar la carga del paquete cuando el componente se monta
onMounted(() => {
  if (!props.paquete) {
    cargarPaquete()
  }
})
</script>

<style scoped>
.paquete-item {
  border: 1px solid #595b15;
  padding: 20px;
  margin-bottom: 15px;
  border-radius: 50px;
  text-align: left;
}

.servicios-list {
  margin-top: 10px;
  padding: 10px;
  border-top: 1px solid #bdc3c7;
}

h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

p {
  font-size: 16px;
}

button {
  padding: 10px 20px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9;
}
</style>
