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
import { obtenerMediosPaquete } from '@/Apis/api'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const route = useRoute()
const idPaquete = route.params.paqueteId
const medios = ref([])

const cargarMedios = async () => {
  const token = store.getters.token
  console.log(`Cargando medios para el paquete con ID: ${idPaquete}`)
  try {
    medios.value = await obtenerMediosPaquete(idPaquete, token)
    console.log('Medios cargados:', JSON.parse(JSON.stringify(medios.value)))
  } catch (error) {
    console.error('Error al cargar los medios:', error)
    if (error.response && error.response.data) {
      console.error('Respuesta de error:', error.response.data)
      alert(`Error: ${error.response.data.errors}`)
    } else {
      alert('No se pudieron cargar las imágenes del paquete.')
    }
  }
}

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
