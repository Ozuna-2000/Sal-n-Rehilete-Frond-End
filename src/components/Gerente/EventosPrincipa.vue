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

      <h2><label for="usuario" class="label">Seleccionar Usuario:</label></h2>
      <select id="usuario" v-model="usuario_id" class="input">
        <option value="" disabled>Seleccione un usuario</option>
        <option v-for="usuario in usuarios" :key="usuario.id" :value="usuario.id">
          {{ usuario.nombre }}
        </option>
      </select>
      <br />

      <h2><label for="paquete" class="label">Seleccionar un paquete</label></h2>
      <select id="paquete" v-model="paquete_id" class="input">
        <option value="" disabled>Seleccione un paquete</option>
        <option v-for="paquete in paquetes" :key="paquete.id" :value="paquete.id">
          {{ paquete.nombre }}
        </option>
      </select>

      <h2><label for="precio" class="label">Precio</label></h2>
      <input
        type="number"
        id="precio"
        v-model="precio"
        class="input"
        placeholder="Ingresa el precio"
      />

      <h2><label for="fecha" class="label">Fecha del Evento:</label></h2>
      <input type="date" id="fecha" v-model="fecha" class="input" />

      <h2><label for="hora_inicio" class="label">Hora de Inicio:</label></h2>
      <input type="time" id="hora_inicio" v-model="hora_inicio" class="input" />

      <h2><label for="hora_fin" class="label">Hora de Fin:</label></h2>
      <input type="time" id="hora_fin" v-model="hora_fin" class="input" />

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
        v-model="num_personas"
        class="input"
        placeholder="Número estimado de asistentes"
      />

      <h2><label for="servicio" class="label">Seleccionar servicios extra:</label></h2>
      <select
        id="servicio"
        v-model="servicioSeleccionado"
        class="input select-servicio"
        @change="agregarServicio"
      >
        <option value="" disabled>Seleccione un servicio</option>
        <option v-for="servicio in serviciosDisponibles" :key="servicio.id" :value="servicio.id">
          {{ servicio.nombre }}
        </option>
      </select>

      <div v-if="serviciosSeleccionados.length > 0" class="servicios-seleccionados">
        <h3>Servicios Seleccionados:</h3>
        <ul>
          <li v-for="(servicio, index) in serviciosSeleccionados" :key="index">
            {{ servicio.nombre }}
            <button @click="eliminarServicio(index)">Eliminar</button>
          </li>
        </ul>
      </div>

      <button @click="crearEvento" class="btn-crear">Crear Evento</button>
    </div>

    <div v-if="error" class="error">{{ error }}</div>
    <ul class="eventos-lista" v-else>
      <li v-for="evento in eventos" :key="evento.id" class="evento-item">
        <EventosItem
          :evento="evento"
          v-for="evento in eventos"
          :key="evento.id"
          @evento-eliminado="handleEventoEliminado"
        />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import {
  mostrarPaquetes,
  obtenerEventos,
  obtenerUsuarios,
  CrearEvento,
  mostrarServicios
} from '@/Apis/api'
import EventosItem from '../Usuarios/EventosItem.vue'

const store = useStore()
const eventos = ref([])
const usuarios = ref([])
const paquetes = ref([])
const serviciosDisponibles = ref([])
const serviciosSeleccionados = ref([]) // Lista de servicios seleccionados
const servicioSeleccionado = ref(null) // Servicio seleccionado en el momento
const error = ref(null)
const nombre = ref('')
const usuario_id = ref('')
const paquete_id = ref('')
const precio = ref('')
const fecha = ref('')
const hora_inicio = ref('')
const hora_fin = ref('')
const descripcion = ref('')
const num_personas = ref('')
const confirmacion = ref('')

const handleEventoEliminado = (eventoId) => {
  eventos.value = eventos.value.filter((evento) => evento.id !== eventoId)
}

const fetchEventos = async () => {
  try {
    const token = 'TU_BEARER_TOKEN_AQUÍ'
    const eventosData = await obtenerEventos(token)
    eventos.value = eventosData.map((evento) => ({
      ...evento,
      mostrarServicios: false
    }))
  } catch (err) {
    error.value = 'No se pudieron cargar los eventos.'
    console.error(err)
  }
}

const fetchUsuarios = async () => {
  try {
    const token = 'TU_BEARER_TOKEN_AQUÍ'
    const usuariosData = await obtenerUsuarios(token)
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
    error.value = 'No se pudieron cargar los paquetes.'
    console.error(err)
  }
}

const fetchServicios = async () => {
  try {
    const token = 'TU_BEARER_TOKEN_AQUI'
    const serviciosData = await mostrarServicios(token)
    serviciosDisponibles.value = serviciosData
  } catch (err) {
    error.value = 'No se pudieron cargar los servicios.'
    console.error(err)
  }
}

onMounted(() => {
  fetchEventos()
  fetchUsuarios()
  fetchPaquetes()
  fetchServicios()
})

// Función para agregar el servicio seleccionado a la lista
const agregarServicio = () => {
  if (servicioSeleccionado.value) {
    const servicio = serviciosDisponibles.value.find((s) => s.id === servicioSeleccionado.value)
    if (servicio) {
      // Agrega el servicio aunque ya esté en la lista
      serviciosSeleccionados.value.push(servicio)
    }
  }
  servicioSeleccionado.value = null
}

const eliminarServicio = (index) => {
  serviciosSeleccionados.value.splice(index, 1)
}

const crearEvento = async () => {
  try {
    const token = store.getters.token
    const data = {
      nombre: nombre.value,
      usuario_id: usuario_id.value,
      paquete_id: paquete_id.value,
      precio: precio.value,
      fecha: fecha.value,
      hora_inicio: hora_inicio.value,
      hora_fin: hora_fin.value,
      descripcion: descripcion.value,
      num_personas: num_personas.value,
      confirmacion: confirmacion.value,
      servicios: serviciosSeleccionados.value.map((servicio) => servicio.id)
    }

    const nuevoEvento = await CrearEvento(data, token)

    if (nuevoEvento) {
      eventos.value.push(nuevoEvento) // Agrega el nuevo evento a la lista
      // Limpiar campos
      nombre.value = ''
      usuario_id.value = ''
      paquete_id.value = ''
      precio.value = ''
      fecha.value = ''
      hora_inicio.value = ''
      hora_fin.value = ''
      descripcion.value = ''
      num_personas.value = ''
      serviciosSeleccionados.value = [] // Limpiar servicios seleccionados
    }
  } catch (err) {
    error.value = 'No se pudo crear el evento.'
    console.error(err)
  }
}
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
  flex-direction: column;
  gap: 30px;
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

/* Estilo del botón */
.btn-crear {
  background-color: #28a745;
  color: #fff;
  border: none;
  padding: 15px 30px;
  font-size: 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 30px;
}

.btn-crear:hover {
  background-color: #218838;
}

.servicios-seleccionados {
  margin-top: 20px;
}

.servicios-seleccionados ul {
  list-style-type: none;
  padding-left: 0;
}

.servicios-seleccionados li {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.servicios-seleccionados button {
  background-color: red;
  color: white;
  border: none;
  padding: 5px;
  cursor: pointer;
}

.select-servicio {
  background: none; /* Quita el fondo */
  border: none; /* Quita el borde */
  padding-right: 20px; /* Espacio para la flecha */
  width: 30px; /* Ajusta el ancho para que solo quede la flecha */
  cursor: pointer; /* Cambia el cursor a "mano" para mejorar la experiencia */
}
</style>
