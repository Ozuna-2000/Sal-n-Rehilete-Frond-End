<template>
  <div class="paquete-item">
    <h2>{{ paquete.id }}</h2>
    <h2>{{ paquete.nombre }}</h2>
    <p>{{ paquete.descripcion }}</p>
    <p>Precio: {{ paquete.precio }} MXN</p>
    <button @click="verMedios(paquete.id)">Ver Medios</button>
    <!-- Botón para ver medios -->
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  paquete: {
    type: Object,
    required: true
  }
})

const verMedios = (id) => {
  // Redirige a la ruta de los medios del paquete
  if (id) {
    router.push(`/paquete/${id}/medios`)
  } else {
    console.error('El paquete no tiene un id válido.')
  }
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

h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

p {
  font-size: 16px;
}

button {
  padding: 10px 20px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9;
}
</style>
