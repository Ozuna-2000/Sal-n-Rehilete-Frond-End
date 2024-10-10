<template>
  <div class="detalle-paquete">
    <h2>Imágenes del Paquete {{ idPaquete }}</h2>
    <div v-if="medios.length">
      <img
        v-for="medio in medios"
        :key="medio.id"
        :src="`https://back.rehilete.mx/api/paquetes/${idPaquete}/medios/${medio.id}`"
        alt="Imagen del paquete"
      />
    </div>
    <div v-else>
      <p>No hay imágenes disponibles para este paquete.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { obtenerMediosPaquete } from '@/Apis/api' // Importa tu función para obtener los medios
import { useRoute } from 'vue-router'
import { useStore } from 'vuex' // Importa useStore para acceder al store

const store = useStore() // Llama a useStore para obtener el store
const route = useRoute()
const idPaquete = route.params.paqueteId // Obtén el ID del paquete de los parámetros de la ruta
const medios = ref([])

const cargarMedios = async () => {
  const token = store.getters.token // Asegúrate de obtener el token del store de Vuex
  console.log(`Cargando medios para el paquete con ID: ${idPaquete}`) // Mensaje antes de cargar los medios
  try {
    medios.value = await obtenerMediosPaquete(idPaquete, token) // Pasar el token a la función
    console.log('Medios cargados:', JSON.parse(JSON.stringify(medios.value))) // Mostrar los medios que se han cargado
  } catch (error) {
    console.error('Error al cargar los medios:', error) // Error de la API
    if (error.response && error.response.data) {
      console.error('Respuesta de error:', error.response.data) // Log de la respuesta de error
      alert(`Error: ${error.response.data.errors}`) // Alerta con el mensaje de error
    } else {
      alert('No se pudieron cargar las imágenes del paquete.') // Alerta para el usuario en caso de error
    }
  }
}

onMounted(() => {
  cargarMedios()
})
</script>

<style scoped>
.detalle-paquete img {
  max-width: 100%; /* Ajustar el tamaño de la imagen */
  margin: 10px; /* Espaciado entre imágenes */
}
</style>
