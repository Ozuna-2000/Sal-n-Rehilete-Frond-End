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
.servicio-item {
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
</style>
