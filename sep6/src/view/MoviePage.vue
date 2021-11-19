<template>
<div>
  <MovieList :load-from="movieList"/>

  {{this.$route.query.doo}}
</div>
</template>

<script>
import MovieList from "./MovieList";
export default {
  name: "MoviePage",
  components: {MovieList},
  props: {
    doo: {
      type: String,
      default: null,
    }
  },
  computed:{

  }
}
</script>

<style scoped>

</style>