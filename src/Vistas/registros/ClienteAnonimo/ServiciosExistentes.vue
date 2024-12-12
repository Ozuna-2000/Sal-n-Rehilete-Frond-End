<template>
  <div class="servicios-container">
    <!-- Barra superior -->
    <div class="navbar">
      <h1>Servicios Disponibles</h1>
    </div>
    <div v-if="isGerente" class="servicio-item">
      <h2><label for="nombre">nombre</label></h2>
      <input type="text" name="nombre" id="nombre" v-model="nombre" /><br />
      <h2><label for="descripcion">descripcion</label></h2>
      <textarea v-model="descripcion" cols="50" id="descripcion"></textarea><br />
      <h2><label for="precio">precio</label></h2>
      <input type="number" name="precio" id="precio" v-model="precio" /><br />
      <h2><label for="minimo">Minimo</label></h2>
      <input type="number" name="minimo" id="minimo" v-model="minimo" /><br />

      <button @click="AgregarServicios">Agregar Servicio</button>
    </div>

    <div v-if="servicios.length">
      <ServiciosItem v-for="servicio in servicios" :key="servicio.id" :servicio="servicio" />
    </div>
    <div v-else>
      <p>No hay servicios disponibles en este momento.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { mostrarServicios } from '@/Apis/api'
import ServiciosItem from '@/components/ServiciosItem.vue'
import { AgregarServicio } from '@/Apis/api'

const store = useStore()

const servicios = ref([])
const isGerente = computed(() => store.getters.userRole === 'Gerente')
const nombre = ref('')
const descripcion = ref('')
const precio = ref('')
const minimo = ref('')

const AgregarServicios = async () => {
  if (!nombre.value || !descripcion.value || !precio.value || !minimo.value) {
    alert('por favor llenar los campos')
    return
  }
  try {
    const token = store.getters.token
    const data = {
      nombre: nombre.value,
      descripcion: descripcion.value,
      precio: precio.value,
      minimo: minimo.value
    }
    const nuevoServicio = await AgregarServicio(data, token)
    if (nuevoServicio) {
      servicios.value.push(nuevoServicio)
      console.log('Paquete Agregado', nuevoServicio)
      ;(nombre.value = ''), (descripcion.value = ''), (precio.value = ''), (minimo.value = '')
    }
  } catch (error) {
    console.error('Error al agregar servicio:', error)
  }
}

const cargarServicios = async () => {
  try {
    const data = await mostrarServicios()
    servicios.value = data
  } catch (error) {
    console.error('Error al cargar los servicios:', error)
  }
}

onMounted(() => {
  cargarServicios()
})
</script>

<style scoped>
/* Estilos para la barra superior */
.navbar {
  background-color: #2c3e50; /* Color de fondo más atractivo */
  color: white;
  padding: 20px 300px; /* Mejora el espaciado */
  text-align: left; /* Alinear texto a la izquierda */
  font-size: 24px; /* Tamaño de fuente más manejable */
  font-weight: bold; /* Mantener el texto en negrita */
  margin-bottom: 30px; /* Espaciado inferior */
  border-radius: 5px; /* Bordes redondeados */
}

/* Estilo para el botón en la barra de navegación */
.navbar button {
  margin-top: 10px;
  padding: 10px 15px;
  font-size: 16px; /* Tamaño de fuente más pequeño */
  color: white;
  background-color: #3498db; /* Color de fondo atractivo */
  border: none; /* Sin borde */
  border-radius: 5px; /* Bordes redondeados */
  cursor: pointer;
  transition: background-color 0.3s; /* Transición suave */
}

/* Estilo del botón al pasar el mouse */
.navbar button:hover {
  background-color: #2980b9; /* Color más oscuro al pasar el mouse */
}

/* Contenedor de paquetes */
.servicios-container {
  padding: 20px;
  text-align: center;
  width: 600%; /* Ajusta el ancho según sea necesario */
  max-width: 1200px; /* Limitar el ancho máximo */
  margin: 0 auto; /* Centrar el contenedor */
  background-color: #ecf0f1; /* Color de fondo suave */
  border-radius: 10px; /* Bordes redondeados */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Sombra sutil */
}

.servicio-item {
  background-color: white; /* Fondo blanco para los elementos de paquete */
  border: 1px solid #bdc3c7; /* Borde sutil */
  border-radius: 10px; /* Bordes redondeados */
  padding: 15px;
  margin-bottom: 20px; /* Espacio entre los paquetes */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Sombra */
  transition: transform 0.2s; /* Efecto de transición */
}

.servicio-item:hover {
  transform: translateY(-5px); /* Levanta el elemento al pasar el mouse */
}

/* Títulos */
h1 {
  font-size: 28px;
  margin-bottom: 20px;
  color: #565e34; /* Color de texto atractivo */
}

/* Estilo para los botones en general */
button {
  margin-bottom: 20px;
  padding: 10px 15px;
  background-color: #2ecc71; /* Color de fondo verde */
  border: none; /* Sin borde */
  border-radius: 5px; /* Bordes redondeados */
  color: white; /* Color del texto */
  transition: background-color 0.3s; /* Transición suave */
}

button:hover {
  background-color: #27ae60; /* Color más oscuro al pasar el mouse */
}

.servicio-item {
  border: 1px solid #595b15;
  padding: 20px;
  margin-bottom: 15px;
  border-radius: 50px;
  text-align: left;
}
</style>
