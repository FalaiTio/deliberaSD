import {createApp} from 'vue'
import './assets/css/index.css'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Swal from "vue-sweetalert2"
import "sweetalert2/dist/sweetalert2.min.css"

createApp(App)
    .use(store)
    .use(router)
    .use(Swal)
    .mount('#app')
