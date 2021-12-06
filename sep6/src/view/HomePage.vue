<template>
  <div>
    <carousel :perPageCustom="[[300,1],[768, 3], [1024, 4]]" :autoplay="true" :mouse-drag="true">
      <Slide v-for="(slide,_key) in slides" :key="_key">
        <div id="imgcontainer">
          <img id="carousel_img" v-bind:src="`${slide.poster}`">
          <div class="overlay2"></div>
          <div class="overlay">
            {{ slide.description }}
          </div>
        </div>
      </Slide>
    </carousel>
    <MovieList :movieList="movieList" v-on:load-more="loadMoreMovies"/>
  </div>

</template>

<script>

import MovieList from "@/components/MovieList";
import {Carousel, Slide} from 'vue-carousel';


export default {
  name: "HomePage",
  components: {
    MovieList,
    Carousel,
    Slide
  },
  computed: {
    slides() {
      return this.$store.state.movieList.slice(0, 12)
    },
    movieList() {
      return this.$store.state.movieList
    }
  },
  mounted() {
    this.loadMoreMovies()
  },
  methods: {
    loadMoreMovies() {
      this.$store.dispatch("getMovieList", {genre: "any", sort: "year"})
    }
  }

}
</script>

<style scoped>
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
  height: 550px;
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

.overlay2 {
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  /*background: -moz-linear-gradient(top,  rgba(255,255,255,0) 0%, rgb(34, 71, 71) 100%); !* FF3.6+ *!*/
  background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, rgba(255, 255, 255, 0)), color-stop(100%, rgb(34, 71, 71))); /* Chrome,Safari4+ */
  background: -webkit-linear-gradient(top, rgba(255, 255, 255, 0) 0%, rgb(34, 71, 71) 100%); /* Chrome10+,Safari5.1+ */
  /*background: -o-linear-gradient(top,  rgba(255,255,255,0) 0%, rgb(34, 71, 71) 100%); !* Opera 11.10+ *!*/
  /*background: -ms-linear-gradient(top,  rgba(255,255,255,0) 0%, rgb(34, 71, 71) 100%); !* IE10+ *!*/
  /*background: linear-gradient(to bottom,  rgba(255,255,255,0) 0%, rgb(34, 71, 71) 100%); !* W3C *!*/
  /*filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00ffffff', endColorstr='#ffffff',GradientType=0 ); !* IE6-9 *!*/
}
</style>