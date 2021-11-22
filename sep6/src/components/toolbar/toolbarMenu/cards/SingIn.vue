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
          Sing in
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
          @click="logInWithFacebook"
      >
        Facebook
      </v-btn>

      <v-btn
          outlined
          rounded
          text
      >
        Google
      </v-btn>
    </v-card-actions>

  </v-card>
</template>

<script>
export default {
  name: "SingIn",
  methods:{
    async logInWithFacebook() {
      await this.loadFacebookSDK(document, "script", "facebook-jssdk");
      await this.initFacebook();
      window.FB.login(function(response) {
        if (response.authResponse) {
          alert("You are logged in &amp; cookie set!");
          // Now you can redirect the user or do an AJAX request to
          // a PHP script that grabs the signed request from the cookie.
        } else {
          alert("User cancelled login or did not fully authorize.");
        }
      });
      return false;
    },
    async initFacebook() {
      window.fbAsyncInit = function() {
        window.FB.init({
          appId: 1171316110063853, //You will need to change this
          cookie: true, // This is important, it's not enabled by default
          version: "v13.0"
        });
      };
    },
    async loadFacebookSDK(d, s, id) {
      var js,
          fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }
  }
}
</script>

<style scoped>

</style>