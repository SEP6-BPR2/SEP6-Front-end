<template>


  <div class="list_movies">
    <div class="sorting">
      <v-select
          v-model="chosenGenre"
          hide-details
          class="toolbar-left-item"
          :items="genres"
          label="Genre"
          dense
          outlined
      ></v-select>
      <v-select
          v-model="chosenSort"
          :items="sortOptions"
          label="Sort By"
          dense
          outlined
      ></v-select>
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
      let newlist = this.$store.state.allGenres.map(genreObj => genreObj.genreName).filter(name => name !== "N/A")
      newlist.push("any")
      return newlist
    },
    sortOptions(){
      let illegalSorting = ["description", "id", "latUpdated", "posterURL"]
      return this.$store.state.sortOptions
          .map(sortObj => sortObj.collumns)
          .filter(name => !illegalSorting.includes(name))
    }
  },
  data: () => ({
    chosenGenre: "any",
    chosenSort: "year"
  }),
  watch: {
    chosenGenre: {
      handler: function() {
        this.reload()
      },
      deep: true
    },
    chosenSort: {
      handler: function(){
        this.reload()
      },
      deep: true
    }
  },
  mounted() {
    this.$store.dispatch("getAllGenres")
    this.$store.dispatch("getSortingOptions")
    this.loadMoreMovies()
  },
  methods: {
    loadMoreMovies() {
      this.$store.dispatch("getMovieList", {genre: this.chosenGenre, sort: this.chosenSort})
    },
    reload(){
      this.$store.dispatch("clearExploreMovieList")
      this.loadMoreMovies()
    }
  }
}
</script>

<style scoped>
.list_movies {
  margin-top: 200px;
}
.sorting{
  display: inline-flex;
  justify-content: space-between;
}
</style>