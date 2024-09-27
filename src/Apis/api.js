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

export const mostarPaquetes = async () => {
  try {
    const response = await axios.get('https://back.rehilete.mx/api/paquetes/existentes')
    return response.data
  } catch (error) {
    console.log('error al acceser paquetes')
  }
}
export const mostrarServicios = async () => {
  try {
    const response = await axios.get('https://back.rehilete.mx/api/servicios/existentes')
    return response.data
  } catch (error) {
    console.log('error al cargar')
  }
}

export const AgregarServicio = async () => {
  try {
    const response = await axios.post('https://back.rehilete.mx/api/servicios/', data, {
      headers: {
        Authorization: `Bearer ${token}` // Incluyendo el token
      }
    })
    return response.data
  } catch (error) {
    console.error('Error al agregar el servicio:', error)
    throw error
  }
}
