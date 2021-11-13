<template>
  <v-app>
    <Toolbar :logged-in="loggedIn"></Toolbar>
    <v-main>

      <Main/>

    </v-main>
  </v-app>
</template>

<script>
import Main from './components/main/Main';
import Toolbar from "@/components/toolbar/Toolbar";

export default {
  name: 'App',

  components: {
    Toolbar,
    Main,
  },

  data: () => ({
    // if you want to see Account card, change it to true
    loggedIn: false,
    items: [
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me 2' },
    ],
  }),
};
</script>
