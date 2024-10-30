<template>
  <div class="gerente-panel">
    <!-- Barra de navegación vertical -->
    <div class="sidebar">
      <h2>Gerente</h2>
      <RouterLink to="/VistaGerente/paquetes">
        <button>Paquetes</button>
      </RouterLink>
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

<script>
export default {
  name: 'Gerente'
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
}

.sidebar button:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

/* Contenido de la derecha */
.content {
  margin-left: 200px; /* Desplaza el contenido a la derecha de la barra */
  flex-grow: 1; /* Ocupa todo el espacio restante */
  padding: 20px;
}
</style>
