<template>
  <div>
    <carousel :per-page="3" :mouse-drag="true">
      <Slide v-for="(slide,_key) in slides" :key="_key">
        <div id="imgcontainer">
          <img id="carousel_img" v-bind:src="'https://image.tmdb.org/t/p/w500/'+slide.poster_path">
          <div class="overlay">
            {{ slide.overview }}
          </div>
        </div>
      </Slide>
    </carousel>

    <MovieList :load-from="movieList"/>
  </div>
</template>

<script>

import {Carousel, Slide} from 'vue-carousel';
import MovieList from "@/view/MovieList";

export default {
  name: "HomePage",
  components: {
    MovieList,
    Carousel,
    Slide
  },
  data() {
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
  },

}
</script>

<style scoped>

.movie_item:hover {
  cursor: pointer;
  transform: scale(1.04);
  transition: all 0.2s ease-in;
}

.movie_item:hover {
  opacity: 0.4;
}

#imgcontainer {
  position: relative;
}

#imgcontainer:hover #carousel_img {
  cursor: pointer;
  opacity: 0.3;
}

#carousel_img {
  display: block;
  width: 100%;
  height: 650px;
  object-position: top;
  object-fit: cover;
}

#imgcontainer:hover .overlay {
  height: 60%;
}

.overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #008CBA;
  overflow: hidden;
  width: 100%;
  height: 0;
  transition: .5s ease;
}
</style>