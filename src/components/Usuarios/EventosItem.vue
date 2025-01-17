<template>
  <div class="evento-item">
    <!-- Botón de eliminar en la esquina superior derecha -->
    <button class="eliminar-evento" @click="eliminarEvento(evento.id)">Eliminar Evento</button>

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
      {{ mostrarServiciosSistema ? 'Ocultar Servicios' : 'Ver Servicios Extras' }}
    </button>

    <!-- Lista de servicios del evento -->
    <ul v-if="mostrarServiciosSistema && evento.servicios && evento.servicios.length > 0">
      <li v-for="(servicio, index) in evento.servicios" :key="index">
        {{ servicio.nombre }} - ${{ servicio.precio }}
      </li>
    </ul>

    <p v-else-if="mostrarServiciosSistema && (!evento.servicios || evento.servicios.length === 0)">
      No hay servicios disponibles para este evento.
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { EliminarEventoId } from '@/Apis/apis_eventos'
import { useStore } from 'vuex'

const emit = defineEmits(['evento-eliminado'])

defineProps({
  evento: {
    type: Object,
    required: true
  }
})

const store = useStore()
const mostrarServiciosSistema = ref(false)

// Mostrar u ocultar los servicios del evento
const toggleServicios = () => {
  mostrarServiciosSistema.value = !mostrarServiciosSistema.value
}

const eliminarEvento = async (eventoId) => {
  try {
    const token = store.getters.token
    await EliminarEventoId(eventoId, token)

    console.log('El evento se eliminó')

    // Emitir el evento hacia el componente principal
    emit('evento-eliminado', eventoId) // Aquí estamos pasando el ID del evento eliminado
  } catch (error) {
    console.error('Error al eliminar el evento', error)
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
  position: relative; /* Necesario para posicionar el botón eliminar */
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

/* Botón de eliminar */
.eliminar-evento {
  position: absolute;
  top: 10px;
  right: 10px; /* Cambiado a la derecha */
  padding: 8px 12px;
  cursor: pointer;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.eliminar-evento:hover {
  background-color: #c0392b;
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
