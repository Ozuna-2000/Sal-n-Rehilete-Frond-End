<template>
  <div>
    <div v-if="editando">
      <h2>
        <input
          type="text"
          v-model="servicioLocal.nombre"
          name="servicioNombre"
          id="servicioNombre"
        />
      </h2>
      <p>
        <textarea
          v-model="servicioLocal.descripcion"
          name="servicioDescripcion"
          cols="80"
          rows="6"
          id="servicioDescripcion"
        ></textarea>
      </p>
      <p>
        Precio:
        <input
          type="number"
          v-model="servicioLocal.precio"
          name="servicioPrecio"
          id="servicioPrecio"
        />
        MXN
      </p>
      <p>
        Mínimo personas:
        <input
          type="number"
          v-model="servicioLocal.minimo"
          name="servicioMinimo"
          id="servicioMinimo"
        />
      </p>
      <button @click="guardarServicio" class="btn-editar">Guardar</button>
      <button @click="cancelarEdicion" class="btn-cancelar">Cancelar</button>
    </div>
    <div v-else>
      <button v-if="isGerente" @click="editarServicio" class="btn-editar">Editar</button>
      <button v-if="isGerente" @click="eliminarServicio(servicio.id)" class="btn-eliminar">
        Eliminar
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { actualizarServicio, EliminarServicioId } from '@/Apis/api'
const emit = defineEmits(['servicio-actualizado', 'servicio-eliminado'])

const props = defineProps({
  servicio: {
    type: Object,
    required: true
  }
})

const store = useStore()
const userRole = computed(() => store.getters.userRole)
const isGerente = computed(() => userRole.value === 'Gerente')
const editando = ref(false)
const servicioLocal = ref({ ...props.servicio })

const editarServicio = () => {
  editando.value = true
}

const cancelarEdicion = () => {
  servicioLocal.value = { ...props.servicio }
  editando.value = false
}

const guardarServicio = async () => {
  try {
    const data = {
      nombre: servicioLocal.value.nombre,
      precio: servicioLocal.value.precio,
      descripcion: servicioLocal.value.descripcion,
      minimo: servicioLocal.value.minimo
    }
    const token = store.getters.token
    const servicioActualizado = await actualizarServicio(servicioLocal.value.id, data, token)
    Object.assign(servicioLocal.value, servicioActualizado)
    editando.value = false
    // Emitimos evento para que el padre actualice la vista
    emit('servicio-actualizado', servicioActualizado)
  } catch (error) {
    console.error('Error al guardar el servicio:', error)
  }
}

const eliminarServicio = async (idServicio) => {
  try {
    const token = store.getters.token
    await EliminarServicioId(idServicio, token)
    console.log('Servicio eliminado exitosamente')
    emit('servicio-eliminado', idServicio)
  } catch (error) {
    console.error('Error al eliminar el servicio:', error)
  }
}
</script>

<style scoped>
.btn-editar {
  background-color: #4caf50;
  color: white;
  padding: 10px;
  margin-right: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-eliminar {
  background-color: #f44336;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-cancelar {
  background-color: #b0b0b0;
  color: black;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
