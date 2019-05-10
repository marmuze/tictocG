<template>
  <div>
    <div id="welcome" v-if="!started">
      <div class="titleBlock">
        <h1>
          tictactoe Georges 
        </h1>
        <stat-tic-toc/>
         <form @submit.prevent>
            <div class="form-group">
                <input type="text" class="form-control" placeholder="Player X"
                       v-model="player.x">
            </div>
             <div class="form-group">
                <input type="text" class="form-control"  placeholder="Player O"
                       v-model="player.o">
            </div>
        </form>
        <div class="row col-md-12" @click="init()">
          Play
        </div>
      </div>
    </div>

    <div id="main" v-if="started && !game.over">
      {{player[turn] || turn }} play;
      <table id="board">
        <tr v-for="(row,i) in board" :key="i">
          <td v-for="(box,j) in row" :key="j">
            <div class="square" @click="mark(box)" :class="{'square active': box.bg}">{{box.val}}</div>
          </td>
        </tr>
      </table>
    </div>

    <div id="reset" v-if="started && game.over">
      <div class="titleBlock">
        <h1 v-if="!game.draw">
          <span>{{game.winner}}</span> wins you are the best!!
        </h1>
        <h1 v-if="game.draw">
          <span>draw stay good friends</span>
        </h1>
        <div class="row" @click="init()">
         <h2>play again?</h2>
        </div>
        <stat-tic-toc/>
      </div>
    </div>
  </div>
</template>

<script>

import StatTicToc from "./StatTicToc.vue";
export default {
  components: {  StatTicToc},
  data() {
    return {
      started: false,
      showModal: false,
      run: false,
      turn: "X",
      player:{
        x:"",
        o:""
      },
      game: {
        over: false,
        winner: "",
        draw: false
      },

      board: [
        [{ val: "", bg: "" }, { val: "", bg: "" }, { val: "", bg: "" }],
        [{ val: "", bg: "" }, { val: "", bg: "" }, { val: "", bg: "" }],
        [{ val: "", bg: "" }, { val: "", bg: "" }, { val: "", bg: "" }]
      ],

      windex: [
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]]
      ],
      partieStat:{
        nbcoup:0,
        draw:false,
        win:""
      }
    };
  },
  computed: {
    arr() {
      return this.board.map(x => x.map(y => y.val));
    },

    winArr() {
      return this.windex.map(x => x.map(y => this.board[y[0]][y[1]].val));
    }
  },
  methods: {
      /**
       * initialisation du jeu
       */
    init() {
      this.reset();
      this.start();
    },
    /**
     * démarrage 
     */
    start() {
      this.run = true;
      this.started = true;
    },
/**
 * remise des valeur par défaut pour nettoyer le jeu précedent
 */
    reset() {
      this.run = false;
      this.game.over = false;
      this.game.winner = "";
      this.game.draw = false;
      this.turn="X";
      this.partieStat.nbcoup=0;
      this.partieStat.draw=false;
      this.partieStat.win="";

      this.board.forEach(x => {
        x.map(y => {
          y.val = "";
          y.bg = "";
        });
      });
    },
  /**
 * fonction qui écrit dans la case si autorisé et vérifie si ce coup fait gagner
 */
    mark(box) {
      if (box.val == "" && this.run) {
        this.partieStat.nbcoup+=1;
        box.val = this.turn;
        this.turn = this.turn == "X" ? "O" : "X";
        this.check();
      }
    },
    /**
     * vérification de la victoire et du null
     */
    check() {
      const board = this.arr;
      const windex = this.winArr;
      const draw = this.arr.every(x => x.every(y => y != ""));

      const checkWin = windex.forEach((x, ind) => {
        const vector = this.windex[ind];
        let over = false;

        if (x.every(y => y == "X")) {
          this.game.winner = this.player.x || "X";
          over = true;
        }

        if (x.every(y => y == "O")) {
          this.game.winner = this.player.o ||"O";
          over = true;
        }

        if (draw) {
          this.partieStat.draw=true;
          this.game.draw = true;
          over = true;
        }

        if (over) {
          this.run = false;
          this.savePartie();
          this.setWin(vector);
        }
      });
    },
    /**
     * animation victoire
     */
    setWin(vector) {
      if (!this.game.draw) {
        this.partieStat.win=this.game.winner;
        vector.forEach(x => {
          this.board[x[0]][x[1]].bg = "active";
        });
      }

      setTimeout(() => {
        this.game.over = true;
      }, 500);
    },
    savePartie(){
        this.$store.dispatch('savePartie',this.partieStat)
    }
  }
};
</script>

<style scoped>
.square {
  width: 15vw;
  height: 15vw;
  background: rgb(154, 130, 240);
  cursor: pointer;
  font-size: 15vw;
  line-height: 15vw;
  text-align: center;
  color: white;
}
.square :hover {
  opacity: 0.8;
}
.square :active {
  background: rgb(173, 119, 224);
}
.row{
  cursor:pointer;
}
</style>
