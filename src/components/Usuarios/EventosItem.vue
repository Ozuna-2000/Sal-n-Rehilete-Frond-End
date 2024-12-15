<template>
  <div>
    <h2>{{ evento.nombre }}</h2>
    <p>{{ evento.descripcion }}</p>
    <p><strong>Fecha:</strong> {{ evento.fecha }}</p>
    <p><strong>Hora de Inicio:</strong> {{ evento.hora_inicio }}</p>
    <p><strong>Hora de Fin:</strong> {{ evento.hora_fin }}</p>
    <p><strong>Precio:</strong> ${{ evento.precio }}</p>
    <p><strong>Número de Personas:</strong> {{ evento.num_personas }}</p>
    <p><strong>Paquete:</strong> {{ evento.paquete_id }}</p>

    <!-- Botón para mostrar los servicios -->
    <button @click="toggleServicios">
      {{ mostrarServicios ? 'Ocultar Servicios' : 'Ver Servicios' }}
    </button>

    <!-- Lista de servicios del evento -->
    <ul v-if="mostrarServicios">
      <li v-for="(servicio, index) in evento.servicios" :key="index">
        {{ servicio.nombre }} - ${{ servicio.precio }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// No es necesario declarar 'props' explícitamente

// Definir los props directamente utilizando defineProps()
defineProps({
  evento: {
    type: Object,
    required: true
  }
})

// Crear una propiedad local `mostrarServicios` para manejar la visibilidad
const mostrarServicios = ref(false)

// Función para manejar la visibilidad de los servicios
const toggleServicios = () => {
  mostrarServicios.value = !mostrarServicios.value
}
</script>

<style scoped>
button {
  margin-top: 10px;
  padding: 5px 10px;
  cursor: pointer;
}
</style>
