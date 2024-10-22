<template>
  <div>
    <h1>Panel de Control del Gerente</h1>

    <!-- Tabs de navegación -->
    <div class="tabs">
      <RouterLink to="/paquetes">
        <button>Paquetes</button>
      </RouterLink>
      <RouterLink to="/servicios">
        <button>Servicios</button>
      </RouterLink>
      <RouterLink to="/ListaUsuarios">
        <button>Usuarios</button>
      </RouterLink>
      <RouterLink to="/eventos">
        <button>Eventos</button>
      </RouterLink>
    </div>

    <!-- El RouterView cargará el componente correspondiente -->
    <RouterView />
  </div>
</template>

<script>
export default {
  name: 'Gerente'
}
</script>

<style scoped>
.tabs {
  margin-bottom: 20px;
}

.tabs button {
  margin-right: 10px;
  padding: 10px 20px;
  cursor: pointer;
}
</style>
