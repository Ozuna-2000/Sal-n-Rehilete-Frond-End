<template>
  <div class="agregar-paquete-vista">
    <h2>Agregar Paquete</h2>

    <!-- Formulario para agregar un paquete -->
    <form @submit.prevent="enviarPaquete" v-if="!paqueteAgregado">
      <div class="campo">
        <label for="nombre">Nombre del Paquete</label>
        <input
          v-model="nombre"
          type="text"
          id="nombre"
          required
          placeholder="Ingresa el nombre del paquete"
        />
      </div>
      <div class="campo">
        <label for="precio">Precio</label>
        <input
          v-model="precio"
          type="number"
          id="precio"
          required
          placeholder="Ingresa el precio"
        />
      </div>
      <div class="campo">
        <label for="descripcion">Descripción</label>
        <textarea
          v-model="descripcion"
          id="descripcion"
          required
          placeholder="Descripción del paquete"
        ></textarea>
      </div>

      <!-- Mensaje de éxito o error -->
      <p v-if="mensaje" :class="mensajeClase">{{ mensaje }}</p>

      <button type="submit">Agregar Paquete</button>
    </form>

    <!-- Mensaje de activación del paquete -->
    <div v-if="paqueteAgregado">
      <p>¿Desea activar el paquete recién agregado?</p>
      <button @click="activarPaquete">Sí, activar</button>
      <button @click="cancelarPaquete">No, dejar inactivo</button>
    </div>
  </div>
</template>

<script setup>
import { useAgregarPaquete } from '../Gerente/AgregarPaquete' // Importar el archivo de funciones
import store from '@/store'

const token = store.state.token

// Usar la lógica compartida de AgregarPaquete
const {
  nombre,
  precio,
  descripcion,
  mensaje,
  mensajeClase,
  paqueteAgregado,
  paqueteId,
  enviarPaquete,
  activarPaquete,
  cancelarPaquete
} = useAgregarPaquete(token) // Pasar el token como argumento
</script>

<style scoped>
.campo {
  margin-bottom: 15px;
}

button {
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}

p {
  font-size: 1rem;
  margin-top: 10px;
}

.success {
  color: green;
}

.error {
  color: red;
}

.info {
  color: blue;
}
</style>
