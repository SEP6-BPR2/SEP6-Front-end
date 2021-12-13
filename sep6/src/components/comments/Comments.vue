<template>
  <div class="comments_div">

    <v-list three-line>
        <CommentsInput/>
      <template v-for="(comment, key) in 10">

        <v-divider
            :key="key"
        ></v-divider>
        <v-list-item
            :key="key"
        >
          <v-list-item-avatar>
            <v-img src="@/assets/avatar.png"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{"user"}}</v-list-item-title>
            <v-list-item-subtitle>{{"some comment"}}</v-list-item-subtitle>
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
  data: () => ({

  }),
  computed: {
    generalComments(){
      return this.$store.state.generalComments
    }
  },
  mounted() {
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