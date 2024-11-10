<template>
  <div class="gerente-panel">
    <!-- Barra de navegación vertical -->
    <div class="sidebar">
      <h2>Gerente</h2>
      <RouterLink to="/VistaGerente/paquetes-Gere" @click.prevent="togglePaquetes">
        <button :class="{ active: isPaquetesActive }">Paquetes</button>
      </RouterLink>
      <div v-if="menuVisible" class="dropdown-menu">
        <RouterLink
          to="/VistaGerente/agregar-paquete"
          @click.prevent="selectOption('agregar')"
          :class="{ selected: isAgregaActive }"
        >
          <button>Agregar pendejo</button>
        </RouterLink>
        <!-- Puedes agregar más opciones aquí -->
      </div>
      <RouterLink to="/VistaGerente/servicios">
        <button>Servicios</button>
      </RouterLink>
      <RouterLink to="/VistaGerente/ListaUsuarios">
        <button>Usuarios</button>
      </RouterLink>
    </div>

    <!-- Contenido de la derecha -->
    <div class="content">
      <!-- El RouterView cargará el componente correspondiente -->
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// Estado para controlar la visibilidad del menú
const menuVisible = ref(false)
const isPaquetesActive = ref(false)
const isAgregaActive = ref(false)
const router = useRouter()

// Método para alternar la visibilidad del menú de paquetes
const togglePaquetes = () => {
  menuVisible.value = !menuVisible.value // Alterna el menú
  isPaquetesActive.value = !isPaquetesActive.value // Alterna el estado activo del botón
  isAgregaActive.value = false // Resetea la opción de agregar
}

// Método para seleccionar una opción
const selectOption = (option) => {
  if (option === 'agregar') {
    isAgregaActive.value = true // Marca la opción de agregar como activa
    menuVisible.value = true // Asegura que el menú se mantenga visible
    router.push('/VistaGerente/agregar-paquete') // Navega a la vista de agregar paquete
  }
}
</script>

<style scoped>
/* Diseño general del panel */
.gerente-panel {
  display: flex;
  height: 100vh; /* Para ocupar toda la altura de la pantalla */
  margin: 0; /* Elimina cualquier margen alrededor */
}

/* Barra de navegación lateral */
.sidebar {
  width: 200px;
  background-color: #007bff; /* Azul */
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Alinear el contenido al inicio */
  position: fixed; /* Fija la barra al lado izquierdo de la pantalla */
  top: 29px; /* Ajusta esto para mover la barra hacia abajo */
  left: 0;
  height: calc(
    100vh - 20px
  ); /* Ajusta la altura para que sea 20px menos que la altura total de la ventana */
}

.sidebar h2 {
  color: white;
  margin-bottom: 30px; /* Aumenta el margen inferior para bajar la barra */
}

/* Botones de navegación en la barra */
.sidebar button {
  background-color: transparent;
  border: none;
  color: white;
  padding: 10px 0;
  width: 100%;
  text-align: left;
  cursor: pointer;
  margin-bottom: 10px;
  transition: background-color 0.3s; /* Añade transición para un efecto suave */
}

/* Estilo para el botón activo */
.sidebar button.active {
  background-color: rgba(255, 255, 255, 0.3); /* Color de fondo para el botón activo */
}

/* Estilo para el botón seleccionado */
.dropdown-menu .selected {
  background-color: rgba(255, 255, 255, 0.3); /* Color de fondo para la opción seleccionada */
}

/* Estilo para hover */
.sidebar button:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

/* Contenido de la derecha */
.content {
  margin-left: 200px; /* Desplaza el contenido a la derecha de la barra */
  flex-grow: 1; /* Ocupa todo el espacio restante */
  padding: 20px;
}

/* Menú desplegable */
.dropdown-menu {
  padding-left: 20px; /* Alineación para el menú desplegable */
  margin-bottom: 10px;
}

/* Botones en el menú desplegable */
.dropdown-menu button {
  background-color: transparent;
  border: none;
  color: white;
  padding: 5px 0;
  width: 100%;
  text-align: left;
  cursor: pointer;
}

.dropdown-menu button:hover {
  background-color: rgba(255, 255, 255, 0.2);
}
</style>
