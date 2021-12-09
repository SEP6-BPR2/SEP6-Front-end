<template>
  <div id="comments_input">
    <v-list-item-avatar>
      <img
          v-bind:src="userAvatar"
      >
    </v-list-item-avatar>
    <v-text-field v-model="commentsInput" label="Comment" color="black"></v-text-field>
    <v-btn icon v-on:click="sendComment" id="send_button">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
  </div>
</template>

<script>
import {getAuth} from "firebase/auth";

export default {
  name: "CommentsInput",
  props: {
  },
  data: () => ({
    commentsInput: ""
  }),
  computed: {
    userAvatar(){
      console.log(getAuth().currentUser.photoURL)
      return getAuth().currentUser.photoURL
    }
  },
  mounted() {
    document.getElementById("comments_input")
        .addEventListener("keyup", event => {
          event.preventDefault();
          if (event.key === "Enter") {
            document.getElementById("send_button").click();
          }
        });
  },
  methods: {
    sendComment(){
      console.log(getAuth().currentUser.photoURL)
      window.alert("czesc karola"+this.commentsInput)
    }
  }
}
</script>

<style scoped>
#comments_input{
  display: flex;
}
</style>