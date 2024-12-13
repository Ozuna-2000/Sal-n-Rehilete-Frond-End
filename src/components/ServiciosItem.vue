<template>
  <div v-if="servicio" class="servicio-item">
    <div v-if="editando">
      <h2>
        <input type="text" v-model="servicio.nombre" name="servicioNombre" id="servicioNombre" />
      </h2>
      <p>
        <textarea
          v-model="servicio.descripcion"
          name="servicioDescripcion"
          cols="80"
          rows="6"
          id="servicioDescripcion"
        ></textarea>
      </p>
      <p>
        Precio:
        <input type="number" v-model="servicio.precio" name="servicioPrecio" id="servicioPrecio" />
        MXN
      </p>
      <p>
        Minimo personas:
        <input type="number" v-model="servicio.minimo" name="servicioMinimo" id="servicioMinimo" />
      </p>
      <button v-if="puedeEditar" @click="guardarServicio(servicio.id)" class="btn-editar">
        Guardar
      </button>
    </div>

    <div v-else>
      <h2>{{ servicio.nombre }}</h2>
      <h2>{{ servicio.precio }} MXN</h2>
      <p>{{ servicio.descripcion }}</p>
      <p>{{ servicio.minimo }}</p>
      <button v-if="puedeEditar" @click="editarServicio" class="btn-editar">Editar</button>
      <button v-if="puedeEditar" @click="eliminarServicio(servicio.id)" class="btn-eliminar">
        Eliminar
      </button>
    </div>

    <button @click="mostrarMedios = !mostrarMedios">
      {{ mostrarMedios ? 'Ocultar Medios' : 'Ver Medios' }}
    </button>

    <MediosServicios v-if="mostrarMedios" :servicio="servicio" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { obtenerServicioPorId, actualizarServicio, EliminarServicioId } from '@/Apis/api'
import MediosServicios from '@/components/Usuarios/MediosServicios.vue'

// Referencias y props
const editando = ref(false)
const props = defineProps({
  servicio: {
    type: Object,
    required: null // Hacer opcional porque puedes cargarlo desde la API
  }
})
const servicio = ref(props.servicio) // Inicializar servicio con la prop o null
const router = useRouter()
const store = useStore()
const mostrarMedios = ref(false)

// Determinar si el usuario puede editar
const puedeEditar = ref(true)

// Cargar servicio desde la API
const cargarServicio = async () => {
  try {
    const servicioId = router.params.servicioId
    if (servicioId) {
      console.log(`Cargando servicio con ID: ${servicioId}`)
      servicio.value = await obtenerServicioPorId(servicioId)
      console.log('Servicio cargado:', servicio.value)
    } else {
      console.error('ID del servicio no disponible en la ruta')
    }
  } catch (error) {
    console.error('Error al cargar el servicio:', error)
  }
}

// Iniciar carga si no se pasa servicio como prop
onMounted(() => {
  if (!props.servicio) {
    cargarServicio()
  }
})

// Métodos para editar
const editarServicio = () => {
  console.log('Empieza a editar el servicio:', servicio.value?.nombre)
  editando.value = true
}
const guardarServicio = async (idServicio) => {
  try {
    const data = {
      nombre: servicio.value.nombre,
      precio: servicio.value.precio,
      descripcion: servicio.value.descripcion,
      minimo: servicio.value.minimo
    }
    const token = store.getters.token
    const servicioActualizado = await actualizarServicio(idServicio, data, token)
    servicio.value = servicioActualizado
    console.log('el servicio fue actualizado', servicioActualizado)
    editando.value = false
  } catch (error) {
    console.error('Error al guardar el servicio:', error)
  }
}
const eliminarServicio = async (idServicio) => {
  try {
    const token = store.getters.token
    await EliminarServicioId(idServicio, token)
    console.log('el servicio se elimino exitosamente')
  } catch (error) {
    console.error('Error al eliminar el Servicio:', error)
  }
}
</script>

<style scoped>
.servicio-item {
  border: 1px solid #595b15; /* Borde de color */
  padding: 20px; /* Espaciado interno */
  margin-bottom: 15px; /* Margen inferior */
  border-radius: 10px; /* Bordes redondeados */
  text-align: left; /* Alinear texto a la izquierda */
}

h2 {
  font-size: 24px; /* Tamaño de fuente para el título */
  margin-bottom: 10px; /* Margen inferior */
}

p {
  font-size: 16px; /* Tamaño de fuente para la descripción */
}
</style>
