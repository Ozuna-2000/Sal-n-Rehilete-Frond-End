import { ref } from 'vue'
import { AgregarPaquete, ActivarPaqueteId } from '@/Apis/api'

export function useAgregarPaquete(token) {
  const nombre = ref('')
  const precio = ref(0)
  const descripcion = ref('')
  const mensaje = ref('')
  const mensajeClase = ref('')
  const activo = ref('')
  const paqueteAgregado = ref(false) // Estado de si el paquete fue agregado
  const paqueteId = ref('')

  // Función para enviar el paquete
  const enviarPaquete = async () => {
    const data = {
      nombre: nombre.value,
      precio: precio.value,
      descripcion: descripcion.value,
      activo: activo.value
    }

    try {
      const response = await AgregarPaquete(data, token)
      console.log('Respuesta de agregar paquete:', response) // Verifica la respuesta de la API
      if (response && response.id) {
        paqueteId.value = response.id
        mensaje.value = 'Paquete agregado con éxito'
        mensajeClase.value = 'success'
        paqueteAgregado.value = true // Mostrar los botones de activación
      } else {
        mensaje.value = 'Error: no se obtuvo el ID del paquete recién creado.'
        mensajeClase.value = 'error'
      }
    } catch (error) {
      mensaje.value = 'Error al agregar el paquete. Inténtalo de nuevo.'
      mensajeClase.value = 'error'
    }
  }

  // Función para activar el paquete
  const activarPaquete = async () => {
    console.log('Activando paquete con ID:', paqueteId.value) // Verifica el paqueteId
    try {
      await ActivarPaqueteId(paqueteId.value)
      mensaje.value = 'Paquete activado con éxito'
      mensajeClase.value = 'success'
      paqueteAgregado.value = false // Ocultar los botones y volver al formulario
    } catch (error) {
      mensaje.value = 'Error al activar el paquete.'
      mensajeClase.value = 'error'
    }
  }

  // Función para cancelar la activación
  const cancelarPaquete = () => {
    mensaje.value = 'El paquete fue agregado como inactivo'
    mensajeClase.value = 'info'
    paqueteAgregado.value = false // Ocultar los botones y volver al formulario
  }

  return {
    nombre,
    precio,
    descripcion,
    mensaje,
    mensajeClase,
    paqueteAgregado,
    paqueteId,
    enviarPaquete,
    activarPaquete,
    cancelarPaquete
  }
}
