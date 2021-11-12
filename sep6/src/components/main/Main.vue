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

  </v-container>
</template>

<script>
import Carousel from "@/components/main/Carousel";

export default {
  name: 'HelloWorld',
  components: {Carousel},
  data: () => ({
    ecosystem: [
      {
        text: 'vuetify-loader',
        href: 'https://github.com/vuetifyjs/vuetify-loader',
      },
      {
        text: 'github',
        href: 'https://github.com/vuetifyjs/vuetify',
      },
      {
        text: 'awesome-vuetify',
        href: 'https://github.com/vuetifyjs/awesome-vuetify',
      },
    ],
    importantLinks: [
      {
        text: 'Documentation',
        href: 'https://vuetifyjs.com',
      },
      {
        text: 'Chat',
        href: 'https://community.vuetifyjs.com',
      },
      {
        text: 'Made with Vuetify',
        href: 'https://madewithvuejs.com/vuetify',
      },
      {
        text: 'Twitter',
        href: 'https://twitter.com/vuetifyjs',
      },
      {
        text: 'Articles',
        href: 'https://medium.com/vuetify',
      },
    ],
    whatsNext: [
      {
        text: 'Explore components',
        href: 'https://vuetifyjs.com/components/api-explorer',
      },
      {
        text: 'Select a layout',
        href: 'https://vuetifyjs.com/getting-started/pre-made-layouts',
      },
      {
        text: 'Frequently Asked Questions',
        href: 'https://vuetifyjs.com/getting-started/frequently-asked-questions',
      },
    ],
  }),
}
</script>
