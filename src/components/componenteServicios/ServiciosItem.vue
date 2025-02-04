<template>
  <div v-if="servicio" class="servicio-item">
    <h2>{{ servicio.nombre }}</h2>
    <h2>{{ servicio.precio }} MXN</h2>
    <p>{{ servicio.descripcion }}</p>
    <p>Mínimo de personas: {{ servicio.minimo }}</p>

    <AccionesServicios
      :servicio="servicio"
      @servicio-actualizado="actualizarServicio"
      @servicio-eliminado="eliminarServicio"
    />

    <button @click="mostrarMedios = !mostrarMedios">
      {{ mostrarMedios ? 'Ocultar Imágenes' : 'Ver imágenes del servicio' }}
    </button>

    <MediosServicios v-if="mostrarMedios" :servicio="servicio" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MediosServicios from './MediosServicios.vue'
import AccionesServicios from './AccionesServicios.vue'

const props = defineProps({
  servicio: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['servicio-eliminado'])

const servicios = ref([])
// Función que actualiza el servicio cuando se edita
const actualizarServicio = (nuevoServicio) => {
  Object.assign(props.servicio, nuevoServicio)
}

const eliminarServicio = () => {
  emit('servicio-eliminado', props.servicio.id)
}
const mostrarMedios = ref(false)
</script>

<style scoped>
.servicio-item {
  border: 1px solid #595b15;
  padding: 20px;
  margin-bottom: 15px;
  border-radius: 10px;
  text-align: left;
}

h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

p {
  font-size: 16px;
}
</style>
