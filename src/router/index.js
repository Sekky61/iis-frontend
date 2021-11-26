import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';

import NotFound from '../views/NotFound.vue';
import NoPermission from '../views/NoPermission.vue';

import SingleLayout from '../layouts/SingleLayout.vue';
import FilterLayout from '../layouts/FilterLayout.vue';

import Register from '../views/profile/Register.vue';
import Login from '../views/profile/Login.vue';
import MyProfile from '../views/profile/MyProfile.vue';
import ChangeDetails from '../views/profile/ChangeDetails.vue';

// admin
import AdminDashboard from '../views/admin/Dashboard.vue';
import AdminUsers from '../views/admin/Users.vue';

// licit
import LicitDashboard from '../views/licit/Dashboard.vue';
import LicitAllAuctions from '../views/licit/AllAuctions.vue';
import LicitMyAuctions from '../views/licit/MyAuctions.vue';
import LicitConfirm from '../views/licit/Confirm.vue';

import AddAuction from '../views/user/CreateAuction.vue';
import UserAuctionList from '../views/user/AuctionList.vue';
import UserAuctionsDashboard from '../views/user/AuctionsDashboard.vue';
import UserParticipatesList from '../views/user/ParticipatesList.vue';

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
    path: '/',
    component: SingleLayout,
    children: [

      {
        path: '/about',
        name: 'About',
        component: About
      },
      {
        path: '/auction/:id',
        name: 'Auction',
        component: AuctionDetail,
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
        path: '/add-auction',
        name: 'AddAuction',
        component: AddAuction,
        meta: { requiresAuth: true }
      },
      {
        path: '/user-auctions',
        name: 'UserAuctionsDashboard',
        component: UserAuctionsDashboard,
        meta: { requiresAuth: true }
      },
      {
        path: '/user-auction-list',
        name: 'UserParticipatesList',
        component: UserParticipatesList,
        meta: { requiresAuth: true }
      },
      {
        path: '/user-auction-list',
        name: 'UserAuctionList',
        component: UserAuctionList,
        meta: { requiresAuth: true }
      },
      {
        path: '/admin',
        component: SingleLayout,
        meta: { requiresAuth: true, requiresAdmin: true },
        children: [
          {
            path: '',
            name: 'AdminDashboard',
            component: AdminDashboard,
          },
          {
            path: 'users',
            name: 'AdminUsers',
            component: AdminUsers,
          },
        ]
      },
      {
        path: '/licit',
        component: SingleLayout,
        meta: { requiresAuth: true, requiresLicit: true },
        children: [
          {
            path: '',
            name: 'LicitDashboard',
            component: LicitDashboard,
          },
          {
            path: 'all-auctions',
            name: 'LicitAllAuctions',
            component: LicitAllAuctions,
          },
          {
            path: 'my-auctions',
            name: 'LicitMyAuctions',
            component: LicitMyAuctions,
          },
          {
            path: 'confirm-requests',
            name: 'LicitConfirm',
            component: LicitConfirm,
          },

        ]
      },
    ]
  },

  {
    path: '/auctions',
    component: FilterLayout,
    children: [
      {
        path: '',
        name: 'Auctions',
        components: {
          default: Auctions,
          side: AuctionFilter
        },
        props: true,
      },
    ],
    props: true,
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
    path: '/no-permission',
    name: 'NoPermission',
    component: NoPermission
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
