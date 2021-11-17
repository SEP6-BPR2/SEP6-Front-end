<template>
  <div>

        <div class="row align-lg-baseline align-center">
          <v-col class="col-lg-2 col-12" @mouseover="showIcon(_key)" @mouseleave="removeIcon"
                 v-for="(slide, _key) in movies" :key="_key">
            <img v-bind:src="'https://image.tmdb.org/t/p/w200/'+slide.poster_path">
            <div >
              {{ slide.title }}{{ slide.name }}
            </div>
            <div>
              {{ slide.release_date }}{{ slide.first_air_date }}
            </div>
          </v-col>
        </div>

  </div>
</template>

<script>
export default {
  name: "MovieSegment",
  computed: {
    movies() {
      return this.$store.state.trendingList
    },

  },
}
</script>

<style scoped>
.movie_item {

}
</style>