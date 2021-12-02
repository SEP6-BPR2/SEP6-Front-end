<template>
  <v-toolbar dark>

    <div class="toolbar-left col-md-6 col-12">
      <router-link :to=" '/'">
        <v-toolbar-title class="toolbar-left-item">
          SUPER PROJECT
        </v-toolbar-title>
      </router-link>

      <ToolbarMenu class="toolbar-left-item" :logged-in="loggedIn"></ToolbarMenu>

    </div>

    <div class="toolbar-right col-md-6 col-12">
      <div class="search">
        <v-text-field
            label="Search"
            v-model="searchInput"
            hide-details="auto"
        ></v-text-field>

        <router-link :to=" {name:'results',query:{doo:searchInput}}">
          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </router-link>
      </div>
        <button v-on:click="moveToExplore" >Explore</button>
    </div>

  </v-toolbar>
</template>

<script>
import ToolbarMenu from "@/components/toolbar/toolbarMenu/ToolbarMenu";

export default {
  name: "Toolbar",
  components: {
    ToolbarMenu,
  },
  computed: {
  },
  data: () => ({
    searchInput: "",
    loggedIn: false,
  }),
  mounted() {
  },
  methods: {
    moveToExplore(){
      this.$router.push("/explore")
    }
  }
}
</script>

<style>
.theme--dark.v-toolbar.v-sheet {
  background-color: transparent !important;
}

.v-toolbar__content {
  background-color: transparent;
  justify-content: space-between;
}

.v-toolbar__title {
  background-color: #1976d2;
  color: white;
  border-radius: 4px;
  padding: 3px;
}

.v-input {
  width: 100pt;
}

.toolbar-left {
  display: flex;
  align-items: center;
}

.toolbar-right {
  display: flex;
  margin-top: 10pt;
}

.toolbar-left-item {
  margin: 5pt;
}

.search {
  display: flex;
  flex-grow: 5;
}

a {
  text-decoration: none;
}

@media all and (max-width: 479px) {
  .v-toolbar__content {
    flex-direction: column;
  }

  .v-toolbar {
    height: 105pt !important;
  }

  .toolbar-left {
    justify-content: space-between;
  }

  .toolbar-right {
    margin-top: 0pt;
  }

}

</style>