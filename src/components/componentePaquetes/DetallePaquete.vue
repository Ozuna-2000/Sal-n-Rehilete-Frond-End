<template>
  <div class="detalle-paquete">
    <h2>Imágenes del Paquete {{ paquete.nombre }}</h2>

    <!-- Mostrar imágenes en carrusel si existen -->
    <div v-if="medios.length" class="carousel">
      <div v-for="(medio, index) in medios" :key="medio.id" class="carousel-item">
        <img :src="getImageUrl(medio)" alt="Imagen del paquete" class="carousel-image" />

        <!-- Botón para eliminar imagen -->
        <button
          v-if="isGerente"
          @click="confirmDeleteImage(index)"
          class="delete-icon"
          aria-label="Eliminar imagen"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>

    <!-- Mostrar mensaje si no hay imágenes, pero siempre mostrar la opción de subir imágenes -->
    <div v-else>
      <p>No hay imágenes disponibles para este paquete.</p>
    </div>

    <!-- Siempre mostrar el formulario para subir imágenes -->
    <label v-if="isGerente">
      Subir Imagen(es)
      <input type="file" @change="handleImageUpload" />
    </label>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { obtenerMediosPaquete, subirImagenPaquete, deleteImage } from '@/Apis/api'

const props = defineProps({
  paquete: {
    type: Object,
    required: true
  }
})

const medios = ref([])

const store = useStore()
const isAuthenticated = computed(() => store.getters.isAuthenticated)
const userRole = computed(() => store.getters.userRole)
const isGerente = computed(() => userRole.value === 'Gerente')

// Obtener la URL de la imagen
const getImageUrl = (medio) => {
  const baseUrl = 'http://127.0.0.1:8000/api/paquetes'
  return `${baseUrl}/${props.paquete.id}/medios/${medio.id}`
}

// Cargar medios
const cargarMedios = async () => {
  const idPaquete = props.paquete.id
  if (!idPaquete) {
    console.error('ID del paquete no disponible')
    return
  }

  try {
    const token = store.getters.token
    medios.value = await obtenerMediosPaquete(idPaquete, token)
    console.log('Medios cargados:', medios.value)
  } catch (error) {
    console.error('Error al cargar los medios:', error)
  }
}

// Subir imagen(es)
const handleImageUpload = async (event) => {
  const archivos = event.target.files
  if (!archivos.length) {
    return
  }

  try {
    const archivosArray = Array.from(archivos)
    const token = store.getters.token
    const respuesta = await subirImagenPaquete(props.paquete.id, archivosArray, token)
    console.log('Imágenes subidas:', respuesta)
    cargarMedios()
  } catch (error) {
    console.error('Error al subir las imágenes:', error)
  }
}

// Confirmar eliminación de una imagen
const confirmDeleteImage = (index) => {
  const medio = medios.value[index]
  if (window.confirm('¿Estás seguro de que quieres eliminar esta imagen?')) {
    deleteImage(props.paquete.id, medio.id).then((success) => {
      if (success) {
        medios.value.splice(index, 1)
      }
    })
  }
}

onMounted(() => {
  cargarMedios()
})
</script>

<style scoped>
.detalle-paquete img {
  max-width: 100%;
  border-radius: 8px;
}

.carousel {
  display: flex;
  overflow-x: auto;
  gap: 15px;
}

.carousel-item {
  position: relative;
  flex-shrink: 0;
}

.carousel-image {
  width: 500px;
  height: 500px;
  object-fit: cover;
  border-radius: 8px;
}

.delete-icon {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(255, 0, 0, 0.8);
  color: white;
  border: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 10;
}

.delete-icon:hover {
  background: rgba(255, 0, 0, 1);
}

.delete-icon i {
  font-size: 16px;
}
</style>
