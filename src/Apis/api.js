import axios from 'axios'
import store from '@/store'

// Falta indicar poner el aplicasion=>json
export const crearEntrada = async (data) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/entrada', data) // Ennviamos los datos para hacer la peticion
    return response.data // devolvemos la respuesta de la api
  } catch (error) {
    console.error('Error al crear la entrada:', error)
    throw error // lanza el error en caso de la que api, no responda correctamente
  }
}

export const mostarPaquetes = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/paquetes')
    return response.data
  } catch (error) {
    console.log('error al acceser paquetes')
  }
}
export const mostrarServicios = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/servicios')
    return response.data
  } catch (error) {
    console.log('error al cargar')
  }
}

export const AgregarServicio = async (data, token) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/servicios/', data, {
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
