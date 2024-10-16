import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Toast from 'vue-toastification'
import { plugin } from '@formkit/vue'
import 'vue-toastification/dist/index.css'
import '@formkit/themes/genesis'

import './assets/index.css'
import formkitConfig from '../formkit.config'

const app = createApp(App)

const pinia = createPinia()

const toastOptions = {
  position: 'top-right',
  timeout: 4000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false,
}

app.use(plugin, formkitConfig)
app.use(Toast, toastOptions)
app.use(pinia)
app.use(router)

app.mount('#app')
