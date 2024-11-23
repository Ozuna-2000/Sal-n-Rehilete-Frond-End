<template>
  <div>
    <h2>Lista de Usuarios</h2>
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Nombre de Usuario</th>
          <th>Fecha de Nacimiento</th>
          <th>Email</th>
          <th>Teléfono</th>
          <th>Avatar</th>
          <th>Rol</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(usuario, index) in usuarios" :key="usuario.id">
          <td>{{ usuario.nombre }}</td>
          <td>{{ usuario.apellido }}</td>
          <td>{{ usuario.nombre_usuario }}</td>
          <td>{{ usuario.fecha_nacimiento }}</td>
          <td>{{ usuario.email }}</td>
          <td>{{ usuario.telefono }}</td>
          <td><img :src="usuario.avatar" alt="Avatar" class="avatar" /></td>
          <td>{{ usuario.rol }}</td>
          <td>
            <button @click="editarUsuario(index)" class="btn edit-btn">Editar</button>
            <button @click="eliminarUsuario(usuario.id)" class="btn delete-btn">Eliminar</button>
          </td>
        </tr>
        <!-- Fila para agregar un usuario -->
        <tr>
          <td><input v-model="nuevoUsuario.nombre" type="text" placeholder="Nombre" /></td>
          <td><input v-model="nuevoUsuario.apellido" type="text" placeholder="Apellido" /></td>
          <td>
            <input
              v-model="nuevoUsuario.nombre_usuario"
              type="text"
              placeholder="Nombre de Usuario"
            />
          </td>
          <td><input v-model="nuevoUsuario.fecha_nacimiento" type="date" /></td>
          <td><input v-model="nuevoUsuario.email" type="email" placeholder="Email" /></td>
          <td><input v-model="nuevoUsuario.telefono" type="text" placeholder="Teléfono" /></td>

          <td>
            <select v-model="nuevoUsuario.rol">
              <option value="Cliente">Cliente</option>
              <option value="Gerente">Gerente</option>
              <option value="Empleado">Empleado</option>
            </select>
          </td>
          <td>
            <input v-model="nuevoUsuario.passw" type="password" placeholder="Contraseña" />
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Botón de agregar usuario, fuera de la tabla -->
    <div class="add-button-container">
      <button @click="agregarUsuario" class="btn add-btn">Agregar Usuario</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { obtenerUsuarios, crearUsuario, EliminarUsuario } from '@/Apis/api' // Asegúrate de tener la función eliminarUsuario importada
import { useStore } from 'vuex'

const store = useStore()
const usuarios = ref([])

const nuevoUsuario = ref({
  nombre: '',
  apellido: '',
  nombre_usuario: '',
  fecha_nacimiento: '', // Formato de fecha es año-mes-día
  email: '',
  telefono: '',
  avatar: '', // Campo vacío para el avatar
  rol: 'Cliente',
  passw: ''
})

const isGerente = computed(() => {
  const role = store.getters.userRole
  return role === 'Gerente'
})

// Obtener usuarios de la API
const fetchUsuarios = async () => {
  try {
    const response = await obtenerUsuarios()
    usuarios.value = response
  } catch (error) {
    console.error('Error al obtener usuarios:', error)
  }
}

// Formatear la fecha al formato Y/m/d (año/mes/día)
const formatearFecha = (fecha) => {
  const fechaObj = new Date(fecha)
  const anio = fechaObj.getFullYear()
  const mes = (fechaObj.getMonth() + 1).toString().padStart(2, '0') // Mes de 2 dígitos
  const dia = fechaObj.getDate().toString().padStart(2, '0') // Día de 2 dígitos
  return `${anio}/${mes}/${dia}`
}

// Agregar usuario a la API
const agregarUsuario = async () => {
  if (!isGerente.value) {
    alert('Solo los gerentes pueden crear usuarios.')
    return
  }

  // Validación de campos obligatorios
  if (
    !nuevoUsuario.value.nombre ||
    !nuevoUsuario.value.apellido ||
    !nuevoUsuario.value.nombre_usuario ||
    !nuevoUsuario.value.passw ||
    !nuevoUsuario.value.fecha_nacimiento ||
    !nuevoUsuario.value.email ||
    !nuevoUsuario.value.telefono ||
    !nuevoUsuario.value.rol
  ) {
    alert('Por favor, completa todos los campos obligatorios.')
    return
  }

  // Verificar si el rol está permitido
  const rolesPermitidos = ['Cliente', 'Gerente', 'Empleado']
  if (!rolesPermitidos.includes(nuevoUsuario.value.rol)) {
    alert('Rol no permitido.')
    return
  }

  try {
    // Formatear la fecha antes de enviarla
    const fechaFormateada = formatearFecha(nuevoUsuario.value.fecha_nacimiento)
    nuevoUsuario.value.fecha_nacimiento = fechaFormateada

    const token = store.getters.token
    const usuarioCreado = await crearUsuario(nuevoUsuario.value, token)

    usuarios.value.push({
      ...usuarioCreado,
      contraseña: undefined // Ocultar contraseña
    })
    alert('Usuario creado exitosamente.')

    // Limpiar formulario después de agregar
    nuevoUsuario.value = {
      nombre: '',
      apellido: '',
      nombre_usuario: '',
      fecha_nacimiento: '',
      email: '',
      telefono: '',
      avatar: '',
      rol: 'Cliente',
      passw: ''
    }
  } catch (error) {
    console.error('Error al agregar usuario:', error)
    alert('Ocurrió un error al agregar el usuario.')
  }
}

// Eliminar usuario de la API
const eliminarUsuario = async (usuarioId) => {
  try {
    const token = store.getters.token
    await EliminarUsuario(usuarioId, token) // Llamar a la API para eliminar el usuario

    // Eliminar el usuario de la lista local
    usuarios.value = usuarios.value.filter((usuario) => usuario.id !== usuarioId)
    alert('Usuario eliminado exitosamente.')
  } catch (error) {
    console.error('Error al eliminar el usuario:', error)
    alert('Ocurrió un error al eliminar el usuario.')
  }
}

// Ejecutar al montar
onMounted(() => {
  if (!store.getters.isAuthenticated) {
    alert('Debes iniciar sesión para ver la lista de usuarios.')
    return
  }
  fetchUsuarios()
})

const editarUsuario = (index) => {
  alert(`Editar usuario ${index + 1}`)
}
</script>

<style scoped>
/* Estilos de la tabla y botones */
table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

thead {
  background-color: #007bff;
  color: white;
}

th,
td {
  padding: 12px;
  text-align: left;
  white-space: nowrap;
}

tbody tr {
  transition: background-color 0.3s;
}

tbody tr:hover {
  background-color: #f1f1f1;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

input,
select {
  width: 100%;
  padding: 5px;
  box-sizing: border-box;
}

input[type='date'] {
  font-family: inherit;
}

.btn {
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  margin: 0 5px;
}

.edit-btn {
  background-color: #28a745;
  color: white;
}

.edit-btn:hover {
  background-color: #218838;
}

.delete-btn {
  background-color: #dc3545;
  color: white;
}

.delete-btn:hover {
  background-color: #c82333;
}

.add-btn {
  background-color: #007bff;
  color: white;
}

.add-btn:hover {
  background-color: #0056b3;
}

/* Botón fuera de la tabla */
.add-button-container {
  text-align: center;
  margin-top: 20px;
}
</style>
