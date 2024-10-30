import { createRouter, createWebHistory } from 'vue-router'
import { useStore } from 'vuex'
import login from '@/Vistas/registros/login.vue'
import Inicio from '@/Vistas/registros/Inicio/Inicio.vue'
import paquetesexistentes from '@/Vistas/registros/ClienteAnonimo/paquetesexistentes.vue'

const routes = [
  {
    path: '/',
    name: 'inicio',
    component: Inicio
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../Vistas/registros/login.vue')
  },
  {
    path: '/paquetes',
    name: 'paquetes-clientes',
    component: () => import('@/Vistas/registros/ClienteAnonimo/paquetesexistentes.vue')
  },
  {
    path: '/servicios',
    name: 'servicios',
    component: () => import('@/Vistas/registros/ClienteAnonimo/serviciosexistentes.vue')
  },
  {
    path: '/agregarservicio',
    name: 'agregar-servicio',
    component: () => import('@/components/agregarServicio.vue')
  },
  {
    path: '/agregarPaquetes',
    name: 'agregar',
    component: () => import('@/components/agregarPaquete.vue')
  },
  {
    path: '/paquete/:paqueteId/medios',
    name: 'DetallePaquete',
    component: () => import('@/components/DetallePaquete.vue'),
    props: true
  },
  {
    path: '/registrate',
    name: 'agregar-usuario',
    component: () => import('@/Vistas/Registro.vue')
  },
  {
    path: '/VistaGerente',
    name: 'Gerente',
    component: () => import('@/Vistas/Gerente.vue'),
    meta: { requiresGerente: true }, // Meta para indicar que requiere rol de gerente
    children: [
      {
        path: 'paquetes',
        name: 'paquetes-gerente',
        component: () => import('@/Vistas/registros/ClienteAnonimo/paquetesexistentes.vue')
      },
      {
        path: 'servicios',
        name: 'servicios-gerente',
        component: () => import('@/Vistas/registros/ClienteAnonimo/serviciosexistentes.vue')
      },
      {
        path: 'ListaUsuarios',
        name: 'listaUsuarios',
        component: () => import('@/components/Usuarios/ListarUsuarios.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Implementación del guardia de navegación
router.beforeEach((to, from, next) => {
  const store = useStore() // Accedemos a la tienda Vuex
  const isAuthenticated = !!localStorage.getItem('token') // Verificamos si el token existe
  const userRole = store.getters.userRole // Obtenemos el rol del usuario desde Vuex

  // Verificar si la ruta requiere autenticación
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login' }) // Redirigir a la página de inicio de sesión
  } else if (to.meta.requiresGerente && userRole !== 'Gerente') {
    next({ name: 'inicio' }) // Redirigir a la página de inicio si no es gerente
  } else {
    next() // Permitir el acceso
  }
})

export default router
