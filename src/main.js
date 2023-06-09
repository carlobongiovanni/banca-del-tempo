import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia';
import App from './App.vue'
import router from './router'
import WaveUI from 'wave-ui'
import 'wave-ui/dist/wave-ui.css'

const app = createApp(App)
app.use(WaveUI, { 
    theme: 'light' 
})
app.use(createPinia());
app.use(router)

app.mount('#app')
