<template>
  <div class="agregar-paquete-vista">
    <h2>Agregar Paquete</h2>

    <!-- Formulario para agregar un paquete -->
    <form @submit.prevent="enviarPaquete" v-if="!paqueteAgregado">
      <!-- Campo para el nombre del paquete -->
      <div class="campo campo-nombre">
        <label for="nombre">Nombre del Paquete</label>
        <input
          v-model="nombre"
          type="text"
          id="nombre"
          required
          placeholder="Ingresa el nombre del paquete"
        />
      </div>

      <!-- Campo para el precio -->
      <div class="campo campo-precio">
        <label for="precio">Precio</label>
        <input
          v-model="precio"
          type="number"
          id="precio"
          required
          placeholder="Ingresa el precio"
        />
      </div>

      <!-- Campo para la descripción -->
      <div class="campo campo-descripcion">
        <label for="descripcion">Descripción</label>
        <textarea
          v-model="descripcion"
          id="descripcion"
          required
          placeholder="Descripción del paquete"
        ></textarea>
      </div>

      <!-- Campo para las imágenes (múltiples) -->
      <div class="campo campo-imagen">
        <label for="imagen">Imágenes del Paquete</label>
        <div class="drop-area" @dragover.prevent @drop.prevent="onDrop">
          <input
            type="file"
            id="imagen"
            accept="image/jpeg, image/png, image/jpg, image/webp, image/avif"
            required
            multiple
            @change="onImageSelected"
          />
          <div v-if="imagenes.length === 0" class="placeholder-text">
            Arrastra y suelta las imágenes aquí
          </div>
          <!-- Mostrar las imágenes previas -->
          <div class="imagenes-previas">
            <div v-for="(imagen, index) in imagenes" :key="index" class="imagen-previa">
              <img :src="imagen.url" :alt="'Imagen ' + (index + 1)" />
            </div>
          </div>
        </div>
      </div>

      <!-- Mensaje de éxito o error -->
      <p v-if="mensaje" :class="mensajeClase">{{ mensaje }}</p>

      <button type="submit">Agregar Paquete</button>
    </form>

    <!-- Mensaje de activación del paquete -->
    <div v-if="paqueteAgregado">
      <p>¿Desea activar el paquete recién agregado?</p>
      <button @click="activarPaquete">Sí, activar</button>
      <button @click="cancelarPaquete">No, dejar inactivo</button>
    </div>
  </div>
</template>

<script setup>
import { useAgregarPaquete } from '../Gerente/AgregarPaquete'
import store from '@/store'
import { ref, onMounted } from 'vue'
import { obtenerPaquetePorId } from '@/Apis/api' // Importa la función

// Obtener el token del store
const token = store.state.token

// Usar la lógica compartida de AgregarPaquete
const { mensaje, mensajeClase, paqueteAgregado, enviarPaquete, activarPaquete, cancelarPaquete } =
  useAgregarPaquete(token)

const nombre = ref('')
const precio = ref('')
const descripcion = ref('')
const imagenes = ref([])

// Obtener el id del paquete desde los parámetros de la ruta
const paqueteId = store.state.paqueteId // Asegúrate de pasar el paqueteId correctamente

// Llamar a la función para cargar los datos del paquete al montar el componente
onMounted(async () => {
  try {
    // Obtén los datos del paquete desde la API
    const paqueteData = await obtenerPaquetePorId(paqueteId)

    // Asigna los datos al formulario
    nombre.value = paqueteData.nombre
    precio.value = paqueteData.precio
    descripcion.value = paqueteData.descripcion
  } catch (error) {
    console.error('Error al obtener el paquete:', error)
    mensaje.value = 'No se pudo cargar el paquete.'
    mensajeClase.value = 'error'
  }
})

// Función para manejar imágenes seleccionadas
const onImageSelected = (event) => {
  const files = event.target.files
  // Limpiar imágenes previas de forma reactiva
  imagenes.value = []

  Array.from(files).forEach((file) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'image/avif']

    if (allowedTypes.includes(file.type)) {
      const reader = new FileReader()
      reader.onload = (e) => {
        // Añadir la imagen al array de imágenes con la URL leída
        imagenes.value.push({ file, url: e.target.result })

        // Verificar el contenido de las imágenes en consola
        console.log('Imagen seleccionada:', imagenes.value)
      }
      reader.onerror = () => {
        mensaje.value = 'Hubo un problema al leer el archivo.'
        mensajeClase.value = 'error'
      }
      reader.readAsDataURL(file)
    } else {
      mensaje.value = 'Solo se permiten archivos JPEG, PNG, JPG, WEBP y AVIF.'
      mensajeClase.value = 'error'
    }
  })
}

