<template>
  <div>
<!--    :navigate-to="someLocalProperty"-->
    <carousel :per-page="3"  :mouse-drag="true">
      <Slide v-for="(slide,_key) in slides" :key="_key">
        <div id="imgcontainer">
          <img id="carousel_img" v-bind:src="'https://image.tmdb.org/t/p/w500/'+slide.poster_path">
          <div class="overlay">
            {{slide.overview}}
          </div>
        </div>
      </Slide>
    </carousel>

    <div class="movies_list row">
      <div class="row">
        <v-col
            class="d-flex col-3 mx-9 pl-8"
        >
          <v-select
              id="select_sorter"
              :items="sorts"
              filled
              label="Choose sort"
          ></v-select>

        </v-col>
      </div>


      <div class="movie_item col-2" @mouseover="showIcon(_key)" @mouseleave="removeIcon"  v-for="(slide,_key) in slides" :key="_key" >
        <img id="movie_item_pic" v-bind:src="'https://image.tmdb.org/t/p/w200/'+slide.poster_path">
        <div id="title_val">
          {{slide.title}}{{slide.name}}
        </div>
        <div>
          {{slide.release_date}}{{slide.first_air_date}}
        </div>
        <font-awesome-icon v-if="showId==_key" class="icon_movie" icon="eye"/>
        <!--maybe genre-->
      </div>

    </div>
  </div>

</template>

<script>
import { Carousel, Slide } from 'vue-carousel';


export default {
  name: 'Home',
  components: {
    Carousel,
    Slide
  },
  data(){
    return{
      showId:null,
      sorts:['Trending','Latest','Popular']
    }
  },
  computed:{
    slides(){
      return this.$store.state.trendingList
    },

  },
  methods:{
    showIcon(key){
      this.showId = key
      return this.showIcon
    },
    removeIcon(){
      this.showId=null
    }
  },
  mounted() {
    this.$store.dispatch("getTrendingList");
  },

}
</script>

<style lang="scss" scoped>

#select_sorter{
  width: 100px;
  height: auto;
}

.icon_movie{
  position: absolute;
  width: 60px;
  height: auto;
  color: lightblue;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

#title_val{
  display: -webkit-box;
  max-width: 200px;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

#movie_item_pic{
  position: relative;
  height: 300px;
  width: 200px;
}

.movie_item:hover {
  cursor: pointer;
  transform: scale(1.04);
  transition: all 0.2s ease-in;
}

.movie_item:hover #movie_item_pic{
  opacity: 0.4;
}

.movies_list{
  margin-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;}

.movie_item{
  position: relative;
  padding: 10px;
  margin: 10px;
}

#imgcontainer{
  position: relative;
}

#imgcontainer:hover #carousel_img{
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

#imgcontainer:hover .overlay{
  height: 60%;
}

.overlay{
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