<template>
  <div v-if="paquete" class="paquete-item">
    <h2>{{ paquete.nombre }}</h2>
    <p>{{ paquete.descripcion }}</p>
    <p>Precio: {{ paquete.precio }} MXN</p>

    <!-- Botón para mostrar/ocultar servicios -->
    <button @click="mostrarServicios = !mostrarServicios">
      {{ mostrarServicios ? 'Ocultar Servicios' : 'Ver Servicios' }}
    </button>

    <!-- Mostrar servicios del paquete -->
    <div v-if="mostrarServicios" class="servicios-list">
      <ul v-if="paquete.servicios && paquete.servicios.length">
        <li v-for="servicio in paquete.servicios" :key="servicio.id">
          <strong>{{ servicio.nombre }}</strong> : {{ servicio.descripcion }} - ${{
            servicio.precio
          }}
          MXN
        </li>
      </ul>
      <p v-else>No hay servicios disponibles en este paquete.</p>
    </div>

    <!-- Botón para ver/ocultar medios (DetallePaquete) -->
    <button @click="mostrarMedios = !mostrarMedios">
      {{ mostrarMedios ? 'Ocultar Medios' : 'Ver Medios' }}
    </button>

    <!-- Mostrar el componente DetallePaquete solo si mostrarMedios es verdadero -->
    <DetallePaquete v-if="mostrarMedios" :paquete="paquete" />
  </div>
  <p v-else>Cargando paquete...</p>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex' // Importamos el store
import { obtenerPaquetePorId } from '@/Apis/api'
import DetallePaquete from '@/components/DetallePaquete.vue' // Importar el componente DetallePaquete

const props = defineProps({
  paquete: {
    type: Object,
    default: null
  }
})

const paquete = ref(props.paquete) // Inicializar con la prop del paquete
const mostrarServicios = ref(false) // Mostrar/ocultar servicios
const mostrarMedios = ref(false) // Mostrar/ocultar medios (DetallePaquete)

const route = useRoute()
const paqueteId = route.params.paqueteId

// Si el paquete no se pasa como prop, cargarlo desde la API
const cargarPaquete = async () => {
  try {
    if (paqueteId) {
      console.log(`Cargando paquete con ID: ${paqueteId}`)
      paquete.value = await obtenerPaquetePorId(paqueteId)
    } else {
      console.error('ID del paquete no disponible en la ruta')
    }
  } catch (error) {
    console.error('Error al cargar el paquete:', error)
  }
}

// Cargar datos al montar el componente
onMounted(() => {
  if (!props.paquete) {
    cargarPaquete() // Cargar desde la API solo si no se pasa el paquete como prop
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

.imagenes-list {
  margin-top: 20px;
}

.imagenes {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.imagenes img {
  max-width: 100px;
  max-height: 100px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

.btn-ver-medios {
  margin-top: 15px;
  padding: 10px 15px;
  background-color: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  display: inline-block;
  text-align: center;
}

.btn-ver-medios:hover {
  background-color: #2980b9;
}
</style>
