<template>
  <v-card
      elevation="10"
      class="mx-auto"
      max-width="344"
      loading
  >
    <v-list-item three-line>
      <v-list-item-content>

        <v-list-item-title class="text-h5 mb-1">
          Sign in
        </v-list-item-title>
        <v-list-item-subtitle>Currently you are using service as guest</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar
          tile
          size="80"
          color="grey"
      ></v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn
          outlined
          rounded
          text
          @click="logInWithFacebook"
      >
        Facebook
      </v-btn>

      <v-btn
          outlined
          rounded
          text
          @click="loginGoogle"
      >
        Google
      </v-btn>
    </v-card-actions>

  </v-card>
</template>

<script>
import Vue from 'vue'
export default {
  name: "SingIn",
  data(){
    return{
      googleSignInParams: {
        client_id: '656774347674-tf2md9b56kuosa26savdln8poc97bdnm.apps.googleusercontent.com'
      }
    }
  },
  created() {
    this.checkLoggedIn()
  },
  components:{
  },
  methods:{
    async logInWithFacebook() {
      let VueInstance = this

      await this.loadFacebookSDK(document, "script", "facebook-jssdk");
      await this.initFacebook();
      window.FB.login(function(response) {
        if (response.authResponse) {
          window.FB.api('/me', {fields: 'id,name,picture'},function (response) {
            // console.log('Successful login for: ' + response.picture.data.url);
            VueInstance.emit(response)
          })
        } else {
          alert("User cancelled login or did not fully authorize.");
        }
      });
      return false;
    },
    async initFacebook() {
      window.fbAsyncInit = function() {
        window.FB.init({
          appId: 1171316110063853, //You will need to change this
          cookie: true, // This is important, it's not enabled by default
          version: "v13.0"
        });
      };
    },
    async loadFacebookSDK(d, s, id) {
      var js,
          fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    },
    emit(response){
      this.$emit("logIn",response)

    },

    async loginGoogle(){
      let VueInstance = this
       Vue.googleAuth().directAccess()
       Vue.googleAuth().signIn(function (googleUser) {
        console.log(googleUser.Au)
         let resTemp = googleUser.Au
         let response = {
              id: resTemp.GW,
              name: resTemp.jf,
              picture:resTemp.mN
         }
         response.media="Google"
         VueInstance.$emit('logIn',response)
      }, function (error) {
        let gj = JSON.stringify(error)
        console.log(gj + "error")
      })
    },

    checkLoggedIn(){
      let VueInstance = this

      window.FB.getLoginStatus(function(response) {   // Called after the JS SDK has been initialized.
        if(response.status==='connected'){
          window.FB.api('/me', {fields: 'id,name,picture'},function (response) {
            // console.log('Successful login for: ' + response.picture.data.url);
            response.picture = response.picture.data.url
            response.media="Facebook"
            VueInstance.emit(response)
          })
        }
      });
    }
  }
}
</script>
<style scoped>

</style>