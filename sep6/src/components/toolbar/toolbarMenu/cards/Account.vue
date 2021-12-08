<template>
  <v-card
      elevation="10"
  >
    <v-list>
      <v-list-item>
        <v-list-item-avatar>
          <img
              v-bind:src="img"
              alt="John"
          >
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{name}}</v-list-item-title>
<!--          <v-list-item-subtitle>Founder of Vuetify</v-list-item-subtitle>-->
        </v-list-item-content>


      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list>

      <v-list-item>
        <v-list-item-action>
          <v-switch
              color="purple"
          ></v-switch>
        </v-list-item-action>
        <v-list-item-title>Enable notifications</v-list-item-title>
      </v-list-item>

        <v-list-item
        >
          <v-list-item-icon>
            <v-icon>mdi-heart</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <router-link :to=" '/favourites'">
            <v-list-item-title>Favourites</v-list-item-title>
            </router-link>
          </v-list-item-content>
        </v-list-item>

    </v-list>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn
          color="error"
          text
          @click="logOut"
      >
        Log out
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";

export default {
  name: "Account",
  props:['name','img','media'],
  data: () => ({
    selectedItem: 1,
    // name:'',
    items: [
      { text: 'Real-Time', icon: 'mdi-clock' },
      { text: 'Audience', icon: 'mdi-account' },
      { text: 'Conversions', icon: 'mdi-flag' },
    ],
  }),
  methods:{
     logOut() {
       let VueInstance = this
       const auth = getAuth();
       signOut(auth).then(() => {
         VueInstance.$emit('logout')
       }).catch((error) => {
         console.log(error)
       });
     }
  }
}
</script>

<style scoped>

</style>