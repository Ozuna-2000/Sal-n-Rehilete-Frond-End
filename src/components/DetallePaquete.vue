<template>
  <div class="detalle-paquete">
    <h2>Imágenes del Paquete {{ paquete.nombre }}</h2>
    <div v-if="medios.length">
      <div v-for="(medio, index) in medios" :key="medio.id" class="image-item">
        <img :src="getImageUrl(medio)" alt="Imagen del paquete" />
        <!-- Botón de eliminar imagen -->
        <button @click="confirmDeleteImage(index)" class="delete-icon" aria-label="Eliminar imagen">
          <i class="fas fa-times"></i>
        </button>
      </div>
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
import { deleteImage } from '@/Apis/api'

const props = defineProps({
  paquete: {
    type: Object,
    required: true
  }
})

const medios = ref([])

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

const confirmDeleteImage = (index) => {
  const medio = medios.value[index] // Obtén el medio a eliminar
  if (window.confirm('¿Estás seguro de que quieres eliminar esta imagen?')) {
    deleteImage(props.paquete.id, medio.id).then((success) => {
      if (success) {
        medios.value.splice(index, 1)
      }
    })
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
  border-radius: 8px;
}

.image-item {
  position: relative;
}

.delete-icon {
  position: absolute;
  top: 5px;
  right: 5px;
  background: rgba(0, 0, 0, 0.7); /* Fondo oscuro para mejorar visibilidad */
  color: white;
  border: none;
  border-radius: 4px; /* Cuadrado con bordes redondeados */
  padding: 10px; /* Aumenta el tamaño del área clickeable */
  cursor: pointer;
  width: 35px; /* Tamaño cuadrado del botón */
  height: 35px; /* Tamaño cuadrado del botón */
  display: flex;
  justify-content: center;
  align-items: center;
}

.delete-icon:hover {
  background: rgba(255, 0, 0, 0.8); /* Rojo al pasar el cursor */
}

.delete-icon i {
  font-size: 22px; /* Aumenta el tamaño de la X */
}
</style>
