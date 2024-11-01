<template>
  <div class="formulario-paquete">
    <h2>Agregar Paquete</h2>
    <div class="campo">
      <input v-model="nombre" type="text" id="nombre" required placeholder="Nombre del Paquete" />
    </div>
    <div class="campo">
      <input v-model="precio" type="number" id="precio" required placeholder="Precio" />
    </div>
    <div class="campo">
      <textarea
        v-model="descripcion"
        id="descripcion"
        required
        placeholder="Descripción"
      ></textarea>
    </div>
    <button @click="agregarPaquete">Agregar Paquete</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const nombre = ref('')
const precio = ref(0)
const descripcion = ref('')

const agregarPaquete = () => {
  const data = {
    nombre: nombre.value,
    precio: precio.value,
    descripcion: descripcion.value
  }
  console.log('Paquete a agregar:', data)
  // Aquí puedes agregar la lógica para enviar el paquete a la API
}
</script>

<style scoped>
.formulario-paquete {
  position: fixed; /* Mantiene el formulario en la misma posición */
  top: 50%; /* Centra verticalmente */
  left: 13%; /* Distancia desde el lado izquierdo */
  transform: translateY(-50%); /* Ajuste para centrar el formulario verticalmente */
  width: 1350px; /* Ancho fijo del formulario */
  max-height: 1000vh; /* Altura máxima del formulario */
  padding: 200px; /* Espacio interno del formulario */
  background-color: rgba(
    249,
    249,
    249,
    0.95
  ); /* Fondo claro para el formulario con algo de transparencia */
  display: flex; /* Usamos flex para centrar el contenido */
  flex-direction: column; /* Apilamos los elementos en columna */
  justify-content: flex-start; /* Alineamos los elementos al inicio */
  align-items: stretch; /* Alineamos los elementos al ancho completo */
  z-index: 10; /* Asegura que esté sobre otros elementos */
  overflow: auto; /* Permite el desplazamiento si el contenido es mayor al espacio disponible */
}

.campo {
  margin-bottom: 20px;
  border: 3px solid #007bff; /* Bordes más anchos */
  border-radius: 10px; /* Esquinas redondeadas */
  padding: 10px;
  width: 100%; /* Ancho del cuadro */
}

/* Aumentar el tamaño de los inputs y el textarea */
input,
textarea {
  border: none; /* Sin borde interno */
  outline: none; /* Sin contorno al enfocar */
  width: 100%;
  font-size: 16px;
  color: #333; /* Color del texto */
  padding: 15px; /* Aumento del padding para más espacio interno */
  height: 50px; /* Aumentar la altura de los inputs */
}

/* Aumentar la altura del textarea */
textarea {
  height: 150px; /* Aumentar la altura del textarea */
}

button {
  margin-top: 20px;
  background-color: #007bff; /* Color del botón */
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #0056b3; /* Color del botón al pasar el mouse */
}
</style>
