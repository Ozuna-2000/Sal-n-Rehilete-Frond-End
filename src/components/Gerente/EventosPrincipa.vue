<template>
  <div class="eventos-container">
    <h1 class="titulo">Eventos</h1>
    <div v-if="error" class="error">{{ error }}</div>
    <ul class="eventos-lista" v-else>
      <li v-for="evento in eventos" :key="evento.id" class="evento-item">
        <EventosItem :evento="evento" />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { obtenerEventos } from '@/Apis/api'
import EventosItem from '../Usuarios/EventosItem.vue'

const eventos = ref([]) // Almacena los eventos
const error = ref(null) // Almacena el error en caso de fallo

// Llamada a la API para obtener los eventos
const fetchEventos = async () => {
  try {
    const token = 'TU_BEARER_TOKEN_AQUÍ' // Reemplaza con el token válido
    const eventosData = await obtenerEventos(token) // Llama a la función para obtener eventos
    eventos.value = eventosData.map((evento) => ({
      ...evento,
      mostrarServicios: false // Añadimos un campo para mostrar u ocultar los servicios
    }))
  } catch (err) {
    error.value = 'No se pudieron cargar los eventos.'
    console.error(err)
  }
}

// Obtener los eventos cuando el componente se monta
onMounted(fetchEventos)
</script>

<style scoped>
.eventos-container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 40px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  min-width: 1200px;
  background: #f4f6f9;
}

.titulo {
  font-size: 2.5rem;
  color: #333;
  text-align: center;
  margin-bottom: 40px;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
}

.eventos-lista {
  list-style: none;
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column; /* Eventos dispuestos verticalmente */
  gap: 30px; /* Espacio entre los eventos */
}

.evento-item {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  padding: 30px;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  width: 100%; /* Eventos ocupan todo el ancho disponible */
  min-height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.evento-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.error {
  color: #e74c3c;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
  font-size: 1.2rem;
}

.error::before {
  content: '⚠️ ';
  font-size: 1.5rem;
}

body {
  font-family: 'Open Sans', sans-serif;
  background-color: #f0f2f5;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
