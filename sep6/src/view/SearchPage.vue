<template>
<div>
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
      default: null,
    }
  },
  computed: {
    movieList(){
      return this.$store.state.trendingList
    }
  },
  mounted() {
    this.$store.dispatch("getTrendingList");
  },
  methods:{
    loadMoreMovies(){
      this.movieList.forEach(e => this.movieList.push(e))
    }
  }
}
</script>

<style scoped>
.list_movies{
  margin-top: 200px;
}
</style>