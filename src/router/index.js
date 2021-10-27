import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import NotFound from '../views/NotFound.vue'
import DbTest from '../views/DbTest.vue';
import Search from '../views/Search.vue';

import Register from '../views/profile/Register.vue';
import Login from '../views/profile/Login.vue';
import MyProfile from '../views/profile/MyProfile.vue';
import ChangeDetails from '../views/profile/ChangeDetails.vue';
import Admin from '../views/admin.vue';

import Auctions from '../views/Auctions.vue';
import AuctionDetail from '../views/AuctionDetail.vue';
import AuctionFilter from '../components/auction/AuctionFilter.vue';

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
    components: {
      default: Auctions,
      side: AuctionFilter
    },
    props: true,
    meta: { filter_view: true }
  },
  {
    path: '/auction/:id',
    name: 'Auction',
    component: AuctionDetail,
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
    component: MyProfile,
    meta: { requiresAuth: true }
  },
  {
    path: '/my-profile/settings',
    name: 'ChangeDetails',
    component: ChangeDetails,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: { requiresAuth: true, requiresAdmin: true }
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
