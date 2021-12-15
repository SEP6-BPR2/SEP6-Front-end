<template>
  <div class="comments_div">

    <v-list three-line>
        <CommentsInput/>
      <template v-for="(comment, key) in generalComments">

        <v-divider
            :key="key + 1"
        ></v-divider>
        <v-list-item
            :key="key"
        >
          <v-list-item-avatar>
            <v-img v-if="comment.photoURL != null" v-bind:src="comment.photoURL"></v-img>
            <v-img v-else src="@/assets/avatar.png"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{comment.nickname}}</v-list-item-title>
            <v-list-item-subtitle>{{comment.commentText}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>

  </div>
</template>

<script>
import CommentsInput from "@/components/comments/CommentsInput";

export default {
  name: "Comments",
  components: {CommentsInput},
  props: {
  },
  computed: {
    generalComments(){
      return this.$store.state.generalComments
    }
  },
  methods: {
    getGeneralComments(){
      this.$store.dispatch("getFirstOrderComments")
    }
  }
}
</script>

<style scoped>


</style>