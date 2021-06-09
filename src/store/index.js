import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex);

export default function () {
  const Store = new Vuex.Store({
    state: {
      libraries: [],
      initialLibraries: [],
      limit: 13,
  },
  getters: {
      LIBRARIES: state => {
          return state.libraries;
      },
  },

  mutations: {
      SET_LIBRARIES: function (state, payload) {
          state.libraries = payload; 
          state.initialLibraries = payload.slice(0,14);
          state.librariesCity = [...new Set(state.initialLibraries.map(item => item.data.general.locale.name))];
      },
      ADD_LIBRARIES: function(state) {
          const append = state.libraries.slice(
          state.initialLibraries.length,
          state.initialLibraries.length + state.limit
        );
        state.initialLibraries = state.initialLibraries.concat(append);
      }
  },

  actions: {
      async GET_DATA({ commit }) {
         axios
        .get("/libraries.json", { baseURL: window.location.origin })
        .then((response) => {
          const append = response.data;
          commit('SET_LIBRARIES', append);
        })
    },
    async GET_MORE_DATA({ commit }) {
      axios
     .get("/libraries.json", { baseURL: window.location.origin })
     .then((response) => {
       const append = response.data.slice(
         this.state.libraries.length,
         this.state.libraries.length, + this.state.limit
        );
       commit('ADD_LIBRARIES', append);
     })
 }
  }
  });

  return Store
}

