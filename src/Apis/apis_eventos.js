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

export const ConfirmarEventoId = async (eventoId, token) => {
  try {
    const token = store.state.token
    // URL del endpoint para confirmar el evento
    const eventUrl = `${url}/api/eventos/${eventoId}/confirmar` // Cambio aquí

    // Configuración de los encabezados con el token
    const config = {
      headers: {
        Authorization: `Bearer ${token}` // Token de autenticación
      }
    }

    console.log('Token enviado:', token) // Verificar el token

    // Hacemos la solicitud PUT
    const response = await axios.put(eventUrl, {}, config) // Usamos `eventUrl` en lugar de `url`

    // Retornamos la respuesta de la API
    return response.data
  } catch (error) {
    // Manejo del error
    if (error.response) {
      console.error('Error del servidor:', error.response.data) // Más detalles del servidor
      if (error.response.status === 401) {
        console.error('El token no es válido o ha expirado.')
      }
    } else {
      console.error('Error de conexión:', error.message)
    }
    throw error // Propagar el error
  }
}
