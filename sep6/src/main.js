import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import store from './store'
import vuetify from './plugins/vuetify'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEye,faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyCKOg9V7JIw3-vxEs2xl4Fqu6htWpKVTr0",
  authDomain: "sep6project-331917.firebaseapp.com",
  projectId: "sep6project-331917",
  storageBucket: "sep6project-331917.appspot.com",
  messagingSenderId: "542015503636",
  appId: "1:542015503636:web:a73127dcda0747427dd601"
};

const app = initializeApp(firebaseConfig);
Vue.use(app)
library.add(faEye,faHeart)


Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
