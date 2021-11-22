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
      <Account v-if="loggedIn"></Account>
      <!--      ELSE -->
      <SingIn></SingIn>

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
  },
}
</script>

<style scoped>

</style>