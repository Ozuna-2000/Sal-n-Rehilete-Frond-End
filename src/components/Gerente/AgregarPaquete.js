import { ref } from 'vue'
import { AgregarPaquete, ActivarPaqueteId, subirImagen } from '@/Apis/api'

export function useAgregarPaquete(token) {
  const nombre = ref('')
  const precio = ref(0)
  const descripcion = ref('')
  const mensaje = ref('')
  const mensajeClase = ref('')
  const paqueteAgregado = ref(false)
  const paqueteId = ref('')
  const imagenes = ref([]) // Asegúrate de que las imágenes sean un arreglo

  // Función para enviar los datos del paquete
  const enviarPaquete = async () => {
    const data = {
      nombre: nombre.value,
      precio: precio.value,
      descripcion: descripcion.value,
      activo: false // El paquete es inactivo por defecto
    }

    try {
      // Agregar el paquete usando la API
      const response = await AgregarPaquete(data, token)
      if (response && response.id) {
        paqueteId.value = response.id
        mensaje.value = 'Paquete agregado con éxito'
        mensajeClase.value = 'success'
        paqueteAgregado.value = true

        if (imagenes.value.length > 0) {
          // Subir las imágenes asociadas al paquete
          await subirImagenPaquete(imagenes.value, paqueteId.value)
        }
      } else {
        mensaje.value = 'Error al agregar el paquete'
        mensajeClase.value = 'error'
      }
    } catch (error) {
      mensaje.value = 'Error en la conexión con la API'
      mensajeClase.value = 'error'
    }
  }

  const subirImagenPaquete = async (imagenes, idPaquete) => {
    try {
      await subirImagen(imagenes, idPaquete, token)
      mensaje.value = 'Imágenes subidas con éxito'
      mensajeClase.value = 'success'
    } catch (error) {
      mensaje.value = 'Error al subir las imágenes'
      mensajeClase.value = 'error'
    }
  }

  // Función para activar el paquete después de ser agregado
  const activarPaquete = async () => {
    try {
      await ActivarPaqueteId(paqueteId.value)
      mensaje.value = 'Paquete activado con éxito'
      mensajeClase.value = 'success'
      paqueteAgregado.value = false
    } catch (error) {
      mensaje.value = 'Error al activar el paquete'
      mensajeClase.value = 'error'
    }
  }

  // Función para cancelar la activación del paquete
  const cancelarPaquete = () => {
    paqueteAgregado.value = false
    mensaje.value = ''
  }

  return {
    nombre,
    precio,
    descripcion,
    mensaje,
    mensajeClase,
    paqueteAgregado,
    paqueteId,
    imagenes,
    enviarPaquete,
    activarPaquete,
    cancelarPaquete
  }
}
