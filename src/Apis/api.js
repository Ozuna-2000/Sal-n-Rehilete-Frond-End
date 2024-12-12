import axios from 'axios'
import store from '@/store'

const url = 'https://back.rehilete.mx'
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
    const response = await axios.post('http://127.0.0.1:8000/api/paquetes', data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    console.log('Paquete agregado con éxito:', response.data)
    return response.data
  } catch (error) {
    console.log('Error al cargar el paquete:', error.response ? error.response.data : error)
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
  console.log('Paquete ID recibido:', paqueteId) // Verifica el valor de paqueteId
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

export const EliminarPaqueteId = async (paqueteId) => {
  try {
    const token = store.state.token
    const response = await axios.delete(`${url}/api/paquetes/${paqueteId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  } catch (error) {
    console.error('Error al eliminar el paquete:', error)
    throw error // Esto permite que el error se maneje en el componente
  }
}

export const crearUsuario = async (usuarios) => {
  try {
    const token = store.state.token // Obtener el token desde Vuex
    const rol = store.state.role // Obtener el rol desde Vuex

    console.log('Rol del usuario:', rol) // Verifica el rol (si es necesario)

    // Realizar la solicitud a la API para crear el usuario
    const respuesta = await axios.post(`${url}/api/usuarios/`, usuarios, {
      headers: {
        Authorization: `Bearer ${token}` // Agregar el token al header
      }
    })

    return respuesta.data // Devolvemos los datos de la respuesta
  } catch (error) {
    console.error('Error al crear el usuario:', error.response?.data || error.message)
    throw error // Lanza el error para manejarlo en donde se llame la función
  }
}
// Asegúrate de tener la URL correcta

export const EliminarUsuario = async (usuarioId) => {
  // Verificar que el usuarioId esté presente y sea válido
  if (!usuarioId) {
    console.error('Error: usuarioId no proporcionado.')
    return
  }

  try {
    const token = store.state.token // Asegúrate de que el token esté en el estado correcto de Vuex
    if (!token) {
      console.error('Error: Token no encontrado.')
      return
    }

    // Realizar la petición DELETE
    const response = await axios.delete(`${url}/api/usuarios/${usuarioId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    // Si la eliminación es exitosa, puedes manejar los datos que devuelve la API
    return response.data
  } catch (error) {
    // Mejor manejo de errores, por ejemplo, mostrar el mensaje de error si está disponible
    console.error(
      'Error al eliminar el usuario:',
      error.response ? error.response.data : error.message
    )
    throw error // Para manejar el error en el componente
  }
}

export const deleteImage = async (paqueteId, medioId) => {
  const token = store.state.token // Obtiene el token de Vuex

  try {
    const response = await axios.delete(`${url}/api/paquetes/${paqueteId}/medios/${medioId}`, {
      headers: {
        Authorization: `Bearer ${token}` // Enviar token en los encabezados
      }
    })
    console.log('Imagen eliminada con éxito:', response.data)
    return true // Retorna true si la eliminación fue exitosa
  } catch (error) {
    console.error('Error al eliminar la imagen:', error)
    alert('No se pudo eliminar la imagen.')
    return false // Retorna false si ocurrió un error
  }
}

export const actualizarPaquete = async (idPaquete, data, token) => {
  try {
    const formData = new FormData()

    // Agregar los datos del paquete
    formData.append('nombre', data.nombre)
    formData.append('precio', data.precio)
    formData.append('descripcion', data.descripcion)
    formData.append('activo', data.activo)

    // Se indica que es una actualización usando _method
    formData.append('_method', 'PUT')

    // Enviar la solicitud POST con el Content-Type adecuado
    const response = await axios.post(`${url}/api/paquetes/${idPaquete}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    console.log('Paquete actualizado:', response.data)
    return response.data
  } catch (error) {
    console.error('Error al actualizar el paquete:', error.response ? error.response.data : error)
    throw error // Lanza el error si hay un problema con la solicitud
  }
}

export const subirImagenPaquete = async (paqueteId, archivos, token) => {
  try {
    // Crear una instancia de FormData para enviar los archivos
    const formData = new FormData()
    archivos.forEach((archivo) => {
      formData.append('imagenes[]', archivo) // 'imagenes[]' es el nombre esperado por la API
    })

    // Realizar la solicitud POST a la API
    const response = await axios.post(`${url}/api/paquetes/${paqueteId}/medios`, formData, {
      headers: {
        Authorization: `Bearer ${token}`, // Token de autenticación
        'Content-Type': 'multipart/form-data' // Indicar que se está enviando un formulario con archivos
      }
    })

    // Devolver la respuesta de la API
    return response.data
  } catch (error) {
    console.error('Error al subir las imágenes:', error)
    throw error // Reenviar el error para manejarlo en el componente
  }
}
