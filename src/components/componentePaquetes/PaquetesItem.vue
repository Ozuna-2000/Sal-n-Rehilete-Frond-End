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

      <button
        v-if="isGerente && puedeEditar"
        @click="guardarPaquete(paquete.id)"
        class="btn-editar"
      >
        Guardar
      </button>
    </div>

    <div v-else>
      <h2>{{ paquete.nombre }}</h2>
      <p>{{ paquete.descripcion }}</p>
      <p>Precio: {{ paquete.precio }} MXN</p>

      <ServiciosPaquete
        :paquete="paquete"
        :serviciosDisponibles="serviciosDisponibles"
        @actualizar-paquete="paquete = $event"
      />
      <button v-if="isGerente && puedeEditar" @click="editarPaquete" class="btn-editar">
        Editar
      </button>
    </div>

    <!-- Botón para ver/ocultar medios (DetallePaquete) -->
    <button @click="mostrarMedios = !mostrarMedios">
      {{ mostrarMedios ? 'Ocultar imagenes' : 'Ver Imagenes del paquete' }}
    </button>

    <DetallePaquete v-if="mostrarMedios" :paquete="paquete" />

    <AccionesPaquetes :paquete="paquete" @paquete-eliminado="eliminarPaquete" />
  </div>
  <p v-else>Cargando paquete...</p>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex' // Importamos el store
import { obtenerPaquetePorId, actualizarPaquete, mostrarServicios } from '@/Apis/api'
import DetallePaquete from './DetallePaquete.vue'
import AccionesPaquetes from './AccionesPaquetes.vue'
import ServiciosPaquete from './ServiciosPaquete.vue'

const store = useStore()
const servicios = ref([])

const editando = ref(false)
const props = defineProps({
  paquete: {
    type: Object,
    default: null
  }
})
const emit = defineEmits(['paquete-eliminado'])
const paquete = ref(props.paquete) // Inicializar con la prop del paquete
const mostrarMedios = ref(false) // Mostrar/ocultar medios (DetallePaquete)
const puedeEditar = ref(true) // Determinar si el paquete se puede editar (puedes poner tu lógica aquí)
const serviciosDisponibles = ref([])
const router = useRoute()
const paqueteId = router.params.paqueteId

const userRole = computed(() => store.getters.userRole)
const isGerente = computed(() => userRole.value === 'Gerente')

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

const eliminarPaquete = () => {
  emit('paquete-eliminado', props.paquete.id)
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
</style>
