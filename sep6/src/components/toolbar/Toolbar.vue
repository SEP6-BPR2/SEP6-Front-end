<template>
  <v-toolbar dark>
    <router-link class="nav_list" :to=" '/'">
    <v-toolbar-title>
      SUPER PROJECT
    </v-toolbar-title>
    </router-link>



    <v-spacer></v-spacer>


    <v-text-field
        label="Search"
        v-model="searchInput"
        hide-details="auto"
    ></v-text-field>


    <router-link class="nav_list" :to=" {name:'results',query:{doo:searchInput}}">
    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    </router-link>


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
.theme--dark.v-toolbar.v-sheet{
  background-color: transparent !important;
}

.v-toolbar__content{
  background-color: transparent;
}

.v-toolbar__title{
  background-color: #1976d2;
  color: white;
  border-radius: 4px;
  padding: 3px;
}

a{
  text-decoration: none;
}

</style>