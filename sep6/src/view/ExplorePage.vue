<template>


  <div class="list_movies">
    <div class="sorting">
      <v-spacer/>
      <v-select
          v-model="chosenGenre"
          hide-details
          class="toolbar-left-item"
          :items="genres"
          label="Genre"
          dense
          outlined
      ></v-select>
      <v-spacer/>
      <v-select
          v-model="chosenSort"
          :items="sortOptions"
          label="Sort By"
          dense
          outlined
      ></v-select>
      <v-spacer/>
      <v-select
          v-model="chosenOrder"
          :items="orders"
          label="Order"
          dense
          outlined
      ></v-select>
      <v-spacer/>
    </div>
    <MovieList :movieList="movieList" v-on:load-more="loadMoreMovies"/>
  </div>
</template>

<script>
import MovieList from "../components/MovieList";

export default {
  name: "ExplorePage",
  components: {MovieList},
  computed: {
    movieList() {
      return this.$store.state.movieList
    },
    genres() {
      return this.$store.state.allGenres

    },
    sortOptions() {
      return this.$store.state.sortOptions
    }
  },
  data: () => ({
    chosenGenre: "any",
    chosenSort: "year",
    orders: ["ASC", "DESC"],
    chosenOrder: 1
  }),
  watch: {
    chosenGenre: {
      handler: function () {
        this.reload()
      },
      deep: true
    },
    chosenSort: {
      handler: function () {
        this.reload()
      },
      deep: true
    },
    chosenOrder: {
      handler: function () {
        this.chosenOrder === "DESC" ? this.chosenOrder = 1 : this.chosenOrder = 0
        this.reload()
      }
    }

  },
  mounted() {
    this.$store.dispatch("getAllGenres")
    this.$store.dispatch("getSortingOptions")
    this.loadMoreMovies()
  },
  methods: {
    loadMoreMovies() {
      this.$store.dispatch("getMovieList", {genre: this.chosenGenre, sort: this.chosenSort, order: this.chosenOrder})
    },
    reload() {
      this.$store.dispatch("clearExploreMovieList")
      this.loadMoreMovies()
    }
  }
}
</script>

<style scoped>
.list_movies {
  margin-top: 100pt;
}

.sorting {
  display: inline-flex;
  justify-content: space-between;
  width: 100%;
}

@media all and (max-width: 479px) {
  .list_movies{
    margin-top: 100pt;
  }

}

</style>