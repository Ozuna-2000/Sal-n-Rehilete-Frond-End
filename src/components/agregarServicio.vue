<template>
  <div class="agregar-servicio container mt-5">
    <h2 class="text-center mb-4">Agregar un Nuevo Servicio</h2>
    <form @submit.prevent="AgregarServicio" class="shadow p-4 rounded bg-light">
      <div class="mb-3">
        <label for="nombre" class="form-label">Nombre:</label>
        <input v-model="nombre" type="text" id="nombre" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="precio" class="form-label">Precio:</label>
        <input v-model="precio" type="number" id="precio" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="descripcion" class="form-label">Descripción:</label>
        <textarea v-model="descripcion" id="descripcion" class="form-control" required></textarea>
      </div>
      <div class="mb-3">
        <label for="minimo" class="form-label">Mínimo:</label>
        <input v-model="minimo" type="number" id="minimo" class="form-control" required />
      </div>
      <button type="submit" class="btn btn-success w-100">Agregar Servicio</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { AgregarServicio as agregarServicioApi } from '@/Apis/api'

const store = useStore()
const nombre = ref('')
const precio = ref(0)
const descripcion = ref('')
const minimo = ref(1)

const AgregarServicio = async () => {
  let token = store.state.token
  if (!token) {
    token = localStorage.getItem('token')
  }

  try {
    const data = {
      nombre: nombre.value,
      precio: precio.value,
      descripcion: descripcion.value,
      minimo: minimo.value
    }
    const response = await agregarServicioApi(data, token)
    console.log('Servicio agregado:', response)
    // Resetear el formulario
    resetForm()
    alert('¡Servicio agregado exitosamente! 🎉')
  } catch (error) {
    console.error('Error al agregar el servicio:', error.response ? error.response.data : error)
  }
}

// Función para resetear el formulario
const resetForm = () => {
  nombre.value = ''
  precio.value = 0
  descripcion.value = ''
  minimo.value = 1
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.agregar-servicio {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

form {
  width: 300px; /* Mantén este tamaño o ajusta según necesites */
  padding: 16px;
  border-radius: 10px;
  margin: auto;
  background-color: #ccc;
}

form label {
  width: 72px;
  font-weight: bold;
  display: inline-block;
}

form input[type='text'],
form input[type='number'] {
  width: 180px; /* Cambiar a 100% podría ayudar en la responsividad */
  padding: 3px 10px;
  border: 1px solid #f6f6f6;
  border-radius: 3px;
  background-color: #f6f6f6;
  margin: 8px 0;
  display: inline-block;
}

form input[type='submit'] {
  width: 100%;
  padding: 8px 16px;
  margin-top: 32px;
  border: 1px solid #000;
  border-radius: 5px;
  display: block;
  color: #fff;
  background-color: #000;
}

form input[type='submit']:hover {
  cursor: pointer;
}

textarea {
  width: 100%;
  height: 100px;
  border: 1px solid #f6f6f6;
  border-radius: 3px;
  background-color: #f6f6f6;
  margin: 8px 0;
  resize: none;
  display: block;
}

.btn-success {
  transition:
    background-color 0.3s,
    transform 0.2s;
}

.btn-success:hover {
  background-color: #28a745;
  transform: scale(1.05);
}
</style>
