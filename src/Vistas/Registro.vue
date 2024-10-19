<template>
  <div class="register-container">
    <div class="form-wrapper">
      <h1>Registro</h1>
      <form @submit.prevent="registrarUsuario">
        <!-- Nombre -->
        <div class="input-group">
          <label for="nombre">Nombre</label>
          <input
            type="text"
            v-model="nombre"
            id="nombre"
            placeholder="Ingresa tu nombre"
            required
          />
        </div>

        <!-- Apellido -->
        <div class="input-group">
          <label for="apellido">Apellido</label>
          <input
            type="text"
            v-model="apellido"
            id="apellido"
            placeholder="Ingresa tu apellido"
            required
          />
        </div>

        <!-- Nombre de usuario -->
        <div class="input-group">
          <label for="nombre_usuario">Nombre de Usuario</label>
          <input
            type="text"
            v-model="nombre_usuario"
            id="nombre_usuario"
            placeholder="Ingresa tu nombre de usuario"
            required
          />
        </div>

        <!-- Contraseña -->
        <div class="input-group">
          <label for="passw">Contraseña</label>
          <input
            type="password"
            v-model="passw"
            id="passw"
            placeholder="Ingresa tu contraseña"
            required
          />
        </div>

        <!-- Fecha de Nacimiento -->
        <div class="input-group">
          <label for="fecha_nacimiento">Fecha de Nacimiento</label>
          <input type="date" v-model="fecha_nacimiento" id="fecha_nacimiento" required />
        </div>

        <!-- Email -->
        <div class="input-group">
          <label for="email">Email</label>
          <input
            type="email"
            v-model="email"
            id="email"
            placeholder="Ingresa tu correo electrónico"
            required
          />
        </div>

        <!-- Teléfono -->
        <div class="input-group">
          <label for="telefono">Teléfono</label>
          <input
            type="tel"
            v-model="telefono"
            id="telefono"
            placeholder="Ingresa tu número de teléfono"
            required
          />
        </div>

        <!-- Botón de Registro -->
        <button type="submit" class="btn-register">Registrarse</button>
      </form>

      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>

      <!-- Enlace para volver al login -->
      <p>
        ¿Ya tienes una cuenta?
        <router-link to="/login">Inicia sesión aquí</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { registrarUsuarioApi } from '@/Apis/api' // Importa la función de registro

const router = useRouter()
const nombre = ref('')
const apellido = ref('')
const nombre_usuario = ref('')
const passw = ref('')
const fecha_nacimiento = ref('')
const email = ref('')
const telefono = ref('')
const errorMessage = ref('')
const successMessage = ref('')

const registrarUsuario = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  const datosUsuario = {
    nombre: nombre.value,
    apellido: apellido.value,
    nombre_usuario: nombre_usuario.value,
    passw: passw.value,
    fecha_nacimiento: fecha_nacimiento.value,
    email: email.value,
    telefono: telefono.value
  }

  try {
    const result = await registrarUsuarioApi(datosUsuario) // Llamada a la API de registro
    successMessage.value = 'Registro exitoso. Redirigiendo a la página de inicio de sesión...'
    setTimeout(() => {
      router.push('/login') // Redirige al login después de un registro exitoso
    }, 2000)
  } catch (error) {
    errorMessage.value = error.message || 'Error al registrar el usuario. Inténtalo de nuevo.'
  }
}
</script>

<style scoped>
/* Ajustes para el formulario en formato horizontal */
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80vw;
  height: 100vh;
  background-color: #f3f2f1;
  padding: 10px 20px;
}

.form-wrapper {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 450px; /* Ajuste para más espacio horizontal */
  width: 90%;
  text-align: center;
  animation: fadeIn 0.5s ease-in-out;
}

h1 {
  font-size: 20px;
}

.input-group {
  display: flex;
  justify-content: space-between; /* Espacio entre label e input */
  align-items: center; /* Centra verticalmente */
  margin-bottom: 15px;
}

.input-group label {
  flex-basis: 35%; /* Ajusta el ancho del label */
  font-size: 14px;
  text-align: left; /* Alineación a la izquierda */
}

.input-group input {
  flex-basis: 60%; /* Ajusta el ancho del input */
  padding: 8px;
  font-size: 14px;
}

.btn-register {
  background-color: #0078d4;
  color: #fff;
  padding: 10px 15px;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;
  transition: background-color 0.3s ease;
}

.btn-register:hover {
  background-color: #005a9e;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 10px;
}

.success-message {
  color: green;
  font-size: 12px;
  margin-top: 10px;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
