<template>
  <div class="evento-item">
    <!-- Botón de eliminar en la esquina superior derecha -->
    <button class="eliminar-evento" @click="eliminarEvento(evento.id)">Eliminar Evento</button>
    <button
      v-if="evento.confirmacion === 'sin confirmar'"
      class="confirmar-evento"
      @click="confirmarEvento(evento.id)"
    >
      Confirmar
    </button>

    <button
      v-if="evento.confirmacion === 'sin confirmar'"
      class="rechazar-evento"
      @click="rechazarEvento(evento.id)"
    >
      Rechazar
    </button>

    <h2>{{ evento.nombre }}</h2>
    <p>{{ evento.descripcion }}</p>
    <p><strong>Fecha:</strong> {{ evento.fecha }}</p>
    <p><strong>Hora de Inicio:</strong> {{ evento.hora_inicio }}</p>
    <p><strong>Hora de Fin:</strong> {{ evento.hora_fin }}</p>
    <p><strong>Precio:</strong> ${{ evento.precio }}</p>
    <p><strong>Número de Personas:</strong> {{ evento.num_personas }}</p>
    <p><strong>Paquete:</strong> {{ evento.paquete_id }}</p>
    <p v-if="evento.confirmacion === 'rechazado'"><strong>Motivo:</strong>{{ evento.motivo }}</p>
    <p>
      <strong>Confirmación:</strong>
      <span v-if="evento.confirmacion === 'confirmado'" class="evento-conf"
        >Confirmado &#x2714;</span
      >
      <span v-if="evento.confirmacion === 'sin confirmar'">Sin Confirmar</span>
      <span v-if="evento.confirmacion === 'rechazado'" class="evento-rechazado"> Rechazado </span>
    </p>

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
import { ConfirmarEventoId } from '@/Apis/apis_eventos'
const emit = defineEmits(['evento-eliminado', 'evento-confirmado'])

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

const confirmarEvento = async (eventoId) => {
  try {
    const token = store.getters.token
    await ConfirmarEventoId(eventoId, token)

    // Actualizar el estado del evento directamente

    // Emitir evento para que el componente padre se entere del cambio
    emit('evento-confirmado', eventoId)
  } catch (error) {
    console.error('Error al confirmar el evento:', error)
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

/* Botón de confirmar */
.confirmar-evento {
  position: absolute;
  top: 60px; /* Justo debajo del botón de eliminar */
  right: 10px;
  width: 120px; /* Mismo ancho que el de eliminar */
  height: 40px; /* Mismo alto que el de eliminar */
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.confirmar-evento:hover {
  background-color: #2980b9;
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

/* Botón de confirmación */
.evento-confirmado {
  margin-top: 10px;
  padding: 8px 15px;
  cursor: default;
  background-color: #2ecc71;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
}

/* Botón de confirmación azul */
.evento-sin-confirmar {
  margin-top: 10px;
  padding: 8px 15px;
  cursor: pointer;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
}

.evento-sin-confirmar:hover {
  background-color: #2980b9;
}

/* Estilo para el botón de rechazo */
.evento-rechazado {
  display: inline-block; /* Para que esté en línea con el texto */
  margin-left: 10px; /* Separación del texto */
  padding: 2px 8px; /* Ajustar tamaño */
  background-color: #e74c3c; /* Fondo rojo */
  color: white; /* Texto blanco */
  border-radius: 4px; /* Bordes redondeados */
  font-size: 0.9rem; /* Tamaño de texto */
  font-weight: bold; /* Texto en negrita */
}

.evento-conf {
  display: inline-block; /* Para que esté en línea con el texto */
  margin-left: 10px; /* Separación del texto */
  padding: 2px 8px; /* Ajustar tamaño */
  background-color: #3ce742; /* Fondo rojo */
  color: white; /* Texto blanco */
  border-radius: 4px; /* Bordes redondeados */
  font-size: 0.9rem; /* Tamaño de texto */
  font-weight: bold; /* Texto en negrita */
}

.rechazar-evento {
  position: absolute;
  top: 110px; /* Justo debajo del botón de confirmar */
  right: 10px;
  width: 120px;
  height: 40px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.rechazar-evento:hover {
  background-color: #c0392b;
}
</style>
