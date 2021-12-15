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
          @click="login('Facebook')"
      >
        Facebook
      </v-btn>

      <v-btn
          outlined
          rounded
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
      let auth = getAuth();
      let provider = mediaProv == "Google" ? new GoogleAuthProvider() : new FacebookAuthProvider()
      signInWithPopup(auth,provider)
        .then(()=>{
            this.$store.dispatch("registerUser",{userId: this.$store.state.user.data.uid,username: this.$store.state.user.data.displayName,token: this.$store.state.user.data.stsTokenManager.accessToken, photoURL: this.$store.state.user.data.photoURL})
        }).catch((error) => {
          console.log("error " + error)
        })
    },
  }
}
</script>
<style scoped>

</style>