<template>
  <div>
    <MovieList class="list_movies" :movieList="movieList" v-on:load-more="loadMoreMovies"/>
  </div>
</template>

<script>
import MovieList from "../components/MovieList";

export default {
  name: "SearchPage",
  components: {MovieList},
  props: {
    searchInput: {
      type: String,
      default: "",
    },
  },
  watch: {
    searchInput: {
      handler: function () {
        this.$store.dispatch("clearSearchMovieList")
        this.loadMoreMovies()
      },
      deep: true
    }
  },
  computed: {
    movieList() {
      return this.$store.state.searchResultList
    }
  },
  mounted() {
    this.loadMoreMovies()
  },
  methods: {
    loadMoreMovies() {
      this.$store.dispatch("getSearchResultList", {searchInput: this.searchInput})
    },
  }
}
</script>

<style scoped>
.list_movies {
  margin-top: 200px;
}
</style>