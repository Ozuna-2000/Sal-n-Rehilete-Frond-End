<template>
  <div class="evento-item">
    <h2>{{ evento.nombre }}</h2>
    <p>{{ evento.descripcion }}</p>
    <p><strong>Fecha:</strong> {{ evento.fecha }}</p>
    <p><strong>Hora de Inicio:</strong> {{ evento.hora_inicio }}</p>
    <p><strong>Hora de Fin:</strong> {{ evento.hora_fin }}</p>
    <p><strong>Precio:</strong> ${{ evento.precio }}</p>
    <p><strong>Número de Personas:</strong> {{ evento.num_personas }}</p>
    <p><strong>Paquete:</strong> {{ evento.paquete_id }}</p>
    <p><strong>Confirmación:</strong> {{ evento.confirmacion }}</p>

    <button @click="toggleServicios">
      {{ mostrarServiciosSistema ? 'Ocultar Servicios' : 'Ver Servicios' }}
    </button>

    <!-- Lista de servicios del evento -->
    <ul v-if="mostrarServiciosSistema && evento.servicios && evento.servicios.length > 0">
      <li v-for="(servicio, index) in evento.servicios" :key="index">
        {{ servicio.nombre }} - ${{ servicio.precio }}
      </li>
    </ul>

    <!-- Mensaje cuando no hay servicios disponibles -->
    <p v-else-if="mostrarServiciosSistema && (!evento.servicios || evento.servicios.length === 0)">
      No hay servicios disponibles para este evento.
    </p>

    <!-- Botón para agregar servicios -->
    <button v-if="mostrarServiciosSistema" @click="toggleAgregarServicios">
      {{ mostrarAgregarServicios ? 'Ocultar Agregar Servicios' : 'Agregar Servicios' }}
    </button>

    <!-- Select para mostrar los servicios del sistema -->
    <div v-if="mostrarServiciosSistema && mostrarAgregarServicios && serviciosSistema.length > 0">
      <h3>Seleccionar un Servicio:</h3>
      <select v-model="servicioSeleccionado">
        <option value="" disabled>Seleccione un servicio</option>
        <option v-for="(servicio, index) in serviciosSistema" :key="index" :value="servicio">
          {{ servicio.nombre }} - ${{ servicio.precio }}
        </option>
      </select>
      <button @click="asignarServicio">Agregar Servicio</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { mostrarServicios } from '@/Apis/api'

defineProps({
  evento: {
    type: Object,
    required: true
  }
})

const mostrarServiciosSistema = ref(false) // Controla si se muestran los servicios
const mostrarAgregarServicios = ref(false) // Controla si se muestra el contenido de "Agregar Servicios"
const serviciosSistema = ref([]) // Servicios disponibles del sistema
const servicioSeleccionado = ref(null) // Servicio seleccionado por el usuario

const toggleServicios = () => {
  mostrarServiciosSistema.value = !mostrarServiciosSistema.value
  if (!mostrarServiciosSistema.value) {
    mostrarAgregarServicios.value = false // Asegura que también se oculte "Agregar Servicios"
  }
}

const toggleAgregarServicios = async () => {
  mostrarAgregarServicios.value = !mostrarAgregarServicios.value
  if (mostrarAgregarServicios.value && serviciosSistema.value.length === 0) {
    try {
      const servicios = await mostrarServicios()
      serviciosSistema.value = servicios
    } catch (error) {
      console.error('Error al desplegar servicios del sistema:', error)
    }
  }
}

// Función para asignar un servicio al evento
const asignarServicio = () => {
  if (servicioSeleccionado.value) {
    evento.servicios = [...(evento.servicios || []), servicioSeleccionado.value]
    servicioSeleccionado.value = null // Reiniciar selección
  } else {
    alert('Seleccione un servicio antes de agregar.')
  }
}
</script>

<style scoped>
/* Estilo para el contenedor de cada evento */
.evento-item {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.evento-item h2 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 15px;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
}

.evento-item p {
  font-size: 1.1rem;
  color: #555;
  margin: 8px 0;
}

button {
  margin-top: 15px;
  padding: 8px 15px;
  cursor: pointer;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #2980b9;
}

select {
  margin-top: 15px;
  padding: 8px 15px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

select:focus {
  outline: none;
  border-color: #3498db;
}
</style>
