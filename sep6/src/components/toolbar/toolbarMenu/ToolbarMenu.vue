<template>
  <div class="text-center">
    <v-menu
        v-model="menu"
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
      <SingIn v-else></SingIn>

    </v-menu>
  </div>
</template>

<script>
import SingIn from "@/components/toolbarMenu/menus/SingIn";
import Account from "@/components/toolbarMenu/menus/Account";

export default {
  name: "ToolbarMenu",
  components: {Account, SingIn},
  props: ['loggedIn'],
}
</script>

<style scoped>

</style>