import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import App from './App.vue'
import router from './router'

const app = createApp(App)

const optionsToast = {
    position: "top-right",
    timeout: 2000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: "button",
    icon: true,
    rtl: false,
    transition: "Vue-Toastification__bounce",
    maxToasts: 20,
    className: "w-200px text-sm",
}


app.use(createPinia())
app.use(router)

app.use(Toast, optionsToast);


app.mount('#app')
