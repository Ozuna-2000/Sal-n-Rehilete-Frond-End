<template>
  <div class="servicio-item">
    <h2>{{ servicio.nombre }}</h2>
    <h2>{{ servicio.precio }} MXN</h2>
    <p>{{ servicio.descripcion }}</p>
  </div>
</template>

<script setup>
// Definimos las props que recibirá el componente
const props = defineProps({
  servicio: {
    type: Object,
    required: true
  }
})

// Usar las props directamente en el template evita el warning
const { servicio } = props
</script>

<style scoped>
.servicio-item {
  border: 1px solid #595b15; /* Borde de color */
  padding: 20px; /* Espaciado interno */
  margin-bottom: 15px; /* Margen inferior */
  border-radius: 10px; /* Bordes redondeados */
  text-align: left; /* Alinear texto a la izquierda */
  max-width: 400px; /* Ancho máximo */
  overflow: hidden; /* Evitar desbordamiento */
}

h2 {
  font-size: 24px; /* Tamaño de fuente para el título */
  margin-bottom: 10px; /* Margen inferior */
}

p {
  font-size: 16px; /* Tamaño de fuente para la descripción */
}
</style>
