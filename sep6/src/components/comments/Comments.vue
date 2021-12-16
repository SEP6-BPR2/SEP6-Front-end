<template>
  <v-card class="comments_div">
    <v-list three-line >
      <CommentsInput/>
      <div :key="key" v-for="(comment, key) in generalComments">

        <v-divider
        ></v-divider>
        <v-list-item
        >
          <v-list-item-avatar>
            <v-img v-if="comment.photoURL != null" v-bind:src="comment.photoURL"></v-img>
            <v-img v-else src="@/assets/avatar.png"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <div class="basic_comment_info">
              <v-list-item-title>{{ comment.nickname }}</v-list-item-title>
              <v-list-item-subtitle>{{ transformDateTime(comment.commentTime) }}</v-list-item-subtitle>
            </div>
            <v-list-item-subtitle>{{ comment.commentText }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </div>
    </v-list>
    <v-btn dark v-on:click="loadMoreComments">Show more</v-btn>
  </v-card>
</template>

<script>
import CommentsInput from "@/components/comments/CommentsInput";

export default {
  name: "Comments",
  components: {CommentsInput},
  props: {},
  computed: {
    generalComments() {
      return this.$store.state.generalComments
    }
  },
  methods: {
    loadMoreComments() {
      this.$emit("load-more-comments")
    },
    transformDateTime(dateTime){
      return dateTime.replace("T", " ").substring(0,16)
    }
  }
}
</script>

<style scoped>
.basic_comment_info {
  display: flex;
}
.v-list{
  background: transparent!important;
}
.v-card{
  margin-top: 20pt;
  background: #224747!important;
}


</style>