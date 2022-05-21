import { createRouter, createWebHistory } from 'vue-router'
import homeView from '../views/home.vue'
import itemdetailsView from '../views/itemdetails.vue'
import loginView from '../views/login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: homeView
    },
    {
      path: '/itemdetails',
      component: itemdetailsView
    },
    {
      path: '/login',
      component: loginView
    }
  ]
})

export default router
