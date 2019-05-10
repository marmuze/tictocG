<template>
  <div id="app">
    <div  class="container">
      <div class="row col-md-12 d-flex justify-content-center">
        <tictoc/>
      </div>
    </div>
  </div>
</template>

<script>

import Tictoc from "./Tictoc.vue";

export default {
  name: "app",
  components: { Tictoc }
};
</script>

<style>

</style>
