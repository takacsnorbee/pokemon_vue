import { createStore } from 'vuex'
import axios from 'axios'
import router from '@/router';

export default createStore({
  state: {
    types: [],
    pokemons: [],
    selectedPokemon: [],
  },
  getters: {
    getTypes: (state) => {
      return state.types;
    },
    getPokemons: (state) => {
      return state.pokemons;
    },
    getSelectedPokemon: (state) => {
      return state.selectedPokemon;
    },
  },
  mutations: {
    setTypes(state, payload) {
      state.types = payload;
    },
    setPokemons(state, payload) {
      state.pokemons = payload;
    },
    setSelectedPokemon(state, payload) {
      console.log(payload)
      state.selectedPokemon = payload;
    },
  },
  actions: {
    fetchType({commit}) {
      //todo spinner
      axios.get('https://pokeapi.co/api/v2/type')
      .then( data => {
        let tempTypes = data.data.results.map((e)=> e.name);
        commit('setTypes', tempTypes)
        })
        .catch( err => console.log(err))
        .finally( () => {
          //todo spinner out
        })
    },
    fetchPokemons({commit}, payload) {
      //todo spinner
      axios.get(`https://pokeapi.co/api/v2/type/${payload.typeName}`)
        .then( data => {
          commit('setPokemons', data.data.pokemon)
        } )
        .catch( err => console.log(err) )
        .finally( () => {
          //todo spinner out
        } )
    },
    fetchSelected({commit}, payload) {
      //todo spinner
      axios.get(`https://pokeapi.co/api/v2/pokemon/${payload.selectedName}`)
        .then( data => {
          commit('setSelectedPokemon', data.data)
        } )
        .catch( err => console.log(err) )
        .finally( () => {
          router.push('/pokemon')
          //todo spinner out
        } )
    }
  },
  modules: {
  }
})
