import { createRouter, createWebHistory } from 'vue-router'
import login from '@/Vistas/registros/login.vue'
import Inicio from '@/Vistas/registros/Inicio/Inicio.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
      name: 'paquetes',
      component: () => import('@/Vistas/registros/ClienteAnonimo/paquetesexistentes.vue')
    },
    {
      path: '/servicios',
      name: 'servicios',
      component: () => import('@/Vistas/registros/ClienteAnonimo/serviciosexistentes.vue')
    },
    {
      path: '/agregarservicio',
      name: 'agregar-servio',
      component: () => import('@/components/agregarServicio.vue')
    },
    {
      path: '/agregarPaquetes',
      name: 'agregar',
      component: () => import('@/components/agregarPaquete.vue')
    }
  ]
})

export default router
