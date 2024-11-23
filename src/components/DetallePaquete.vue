<template>
  <div class="detalle-paquete">
    <h2>Imágenes del Paquete {{ paquete.nombre }}</h2>
    <div v-if="medios.length">
      <img
        v-for="medio in medios"
        :key="medio.id"
        :src="getImageUrl(medio)"
        alt="Imagen del paquete"
      />
    </div>
    <div v-else>
      <p>No hay imágenes disponibles para este paquete.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { obtenerMediosPaquete } from '@/Apis/api'
import { useStore } from 'vuex'

// Recibimos el paquete como prop desde PaquetesItem
const props = defineProps({
  paquete: {
    type: Object,
    required: true
  }
})

const medios = ref([])

// Función para construir la URL de la imagen
const getImageUrl = (medio) => {
  const baseUrl = 'http://127.0.0.1:8000/api/paquetes' // Base de la URL para las imágenes
  return `${baseUrl}/${props.paquete.id}/medios/${medio.id}`
}

const cargarMedios = async () => {
  const idPaquete = props.paquete.id
  if (!idPaquete) {
    console.error('ID del paquete no disponible')
    return
  }

  try {
    const token = useStore().getters.token
    medios.value = await obtenerMediosPaquete(idPaquete, token)
    console.log('Medios cargados:', medios.value)
  } catch (error) {
    console.error('Error al cargar los medios:', error)
    if (error.response && error.response.data) {
      console.error('Respuesta de error:', error.response.data)
    } else {
      alert('No se pudieron cargar las imágenes del paquete.')
    }
  }
}

// Cargar medios cuando el paquete cambie
watch(() => props.paquete.id, cargarMedios)

onMounted(() => {
  cargarMedios()
})
</script>

<style scoped>
.detalle-paquete img {
  max-width: 100%;
  margin: 10px;
}
</style>
