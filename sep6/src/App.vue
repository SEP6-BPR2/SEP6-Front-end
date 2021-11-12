<template>
  <v-app>
    <Toolbar :logged-in="loggedIn"></Toolbar>
    <v-main>
      <HelloWorld/>
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import Toolbar from "@/components/toolbar/Toolbar";

export default {
  name: 'App',

  components: {
    Toolbar,
    HelloWorld,
  },

  data: () => ({
    //
    loggedIn: true,
    items: [
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me 2' },
    ],
  }),
};
</script>
