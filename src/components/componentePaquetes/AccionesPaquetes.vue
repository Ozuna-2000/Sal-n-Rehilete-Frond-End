<template>
  <div class="acciones-paquete">
    <button
      v-if="isGerente && isAuthenticated"
      @click="eliminarPaquete(paquete.id)"
      class="btn-eliminar"
    >
      Eliminar Paquete
    </button>
  </div>
  <div class="acciones-paquete">
    <button
      v-if="isGerente"
      :style="{ backgroundColor: paquete.activo === 1 ? 'green' : 'red' }"
      @click="activarDesactivarPaquete(paquete)"
      class="btn-activar"
    >
      {{ paquete.activo === 1 ? 'Paquete Activo' : 'Paquete Inactivo' }}
    </button>

    <!-- Checkbox para activar/desactivar paquete -->
    <input
      v-if="isGerente && isAuthenticated"
      type="checkbox"
      v-model="paquete.activo"
      :true-value="1"
      :false-value="0"
    />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { EliminarPaqueteId, ActivarPaqueteId } from '@/Apis/api'
import { computed } from 'vue'
const props = defineProps({
  paquete: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['paquete-eliminado'])
const isAuthenticated = computed(() => store.getters.isAuthenticated)
const userRole = computed(() => store.getters.userRole)
const isGerente = computed(() => userRole.value === 'Gerente')

const router = useRouter()
const store = useStore()

// Función para eliminar el paquete
const eliminarPaquete = async (idPaquete) => {
  try {
    const token = store.getters.token // Obtener el token de Vuex para la autenticación
    await EliminarPaqueteId(props.paquete.id, token) // Llamar a la API para eliminar el paquete

    // Si la eliminación es exitosa, mostramos un mensaje y redirigimos
    console.log('Paquete eliminado exitosamente')
    emit('paquete-eliminado', idPaquete)

    // Redirigir a otra página (por ejemplo, la lista de paquetes)
    router.push('/paquetes') // Cambia la ruta según tu lógica
  } catch (error) {
    console.error('Error al eliminar el paquete:', error)
  }
}

const activarDesactivarPaquete = async (paquete) => {
  try {
    const response = await ActivarPaqueteId(paquete.id)
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
