<template>
  <v-card :elevation=24 class="container rounded-xl movie-info-parent">
    <div
        class="row rounded-xl movie-info"
    >
      <div class="col-md-6 col-12 image-views">
        <img class="image" v-bind:src="'https://image.tmdb.org/t/p/w500/'+movie.poster_path">
        <div class="">
          <label class="">Views: {{movie.popularity}}</label>
        </div>
          <v-rating
              v-model="rating"
              color="yellow darken-3"
              background-color="grey darken-1"
              empty-icon="$ratingFull"
              half-increments
              hover
              clearable
          ></v-rating>
          {{rating}}
      </div>

      <div class=" col-md-6 col-12 align-items-center">

        <div class="row title">
          <label>{{ movie.original_name }}</label>
        </div>

        <div class="row title">
          <label>Release date: {{movie.first_air_date}}</label>
        </div>

        <div class="row">
          <v-progress-circular
              class="col-6"
              :size="100"
              :width="4"
              color="yellow"
              :value="movie.vote_average*10"
          >{{ movie.vote_average/2 }} / 5
          </v-progress-circular>
          <div class="col-6 justify-center">
            <label class="">{{ movie.vote_count }}</label>
          </div>
        </div>


        <div class="row">
          <label class="col-6">Average of votes</label>
          <label class="col-6">Number of votes</label>
        </div>


        <div class="row text-justify">
          {{ movie.overview }}
        </div>
      </div>

    </div>

    <div class="row">{{ movie }}</div>
  </v-card>

</template>

<script>
export default {
  name: "MoviePage",
  components: "",
  props: {},
  data: () => ({
    rating: 4.5,
  }),
  computed: {
    movie() {
      console.log(this.$store.state.trendingList[0])
      return this.$store.state.trendingList[0]
    },

  },
  mounted() {
    this.$store.dispatch("getTrendingList");
  },
}
</script>

<style scoped>
.movie-info-parent {
  margin-top: 55pt;
  padding: 20pt;
  overflow: hidden;
  background: #4d796b;
  border: none;
}

.movie-info{
  padding: 10pt;
  background: #224747;
}

.image {
  width: 250pt;
  height: 350pt;
}

div {
  /*border: solid;*/
  padding: 5pt;
}

.title {
  height: auto;
}

</style>