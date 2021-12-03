<template>
  <div>
    <MovieList class="list_movies" :show-sort="true" :movieList="movieList" v-on:load-more="loadMoreMovies"/>
  </div>
</template>

<script>
import MovieList from "@/components/MovieList";
import {getAuth, onAuthStateChanged} from "firebase/auth";
export default {
  name: "FavouritesPage",
  components:{
    MovieList
  },
  computed:{
    movieList(){
      return this.$store.state.favouriteList.movies
    }
  },
  mounted() {
    let auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdToken(true).then(() => {
          if (user != null) {
            this.loadMoreMovies(user.uid)
          }
        })
      }
    })
  },
  methods:{
    loadMoreMovies(id) {
      this.$store.dispatch("getFavourites", {userId: id})
    }
  }
}
</script>

<style scoped>

</style>