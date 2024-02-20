import { createRouter, createWebHistory } from 'vue-router'
import InterpreterView from "@/views/InterpreterView.vue";
import AboutView from "@/views/AboutView.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Ossia - Interpreter',
      component: InterpreterView
    },
    {
      path: '/about',
      name: 'Ossia - About',
      component: AboutView
    }
  ]
})

export default router
