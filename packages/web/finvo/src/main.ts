import './styles.css'

import { createRouter, createWebHistory } from 'vue-router/auto'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

export const router = createRouter({
    history: createWebHistory(),
})

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
