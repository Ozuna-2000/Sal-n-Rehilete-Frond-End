<template>
  <div>
    <h2>Lista de Usuarios</h2>
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Nombre de Usuario</th>
          <th>Contraseña</th>
          <th>Fecha de Nacimiento</th>
          <th>Email</th>
          <th>Teléfono</th>
          <th>Avatar</th>
          <th>Rol</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(usuario, index) in usuarios" :key="index">
          <td>{{ usuario.nombre }}</td>
          <td>{{ usuario.apellido }}</td>
          <td>{{ usuario.nombre_usuario }}</td>
          <td>{{ usuario.passw }}</td>
          <td>{{ usuario.fecha_nacimiento }}</td>
          <td>{{ usuario.email }}</td>
          <td>{{ usuario.telefono }}</td>
          <td><img :src="usuario.avatar" alt="Avatar" class="avatar" /></td>
          <td>{{ usuario.rol }}</td>
          <td>
            <button @click="editarUsuario(index)" class="btn edit-btn">Editar</button>
            <button @click="eliminarUsuario(index)" class="btn delete-btn">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { obtenerUsuarios } from '@/Apis/api'
import { useStore } from 'vuex'

const store = useStore() // Accedemos al storage
const usuarios = ref([]) // Declaramos un arreglo reactivo

// Funcion para obtener los usuarioa desde la api
const fetchUsuarios = async () => {
  try {
    const response = await obtenerUsuarios()
    usuarios.value = response // Se asigna la lista de usuarios a la variable
  } catch (error) {
    console.error('Error al obtener usuarios:', error)
  }
}

// Llama a la función para obtener usuarios al montar el componente
onMounted(() => {
  if (!store.getters.isAuthenticated) {
    alert('Debes iniciar sesión para ver la lista de usuarios.')
    return
  }
  fetchUsuarios()
})

// Metodos, sin uso aun oara eliminar y editar el usuario
const editarUsuario = (index) => {
  alert(`Editar usuario ${index + 1}`)
}

const eliminarUsuario = (index) => {
  alert(`Eliminar usuario ${index + 1}`)
}
</script>

<style scoped>
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
  white-space: nowrap; /* Evita que el texto se divida en varias líneas */
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
  border-radius: 50%; /* Hacer que la imagen sea circular */
}

.btn {
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  margin: 0 5px; /* Espaciado entre botones */
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
</style>
