<template>
  <div class="agregar-paquete">
    <h2>Agregar paquete</h2>
    <form @submit.prevent="AgregarPaquete">
      <div>
        <label for="nombre">Nombre</label>
        <input v-model="nombre" type="text" id="nombre" required />
      </div>
      <div>
        <label for="activo">Activo:</label>
        <input v-model.number="activo" type="number" id="activo" placeholder="0 o 1" required />
      </div>
      <div>
        <label for="descripcion">Descripción:</label>
        <textarea v-model="descripcion" id="descripcion" required></textarea>
      </div>
      <div>
        <label for="precio">Precio:</label>
        <input v-model="precio" type="number" id="precio" required />
      </div>
      <button type="submit">Agregar paquete</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { AgregarPaquete as agregarPaquete } from '@/Apis/api'

const store = useStore()
const nombre = ref('')

const descripcion = ref('')
const precio = ref(0)
const activo = ref(0)

const AgregarPaquete = async () => {
  let token = store.state.token
  if (!token) {
    token = localStorage.getItem('token')
  }

  // Aquí verificamos si el usuario es gerente
  const isGerente = store.getters.userRole === 'Gerente' // Verifica si el usuario es gerente

  const data = {
    nombre: nombre.value,
    activo: activo.value,
    descripcion: descripcion.value,
    precio: precio.value
  }
  console.log(data) // Asegúrate de que los datos son correctos

  try {
    const response = await agregarPaquete(data, token)
    console.log('Paquete agregado', response)
  } catch (error) {
    console.log('Error al agregar paquete', error.response ? error.response.data : error)
  }
}
</script>

<style scoped>
.agregar-paquete {
  padding: 20px;
  max-width: 500px;
  margin: auto;
}

button {
  margin-top: 20px;
}
</style>
