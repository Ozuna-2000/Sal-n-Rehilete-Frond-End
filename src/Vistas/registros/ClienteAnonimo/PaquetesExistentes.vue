<template>
  <div class="paquetes-container">
    <!-- Barra superior -->
    <div class="navbar">
      <h1>Paquetes Disponibles</h1>
    </div>

    <div v-if="isGerente" class="paquete-item">
      <h2><label for="nombre">nombre</label></h2>
      <input type="text" name="nombre" id="nombre" v-model="nombre" /><br />
      <h2><label for="descripcion">descripcion</label></h2>
      <textarea v-model="descripcion" cols="50" id="descripcion"></textarea><br />
      <h2><label for="precio">precio</label></h2>
      <input type="number" name="precio" id="precio" v-model="precio" /><br />
      <!-- Botón de agregar paquete -->
      <button @click="AgregarPaquetes">Agregar Paquete</button>
    </div>

    <div v-if="paquetes.length">
      <PaquetesItem v-for="paquete in paquetes" :key="paquete.id" :paquete="paquete" />
    </div>
    <div v-else>
      <p>No hay paquetes disponibles en este momento.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { mostrarPaquetes } from '@/Apis/api'
import PaquetesItem from '@/components/PaquetesItem.vue'
import { AgregarPaquete } from '@/Apis/api'

const store = useStore()

const paquetes = ref([])
const isGerente = computed(() => {
  const role = store.getters.userRole
  console.log('Es gerente', role === 'Gerente')
  return role === 'Gerente'
})

// Referencias a los campos del formulario
const nombre = ref('')
const descripcion = ref('')
const precio = ref('')

// Función para agregar paquete
const AgregarPaquetes = async () => {
  if (!nombre.value || !descripcion.value || !precio.value) {
    alert('Por favor, complete todos los campos.')
    return
  }

  try {
    const token = store.getters.token
    const data = {
      nombre: nombre.value,
      descripcion: descripcion.value,
      precio: precio.value
    }

    const nuevoPaquete = await AgregarPaquete(data, token)

    if (nuevoPaquete) {
      paquetes.value.push(nuevoPaquete) // Agrega el paquete a la lista
      console.log('Nuevo paquete agregado:', nuevoPaquete)

      // Limpia los campos del formulario
      nombre.value = ''
      descripcion.value = ''
      precio.value = ''
    }
  } catch (error) {
    console.error('Error al agregar paquete:', error)
  }
}

const cargarPaquetes = async () => {
  try {
    const data = await mostrarPaquetes()
    paquetes.value = data
    console.log('Paquetes cargados:', paquetes.value)
  } catch (error) {
    console.error('Error al cargar los paquetes:', error)
  }
}

onMounted(() => {
  cargarPaquetes()
})
</script>

<style scoped>
/* Estilos para la barra superior */
.navbar {
  background-color: #2c3e50; /* Color de fondo más atractivo */
  color: white;
  padding: 20px 30px; /* Mejora el espaciado */
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
.paquetes-container {
  padding: 20px;
  text-align: center;
  width: 600%; /* Ajusta el ancho según sea necesario */
  max-width: 1200px; /* Limitar el ancho máximo */
  margin: 0 auto; /* Centrar el contenedor */
  background-color: #ecf0f1; /* Color de fondo suave */
  border-radius: 10px; /* Bordes redondeados */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Sombra sutil */
}

/* Estilo para cada paquete */
.paquete-item {
  background-color: white; /* Fondo blanco para los elementos de paquete */
  border: 1px solid #bdc3c7; /* Borde sutil */
  border-radius: 10px; /* Bordes redondeados */
  padding: 15px;
  margin-bottom: 20px; /* Espacio entre los paquetes */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Sombra */
  transition: transform 0.2s; /* Efecto de transición */
}

.paquete-item:hover {
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

.paquete-item {
  border: 1px solid #595b15;
  padding: 20px;
  margin-bottom: 15px;
  border-radius: 50px;
  text-align: left;
}
</style>
