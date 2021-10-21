import { createApp } from "vue";
import { createStore } from 'vuex';

import App from './App.vue'         // root of client
import store_obj from './store';    // global state
import router from './router'       // routing
import Axios from 'axios'           // http
import './assets/tailwind.css'      // tailwind


// create app from App.vue
let app = createApp(App);

// vuex store
const store = createStore(
    store_obj
);

app.use(store);

// router

// redirect to login on protected paths
// @author https://stackoverflow.com/questions/46288589/how-to-stop-component-loading-and-redirect-in-vue
router.beforeEach(
    (to, from, next) => {
        if (to.matched.some(record => record.meta.requiresAuth)) {
            // if route requires auth and user isn't authenticated
            if (!store.state.logged_in) {
                let query = to.fullPath.match(/^\/$/) ? {} : { redirect: to.fullPath }
                next(
                    {
                        path: '/login',
                        query: query
                    }
                )
                return;
            }
        }
        if (to.matched.some(record => record.meta.requiresAdmin)) {
            // if route requires auth and user isn't authenticated
            if (!store.state.admin) {
                next('/no-permission');
                return;
            }
        }
        next()
    }
)

app.use(router);

// connection to backend api
const axios_backend_api = Axios.create({
    baseURL: process.env.VUE_APP_BACKEND_URL + '/api'
});

app.config.globalProperties.$backend_api = axios_backend_api;

// log requests
axios_backend_api.interceptors.request.use(function (config) {
    // Do something before request is sent
    console.log(`${config.method} request to api ${config.url}`);
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// mount app
app.mount('#app');

