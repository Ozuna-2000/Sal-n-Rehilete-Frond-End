<template>
  <div class="agregar-servicio">
    <h2>Agregar un nuevo servicio</h2>
    <form @submit.prevent="agregarServicio">
      <div>
        <label for="nombre">Nombre:</label>
        <input v-model="nombre" type="text" id="nombre" required />
      </div>
      <div>
        <label for="precio">Precio:</label>
        <input v-model="precio" type="number" id="precio" required />
      </div>
      <div>
        <label for="descripcion">Descripción:</label>
        <textarea v-model="descripcion" id="descripcion" required></textarea>
      </div>
      <div>
        <label for="minimo">Mínimo:</label>
        <input v-model="minimo" type="number" id="minimo" required />
      </div>
      <button type="submit">Agregar Servicio</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { agregarServicioAPI } from '@/Apis/api' // Importamos la función de la API

export default {
  setup() {
    const nombre = ref('')
    const precio = ref(0)
    const descripcion = ref('')
    const minimo = ref(1)

    const agregarServicio = async () => {
      const token = localStorage.getItem('token') // Supongamos que el token está almacenado en localStorage
      try {
        const data = {
          nombre: nombre.value,
          precio: precio.value,
          descripcion: descripcion.value,
          minimo: minimo.value
        }
        const response = await agregarServicioAPI(data, token) // Usamos la función de la API
        console.log('Servicio agregado:', response)
      } catch (error) {
        console.error('Error al agregar el servicio:', error)
      }
    }

    return {
      nombre,
      precio,
      descripcion,
      minimo,
      agregarServicio
    }
  }
}
</script>

<style scoped>
.agregar-servicio {
  padding: 20px;
  max-width: 500px;
  margin: auto;
}

button {
  margin-top: 20px;
}
</style>
