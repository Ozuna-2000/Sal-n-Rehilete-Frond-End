import axios from 'axios'
import store from '@/store'

const url = 'http://127.0.0.1:8000'

export const EliminarEventoId = async (eventoId) => {
  try {
    // Validar que el token exista antes de hacer la solicitud
    const token = store.state.token
    if (!token) {
      throw new Error('El token de autenticación no está disponible.')
    }

    // Realizar la solicitud DELETE
    const response = await axios.delete(`${url}/api/eventos/${eventoId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    // Retornar los datos si la solicitud es exitosa
    return response.data
  } catch (error) {
    // Capturar errores específicos o generales
    if (error.response) {
      // Error de la API (respuesta HTTP)
      console.error('Error de la API al eliminar el evento:', error.response.data)
    } else if (error.request) {
      // No se recibió respuesta del servidor
      console.error('No se recibió respuesta del servidor:', error.request)
    } else {
      // Otros errores (por ejemplo, fallo en configuración)
      console.error('Error al configurar la solicitud:', error.message)
    }

    // Propagar el error para manejarlo en la interfaz
    throw error
  }
}
