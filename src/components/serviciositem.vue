<template>
  <div class="servicio-item">
    <h2>{{ servicio.nombre }}</h2>
    <h2>{{ servicio.precio }} MXN</h2>
    <p>{{ servicio.descripcion }}</p>
  </div>
</template>

<script setup>
// Definimos la prop `servicio` directamente con `defineProps`
const props = defineProps({
  servicio: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.paquete-item {
  border: 1px solid #595b15;
  padding: 20px;
  margin-bottom: 15px;
  border-radius: 50px;
  text-align: left;
  max-width: 40px; /* Añadir un ancho máximo */
  overflow: hidden; /* Evitar desbordamiento */
}

.servicios-list {
  margin-top: 10px;
  padding: 10px;
  border-top: 1px solid #bdc3c7;
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
