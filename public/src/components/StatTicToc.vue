<template>
  <div>
    <div class="alert alert-primary">Number of part: {{nbParties}}</div>
    <div class="alert alert-primary">Number of check: {{nbCoupMoy}}</div>
    <div class="alert alert-primary">Number of draw : {{nbDraw}}</div>
    <div class="alert alert-primary">Number of X win: {{nbPlayerWin("X")}}</div>
    <div class="alert alert-primary">Number of O win: {{nbPlayerWin("O")}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    nbParties() {
      return this.$store.getters.recupNbPartie;
    },
    nbDraw() {
      return this.$store.getters.recupNbDraw;
    },
    nbWin() {
      return this.$store.getters.recupNbWin;
    },
    nbCoupMoy() {
      return Math.round(this.$store.getters.recupNbCoupTot / this.nbParties);
    }
  },
  methods: {
    nbPlayerWin(player) {
      return this.$store.getters.recupNbPlayerWin(player);
    }
  },
  created() {
    this.$store.dispatch("loadParties");
  }
};
</script>

