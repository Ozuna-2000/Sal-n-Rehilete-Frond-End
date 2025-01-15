<template>
  <div v-if="paquete" class="paquete-item">
    <!-- Sección de edición de paquete -->
    <div v-if="editando">
      <h2>
        <input type="text" v-model="paquete.nombre" name="paqueteNombre" id="paqueteNombre" />
      </h2>
      <p>
        <textarea
          v-model="paquete.descripcion"
          name="paqueteDescripcion"
          cols="80"
          rows="6"
          id="paqueteDescripcion"
        ></textarea>
      </p>
      <p>
        Precio:
        <input type="number" v-model="paquete.precio" name="paquetePrecio" id="paquetePrecio" /> MXN
      </p>

      <button v-if="puedeEditar" @click="guardarPaquete(paquete.id)" class="btn-editar">
        Guardar
      </button>
    </div>

    <!-- Sección de visualización de paquete -->
    <div v-else>
      <h2>{{ paquete.nombre }}</h2>
      <p>{{ paquete.descripcion }}</p>
      <p>Precio: {{ paquete.precio }} MXN</p>
      <p>id: {{ paquete.id }}</p>

      <button @click="mostrarServiciosPaquete = !mostrarServiciosPaquete">
        {{ mostrarServiciosPaquete ? 'Ocultar Servicios' : 'Ver Servicios' }}
      </button>

      <div v-if="mostrarServiciosPaquete" class="servicios-list">
        <ul v-if="paquete.servicios && paquete.servicios.length">
          <li v-for="(servicio, id) in paquete.servicios" :key="servicio.id">
            <strong>{{ servicio.nombre }}</strong> : {{ servicio.descripcion }} - ${{
              servicio.precio
            }}
            MXN
            <button
              @click="eliminarServicio(servicio.id)"
              class="btn-eliminar-servicio"
              title="Eliminar servicio de este paquete"
            >
              Eliminar
            </button>
          </li>
        </ul>
        <p v-else>No hay servicios disponibles en este paquete.</p>

        <button @click="mostrarServiciosList = !mostrarServiciosList">
          {{ mostrarServiciosList ? 'Ocultar Servicios Disponibles' : 'Ver Servicios Disponibles' }}
        </button>

        <!-- Mostrar la lista de servicios disponibles cuando el gerente haga clic en "Agregar Servicio" -->
        <div v-if="mostrarServiciosList" class="servicios-disponibles">
          <ul v-if="serviciosDisponibles.length">
            <li v-for="servicio in serviciosDisponibles" :key="servicio.id">
              <strong>{{ servicio.nombre }}</strong
              >: {{ servicio.descripcion }} - ${{ servicio.precio }} MXN
              <button @click="agregarServicioAlPaquete(servicio.id)" class="btn-agregar-servicio">
                Agregar
              </button>
            </li>
          </ul>
          <p v-else>No hay servicios disponibles.</p>
        </div>
      </div>

      <button v-if="puedeEditar" @click="editarPaquete" class="btn-editar">Editar</button>
    </div>

    <!-- Botón para ver/ocultar medios (DetallePaquete) -->
    <button @click="mostrarMedios = !mostrarMedios">
      {{ mostrarMedios ? 'Ocultar Medios' : 'Ver Medios' }}
    </button>

    <DetallePaquete v-if="mostrarMedios" :paquete="paquete" />

    <AccionesPaquetes :paquete="paquete" />
  </div>
  <p v-else>Cargando paquete...</p>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex' // Importamos el store
import {
  obtenerPaquetePorId,
  actualizarPaquete,
  eliminarServicioPaquete,
  mostrarServicios,
  agregarServicioPaquete
} from '@/Apis/api'
import DetallePaquete from '@/components/DetallePaquete.vue' // Importar el componente DetallePaquete
import AccionesPaquetes from './Gerente/AccionesPaquetes.vue'

const store = useStore()
const servicios = ref([])

const editando = ref(false)
const props = defineProps({
  paquete: {
    type: Object,
    default: null
  }
})

const paquete = ref(props.paquete) // Inicializar con la prop del paquete
const mostrarServiciosPaquete = ref(false) // Mostrar/ocultar servicios
const mostrarMedios = ref(false) // Mostrar/ocultar medios (DetallePaquete)
const puedeEditar = ref(true) // Determinar si el paquete se puede editar (puedes poner tu lógica aquí)
const mostrarServiciosList = ref(false)
const serviciosDisponibles = ref([])

const router = useRoute()
const paqueteId = router.params.paqueteId

