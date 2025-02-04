import { createRouter, createWebHistory } from 'vue-router'
import { useStore } from 'vuex'

import Inicio from '@/Vistas/inicioPrincipal/InicioPrincipal.vue'

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
    component: () => import('@/Vistas/paquetesYservicios/PaquetesExistentes.vue')
  },
  {
    path: '/servicios',
    name: 'servicios',
    component: () => import('@/Vistas/paquetesYservicios/ServiciosExistentes.vue')
  },
  {
    path: '/eventos',
    name: 'eventos',
    component: () => import('@/components/componenteEventos/EventosPrincipa.vue')
  },

  {
    path: '/paquete/:paqueteId/medios',
    name: 'DetallePaquete',
    component: () => import('@/components/componentePaquetes/DetallePaquete.vue'),
    props: true
  },
  {
    path: '/registrate',
    name: 'agregar-usuario',
    component: () => import('@/Vistas/registros/Registro.vue')
  },

  {
    path: '/ListaUsuarios',
    name: 'listaUsuarios',
    component: () => import('@/components/componenteUsuarios/ListarUsuarios.vue')
  },
  {
    path: '/VistaGerente',
    name: 'Gerente',
    component: () => import('@/Vistas/Gerente.vue'),
    meta: { requiresGerente: true }, // Meta para indicar que requiere rol de gerente
    children: [
      {
        path: 'paquetes-Gere',
        name: 'paquetes-gerente',
        component: () => import('@/components/componentePaquetes/AccionesPaquetes.vue')
      },
      {
        path: 'servicios',
        name: 'servicios-gerente',
        component: () => import('@/Vistas/paquetesYservicios/ServiciosExistentes.vue')
      },

      {
        path: 'paquetes/:paqueteId',
        name: 'paquetesitem',
        component: () => import('@/components/componentePaquetes/PaquetesItem.vue'), // Ajusta la ruta según la ubicación del componente
        props: true // Permite pasar el paqueteId como propiedad
      },
      {
        path: '/servicios/:servicioId',
        name: 'ServciosItem',
        component: () => import('@/components/componenteServicios/ServiciosItem.vue'),
        props: true
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
