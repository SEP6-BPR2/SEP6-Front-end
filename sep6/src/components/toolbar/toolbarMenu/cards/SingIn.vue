<template>
  <v-card
      elevation="10"
      class="mx-auto"
      max-width="344"
      loading
  >
    <v-list-item three-line>
      <v-list-item-content>

        <v-list-item-title class="text-h5 mb-1">
          Sing in
        </v-list-item-title>
        <v-list-item-subtitle>Currently you are using service as guest</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar
          tile
          size="80"
          color="grey"
      ></v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn
          outlined
          rounded
          text
      >
        Facebook
      </v-btn>

      <v-btn
          outlined
          rounded
          text
      >
        Google
      </v-btn>
    </v-card-actions>

  </v-card>
</template>

<script>
export default {
  name: "SingIn"
}
</script>

<style scoped>

</style>