<template>
  <div>
    <div class="row align-center">
      <div class="col-4">
        <img v-bind:src="'https://image.tmdb.org/t/p/w500/'+movie.poster_path">
      </div>
      <div class="col-8">
        <div class="row">
            <v-progress-circular
                class="col-6"
                :size="200"
                :value="movie.vote_average*10"
            >{{ movie.vote_average }}
            </v-progress-circular>
          <a class="col-6">{{ movie.vote_count }}</a>
        </div>

        <div class="row">
          <a class="col-6">Rating</a>
          <a class="col-6">Number of votes</a>
        </div>

        <a></a>
      </div>
    </div>

    <div>{{ movie }}</div>
  </div>
</template>

<script>
export default {
  name: "MoviePage",
  components: "",
  props: {},
  data() {
    return {
      interval: {},
      value: 0,
    }
  },
  computed: {
    movie() {
      console.log(this.$store.state.trendingList[0])
      return this.$store.state.trendingList[0]
    },

  },
  mounted() {
    this.$store.dispatch("getTrendingList");


    this.interval = setInterval(() => {
      while (this.value !== 7.5) {
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!@@@@@@@@@@")
        this.value += 0.5
      }
    }, 1000)

  },
}
</script>

<style scoped>

</style>