<template>
  <div>
    <MovieList class="list_movies" :movieList="movieList" />
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
      return this.$store.state.favouriteList
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