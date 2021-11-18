<template>
  <div class="main_container">
    <div id="main_header">
      <slot name="main_header"></slot>
    </div>

    <article id="main_body">
      <slot/>
    </article>
  </div>
</template>

<script>
export default {
  name: "Layout"
}
</script>

<style scoped>
#main_header{
  position:fixed;
  width: 100%;
  z-index: 100;
  background-color: rgba(42,0,0,0.4);
}

#main_body{
  text-align: center;
}

.main_container{
  background-color: #224747;
}

</style>