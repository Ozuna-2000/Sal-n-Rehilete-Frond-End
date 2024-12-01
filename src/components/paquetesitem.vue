<template>
  <div v-if="paquete" class="paquete-item">
    <!-- Modo edición para el nombre -->
    <h2 v-if="!modoEdicion">
      {{ paquete.nombre }}
    </h2>
    <input v-else v-model="paqueteEditado.nombre" type="text" placeholder="Nombre del paquete" />

    <!-- Modo edición para la descripción -->
    <p v-if="!modoEdicion">
      {{ paquete.descripcion }}
    </p>
    <textarea
      v-else
      v-model="paqueteEditado.descripcion"
      rows="5"
      placeholder="Descripción del paquete"
    ></textarea>

    <!-- Modo edición para el precio -->
    <p v-if="!modoEdicion">Precio: {{ paquete.precio }} MXN</p>
    <input v-else v-model="paqueteEditado.precio" type="number" placeholder="Precio" />

    <!-- Botón para guardar cambios -->
    <button v-if="modoEdicion" @click="guardarCambios" class="btn-guardar">Guardar</button>

    <!-- Botón para habilitar modo edición -->
    <button v-else @click="habilitarEdicion" class="btn-editar">Editar</button>

    <!-- Botón para cancelar edición -->
    <button v-if="modoEdicion" @click="cancelarEdicion" class="btn-cancelar">Cancelar</button>

    <!-- Botón para mostrar/ocultar servicios -->
    <button @click="mostrarServicios = !mostrarServicios">
      {{ mostrarServicios ? 'Ocultar Servicios' : 'Ver Servicios' }}
    </button>

    <!-- Mostrar servicios del paquete -->
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

    <!-- Botón para ver/ocultar medios (DetallePaquete) -->
    <button @click="mostrarMedios = !mostrarMedios">
      {{ mostrarMedios ? 'Ocultar Medios' : 'Ver Medios' }}
    </button>

    <!-- Mostrar el componente DetallePaquete solo si mostrarMedios es verdadero -->
    <DetallePaquete v-if="mostrarMedios" :paquete="paquete" />
  </div>
  <p v-else>Cargando paquete...</p>
</template>

<script setup>
import { ref } from 'vue'
import DetallePaquete from '@/components/DetallePaquete.vue' // Aseguramos mantener el componente de medios

// Props
const props = defineProps({
  paquete: {
    type: Object,
    default: null
  }
})

// Estado del componente
const paqueteEditado = ref({ ...props.paquete }) // Copia editable del paquete
const modoEdicion = ref(false) // Determina si estamos en modo edición
const mostrarServicios = ref(false) // Mostrar/ocultar servicios
const mostrarMedios = ref(false) // Mostrar/ocultar medios (DetallePaquete)

// Habilitar el modo edición
const habilitarEdicion = () => {
  modoEdicion.value = true
}

// Cancelar edición y restaurar valores originales
const cancelarEdicion = () => {
  modoEdicion.value = false
  paqueteEditado.value = { ...props.paquete } // Restaurar datos originales
}

// Guardar cambios en el paquete
const guardarCambios = () => {
  console.log('Datos editados:', paqueteEditado.value)
  modoEdicion.value = false
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

textarea {
  width: 100%; /* Asegura que ocupe todo el ancho disponible */
  margin: 10px 0;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  resize: none; /* Evita que el usuario cambie manualmente el tamaño */
  min-height: 120px; /* Altura mínima para más líneas */
}
.btn-editar,
.btn-guardar,
.btn-cancelar {
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

.btn-guardar {
  background-color: #27ae60;
}

.btn-guardar:hover {
  background-color: #229954;
}

.btn-cancelar {
  background-color: #e74c3c;
}

.btn-cancelar:hover {
  background-color: #c0392b;
}
</style>
