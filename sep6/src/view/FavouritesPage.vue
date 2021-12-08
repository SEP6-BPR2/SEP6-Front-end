<template>
  <div class="fav_List">
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
  props:{
    userId: String
  },
  computed:{
    movieList(){
      return this.$store.state.favouriteList
    }
  },
  mounted() {
    let auth = getAuth();
    if(this.userId){
      this.loadMovies(this.userId)
    }
    else {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          user.getIdToken(true).then(() => {
            if (user != null) {
              this.loadMovies(user.uid)
            }
          })
        }
      })
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