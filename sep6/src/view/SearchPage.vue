<template>
<div>
  <div>{{"A"+doo}}</div>
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
  watch:{
    doo: () => {location.reload();}
  },
  computed: {
    movieList(){
      return this.$store.state.searchResultList
    }
  },
  mounted() {
    this.$store.dispatch("getSearchResultList",{searchInput: this.doo});
  },
  methods:{
    loadMoreMovies(){
      this.$store.dispatch("getSearchResultList", {searchInput: this.doo})
    }
  }
}
</script>

<style scoped>
.list_movies{
  margin-top: 200px;
}
</style>