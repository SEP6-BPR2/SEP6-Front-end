<template>
  <v-card :elevation=24 class="container rounded-xl movie-info-parent">
    <div
        class="row rounded-xl movie-info"
    >
      <div class="col-md-5 col-12">
        <img v-if="movie.posterURL !== 'N/A'" class="image" v-bind:src="`${movie.posterURL}`">
        <img v-else class="default_img image" src="@/assets/no-image.png">
        <div class="">
          <label class="">Popularity: {{ movie.popularity }}</label>
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
        {{ rating }}
        <font-awesome-icon @click="removeFav" v-if="isFav===true" class="icon_movie" style="color:hotpink"
                           icon="heart"/>
        <font-awesome-icon @click="addFav" v-else class="icon_movie" style="color:gray" icon="heart"/>

      </div>

      <div class=" col-md-7 col-12 align-items-stretch movie-details">

        <div class="row title">
          <label>{{ movie.title }}</label>
        </div>

        <div class="row title">
          <label>Release date: {{ movie.year }}</label>
        </div>

        <div class="row align-item-stretch">

          <div class="col-6 votes-statistic">
            <v-progress-circular
                :size="100"
                :width="4"
                color="yellow"
                :value="value"
            >{{ movie.rating / 2 }} / 5
            </v-progress-circular>
            <label>Average of votes</label>

          </div>

          <div class="col-6 votes-statistic">
            <v-progress-circular
                :size="100"
                :width="4"
                :value="0"
            >{{ movie.votes }}
            </v-progress-circular>
            <label>Number of votes</label>
          </div>
        </div>


        <div class="row text-justify movie-description">
          {{ movie.description }}
        </div>
      </div>

    </div>

    <v-col class="shrink">
      <v-btn
          class="ma-2"
          color="secondary"
          @click="expand = !expand"
      >
        Show actors
      </v-btn>

      <v-expand-x-transition>
        <div
            v-show="expand"
            height="100"
            width="100"
            class="row align-md-baseline actors rounded-xl mx-auto"
        >
          <h3>Actors:</h3>
          <v-col class=" col-md-3 col-12 actor-card" v-model="movie"
                 v-for="(actor, _key) in movie.actors" :key="_key">
            <div class="img_person_container">
              <img v-if="actor.photoURL!==null" class="img_person" v-bind:src="`${actor.photoURL}`">
              <img v-else src="@/assets/no-image.png" class="img_person default_img">
            </div>
            <div>
              {{ actor.name }}
            </div>
          </v-col>
        </div>
      </v-expand-x-transition>
    </v-col>

    <v-col class="shrink">
      <v-btn
          class="ma-2"
          color="secondary"
          @click="expand2 = !expand2"
      >
        Show directors
      </v-btn>

      <v-expand-x-transition>
        <div
            v-show="expand2"
            height="100"
            width="100"
            class="row align-md-baseline actors rounded-xl mx-auto"
        >
          <h3>Directors:</h3>
          <v-col class="col-md-3 col-12 actor-card" v-model="movie"
                 v-for="(director, _key) in movie.directors" :key="_key">
            <div class="img_person_container">
              <img v-if="director.photoURL!==null" class="img_person" v-bind:src="`${director.photoURL}`">
              <img v-else src="@/assets/no-image.png" class="img_person default_img">
            </div>
            <div>
              {{ director.name }}
            </div>
          </v-col>
        </div>
      </v-expand-x-transition>
    </v-col>
    <Comments/>
  </v-card>
</template>

<script>
import Comments from "@/components/comments/Comments";

export default {
  name: "MoviePage",
  components: {Comments},
  props: {
    searchQuery: {
      type: String,
      default: ""
    },
  },
  data: () => ({
    interval: {},
    value: 0,
    rating: 4.5,
    expand: false,
    expand2: false,
  }),
  computed: {
    isFav() {
      return this.$store.state.movieDetails.favorites
    },
    movie() {
      return this.$store.state.movieDetails
    },
    directors() {
      return this.$store.state.trendingList.slice(10, 12)
    }
  },
  mounted() {
    this.$store.dispatch("getFirstOrderComments", { movieId: parseInt(this.searchQuery)})

    console.log("User "+ JSON.stringify(this.$store.state.user))
    if (this.$store.state.user.isLoggedIn) {
      this.$store.dispatch("getMovieDetails", {userId: this.$store.state.user.data.uid, movieId: parseInt(this.searchQuery), num: 1})
    } else {
      this.$store.dispatch("getMovieDetails", {userId: 'none', movieId: parseInt(this.searchQuery), num: 0})
    }

    if (this.movie.rating !== null && this.movie.rating !== "N/A" && this.movie.rating !== undefined) {
      this.interval = setInterval(() => {

        while (this.value !== this.movie.rating * 10) {
          this.value += 1
        }
      }, 1000)
    }
  },
  methods: {
    addFav() {
      if (this.$store.state.user.loggedIn) {
        this.performAction(true, "addFavourite")
      } else
        alert("Please log in!")
    },
    removeFav() {
      if (this.$store.state.user.loggedIn) {
        this.performAction(false, "deleteFavourite")
      } else
        alert("Please log in!")
    },
    performAction(bool, Action) {
      if (this.$store.state.user.loggedIn) {
          this.$store.state.movieDetails.favorites = bool
          this.$store.dispatch(Action, {userId: this.$store.state.user.data.uid, movieId: parseInt(this.searchQuery), token: this.$store.state.user.data.stsTokenManager.accessToken})
      }
    }
  }
}
</script>

<style scoped>
.movie-info-parent {
  margin-top: 55pt;
  margin-bottom: 55pt;
  padding: 20pt;
  overflow: hidden;
  background: #4d796b;
  border: none;
}

.movie-info {
  padding: 10pt;
  background: #224747;
}

.movie-details {
  display: flex;
  flex-direction: column;
}

.votes-statistic {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
}

.movie-description {
  flex-grow: 3;
  padding: 10%;
}

.image {
  width: 250pt;
  height: 350pt;
}

.default_img {
  background-color: #ded9d9;
}

div {
  padding: 5pt;
}

.title {
  height: auto;
}

.actors {
  background: #224747;
}


/*for mobile device*/
@media all and (max-width: 479px) {
  .image {
    width: 150pt;
    height: 250pt;
  }
}

.icon_movie {
  width: 30px;
  height: auto;
  margin-left: 10px;
}

.img_person_container {
  height: 200pt;
  width: 135pt;
  display: inline-grid;
}

.img_person {
  border-radius: 7px;
  height: inherit;
  width: inherit;
}

</style>