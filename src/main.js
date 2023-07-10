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
import Menu from 'primevue/menu'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Sidebar from 'primevue/sidebar'
import Dropdown from 'primevue/dropdown'

import ClickOutside from './assets/ClickOutside'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(PrimeVue)
app.component('PCard', Card)
app.component('PButton', Button)
app.component('PMenu', Menu)
app.component('PDialog', Dialog)
app.component('PInputText', InputText)
app.component('PSidebar', Sidebar)
app.component('PDropdown', Dropdown)

app.use(createPinia())
app.use(router)

app.directive('click-outside', ClickOutside).mount('#app')
