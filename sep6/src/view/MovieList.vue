<template>
  <div>

    <div v-if="showSort" class="d-inline-flex">
      <v-select
          :items="sortBy"
          label="Sort By"
          dense
          outlined
      ></v-select>
    </div>

    <div class="row align-md-baseline align-center" ref="movie_list">
      <v-col class="col-lg-2 col-md-4 col-12" v-model="movieList"
             v-for="(movie, _key) in movieList" :key="_key">
        <img v-bind:src="'https://image.tmdb.org/t/p/w200/'+movie.poster_path">
        <div >
          {{ movie.title }}{{ movie.name }}
        </div>
        <div>
          {{ movie.release_date }}{{ movie.first_air_date }}
        </div>
      </v-col>
    </div>

  </div>
</template>

<script>
export default {
  name: "MovieList",
  components: {},
  props: ['showSort','movieList','moremovies'],
  data() {
    return {
      sortBy: ['date', 'rating', 'popularity'],
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

  }

}
</script>

<style scoped>


</style>