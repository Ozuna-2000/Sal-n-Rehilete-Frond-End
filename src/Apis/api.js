import axios from 'axios'

// Función para enviar datos a la API
export const crearEntrada = async (data) => {
  try {
    const response = await axios.post('https://back.rehilete.mx/api/entrada', data) // Envía los datos como cuerpo de la petición
    return response.data // Devuelve los datos de la respuesta
  } catch (error) {
    console.error('Error al crear la entrada:', error)
    throw error // Lanza el error para manejarlo en el componente
  }
}
