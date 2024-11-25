<template>
  <div class="paquetes-gerente">
    <h1>Gestión de Paquetes</h1>

    <table>
      <thead>
        <tr>
          <th>Nombre</th>

          <th>Precio (MXN)</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="paquete in paquetes" :key="paquete.id">
          <td>{{ paquete.nombre }}</td>

          <td>{{ paquete.precio }}</td>
          <td :class="{ activo: paquete.activo === 1, inactivo: paquete.activo === 0 }">
            {{ paquete.activo === 1 ? 'Activo' : 'Inactivo' }}
          </td>
          <td>
            <button @click="verPaquete(paquete)">Ver</button>
            <button @click="editarPaquete(paquete)">Editar</button>
            <button @click="eliminarPaquete(paquete)">Eliminar</button>
            <button @click="cambiarEstadoPaquete(paquete)">
              {{ paquete.activo === 1 ? 'Desactivar' : 'Activar' }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { mostrarPaquetes, ActivarPaqueteId, EliminarPaqueteId } from '@/Apis/api'
import { useRouter } from 'vue-router'

const paquetes = ref([])

const router = useRouter()

const obtenerPaquetes = async () => {
  try {
    paquetes.value = await mostrarPaquetes()
    console.log('los datos de la  api', paquetes.value)
  } catch (error) {
    console.error('Error al obtener los paquetes:', error)
  }
}

onMounted(() => {
  obtenerPaquetes()
})
const cambiarEstadoPaquete = async (paquete) => {
  try {
    const respuesta = await ActivarPaqueteId(paquete.id)
    console.log('El estado del paquete ha sido actualizado:', respuesta)

    // Aquí puedes actualizar el estado local o manejar cualquier lógica adicional.
    // Por ejemplo, si deseas actualizar la lista de paquetes o cambiar el estado de `activo` localmente:
    paquete.activo = paquete.activo === 1 ? 0 : 1
  } catch (error) {
    console.error('Error al cambiar el estado del paquete:', error)
  }
}

const verPaquete = (paquete) => {
  router.push({ name: 'paquetesitem', params: { paqueteId: paquete.id } })
}

const editarPaquete = (paquete) => {
  console.log(`Editar paquete con ID: ${paquete.id}`)
}

const eliminarPaquete = async (paquete) => {
  try {
    await EliminarPaqueteId(paquete.id) // Llamada para eliminar en la API
    console.log('El paquete ha sido eliminado correctamente')

    // Actualiza la lista de paquetes en la interfaz eliminando el paquete correspondiente
    paquetes.value = paquetes.value.filter((p) => p.id !== paquete.id)
  } catch (error) {
    console.error('Error al eliminar el paquete:', error)
    alert('Hubo un error al intentar eliminar el paquete.') // Muestra una alerta si hay un error
  }
}
</script>

<style scoped>
.paquetes-gerente {
  padding: 20px;
}

table {
  width: 230%; /* Ampliamos el ancho de la tabla */
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

button {
  padding: 5px 10px;
  margin-right: 5px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9;
}

/* Limita la descripción a 2 líneas y añade ... si el texto es más largo */
.descripcion {
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* Muestra solo dos líneas en navegadores basados en WebKit */
  line-clamp: 1; /* Propiedad estándar para compatibilidad futura */
  -webkit-box-orient: vertical;
}

/* Estilos del modal */
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.modal h2 {
  font-size: 24px;
}

.modal p {
  font-size: 16px;
  margin-bottom: 10px;
}

.modal button {
  background-color: #e74c3c;
}

.modal button:hover {
  background-color: #c0392b;
}

/* Clases para los estados */
.activo {
  color: green; /* Color para paquetes activos */
}

.inactivo {
  color: red; /* Color para paquetes inactivos */
}
</style>
