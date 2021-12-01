<template>
  <div>
    <div>{{ "A" + doo }}</div>
    <MovieList class="list_movies" :show-sort="true" :movieList="movieList" v-on:load-more="loadMoreMovies"/>
  </div>
</template>

<script>
import MovieList from "./MovieList";

export default {
  name: "SearchPage",
  components: {MovieList},
  props: {
    doo: {
      type: String,
      default: "",
    },
    genre: {
      type: String,
      default: "any"
    }
  },
  watch: {
    doo: () => {
      location.reload();
    },
  },
  computed: {
    movieList() {
      console.log(this.$store.state.searchResultList)
      return this.$store.state.searchResultList
    }
  },
  created() {
    this.loadMoreMovies()
  },
  methods: {
    loadMoreMovies() {
      this.$store.dispatch("getSearchResultList", {searchInput: this.doo, genre: this.genre})
    }
  }
}
</script>

<style scoped>
.list_movies {
  margin-top: 200px;
}
</style>