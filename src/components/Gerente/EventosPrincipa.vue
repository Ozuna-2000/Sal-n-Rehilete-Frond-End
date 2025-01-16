<template>
  <div class="eventos-container">
    <h1 class="titulo">Eventos</h1>

    <div class="evento-item">
      <h2><label for="nombre" class="label">Nombre del Evento:</label></h2>
      <input
        type="text"
        id="nombre"
        v-model="nombre"
        class="input"
        placeholder="Ingresa el nombre del evento"
      /><br />

      <!-- Campo para seleccionar usuario -->
      <h2><label for="usuario" class="label">Seleccionar Usuario:</label></h2>
      <select id="usuario" v-model="usuarioId" class="input">
        <option value="" disabled>Seleccione un usuario</option>
        <option v-for="usuario in usuarios" :key="usuario.id" :value="usuario.id">
          {{ usuario.nombre }}
        </option>
      </select>
      <br />

      <h2><label for="paquete" class="label">Seleccionar un paquete</label></h2>
      <select id="paquete" v-model="paqueteId" class="input">
        <option value="" disabled>Seleccione un paquete</option>
        <option v-for="paquete in paquetes" :key="paquete.id" :value="paquete.id">
          {{ paquete.nombre }}
        </option>
      </select>
      <h2><label for="precio" class="label">Precio</label></h2>
      <input
        type="numer"
        id="precio"
        v-model="precio"
        class="input"
        placeholder="Ingresa el precio"
      />
      <h2><label for="fecha" class="label">Fecha del Evento:</label></h2>
      <input type="date" id="fecha" v-model="fecha" class="input" />
      <h2><label for="hora_inicio" class="label">Hora de Inicio:</label></h2>
      <input type="time" id="hora_inicio" v-model="horaInicio" class="input" />

      <h2><label for="hora_fin" class="label">Hora de Fin:</label></h2>
      <input type="time" id="hora_fin" v-model="horaFin" class="input" />

      <h2><label for="descripcion" class="label">Descripción del Evento:</label></h2>
      <textarea
        id="descripcion"
        v-model="descripcion"
        class="input"
        placeholder="Ingresa una breve descripción del evento"
        rows="4"
      ></textarea>
      <h2><label for="num_personas" class="label">Número de Personas:</label></h2>
      <input
        type="number"
        id="num_personas"
        v-model="numPersonas"
        class="input"
        placeholder="Número estimado de asistentes"
      />
    </div>
    <div v-if="error" class="error">{{ error }}</div>
    <ul class="eventos-lista" v-else>
      <li v-for="evento in eventos" :key="evento.id" class="evento-item">
        <EventosItem :evento="evento" />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { mostrarPaquetes, obtenerEventos, obtenerUsuarios } from '@/Apis/api'
import EventosItem from '../Usuarios/EventosItem.vue'

// Variables reactivas
const eventos = ref([])
const usuarios = ref([]) // Lista de usuarios
const paquetes = ref([])
const error = ref(null)
const nombre = ref('') // Campo para el nombre del evento
const usuarioId = ref('') // Campo para seleccionar usuario
const paqueteId = ref('')

// Llamada a la API para obtener los eventos
const fetchEventos = async () => {
  try {
    const token = 'TU_BEARER_TOKEN_AQUÍ'
    const eventosData = await obtenerEventos(token) // Llama a la función para obtener eventos
    eventos.value = eventosData.map((evento) => ({
      ...evento,
      mostrarServicios: false // Añadimos un campo para mostrar u ocultar los servicios
    }))
  } catch (err) {
    error.value = 'No se pudieron cargar los eventos.'
    console.error(err)
  }
}

// Llamada a la API para obtener los usuarios
const fetchUsuarios = async () => {
  try {
    const token = 'TU_BEARER_TOKEN_AQUÍ'
    const usuariosData = await obtenerUsuarios(token) // Llama a la función para obtener usuarios
    usuarios.value = usuariosData
  } catch (err) {
    error.value = 'No se pudieron cargar los usuarios.'
    console.error(err)
  }
}

const fetchPaquetes = async () => {
  try {
    const token = 'TU_BEARER_TOKEN_AQUI'
    const paquetesData = await mostrarPaquetes(token)
    paquetes.value = paquetesData
  } catch (err) {
    error.value = 'no se pudieron cargar los paquetes '
    console.error(err)
  }
}

// Obtener los eventos y usuarios cuando el componente se monta
onMounted(() => {
  fetchEventos()
  fetchUsuarios()
  fetchPaquetes()
})
</script>

<style scoped>
.eventos-container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 40px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  min-width: 1200px;
  background: #f4f6f9;
}

.titulo {
  font-size: 2.5rem;
  color: #333;
  text-align: center;
  margin-bottom: 40px;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
}

/* Estilo para el contenedor del input */
.input-container {
  width: 100%;
  max-width: 600px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.label {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
}

.input {
  width: 100%;
  padding: 15px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: border-color 0.2s;
}

.input:focus {
  border-color: #007bff;
  outline: none;
}

.eventos-lista {
  list-style: none;
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column; /* Eventos dispuestos verticalmente */
  gap: 30px; /* Espacio entre los eventos */
}

.evento-item {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  padding: 30px;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  width: 100%;
  min-height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.evento-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.error {
  color: #e74c3c;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
  font-size: 1.2rem;
}

.error::before {
  content: '⚠️ ';
  font-size: 1.5rem;
}

body {
  font-family: 'Open Sans', sans-serif;
  background-color: #f0f2f5;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
