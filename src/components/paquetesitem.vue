<template>
  <div class="paquete-item">
    <h2>{{ paquete.id }}</h2>
    <h2>{{ paquete.nombre }}</h2>
    <p>{{ paquete.descripcion }}</p>
    <p>Precio: {{ paquete.precio }} MXN</p>
  </div>
</template>

<script setup>
const pros = defineProps({
  paquete: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.paquete-item {
  border: 1px solid #ccc;
  padding: 0px;
  margin-bottom: 15px;
  border-radius: 5px;
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
