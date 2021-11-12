<template>
  <nav class="d-flex justify-content-between navbar navbar-light bg-light">
      <a class="navbar-brand" href="#">Navbar</a>

      <div class="d-flex flex-row">
        <input v-model="searchInput" class="form-control" type="search" placeholder="Search" aria-label="Search">
        <button class=" btn btn-outline-success" type="submit">Search</button>
      </div>

      <select class=" btn btn-outline-secondary" v-model="chosenGenre">
        <option v-for="genre in genres" :key="genre.id" class="btn btn-secondary dropdown-toggle" role="button"
                id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
          {{ genre }}
        </option>
      </select>

      <button v-if="loggedIn" type="button" class="btn btn-outline-secondary">Account</button>
      <button v-else type="button" class="btn btn-outline-secondary">Sign in</button>

    </nav>

</template>

<script>
export default {
  name: 'Header',
  props: ['loggedIn'],
  data() {
    return {
      searchInput: "",
      chosenGenre: "",
      genres: ["comedy", "horror"]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.d-flex {
  padding: 0;
}
</style>
