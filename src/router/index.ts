import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateTodoView from '../views/CreateTodoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/create',
      name: 'create',
      component: CreateTodoView
    },
    {
      path: '/edit/:taskId',
      name: 'edit',
      component: CreateTodoView,
      props: true
    }
  ]
})

export default router
