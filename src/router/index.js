import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Auth/Login.vue'
import Warehousman from '../views/Warehousman/Warehousman.vue'
import Director from '../views/Director/Director.vue'
import Financier from '../views/Financier/Financier.vue'
import Clients from '../views/Clients/Clients.vue'
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path:"/product-list",
    name:'product-list',
    component:Warehousman
  },
  {
    path:'/director',
    name:'director',
    component:Director
  },
  {
    path:'/clients',
    name:'clients',
    component:Clients
  },
  {
    path:'/financier',
    name:'financier',
    component:Financier
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
