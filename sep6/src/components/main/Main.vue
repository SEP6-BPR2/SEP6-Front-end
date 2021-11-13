<template>

  <v-container>
    <v-row>
      <v-col cols="12">
        <Carousel></Carousel>
      </v-col>
    </v-row>

    <v-subheader>Trending?</v-subheader>

    <v-row>
      <!--      TODO: we can do more in here
                 maybe something similar like in netflix? If yes, make it display photos from API-->
      <v-col
          v-for="i in 18"
          :key="i"
          cols="2"
      >
        <img
            :src="`https://randomuser.me/api/portraits/men/${i + 20}.jpg`"
            alt="lorem"
            class="image"
            height="100%"
            width="100%"
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col>

      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import Carousel from "@/components/main/Carousel";

export default {
  name: 'HelloWorld',
  components: {Carousel},
  data: () => ({

  }),
}
</script>
