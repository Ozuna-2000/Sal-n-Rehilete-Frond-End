<template>
  <div>
    <button @click="mostrarServiciosPaquete = !mostrarServiciosPaquete">
      {{ mostrarServiciosPaquete ? 'Ocultar Servicios' : 'Ver Servicios' }}
    </button>

    <div v-if="mostrarServiciosPaquete" class="servicios-list">
      <ul v-if="paquete.servicios && paquete.servicios.length">
        <li v-for="servicio in paquete.servicios" :key="servicio.id">
          <strong>{{ servicio.nombre }}</strong> : {{ servicio.descripcion }} - ${{
            servicio.precio
          }}
          MXN
          <button
            v-if="isGerente"
            @click="eliminarServicio(servicio.id)"
            class="btn-eliminar-servicio"
          >
            Eliminar
          </button>
        </li>
      </ul>
      <p v-else>No hay servicios en este paquete.</p>

      <button @click="mostrarServiciosList = !mostrarServiciosList" v-if="isAuthenticated">
        {{ mostrarServiciosList ? 'Ocultar Servicios Disponibles' : 'Ver Servicios Disponibles' }}
      </button>

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
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { eliminarServicioPaquete, agregarServicioPaquete } from '@/Apis/api'

const props = defineProps({
  paquete: Object,
  serviciosDisponibles: Array
})

const emit = defineEmits(['actualizar-paquete'])

const store = useStore()
const mostrarServiciosPaquete = ref(false)
const mostrarServiciosList = ref(false)

const isAuthenticated = computed(() => store.getters.isAuthenticated)
const userRole = computed(() => store.getters.userRole)
const isGerente = computed(() => userRole.value === 'Gerente')

const eliminarServicio = async (servicioId) => {
  try {
    await eliminarServicioPaquete(props.paquete.id, servicioId)
    const nuevoPaquete = {
      ...props.paquete,
      servicios: props.paquete.servicios.filter((servicio) => servicio.id !== servicioId)
    }
    emit('actualizar-paquete', nuevoPaquete)
  } catch (error) {
    console.error('No se pudo eliminar el servicio:', error)
  }
}

const agregarServicioAlPaquete = async (servicioId) => {
  try {
    const servicio = props.serviciosDisponibles.find((serv) => serv.id === servicioId)
    if (!servicio) {
      console.error('Servicio no encontrado')
      return
    }

    const respuesta = await agregarServicioPaquete(props.paquete.id, [servicio.id], [1])

    if (respuesta) {
      const nuevoPaquete = {
        ...props.paquete,
        servicios: [...props.paquete.servicios, servicio]
      }
      emit('actualizar-paquete', nuevoPaquete)
    }
  } catch (error) {
    console.error('Error al agregar servicio al paquete:', error)
  }
}
</script>

<style scoped>
.servicios-list {
  margin-top: 10px;
  padding: 10px;
  border-top: 1px solid #bdc3c7;
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
