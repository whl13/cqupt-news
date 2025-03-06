import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-plus/dist/index.css'
import Particles from 'particles.vue3'
import '@/utils/axios.config'
createApp(App).use(store).use(router).use(Particles).mount('#app')
