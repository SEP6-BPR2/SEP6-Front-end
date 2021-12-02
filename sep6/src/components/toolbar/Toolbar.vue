<template>
  <v-toolbar dark>

    <div class="toolbar-left col-md-6 col-12">
        <button class="toolbar-left-item" v-on:click="moveToHome">
          SUPER PROJECT
        </button>

      <ToolbarMenu class="toolbar-left-item" :logged-in="loggedIn"></ToolbarMenu>

    </div>

    <div class="toolbar-right col-md-6 col-12">
      <div id="search_field">
        <v-text-field
            label="Search"
            v-model="searchInput"
            hide-details="auto"
        ></v-text-field>

        <v-btn icon v-on:click="moveToSearch" id="search_button">
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
      </div>
        <v-btn v-on:click="moveToExplore" >Explore</v-btn>
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
    document.getElementById("search_field")
        .addEventListener("keyup", event => {
          event.preventDefault();
          if (event.key === "Enter") {
            document.getElementById("search_button").click();
          }
        });
  },
  methods: {
    moveToHome(){
      this.$router.push("/").catch(err => {this.checkIfTheSamePage(err)})
    },
    moveToSearch(){
      this.$router.push({name: 'results',query: {doo: this.searchInput}})
          .catch(err => {this.checkIfTheSamePage(err)})
    },
    moveToExplore(){
      this.$router.push("/explore").catch( err => {this.checkIfTheSamePage(err)})
    },
    checkIfTheSamePage(error){
      if (
          error.name !== 'NavigationDuplicated' &&
          !error.message.includes('Avoided redundant navigation to current location')
      ){
        throw error;
      }
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
  color: white;
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

#search_field {
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