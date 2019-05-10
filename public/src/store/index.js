import axios from "axios";

export default {
  state: {
    parties: []
  },
  getters: {
    recupParties: state => {
      return state.parties;
    },
    recupNbPartie: state => state.parties.length,
    recupNbWin: state =>
      !!state.parties.length && state.parties.filter(p => p.win !== "").length,
    recupNbDraw: state =>
      !!state.parties.length && state.parties.filter(p => p.draw).length,
    recupNbCoupTot: state => {
      if (!state.parties.length) return 0;
      const som = (acc, currentValue) => acc + currentValue.nbcoup;
      return state.parties.reduce(som, 0);
    },
    recupNbPlayerWin: state => player =>
      state.parties.filter(p => p.win == player).length
  },
  mutations: {
    setPartie(state, tabPart) {
      state.parties = tabPart;
    }
  },
  actions: {
    loadParties({ commit }) {
      let url = "http://localhost:4000/api/loadParties";
      axios
        .get(url)
        .then(response => {
          commit("setPartie", response.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    savePartie({ commit }, dataPartie) {
      let url = "http://localhost:4000/api/addPartie";

      axios
        .post(url, dataPartie)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
