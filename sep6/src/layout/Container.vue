<template>
  <v-app>
  <Layout>
    <template v-slot:main_header>
        <Toolbar></Toolbar>
    </template>
    <template>
      <router-view/>
    </template>
  </Layout>
  </v-app>
</template>

<script>
import Toolbar from "@/components/toolbar/Toolbar";
import Layout from "./Layout";

export default {
  name: "Container",
  components: { Layout, Toolbar},
  data: () => ({
    //
    // loggedIn: false,
    items: [
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me 2' },
    ],
  }),
}
</script>

<style scoped>

</style>