<template>
  <div class="login-container">
    <div class="form-wrapper">
      <h2>Iniciar Sesión</h2>
      <form @submit.prevent="insertar">
        <div class="input-group">
          <label for="nombre_usuario">Usuario</label>
          <input
            type="text"
            v-model="nombre_usuario"
            id="nombre_usuario"
            placeholder="Ingresa tu usuario"
            required
          />
        </div>
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
        <button type="submit" class="btn-login">Iniciar Sesión</button>
      </form>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <!-- Mensaje de error -->
      <p>
        ¿No tienes una cuenta?
        <router-link to="/registrate">Regístrate aquí</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { crearEntrada } from '@/Apis/api'

const store = useStore()
const router = useRouter()

// Estados para el nombre de usuario, la contraseña y el mensaje de error
const nombre_usuario = ref('')
const passw = ref('')
const errorMessage = ref('')

const insertar = async () => {
  errorMessage.value = ''
  try {
    const data = { nombre_usuario: nombre_usuario.value, passw: passw.value }
    console.log('Enviando datos de inicio de sesión:', data)
    const result = await crearEntrada(data)
    console.log('Respuesta de la API:', result)

    const token = result.token
    const role = result.rol

    store.dispatch('login', { token, role })

    if (role === 'Gerente') {
      router.push('/')
    } else if (role === 'cliente') {
      router.push('/')
    } else if (role === 'empleado') {
      router.push('/')
    } else {
      router.push('/')
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error)
    errorMessage.value = 'Usuario y contraseña incorrectos'
  }
}
</script>

<style scoped>
/* Contenedor principal */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Mantiene el contenedor con la altura de la pantalla completa */
  width: 80vw; /* Asegura que ocupe todo el ancho de la pantalla */
  background-color: #f3f2f1; /* Color de fondo similar al de Outlook */
  padding: 0 40px; /* Agrega espacio horizontal sin afectar el ajuste vertical */
}
/* Wrapper del formulario */
.form-wrapper {
  background-color: #ffffff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* Sombra ligera */
  max-width: 400px;
  width: 100%;
  text-align: center;
  animation: fadeIn 0.5s ease-in-out;
  margin: 20px; /* Margen reducido para un mejor aspecto */
}

/* Estilo del título */
h2 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
  font-weight: 400;
  text-align: left; /* Alineación del título a la izquierda */
}

/* Estilos del grupo de inputs */
.input-group {
  margin-bottom: 20px;
  text-align: left;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
  color: #333;
}

.input-group input {
  width: 100%;
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
  transition: border-color 0.3s ease;
  background-color: #f9f9f9; /* Fondo suave como en Outlook */
}

.input-group input:focus {
  border-color: #0078d4; /* Color de borde de enfoque similar al de Outlook */
  outline: none;
}

/* Botón de inicio de sesión */
.btn-login {
  background-color: #0078d4;
  color: #fff;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  width: 100%; /* Botón de ancho completo */
  margin-top: 10px;
  transition: background-color 0.3s ease;
}

.btn-login:hover {
  background-color: #005a9e; /* Cambio de color al pasar el cursor */
}

/* Estilo del mensaje de error */
.error-message {
  color: red;
  font-size: 14px;
  margin-top: 10px;
}

/* Animación de aparición */
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
