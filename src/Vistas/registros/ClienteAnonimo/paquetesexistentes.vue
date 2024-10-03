<template>
  <div class="paquetes-container">
    <h1>Paquetes Disponibles</h1>
    <button v-if="isGerente" @click="redirigirAgregarPaquetes">Agregar Paquete</button>
    <div v-if="paquetes.length">
      <Paquetesitem v-for="paquete in paquetes" :key="paquete.id" :paquete="paquete" />
    </div>
    <div v-else>
      <p>No hay paquetes disponibles en este momento.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { mostarPaquetes } from '@/Apis/api'
import Paquetesitem from '@/components/paquetesitem.vue'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const paquetes = ref([])
const isGerente = computed(() => {
  const role = store.getters.userRole
  console.log('es gerente', role === 'Gerente')
  return role === 'Gerente'
})

const cargarPaquetes = async () => {
  try {
    const data = await mostarPaquetes()
    paquetes.value = data
  } catch (error) {
    console.error('Error al cargar los paquetes:', error)
  }
}
const redirigirAgregarPaquetes = () => {
  router.push('/agregarPaquetes')
}

onMounted(() => {
  cargarPaquetes()
})
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