// Función para manejar imágenes arrastradas y soltadas
const onDrop = (event) => {
  const files = event.dataTransfer.files
  // Limpiar imágenes previas de forma reactiva
  imagenes.value = []

  Array.from(files).forEach((file) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'image/avif']

    // Verificar si el archivo es válido
    if (allowedTypes.includes(file.type)) {
      const reader = new FileReader()
      reader.onload = (e) => {
        // Añadir la imagen al array de imágenes con la URL leída
        imagenes.value.push({ file, url: e.target.result })

        // Verificar el contenido de las imágenes en consola
        console.log('Imagen arrastrada y soltada:', imagenes.value)
      }
      reader.onerror = () => {
        mensaje.value = 'Hubo un problema al leer el archivo.'
        mensajeClase.value = 'error'
      }
      reader.readAsDataURL(file)
    } else {
      mensaje.value = 'Solo se permiten archivos JPEG, PNG, JPG, WEBP y AVIF.'
      mensajeClase.value = 'error'
    }
  })
}
</script>

<style scoped>
/* Contenedor principal del formulario */
.agregar-paquete-vista {
  width: 80vw;
  min-height: 200vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
  text-align: center;
  background-color: #1e0626;
  box-sizing: border-box;
  margin-left: -13.5vw;
  transform: translateY(-29px);
}

/* Ajusta los estilos del formulario y reduce el margen */
form {
  width: 100%;
  max-width: 600px;
  margin-top: 20px;
}

/* Ajuste general para que cada campo del formulario tenga menos espacio vertical */
.campo {
  width: 100%;
  max-width: 800px;
  margin-bottom: 15px;
  background-color: #f3ffe6;
  padding: 20px;
  border-radius: 8px;
  box-sizing: border-box;
}

/* Ajuste específico para el campo "Nombre del Paquete" */
.campo-nombre input {
  width: 100%;
  padding: 10px;
  font-size: 1.1rem;
}

/* Ajuste específico para el campo "Precio" */
.campo-precio input {
  width: 100%;
  padding: 10px;
  font-size: 1.1rem;
}

/* Ajuste específico para el campo "Descripción" */
.campo-descripcion textarea {
  width: 100%;
  padding: 10px;
  font-size: 1.1rem;
  min-height: 100px;
}

/* Ajuste específico para el campo "Imagen" */
.campo-imagen {
  width: 100%;
  padding: 20px;
  background-color: #f3ffe6;
  border-radius: 8px;
  box-sizing: border-box;
}

.drop-area {
  width: 100%;
  height: 150px;
  border: 2px dashed #67bc32;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
}

.placeholder-text {
  font-size: 1.2rem;
  color: #67bc32;
  margin-top: 10px;
}

.imagenes-previas {
  display: flex;
  flex-wrap: wrap;
  gap: 10px; /* Espacio entre las imágenes */
  justify-content: center;
  margin-top: 10px;
}

.imagen-previa {
  width: 80px; /* Tamaño de la miniatura */
  height: 80px; /* Tamaño de la miniatura */
  overflow: hidden; /* Para que la imagen no sobresalga */
  border-radius: 5px; /* Bordes redondeados */
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.imagen-previa img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Hace que la imagen se recorte adecuadamente */
}

/* Estilos para las etiquetas de los campos */
.campo label {
  font-size: 1.2rem;
  font-weight: 600;
  color: #67bc32;
  margin-bottom: 8px;
  display: block;
  text-align: left;
}

/* Estilos para el botón de enviar */
button {
  padding: 15px 25px;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  max-width: 200px;
  margin-top: 20px;
  background-color: #ff6161;
}

/* Efecto de hover al pasar el cursor sobre el botón */
button:hover {
  background-color: #ffcccc;
}

/* Estilos generales para los párrafos de texto */
p {
  font-size: 1rem;
  margin-top: 10px;
}

.success {
  color: green;
}

.error {
  color: red;
}

.info {
  color: blue;
}
</style>
