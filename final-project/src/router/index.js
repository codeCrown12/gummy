import { createRouter, createWebHistory } from 'vue-router'
import searchView from '../views/searchitems.vue'
import itemdetailsView from '../views/itemdetails.vue'
import loginView from '../views/login.vue'
import signUpView from '../views/signup.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: searchView
    },
    {
      path: '/itemdetails',
      component: itemdetailsView
    },
    {
      path: '/login',
      component: loginView
    },
    {
      path: '/signup',
      component: signUpView
    }
  ]
})

export default router
