import { createStore } from "vuex";

export default createStore({
  state: {},
  getters: {},
  mutations: {
    ADD_NUMBER(state, payload) {
      state.numbers.push(payload);
    },
  },
  actions: {},
  modules: {},
});
