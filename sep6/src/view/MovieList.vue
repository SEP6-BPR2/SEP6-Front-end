<template>
  <div>
    <h2>{{ loadFrom }}
    </h2>
    <div class="d-inline-flex">
      <v-select
          :items="sortBy"
          label="Sort By"
          dense
          outlined
      ></v-select>
    </div>

    <div class="row align-md-baseline align-center" ref="movie_list">
      <v-col class="col-lg-2 col-md-4 col-12" v-model="moviesToDisplay"
             v-for="(movie, _key) in moviesToDisplay" :key="_key">
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
  props: ['loadFrom'],
  data() {
    return {
      sortBy: ['date', 'rating', 'popularity'],
    }
  },
  computed: {
    moviesToDisplay(){

      return this.$store.state.trendingList
    }
  },
  mounted() {
    this.$store.dispatch("getTrendingList");

    //recycle view
    window.onscroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        console.log("bottom")
        this.loadMoreMovies()
      }
    };

  },
  methods: {
    loadMoreMovies(){
      if (this.loadFrom === "trending") {
        this.$store.state.trendingList.forEach(e => this.moviesToDisplay.push(e))
      } else if (this.loadFrom === "search") {
        // fetch search result from store
      } else if (this.loadFrom === "favourites") {
        // fetch favourites from store
      }
    }
  }

}
</script>

<style scoped>


</style>