// Función para cargar el paquete desde la API
const cargarPaquete = async () => {
  try {
    if (paqueteId) {
      console.log(`Cargando paquete con ID: ${paqueteId}`)
      paquete.value = await obtenerPaquetePorId(paqueteId)
      console.log('Paquete cargado:', paquete.value)
    } else {
      console.error('ID del paquete no disponible en la ruta')
    }
  } catch (error) {
    console.error('Error al cargar el paquete:', error)
  }
}

// Se ejecuta cuando se monta el componente
onMounted(() => {
  if (!props.paquete) {
    cargarPaquete() // Cargar desde la API solo si no se pasa el paquete como prop
  }
  obtenerServiciosDisponibles()
})

// Función para obtener los servicios disponibles
const obtenerServiciosDisponibles = async () => {
  try {
    const servicios = await mostrarServicios() // Llamada a la función de API
    console.log(servicios)
    serviciosDisponibles.value = servicios
  } catch (error) {
    console.error('Error al obtener los servicios:', error)
  }
}

const editarPaquete = () => {
  console.log('Empieza a editar el paquete:', paquete.value.nombre)
  editando.value = true
}

const guardarPaquete = async (idPaquete) => {
  try {
    const data = {
      nombre: paquete.value.nombre,
      descripcion: paquete.value.descripcion,
      precio: paquete.value.precio,
      activo: Number(paquete.value.activo)
    }

    const token = store.getters.token

    const paqueteActualizado = await actualizarPaquete(idPaquete, data, token)

    paquete.value = paqueteActualizado
    console.log('Paquete actualizado:', paqueteActualizado)

    editando.value = false
  } catch (error) {
    console.error('Error al guardar el paquete:', error)
  }
}
const eliminarServicio = async (servicioId) => {
  try {
    const paqueteId = paquete.value.id // <-- Obtener paqueteId desde el objeto paquete
    await eliminarServicioPaquete(paqueteId, servicioId)
    console.log(`Servicio con ID ${servicioId} eliminado del paquete ${paqueteId}.`)
    paquete.value.servicios = paquete.value.servicios.filter(
      (servicio) => servicio.id !== servicioId
    )

    servicios.value = servicios.value.filter((servicio) => servicio.id !== servicioId)
  } catch (error) {
    console.error('No se pudo eliminar el servicio:', error)
  }
}
const agregarServicioAlPaquete = async (servicioId) => {
  try {
    // Encontramos el servicio que se quiere agregar desde la lista de servicios disponibles
    const servicio = serviciosDisponibles.value.find((servicio) => servicio.id === servicioId)

    if (!servicio) {
      console.error('Servicio no encontrado')
      return
    }

    const cantidad = 1

    const respuesta = await agregarServicioPaquete(paquete.value.id, [servicio.id], [cantidad])

    if (respuesta) {
      // Si la respuesta es exitosa, agregamos el servicio al paquete
      paquete.value.servicios.push(servicio)

      // Eliminamos el servicio de la lista de servicios disponibles
      serviciosDisponibles.value = serviciosDisponibles.value.filter(
        (item) => item.id !== servicioId
      )

      console.log('Servicio agregado al paquete con éxito')
    }
  } catch (error) {
    console.error('Error al agregar servicio al paquete:', error)
  }
}
</script>

<style scoped>
.paquete-item {
  border: 1px solid #595b15;
  padding: 20px;
  margin-bottom: 15px;
  border-radius: 50px;
  text-align: left;
}

.servicios-list {
  margin-top: 10px;
  padding: 10px;
  border-top: 1px solid #bdc3c7;
}

.imagenes-list {
  margin-top: 20px;
}

.imagenes {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.imagenes img {
  max-width: 100px;
  max-height: 100px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

.btn-ver-medios {
  margin-top: 15px;
  padding: 10px 15px;
  background-color: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  display: inline-block;
  text-align: center;
}

.btn-ver-medios:hover {
  background-color: #2980b9;
}

.btn-editar {
  margin-top: 15px;
  padding: 10px 20px;
  background-color: #f39c12;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-editar:hover {
  background-color: #e67e22;
}

.btn-eliminar {
  margin-top: 15px;
  padding: 10px 20px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-eliminar:hover {
  background-color: #c0392b;
}

.btn-activar {
  margin-top: 15px;
  padding: 10px 20px;
  color: white;
  border: none;
  border-radius: 5px;
}

.btn-activar:hover {
  opacity: 0.8;
}

.btn-eliminar-servicio {
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.btn-eliminar-servicio:hover {
  background-color: #c0392b;
}

.btn-agregar-servicio {
  background-color: #2ecc71;
  color: white;
}
</style>
