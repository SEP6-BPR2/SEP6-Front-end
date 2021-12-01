import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import store from './store'
import vuetify from './plugins/vuetify'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEye,faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import GoogleAuth from   "/src/auth/index.js";
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyANqXfuB-god279Li2Ar3wTbGoIjfReVuU",
  authDomain: "indigo-proxy-332912.firebaseapp.com",
  projectId: "indigo-proxy-332912",
  storageBucket: "indigo-proxy-332912.appspot.com",
  messagingSenderId: "656774347674",
  appId: "1:656774347674:web:bc3bc78462d410be021823",
  measurementId: "G-7FQX5G26DW"
};

const app = initializeApp(firebaseConfig);
Vue.use(app)
Vue.use(GoogleAuth, { client_id: '656774347674-tf2md9b56kuosa26savdln8poc97bdnm.apps.googleusercontent.com' })
Vue.googleAuth().load()
library.add(faEye,faHeart)


Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
