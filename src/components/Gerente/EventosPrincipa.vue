<template>
  <div>
    <h1>Eventos</h1>
    <div v-if="error" class="error">{{ error }}</div>
    <ul v-else>
      <li v-for="evento in eventos" :key="evento.id">
        <!-- Usamos el componente EventosItem para cada evento -->
        <EventosItem :evento="evento" />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { obtenerEventos } from '@/Apis/api'
import EventosItem from '../Usuarios/EventosItem.vue' // Importamos el componente EventosItem

const eventos = ref([]) // Almacena los eventos
const error = ref(null) // Almacena el error en caso de fallo

// Llamada a la API para obtener los eventos
const fetchEventos = async () => {
  try {
    const token = 'TU_BEARER_TOKEN_AQUÍ' // Reemplaza con el token válido
    const eventosData = await obtenerEventos(token) // Llama a la función para obtener eventos
    eventos.value = eventosData.map((evento) => ({
      ...evento,
      mostrarServicios: false // Añadimos un campo para mostrar u ocultar los servicios
    }))
  } catch (err) {
    error.value = 'No se pudieron cargar los eventos.'
    console.error(err)
  }
}

// Obtener los eventos cuando el componente se monta
onMounted(fetchEventos)
</script>

<style scoped>
.error {
  color: red;
  font-weight: bold;
}
</style>
