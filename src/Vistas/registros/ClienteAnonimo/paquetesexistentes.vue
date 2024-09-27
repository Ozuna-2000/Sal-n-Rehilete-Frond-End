<template>
  <div class="paquetes-container">
    <h1>Paquetes Disponibles</h1>
    <div v-if="paquetes.length">
      <Paquetesitem v-for="paquete in paquetes" :key="paquete.id" :paquete="paquete" />
    </div>
    <div v-else>
      <p>No hay paquetes disponibles en este momento.</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { mostarPaquetes } from '@/Apis/api'
import Paquetesitem from '@/components/paquetesitem.vue'

export default {
  components: {
    Paquetesitem
  },
  setup() {
    const paquetes = ref([])

    const cargarPaquetes = async () => {
      try {
        const data = await mostarPaquetes()
        paquetes.value = data
      } catch (error) {
        console.error('Error al cargar los paquetes:', error)
      }
    }

    onMounted(() => {
      cargarPaquetes()
    })

    return {
      paquetes
    }
  }
}
</script>

<style scoped>
.paquetes-container {
  padding: 20px;
  text-align: center;
}

h1 {
  font-size: 28px;
  margin-bottom: 20px;
}
</style>
