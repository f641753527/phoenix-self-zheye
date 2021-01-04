import { createRouter, createWebHistory } from 'vue-router'
import BasicLayout from '../components/BasicLayout.vue'
import UserLayout from '../components/UserLayout.vue'
import Home from '../views/Home.vue'
import Columns from '../views/Columns.vue'
import CreatePost from '../views/CreatePost.vue'
import Login from '../views/auth/Login.vue'

const routes = [
  {
    path: '/auth',
    component: UserLayout,
    children: [
      {
        path: '',
        redirect: '/auth/login'
      },
      {
        path: 'login',
        component: Login
      }
    ]
  },
  {
    path: '/',
    component: BasicLayout,
    children: [
      {
        path: '',
        redirect: '/home'
      },
      {
        path: 'home',
        component: Home
      },
      {
        path: 'columns/:id',
        component: Columns
      },
      {
        path: 'create-post',
        component: CreatePost,
        meta: { auth: true }
      }
    ]
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
