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

export default {
  name: "ToolbarMenu",
  components: {
    SingIn,
    Account,
  },
  computed:{
    buttonLabel() {
      return this.$store.state.user.loggedIn ? "Account" : "Sing In"
    },
    loggedIn(){
      return this.$store.state.user.loggedIn;
    },
    id(){
      return this.$store.state.user.data.uid;
    },
    name(){
      return this.$store.state.user.data.displayName;
    },
    picture(){
      return this.$store.state.user.data.photoURL;
    }
  },
  data(){
    return{
      shouldCheckOut:false
    }
  },
  methods:{
    changeLogOut(){
      this.shouldCheckOut = true
    },
  }
}
</script>

<style scoped>

</style>