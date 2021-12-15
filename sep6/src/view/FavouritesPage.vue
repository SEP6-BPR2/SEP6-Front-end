<template>
  <div class="fav_List">
    <MovieList class="list_movies" :movieList="movieList" />
  </div>
</template>

<script>
import MovieList from "@/components/MovieList";
export default {
  name: "FavouritesPage",
  components:{
    MovieList
  },
  props:{
    userId: String
  },
  computed:{
    movieList(){
      return this.$store.state.favouriteList
    }
  },
  mounted() {
    if(this.$store.state.user.data.uid){
      this.loadMovies(this.$store.state.user.data.uid)
    }
  },
  methods:{
    loadMovies(id) {
      this.$store.dispatch("getFavourites", {userId: id})
    }
  }
}
</script>

<style scoped>
.fav_List{
  margin-top:100px;
}

</style>