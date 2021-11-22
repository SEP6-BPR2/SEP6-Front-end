import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import store from './store'
import vuetify from './plugins/vuetify'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import GoogleAuth from 'vue-google-oauth'

Vue.use(GoogleAuth, { client_id: '656774347674-tf2md9b56kuosa26savdln8poc97bdnm.apps.googleusercontent.com' })
Vue.googleAuth().load()

library.add(faEye)


Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
