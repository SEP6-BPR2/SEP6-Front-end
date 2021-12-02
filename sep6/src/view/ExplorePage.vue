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
          :items="[]"
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
    }
  },
  data: () => ({
    chosenGenre: "any",
  }),
  watch: {
    chosenGenre: {
      handler: function() {
        this.$store.dispatch("clearExploreMovieList")
        this.loadMoreMovies()
      },
      deep: true
    }
  },
  mounted() {
    this.$store.dispatch("getAllGenres")
    this.loadMoreMovies()
  },
  methods: {
    loadMoreMovies() {
      this.$store.dispatch("getMovieList", {genre: this.chosenGenre})
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