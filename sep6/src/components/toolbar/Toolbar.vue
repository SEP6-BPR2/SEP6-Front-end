<template>
  <v-toolbar dense>

    <v-toolbar-title>SUPER PROJECT</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-text-field
        label="Search"
        :rules="rules"
        hide-details="auto"
    ></v-text-field>

    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-spacer></v-spacer>

    <v-menu
        transition="slide-x-transition"
        bottom
        right
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            class="deep-orange"
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
        >
          {{chosenGenre}}
        </v-btn>

      </template>

<!--      TODO: Not sure how this should look.
                How many genres will we have?-->
      <v-list >
        <v-list-item
            v-model="chosenGenre"
            v-for="item in genres"
            :key="item.id"
        >
          <v-btn block>
            {{item}}
          </v-btn>
        </v-list-item>

      </v-list>

    </v-menu>

    <ToolbarMenu :logged-in="loggedIn"></ToolbarMenu>

  </v-toolbar>
</template>

<script>
import ToolbarMenu from "@/components/toolbar/toolbarMenu/ToolbarMenu";

export default {
  name: "Toolbar",
  props: ['loggedIn'],

  components: {
    ToolbarMenu,
  },

  data: () => ({
    //
    searchInput: "",
    chosenGenre: "Genre",
    genres: ["comedy", "horror"]
  }),
}
</script>

<style scoped>

</style>