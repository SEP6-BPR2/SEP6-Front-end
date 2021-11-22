<template>
  <div class="text-center">
    <!--        v-model="menu"-->
    <!--        I comment out these things so they don't log in console-->

    <v-menu
        :close-on-content-click="false"
        :nudge-width="200"
        offset-x
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            icon
            color="indigo"
            dark
            v-bind="attrs"
            v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <!--      IF -->
      <Account v-if="loggedIn==true" v-on:logout="changeLogOut" :id="id" :name="name" :img="picture" :media="media"></Account>
      <!--      ELSE -->
      <SingIn v-else v-on:logIn="changeLogIn"></SingIn>
    </v-menu>
  </div>
</template>

<script>
import SingIn from "@/components/toolbar/toolbarMenu/cards/SingIn";
import Account from "@/components/toolbar/toolbarMenu/cards/Account";

export default {
  name: "ToolbarMenu",
  components: {
    Account,
    SingIn
  },
  props: {
    loggedIn: Boolean,
    id: Number,
    name: String,
    picture:String,
    media: String
  },
  methods:{
    changeLogIn(response){
      console.log(response)
      this.id=response.id
      this.name=response.name
      this.picture=response.picture
      this.media = response.media
      this.loggedIn=true
      console.log(response.media)
    },
    changeLogOut(){
      console.log("kdkfkf")
      this.loggedIn= false
    }
  }
}
</script>

<style scoped>

</style>