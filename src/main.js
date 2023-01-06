import { createApp } from 'vue'
import * as Vue from 'vue' // in Vue 3
import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = Vue.createApp(App)
app.use(VueAxios, axios)
app.use(router)
app.provide('axios', app.config.globalProperties.axios) 
app.mount('#app')
