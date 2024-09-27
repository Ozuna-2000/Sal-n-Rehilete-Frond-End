<template>
  <div class="servicios-container">
    <h1>servicios disponibles</h1>
    <div v-if="servicios.length">
      <Serviciositem v-for="servicio in servicios" :key="servicio.id" :servicio="servicio" />
    </div>
    <div v-else>
      <p>no hay servicios disponibles.</p>
    </div>
  </div>
</template>
<script>
import { ref, onMounted } from 'vue'
import { mostrarServicios } from '@/Apis/api'
import Serviciositem from '@/components/serviciositem.vue'
export default {
  components: {
    Serviciositem
  },
  setup() {
    const servicios = ref([])
    const cargarServicios = async () => {
      try {
        const data = await mostrarServicios()
        servicios.value = data
      } catch (error) {
        console.log('tenemos un error')
      }
    }
    onMounted(() => {
      cargarServicios()
    })
    return {
      servicios
    }
  }
}
</script>
<style scoped>
.servicios-container {
  padding: 20px;
  text-align: center;
}
h1 {
  font-size: 28px;
  margin-bottom: 20px;
}
</style>
