import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import NotFound from '../views/NotFound.vue'
import DbTest from '../views/DbTest.vue';
import Search from '../views/Search.vue';

import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import MyProfile from '../views/MyProfile.vue';

import Auctions from '../views/Auctions.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/auctions',
    name: 'Auctions',
    component: Auctions,
    props: true,
  },
  {
    path: '/db-test',
    name: 'DbTest',
    component: DbTest
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/my-profile',
    name: 'MyProfile',
    component: MyProfile
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },

  // redirect
  {
    path: "/all-jobs",
    redirect: '/jobs'
  },

  // catch all 404
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
