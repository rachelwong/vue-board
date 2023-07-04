/* eslint-disable vue/multi-word-component-names */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import './assets/main.css'
import 'primevue/resources/themes/lara-light-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeflex/primeflex.css'

import Card from 'primevue/card'
import Button from 'primevue/button'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(PrimeVue)
app.component('PCard', Card)
app.component('PButton', Button)
app.use(createPinia())
app.use(router)

app.mount('#app')
