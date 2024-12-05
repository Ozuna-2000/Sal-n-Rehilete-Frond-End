<template>
  <div class="acciones-paquetes">
    <div>
      <button @click="verPaquete">Ver Paquete</button>
      <button @click="eliminarPaquete">Eliminar Paquete</button>
      <button @click="cambiarEstadoPaquete">Activar/Desactivar Paquete</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { EliminarPaqueteId, ActivarPaqueteId } from '@/Apis/api' // Importa las funciones de la API

const router = useRouter()
const route = useRoute() // Usamos useRoute para obtener parámetros de la ruta

// Asegurarnos de que el 'paqueteId' se obtenga correctamente desde la ruta
const paqueteId = route.params.paqueteId

// Para eliminar el paquete
const eliminarPaquete = async (paqueteId, token) => {
  try {
    if (!paqueteId) {
      console.error('ID del paquete no disponible')
      return
    }
    console.log('Paquete ID:', paqueteId) // Verifica el ID antes de hacer la solicitud
    await EliminarPaqueteId(paqueteId) // Llamada para eliminar en la API
    console.log('El paquete ha sido eliminado correctamente')
  } catch (error) {
    console.error('Error al eliminar el paquete:', error)
    alert('Hubo un error al intentar eliminar el paquete.')
  }
}

// Para cambiar el estado del paquete (Activar/Desactivar)
const cambiarEstadoPaquete = async () => {
  try {
    if (!paqueteId) {
      console.error('ID del paquete no disponible')
      return
    }
    console.log('Cambiando estado del paquete:', paqueteId) // Verifica el ID
    await ActivarPaqueteId(paqueteId) // Llamada para activar/desactivar en la API
    console.log('El estado del paquete ha sido cambiado')
  } catch (error) {
    console.error('Error al cambiar estado del paquete:', error)
    alert('Hubo un error al intentar cambiar el estado del paquete.')
  }
}

// Ver el paquete
const verPaquete = () => {
  router.push(`/paquete/${paqueteId}`) // Redirige a la página de visualización del paquete
}
</script>

<style scoped>
.acciones-paquetes button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.acciones-paquetes button:hover {
  background-color: #c0392b;
}
</style>
