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
    doo: {
      type: String,
      default: "",
    },
  },
  watch: {
    doo: () => {
      location.reload();
    },
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
      this.$store.dispatch("getSearchResultList", {searchInput: this.doo})
    },
  }
}
</script>

<style scoped>
.list_movies {
  margin-top: 200px;
}
</style>