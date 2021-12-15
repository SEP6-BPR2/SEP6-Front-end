<template>
  <div id="comments_input">
    <v-list-item-avatar>
      <img v-if="user !== null" v-bind:src="user.photoURL" >
      <img v-else src="@/assets/avatar.png">
    </v-list-item-avatar>
    <v-text-field v-model="commentsInput" label="Comment" color="black"></v-text-field>
    <v-btn icon v-on:click="sendComment" id="send_button">
      <v-icon>mdi-send</v-icon>
    </v-btn>
  </div>
</template>

<script>

export default {
  name: "CommentsInput",
  props: {
  },
  data: () => ({
    commentsInput: "",
  }),
  computed: {
    user(){
      return this.$store.state.user.data
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
    async sendComment() {
      if (this.user !== null) {
        await this.$store.dispatch("makeComment",
            {comment: this.commentsInput, replyComment: null})
        this.commentsInput = ""
      }else{
        alert("Before you send the comment, please log in")
      }
    }
  }
}
</script>

<style scoped>
#comments_input{
  display: flex;
  align-items: center;
}
v-list-item-avatar{
  margin-bottom: 0;
}
</style>