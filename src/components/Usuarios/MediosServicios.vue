<template>
  <div class="detalle-servicio">
    <h2>Imágenes del Servicio {{ servicio.nombre }}</h2>

    <!-- Carrusel de imágenes -->
    <div v-if="medios.length" class="carousel-container">
      <div class="carousel">
        <div
          v-for="(medio, index) in medios"
          :key="medio.id"
          class="image-item"
          :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
        >
          <img :src="getImageUrl(medio)" alt="Imagen del servicio" class="carousel-image" />
          <!-- Botón de eliminar imagen, solo visible para el gerente -->
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

      <!-- Botones para navegar por el carrusel -->
      <button v-if="medios.length > 1" @click="previousImage" class="carousel-button prev-button">
        &lt;
      </button>
      <button v-if="medios.length > 1" @click="nextImage" class="carousel-button next-button">
        &gt;
      </button>
    </div>

    <!-- Mensaje si no hay imágenes -->
    <div v-else>
      <p>No hay imágenes disponibles para este servicio.</p>
    </div>

    <!-- Formulario para subir imágenes, solo visible para el gerente -->
    <div v-if="isGerente">
      <label>Subir Imagen(es)</label>
      <input type="file" @change="handleImageUpload" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { obtenerMedioServicio, subirImagenServicio, deleteImageServicio } from '@/Apis/api'

const props = defineProps({
  servicio: {
    type: Object,
    required: true
  }
})

const store = useStore()
const isAuthenticated = computed(() => store.getters.isAuthenticated)
const userRole = computed(() => store.getters.userRole)
const isGerente = computed(() => userRole.value === 'Gerente')

const medios = ref([])
const currentIndex = ref(0)

// Obtener la URL de la imagen
const getImageUrl = (medio) => {
  return `http://127.0.0.1:8000/api/servicios/${props.servicio.id}/medios/${medio.id}`
}

// Cargar los medios
const cargarMedios = async () => {
  const idServicio = props.servicio.id
  if (!idServicio) {
    console.error('ID del servicio no disponible')
    return
  }

  try {
    const token = store.getters.token
    medios.value = await obtenerMedioServicio(idServicio, token)
  } catch (error) {
    console.error('Error al cargar los medios:', error)
  }
}

// Subir imágenes
const handleImageUpload = async (event) => {
  const archivos = event.target.files
  if (!archivos.length) return

  try {
    const archivosArray = Array.from(archivos)
    const token = store.getters.token
    await subirImagenServicio(props.servicio.id, archivosArray, token)
    cargarMedios() // Recargar los medios después de subir las imágenes
  } catch (error) {
    console.error('Error al subir las imágenes:', error)
  }
}

// Eliminar imagen
const confirmDeleteImage = (index) => {
  const medio = medios.value[index]
  if (window.confirm('¿Estás seguro de que quieres eliminar esta imagen?')) {
    deleteImageServicio(props.servicio.id, medio.id).then((success) => {
      if (success) {
        medios.value.splice(index, 1)
      }
    })
  }
}

// Cambiar a la imagen anterior
const previousImage = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  } else {
    currentIndex.value = medios.value.length - 1
  }
}

// Cambiar a la siguiente imagen
const nextImage = () => {
  if (currentIndex.value < medios.value.length - 1) {
    currentIndex.value++
  } else {
    currentIndex.value = 0
  }
}

// Cargar medios al montar el componente
onMounted(() => {
  cargarMedios()
})
</script>

<style scoped>
.detalle-servicio {
  position: relative;
}

.carousel-container {
  position: relative;
  overflow: hidden;
  width: 100%;
}

.carousel {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.image-item {
  min-width: 100%;
  box-sizing: border-box;
  position: relative;
}

.carousel-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.delete-icon {
  position: absolute;
  top: 5px;
  right: 5px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px;
  cursor: pointer;
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.delete-icon:hover {
  background: rgba(255, 0, 0, 0.8);
}

.delete-icon i {
  font-size: 22px;
}

.carousel-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
}

.prev-button {
  left: 10px;
}

.next-button {
  right: 10px;
}

.carousel-button:hover {
  background: rgba(0, 0, 0, 0.7);
}
</style>
