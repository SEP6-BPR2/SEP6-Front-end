<template>
  <div>
    <carousel-3d>
      <slide v-for="(slide, i) in slides" :index="i" :key="i" >
        <figure>
          <img  v-bind:src="'https://image.tmdb.org/t/p/w500/'+slide.poster_path">
        </figure>
      </slide>
    </carousel-3d>


    <MovieList :load-from="movieList"/>
  </div>
</template>

<script>

import {Carousel3d, Slide} from 'vue-carousel-3d';
import MovieList from "@/view/MovieList";

export default {
  name: "HomePage",
  components: {
    MovieList,
    Carousel3d,
    Slide
  },
  data(){
    return {
      movieList: "trending"
    }
  },
  computed: {
    slides() {
      return this.$store.state.trendingList
    },

  },
  mounted() {
    this.$store.dispatch("getTrendingList");
  },

}
</script>

<style scoped>

</style>