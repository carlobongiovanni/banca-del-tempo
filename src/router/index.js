import { createRouter, createWebHistory } from 'vue-router'
//import { useAuthStore } from '@/stores';
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import NotFound from '../views/NotFound.vue'
import CalendarView from '../views/CalendarView.vue'
import UserProfileView from '../views/UserProfileView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/profile',
      name: 'profile',
      component: UserProfileView
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: CalendarView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },    
    {
      path: "/:catchAll(.*)",
      component: NotFound,
    },

  ]
})

export default router
