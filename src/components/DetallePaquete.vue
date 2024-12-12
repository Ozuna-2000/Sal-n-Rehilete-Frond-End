<template>
  <div class="detalle-paquete">
    <h2>Imágenes del Paquete {{ paquete.nombre }}</h2>

    <!-- Mostrar imágenes si existen -->
    <div v-if="medios.length">
      <div v-for="(medio, index) in medios" :key="medio.id" class="image-item">
        <img :src="getImageUrl(medio)" alt="Imagen del paquete" width="80" height="80" />

        <!-- Botón de eliminar imagen -->
        <button @click="confirmDeleteImage(index)" class="delete-icon" aria-label="Eliminar imagen">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>

    <!-- Mostrar mensaje si no hay imágenes, pero siempre mostrar la opción de subir imágenes -->
    <div v-else>
      <p>No hay imágenes disponibles para este paquete.</p>
    </div>

    <!-- Siempre mostrar el formulario para subir imágenes -->
    <label>
      Subir Imagen(es)
      <input type="file" @change="handleImageUpload" />
    </label>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
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
    // Convertir FileList a Array
    const archivosArray = Array.from(archivos)

    const token = store.getters.token
    const respuesta = await subirImagenPaquete(props.paquete.id, archivosArray, token)
    console.log('Imágenes subidas:', respuesta)
    cargarMedios() // Volver a cargar los medios después de subir las imágenes
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

// Cargar medios cuando el paquete cambie
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
