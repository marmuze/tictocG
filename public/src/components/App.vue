<template>
  <div id="app">
    <div class="container">
      <div class="row col-md-12 d-flex justify-content-center">
        <Tictoc/>
      </div>
    </div>
  </div>
</template>

<script>
import Tictoc from "./TicToc.vue";

export default {
  name: "app",
  components: { Tictoc }
};
</script>
