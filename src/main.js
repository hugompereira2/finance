import { createApp } from 'vue'
import * as Vue from 'vue' // in Vue 3
import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './App.vue'
import router from './router'

import './assets/main.css'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRgdd24FdOCwFVVLaIYXHHub9akpfDaeY",
  authDomain: "finance-61749.firebaseapp.com",
  projectId: "finance-61749",
  storageBucket: "finance-61749.appspot.com",
  messagingSenderId: "615303198469",
  appId: "1:615303198469:web:3b4ac19ca2ecfc0565e96c",
  measurementId: "G-6T3BRZRM8R"
};

// Initialize Firebase

initializeApp(firebaseConfig);
const app = Vue.createApp(App)
app.use(VueAxios, axios)
app.use(router)
app.mount('#app')
