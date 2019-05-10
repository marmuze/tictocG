<template>
  <div>
    <li >Number of part: {{nbParties}}</li>
    <li >Number of check: {{nbCoupMoy}}</li>
    <li >Number of draw : {{nbDraw}}</li>
    <li >Number of X win:  {{nbPlayerWin("X")}}</li>
      <li >Number of O win: {{nbPlayerWin("O")}}</li>
  </div>
</template>

<script>
export default {
  data() {
    return {
  
    };
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
    nbPlayerWin(player){
          return this.$store.getters.recupNbPlayerWin(player);
    }
  },
  created() {
    this.$store.dispatch("loadParties");
  }
};
</script>

