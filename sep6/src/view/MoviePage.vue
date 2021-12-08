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
        <font-awesome-icon @click="removeFav" v-if="isFav===true" class="icon_movie" style="color:hotpink" icon="heart"/>
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
            >{{ movie.votes }}</v-progress-circular>
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
          <v-col class="col-lg-2 col-md-3 col-12 actor-card" v-model="movie.actors"
                 v-for="(actor, _key) in movie.actors" :key="_key">
            <img v-bind:src="`${movie.posterURL}`">
            <div>
              {{ actor }}
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
          <v-col class="col-lg-2 col-md-3 col-12 actor-card" v-model="movie.director"
                 v-for="(director, _key) in [movie.director]" :key="_key">
            <img v-bind:src="`${movie.posterURL}`">
            <div>
              {{ director }}
            </div>
          </v-col>
        </div>
      </v-expand-x-transition>
    </v-col>

  </v-card>
</template>

<script>
import {getAuth, onAuthStateChanged} from "firebase/auth";

export default {
  name: "MoviePage",
  components: "",
  props: {
    movieId: null,
    searchQuery: {
      type: String,
      default: ""
    },
    isLoggedIn:Boolean
  },
  data: () => ({
    interval: {},
    value: 0,
    rating: 4.5,
    expand: false,
    expand2: false,
  }),
  computed: {
    isFav(){
      return this.$store.state.movieDetails.favorites
    },
    movie(){
      return this.$store.state.movieDetails
    },
    directors() {
      return this.$store.state.trendingList.slice(10, 12)
    }
  },
  async mounted() {
    let auth = getAuth();
    await onAuthStateChanged(auth,(user) => {
      let currentUserId
      if(user){
        this.isLoggedIn = true
        currentUserId = user.uid
        this.$store.dispatch("getMovieDetails", {userId: currentUserId, movieId: parseInt(this.searchQuery),num: 1})
      }
      else{
        this.isLoggedIn = false
        this.$store.dispatch("getMovieDetails", {userId: 'none', movieId: parseInt(this.searchQuery),num: 0})
      }
    })

    if(this.movie.rating!==null && this.movie.rating!=="N/A" && this.movie.rating!==undefined) {
      this.interval = setInterval(() => {

        while (this.value !== this.movie.rating * 10) {
          this.value += 1
        }
      }, 1000)
    }

  },
  methods:{
    addFav(){
      if(this.isLoggedIn){
        this.performAction(true,"addFavourite")
      }
      else
        alert("Please log in!")
    },
    removeFav(){
      if(this.isLoggedIn){
        this.performAction(false,"deleteFavourite")
      }
      else
        alert("Please log in!")
    },
    performAction(bool,Action){
      // let VueInstance = this
      let auth = getAuth();
      onAuthStateChanged(auth,(user) => {
        if(user){
          user.getIdToken(true).then((idToken)=>{
            this.$store.state.movieDetails.favorites = bool
            this.$store.dispatch(Action,{userId: user.uid,movieId: parseInt(this.searchQuery),token: idToken})
          })
        }
      })
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
.default_img{
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

.actor-card {
  -webkit-transform: scale(0.75); /* Saf3.1+, Chrome */
  -moz-transform: scale(0.75); /* FF3.5+ */
  -ms-transform: scale(0.75); /* IE9 */
  -o-transform: scale(0.75); /* Opera 10.5+ */
  transform: scale(0.75);
}

/*for mobile device*/
@media all and (max-width: 479px) {
  .image {
    width: 150pt;
    height: 250pt;
  }
}
.icon_movie{
  width: 30px;
  height: auto;
  margin-left: 10px;
}

</style>