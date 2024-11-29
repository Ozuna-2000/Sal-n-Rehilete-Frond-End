import { ref } from 'vue'
import { AgregarPaquete, ActivarPaqueteId, subirImagen, actualizarPaquete } from '@/Apis/api'

export function useAgregarPaquete(token) {
  const nombre = ref('')
  const precio = ref(0)
  const descripcion = ref('')
  const mensaje = ref('')
  const mensajeClase = ref('')
  const paqueteAgregado = ref(false)
  const paqueteId = ref('')
  const imagenes = ref([]) // Asegúrate de que las imágenes sean un arreglo
  const esEdicion = ref(false) // Nueva variable para saber si estamos en modo edición

  // Función para enviar los datos del paquete
  const enviarPaquete = async () => {
    const data = {
      nombre: nombre.value,
      precio: precio.value,
      descripcion: descripcion.value,
      activo: false // El paquete es inactivo por defecto
    }

    try {
      let response
      if (esEdicion.value) {
        // Si estamos en modo edición, llamamos a la función de actualizarPaquete
        response = await actualizarPaquete(paqueteId.value, data, token)
      } else {
        // Agregar el paquete usando la API
        response = await AgregarPaquete(data, token)
      }

      if (response && response.id) {
        // Asignamos el id del paquete
        paqueteId.value = response.id
        console.log('Paquete procesado con éxito, ID:', paqueteId.value) // Verificar el ID

        mensaje.value = esEdicion.value
          ? 'Paquete actualizado con éxito'
          : 'Paquete agregado con éxito'
        mensajeClase.value = 'success'
        paqueteAgregado.value = true

        // Verificar si hay imágenes antes de intentar subirlas
        console.log('Imágenes seleccionadas:', imagenes.value) // Verificar el arreglo de imágenes

        if (imagenes.value.length > 0) {
          // Subir las imágenes asociadas al paquete
          console.log('Se procederá a subir las imágenes...') // Confirmar que se procederá a subir imágenes
          await subirImagenPaquete(imagenes.value, paqueteId.value)
        } else {
          console.log('No se han seleccionado imágenes para subir.') // Si no hay imágenes
        }
      } else {
        mensaje.value = 'Error al procesar el paquete'
        mensajeClase.value = 'error'
      }
    } catch (error) {
      mensaje.value = 'Error en la conexión con la API'
      mensajeClase.value = 'error'
    }
  }

  const subirImagenPaquete = async (imagenes, idPaquete) => {
    try {
      // Verificar qué datos se están enviando
      console.log('Imágenes que se enviarán:', imagenes) // Verificar qué imágenes se están enviando
      console.log('ID del paquete al subir imágenes:', idPaquete) // Verificar el ID antes de enviar imágenes

      // Subir imágenes usando la API
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

  // Función para activar el modo de edición y cargar los datos del paquete
  const iniciarEdicion = (id) => {
    paqueteId.value = id
    esEdicion.value = true
    // Aquí cargaríamos los datos del paquete si fuera necesario
    // Por ejemplo, llamando a la API para obtener el paquete y llenando los campos
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
    cancelarPaquete,
    iniciarEdicion
  }
}
