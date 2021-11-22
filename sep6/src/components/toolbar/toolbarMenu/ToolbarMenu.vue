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
            v-on="on">{{buttonLabel}}
        </v-btn>
      </template>

      <Account v-if="loggedIn"></Account>
      <SingIn v-else></SingIn>

    </v-menu>
  </div>
</template>

<script>
import SingIn from "@/components/toolbar/toolbarMenu/cards/SingIn";
import Account from "@/components/toolbar/toolbarMenu/cards/Account";

export default {
  name: "ToolbarMenu",
  components: {Account, SingIn},
  props: ['loggedIn'],
  data: () => ({
  }),
  computed:{
    buttonLabel(){
      return this.loggedIn ? "Account" : "Sing In"
    }
  }
}
</script>

<style scoped>

</style>