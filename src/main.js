import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import './assets/main.css'
import 'primevue/resources/themes/lara-light-blue/theme.css'
import 'primevue/resources/primevue.min.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(PrimeVue)
app.use(createPinia())
app.use(router)

app.mount('#app')