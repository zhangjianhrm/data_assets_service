import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    info_standard_tab: ""
  },
  getters: {},
  mutations: {
    homeTurn(state, payload) {
      state.info_standard_tab = payload;
    }
  },
  actions: {}
});
