import { createApp } from "vue";
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'

//todo  Axios.defaults.baseURL = (process.env.API_PATH !== 'production') ? 'http://localhost:3000' : '';

let app = createApp(App);

app.config.globalProperties.$backend_url = 'http://localhost:3000';

app.use(router).mount('#app');

