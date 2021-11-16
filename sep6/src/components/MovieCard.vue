<template>
<div>
  <img :src="require(image_path)">
  <div>{{ name }}</div>
</div>
</template>

<script>
export default {
  name: "MovieCard",
  data(){
    return{
      image_path:'',
      name:''
    }
  }
}
</script>

<style scoped>

</style>