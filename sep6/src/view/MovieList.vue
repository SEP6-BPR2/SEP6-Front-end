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

    <MovieSegment/>

  </div>
</template>

<script>
import MovieSegment from "@/view/MovieSegment";
export default {
  name: "MovieList",
  components: {MovieSegment},
  props: ['loadFrom'],
  data() {
    return {
      sortBy: ['date', 'rating', 'popularity'],
      nextItem: 1,
      items: []
    }
  },
  computed: {
    movies() {
      let list
      if (this.loadFrom == "tranding") {
        list = this.$store.state.trendingList
      } else if (this.loadFrom === "search") {
        // fetch search result from store
      } else if (this.loadFrom === "favourites") {
        // fetch favourites from store
      }
      return list
    }
  },
  mounted() {
    const listElm = document.querySelector('#infinite-list');
    listElm.addEventListener('scroll', () => {
      if (listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight) {
        this.loadMore();
      }
    });

    // Initially load some items.
    this.loadMore();
  },
  methods: {
    loadMore() {

      /** This is only for this demo, you could
       * replace the following with code to hit
       * an endpoint to pull in more data. **/
      this.loading = true;
      setTimeout(() => {
        for (var i = 0; i < 20; i++) {
          this.items.push('Item ' + this.nextItem++);
        }
        this.loading = false;
      }, 200);
      /**************************************/

    }
  }

}
</script>

<style scoped>

.list-group-wrapper {
  position: relative;
}

.list-group {
  overflow: auto;
  height: 50vh;
  border: 2px solid #dce4ec;
  border-radius: 5px;
}

.loading {
  text-align: center;
  position: absolute;
  color: #fff;
  z-index: 9;
  background: purple;
  padding: 8px 18px;
  border-radius: 5px;
  left: calc(50% - 45px);
  top: calc(50% - 18px);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}

.fade-enter, .fade-leave-to {
  opacity: 0
}

</style>