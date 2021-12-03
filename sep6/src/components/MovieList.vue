<template>
  <div>

    <div class="movie_view row align-md-baseline align-center" ref="movie_list">
      <v-col class="movie_item col-lg-3 col-md-4 col-12" v-model="movieList"
             v-for="(movie, _key)   in movieList" v-on:click="openModal(movie)"  @mouseover="activeOver(_key)" @mouseleave="removeOver(_key)" :key="_key">
        <img id="movie_item_pic"  v-bind:src="`${movie.poster}`">
        <div >
          {{ movie.title }}
        </div>
        <div>
          {{ movie.release_date }}
        </div>
        <font-awesome-icon v-if="showId==_key" class="icon_movie" icon="eye"/>
      </v-col>
      <VueModal
          v-model="isShow"

      >
        <MoviePage :movie-id="currentMovie.id"/>
      </VueModal>
    </div>

  </div>
</template>

<script>
import VueModal from '@kouts/vue-modal'
import '@kouts/vue-modal/dist/vue-modal.css'
import MoviePage from "../view/MoviePage";

export default {
  name: "MovieList",
  components: {
    MoviePage,
    VueModal
  },
  props: ['movieList','moremovies'],
  data() {
    return {
      sortBy: ['date', 'rating', 'popularity'],
      showId:null,
      isShow:false,
      currentMovie:[]
    }
  },
  mounted() {
    window.onscroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        // this.loadMoreMovies()
        this.$emit("load-more")
        //trigger to home page
      }
    };
  },
  methods: {
    activeOver(key){
      this.showId = key
      return this.showId
    },
    removeOver(){
      this.showId = null;
    },
    openModal(movie){
      this.isShow=true
      this.currentMovie=movie
    }
  }

}
</script>
<style>
.vm-titlebar{
  display: none;
}
.vm-content{
  padding: 0;
}
.vm{
  width: 80%;
  max-width: 100%;
}
</style>

<style scoped>
.movie_view{
  padding: 5px;
}
.movie_item{
  position: relative;
}

#movie_item_pic{
  border-radius: 7px;
}

.movie_item:hover {
  cursor: pointer;
  transform: scale(1.1);
  transition: all 0.3s ease-in;
}

.movie_item:hover #movie_item_pic{
  opacity: 0.4;
}

.icon_movie{
  position: absolute;
  width: 60px;
  height: auto;
  color: lightblue;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}


</style>