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
    <p><strong>confirmacion:</strong>{{ evento.confirmacion }}</p>

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

defineProps({
  evento: {
    type: Object,
    required: true
  }
})

const mostrarServicios = ref(false)

const toggleServicios = () => {
  mostrarServicios.value = !mostrarServicios.value
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
  min-height: 300px; /* Asegura que los eventos sean más largos */
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Asegura que el contenido se distribuya en el espacio disponible */
}

/* Aumentamos el tamaño de los encabezados */
.evento-item h2 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 15px;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
}

/* Estilo para los párrafos dentro de cada evento */
.evento-item p {
  font-size: 1.1rem;
  color: #555;
  margin: 8px 0;
}

/* Estilo para el botón */
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

/* Lista de servicios */
ul {
  list-style: none;
  padding-left: 0;
  margin-top: 10px;
}

li {
  font-size: 1rem;
  color: #333;
  margin-bottom: 5px;
}
</style>
