<template>
  <div>
<!--    :navigate-to="someLocalProperty"-->
    <carousel :perPageCustom="[[300,1],[768, 3], [1024, 4]]" :autoplay="true"  :mouse-drag="true">
      <Slide v-for="(slide,_key) in slides" :key="_key">
        <div id="imgcontainer">
          <img id="carousel_img" v-bind:src="'https://image.tmdb.org/t/p/w500/'+slide.poster_path">
          <div class="overlay2"></div>
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


      <div class="movie_item col-2 col-sm-4 col-md-2" :id="_key" @mouseover="showIcon(_key)" @mouseleave="removeIcon(_key)"  v-for="(slide,_key) in slides" :key="_key" >
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
      document.getElementById(key).style.zIndex = "99"
      this.showId = key
      return this.showIcon
    },
    removeIcon(key){
      document.getElementById(key).style.zIndex = "1"
      this.showId=null
    }
  },
  mounted() {
    this.$store.dispatch("getTrendingList");
  },

}
</script>

<style lang="scss" scoped>
#descript_movies{
  padding: 3px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 6;
  overflow: hidden;

}

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
  max-width: 200px;
  display: -webkit-box;
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
  height: 550px;
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

.overlay2{
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  background: -moz-linear-gradient(top,  rgba(255,255,255,0) 0%, rgb(34, 71, 71) 100%); /* FF3.6+ */
  background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(255,255,255,0)), color-stop(100%, rgb(34, 71, 71))); /* Chrome,Safari4+ */
  background: -webkit-linear-gradient(top,  rgba(255,255,255,0) 0%, rgb(34, 71, 71) 100%); /* Chrome10+,Safari5.1+ */
  background: -o-linear-gradient(top,  rgba(255,255,255,0) 0%, rgb(34, 71, 71) 100%); /* Opera 11.10+ */
  background: -ms-linear-gradient(top,  rgba(255,255,255,0) 0%, rgb(34, 71, 71) 100%); /* IE10+ */
  background: linear-gradient(to bottom,  rgba(255,255,255,0) 0%, rgb(34, 71, 71) 100%); /* W3C */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00ffffff', endColorstr='#ffffff',GradientType=0 ); /* IE6-9 */
}
</style>