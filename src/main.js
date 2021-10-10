import { createApp } from "vue";
import { createStore } from 'vuex';

import store_obj from './store';
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import Axios from 'axios'

// create app
let app = createApp(App);

// vuex store
const store = createStore(
    store_obj
);

app.use(store);

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

app.use(router).mount('#app');

