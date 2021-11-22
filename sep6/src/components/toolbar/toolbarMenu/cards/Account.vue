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
              v-model="message"
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
            <v-list-item-title >Favourites</v-list-item-title>
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
import Vue from 'vue'

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
    logOut(){
      let VueInstance = this

      if(this.media=='Facebook')
      {
        window.FB.logout(function() {
          console.log("user logged out")
          VueInstance.$emit('logout')
        });
      }
      else {
        Vue.googleAuth().signOut(function () {
          VueInstance.name = ''
          VueInstance.media = ''
          VueInstance.img=''
          VueInstance.$emit('logout')
          // things to do when sign-out succeeds
        }, function () {
          // things to do when sign-out fails
        })
      }
    }
  }
}
</script>

<style scoped>

</style>