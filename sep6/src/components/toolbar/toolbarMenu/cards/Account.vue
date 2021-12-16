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

      <v-list-item style="cursor: pointer" v-on:click="dialog=true">
        <v-list-item-action>
          <v-icon>mdi-share</v-icon>
        </v-list-item-action>
        <v-list-item-title>Share</v-list-item-title>
      </v-list-item>

      <v-list-item v-on:click="routeToFav">
          <v-list-item-icon>
            <v-icon>mdi-heart</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Favourites</v-list-item-title>
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
    <v-dialog
        v-model="dialog"
        width="500"
    >

      <v-card>
        <v-card-title class="text-h10 grey lighten-2">
          Please copy link to share with friends
        </v-card-title>

        <v-card-text>
          <font-awesome-icon v-on:click="copyToClip" class="col-2 icon_share" icon="clipboard"/>
          <div id="dial_div" class="col-9">{{shareURL}}
          </div>
        </v-card-text>

        <v-divider></v-divider>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import {getAuth, signOut} from "firebase/auth";

export default {
  name: "Account",
  props:['name','img','media'],
  data: () => ({
    dialog: false,
    selectedItem: 1,
    // name:'',
    items: [
      { text: 'Real-Time', icon: 'mdi-clock' },
      { text: 'Audience', icon: 'mdi-account' },
      { text: 'Conversions', icon: 'mdi-flag' },
    ],
  }),
  computed:{
    shareURL(){
      // console.log("The user is " + JSON.stringify())
      
      return 'https://sep6-back-end-an6w7okvaa-lz.a.run.app/#/favourites?userId=' + this.$store.state.user.data.uid
    }
  },
  methods:{
     logOut() {
       let VueInstance = this
       const auth = getAuth();
       signOut(auth).then(() => {
         VueInstance.$emit('logout')
       }).catch((error) => {
         console.log(error)
       });
     },
    copyToClip(){
      let copyText = document.getElementById("dial_div").textContent;

      navigator.clipboard.writeText(copyText)
      alert("Copied the text: " + copyText);
    },
    routeToFav(){
      this.$router.push({name: 'favourites'})
    }
  }
}
</script>

<style scoped>
.icon_share{
  cursor: pointer;
  width: 45px;
  height: auto;
  margin-bottom: 5px;
  display: inline-block;
  vertical-align: middle;
}

#dial_div{
  border: 0.5px solid lightgrey;
  margin-top: 4px;
  display: inline-block;
  cursor: text;
  padding: 2px;
}

</style>