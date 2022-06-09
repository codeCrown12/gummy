import { createRouter, createWebHistory } from 'vue-router'
import searchView from '../views/searchitems.vue'
import itemdetailsView from '../views/itemdetails.vue'
import loginView from '../views/login.vue'
import signUpView from '../views/signup.vue'
import userDashboard from '../views/userdashboard/mainlayout.vue'
import overview from '../views/userdashboard/overview.vue'
import settings from '../views/userdashboard/settings.vue'
import inventory from '../views/userdashboard/inventory.vue'
import listitem from '../views/userdashboard/listitem.vue'

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
    },
    {
      path: '/userdashboard',
      component: userDashboard,
      children: [
        {
          path: '/userdashboard/overview',
          component: overview
        },
        {
          path: '/userdashboard/settings',
          component: settings
        },
        {
          path: '/userdashboard/myinventory',
          component: inventory
        },
        {
          path: '/userdashboard/listitem',
          component: listitem
        }
      ]
    }
  ]
})

export default router
