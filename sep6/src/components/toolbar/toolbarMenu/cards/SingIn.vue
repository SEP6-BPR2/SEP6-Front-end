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
          id="login_facebook"
          text
          @click="login('Facebook')"
      >
        Facebook
      </v-btn>

      <v-btn
          outlined
          rounded
          id="login_google"
          text
          @click="login('Google')"
      >
        Google
      </v-btn>
    </v-card-actions>

  </v-card>
</template>

<script>
import {getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider}  from 'firebase/auth'

export default {
  name: "SingIn",
  props:['shouldCheckOut','userT'],
  data(){
    return{
      googleSignInParams: {
        client_id: '656774347674-tf2md9b56kuosa26savdln8poc97bdnm.apps.googleusercontent.com'
      }
    }
  },
  computed:{
  },
  components:{
  },
  methods:{
     login(mediaProv){
      let VueInstance = this
      let auth = getAuth();
      let provider = mediaProv == "Google" ? new GoogleAuthProvider() : new FacebookAuthProvider()
      signInWithPopup(auth,provider)
       .then(()=>{
         let currentUser = auth.currentUser
         currentUser.getIdToken(true).then((idToken)=>{
           let response = {
             id: currentUser.uid,
             name: currentUser.displayName,
             picture:currentUser.photoURL,
           }
           VueInstance.$emit('logIn',response)
           this.$store.dispatch("registerUser",{userId: response.id,username: response.name,token: idToken})
         })
       }).catch((error) => {
        console.log("error " + error)
       })
    },
  }
}
</script>
<style scoped>

</style>