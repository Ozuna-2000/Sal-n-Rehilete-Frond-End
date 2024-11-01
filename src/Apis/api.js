import axios from 'axios'
import store from '@/store'

const url = 'http://127.0.0.1:8000'
// Falta indicar poner el aplicasion=>json
export const crearEntrada = async (data) => {
  try {
    const response = await axios.post(`${url}/api/entrada`, data) // Ennviamos los datos para hacer la peticion
    return response.data // devolvemos la respuesta de la api
  } catch (error) {
    console.error('Error al crear la entrada:', error)
    throw error // lanza el error en caso de la que api, no responda correctamente
  }
}
export const mostrarPaquetes = async () => {
  try {
    const token = store.state.token
    console.log('Token:', token)

    const headers = {}

    // Si hay un token, lo añadimos a los headers
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    // Llama a la misma ruta y permite que la API maneje la lógica de permisos
    const response = await axios.get(`${url}/api/paquetes`, { headers })

    return response.data
  } catch (error) {
    console.log('Error al acceder a paquetes:', error)
  }
}
export const mostrarServicios = async () => {
  try {
    const response = await axios.get(`${url}/api/servicios`)
    return response.data
  } catch (error) {
    console.log('error al cargar')
  }
}

export const AgregarServicio = async (data, token) => {
  try {
    const response = await axios.post(`${url}/api/servicios/`, data, {
      headers: {
        Authorization: `Bearer ${token}` // en esta parte de includeye el token
      }
    })
    return response.data // devuelve los datos
  } catch (error) {
    console.error('Error al agregar el servicio:', error.response ? error.response.data : error)
    throw error // Lanza el error en caso de que este mal
  }
}

export const AgregarPaquete = async (data, token) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/paquetes/', data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  } catch (error) {
    console.log('error al cargaar el paquete', error.response ? error.response.data : error)
  }
}
// Petion de prueba para ver si obtiene las imagenes
export const obtenerMediosPaquete = async (idPaquete, token) => {
  const response = await axios.get(`http://127.0.0.1:8000/api/paquetes/${idPaquete}/medios`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}

//Peticion de la api para el registro de un nuevo usuario " es auntoregistro no require token"
export const registrarUsuarioApi = async (data) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/usuarios/registrar', data)
    return response.data
  } catch (error) {
    console.error('Error al registrar el usuario:', error.response ? error.response.data : error)
    throw error
  }
}
// Funcion par obtener los usuarios existentes, "Esto lo hace el gerente por lo que requiere un token "
export const obtenerUsuarios = async () => {
  try {
    const token = store.state.token
    console.log('Token:', token)

    if (!token) {
      throw new Error('No se encontró un token de autenticación')
    }

    const response = await axios.get('http://127.0.0.1:8000/api/usuarios', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.data // Devuelve solo los datos de la respuesta
  } catch (error) {
    console.error(
      'Error al cargar los datos:',
      error.response ? error.response.data : error.message
    )
    alert(error.response ? error.response.data.errors : 'Error al cargar los datos')
    return [] // Devuelve un array vacío en caso de error
  }
}
export const cerrarSesion = async (token) => {
  try {
    const response = await axios.post(
      `${url}/api/salida`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    return response.data // Devuelve la respuesta de la API si es necesario
  } catch (error) {
    console.error('Error al cerrar sesión:', error.response ? error.response.data : error)
    throw error // Lanza el error en caso de que la API no responda correctamente
  }
}
export const obtenerPaquetePorId = async (paqueteId) => {
  try {
    const response = await axios.get(`${url}/api/paquetes/${paqueteId}`)
    return response.data
  } catch (error) {
    console.log('Error al acceder al paquete específico:', error)
    throw error
  }
}

export const ActivarPaqueteId = async (paqueteId) => {
  try {
    // Obtén el token del estado de Vuex
    const token = store.state.token

    const response = await axios.put(`${url}/api/paquetes/activar/${paqueteId}`, null, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  } catch (error) {
    console.error('Error al activar el paquete:', error)
  }
}
