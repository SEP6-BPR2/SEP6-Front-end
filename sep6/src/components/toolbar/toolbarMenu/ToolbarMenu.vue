<template>
  <div class="text-center">
    <v-menu
        :close-on-content-click="false"
        :nudge-width="200"
        offset-x
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            color="indigo"
            dark
            v-bind="attrs"
            v-on="on">
          {{buttonLabel}}
        </v-btn>
      </template>

      <Account v-if="loggedIn==true" v-on:logout="changeLogOut" :id="id" :name="name" :img="picture"></Account>
      <SingIn ref="signIn" v-else v-on:logIn="changeLogIn" :shouldCheckOut="shouldCheckOut"></SingIn>
    </v-menu>
  </div>
</template>

<script>
import SingIn from "@/components/toolbar/toolbarMenu/cards/SingIn";
import Account from "@/components/toolbar/toolbarMenu/cards/Account";
import {getAuth, onAuthStateChanged} from "firebase/auth";

export default {
  name: "ToolbarMenu",
  components: {
    SingIn,
    Account,
  },
  computed:{
    buttonLabel() {
      return this.loggedIn ? "Account" : "Sing In"
    }
  },
  data(){
    return{
      loggedIn: false,
      id: Number,
      name: String,
      picture:String,
      shouldCheckOut:false
    }
  },
  methods:{
    changeLogIn(response){
      this.id=response.id
      this.name=response.name
      this.picture=response.picture
      this.loggedIn=true
    },
    changeLogOut(){
      this.loggedIn= false
      this.shouldCheckOut = true
    },
    checkLoggedIn(){
      let VueInstance = this
      let auth = getAuth();
      onAuthStateChanged(auth,(user) => {
        if(user){
          user.getIdToken(true).then(()=> {
            if (user != null) {
              let response = {
                id: user.uid,
                name: user.displayName,
                picture: user.photoURL,
              }
              VueInstance.changeLogIn(response)
            }
          })
        }
      })
    }

  },
  mounted() {
    this.checkLoggedIn()
  }
}
</script>

<style scoped>

</style>