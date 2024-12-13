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

      <button @click="mostrarServicios = !mostrarServicios">
        {{ mostrarServicios ? 'Ocultar Servicios' : 'Ver Servicios' }}
      </button>

      <div v-if="mostrarServicios" class="servicios-list">
        <ul v-if="paquete.servicios && paquete.servicios.length">
          <li v-for="servicio in paquete.servicios" :key="servicio.id">
            <strong>{{ servicio.nombre }}</strong> : {{ servicio.descripcion }} - ${{
              servicio.precio
            }}
            MXN
          </li>
        </ul>
        <p v-else>No hay servicios disponibles en este paquete.</p>
      </div>

      <button v-if="puedeEditar" @click="guardarPaquete(paquete.id)" class="btn-editar">
        Guardar
      </button>

      <button v-if="puedeEditar" @click="eliminarPaquete(paquete.id)" class="btn-eliminar">
        Eliminar
      </button>
    </div>

    <!-- Sección de visualización de paquete -->
    <div v-else>
      <h2>{{ paquete.nombre }}</h2>
      <p>{{ paquete.descripcion }}</p>
      <p>Precio: {{ paquete.precio }} MXN</p>
      <p>id: {{ paquete.id }}</p>

      <button @click="mostrarServicios = !mostrarServicios">
        {{ mostrarServicios ? 'Ocultar Servicios' : 'Ver Servicios' }}
      </button>

      <div v-if="mostrarServicios" class="servicios-list">
        <ul v-if="paquete.servicios && paquete.servicios.length">
          <li v-for="servicio in paquete.servicios" :key="servicio.id">
            <strong>{{ servicio.nombre }}</strong> : {{ servicio.descripcion }} - ${{
              servicio.precio
            }}
            MXN
          </li>
        </ul>
        <p v-else>No hay servicios disponibles en este paquete.</p>
      </div>

      <button v-if="puedeEditar" @click="editarPaquete" class="btn-editar">Editar</button>

      <button v-if="puedeEditar" @click="eliminarPaquete(paquete.id)" class="btn-eliminar">
        Eliminar
      </button>
    </div>

    <!-- Botón de Activación -->
    <button
      :style="{ backgroundColor: paquete.activo === 1 ? 'green' : 'red' }"
      @click="activarDesactivarPaquete(paquete)"
      class="btn-activar"
    >
      {{ paquete.activo === 1 ? 'Paquete Activo' : 'Paquete Inactivo' }}
    </button>

    <!-- Agregamos un v-model para mantener el valor sincronizado -->
    <input type="checkbox" v-model="paquete.activo" :true-value="1" :false-value="0" />

    <!-- Botón para ver/ocultar medios (DetallePaquete) -->
    <button @click="mostrarMedios = !mostrarMedios">
      {{ mostrarMedios ? 'Ocultar Medios' : 'Ver Medios' }}
    </button>

    <DetallePaquete v-if="mostrarMedios" :paquete="paquete" />
  </div>
  <p v-else>Cargando paquete...</p>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex' // Importamos el store
import { obtenerPaquetePorId, actualizarPaquete } from '@/Apis/api'
import DetallePaquete from '@/components/DetallePaquete.vue' // Importar el componente DetallePaquete
import AccionesPaquetes from './Gerente/AccionesPaquetes.vue'
import { EliminarPaqueteId, ActivarPaqueteId } from '@/Apis/api'

const store = useStore()

const editando = ref(false)
const props = defineProps({
  paquete: {
    type: Object,
    default: null
  }
})

const paquete = ref(props.paquete) // Inicializar con la prop del paquete
const mostrarServicios = ref(false) // Mostrar/ocultar servicios
const mostrarMedios = ref(false) // Mostrar/ocultar medios (DetallePaquete)
const puedeEditar = ref(true) // Determinar si el paquete se puede editar (puedes poner tu lógica aquí)

const router = useRoute()
//const router = useRouter()
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
})

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

// Función para eliminar el paquete
const eliminarPaquete = async (idPaquete) => {
  try {
    const token = store.getters.token // Obtener el token de Vuex para la autenticación
    await EliminarPaqueteId(idPaquete, token) // Llamar a la API para eliminar el paquete

    // Si la eliminación es exitosa, mostramos un mensaje y redirigimos
    console.log('Paquete eliminado exitosamente')

    // Redirigir a otra página (por ejemplo, la lista de paquetes)
    router.push('/paquetes') // Cambia la ruta según tu lógica
  } catch (error) {
    console.error('Error al eliminar el paquete:', error)
  }
}

// Función de activación/desactivación
const activarDesactivarPaquete = async (paquete) => {
  console.log('Paquete recibido:', paquete)

  if (!paquete || !paquete.id) {
    console.error('El paquete no tiene un id válido')
    return
  }

  try {
    const paqueteId = paquete.id
    console.log('Activando/desactivando paquete con ID:', paqueteId)
    const response = await ActivarPaqueteId(paqueteId)

    if (response) {
      paquete.activo = paquete.activo === 1 ? 0 : 1
      console.log(paquete.activo === 1 ? 'Paquete activado' : 'Paquete desactivado')
    }
  } catch (error) {
    console.error('Error al cambiar el estado del paquete:', error)
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
</style>
