import { createStore } from 'vuex'
import axios from 'axios'

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
    }
  },
  mutations: {
    setTypes(state, payload) {
      state.types = payload;
    },
    setPokemons(state, payload) {
      console.log(payload)
      state.pokemons = payload;
    },
    setSelectedPokemon(state, payload) {
      console.log(payload)
      state.selectedPokemon = payload;
    }
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
          console.log(data.data)
          commit('setSelectedPokemon', data.data)
        } )
        .catch( err => console.log(err) )
        .finally( () => {
          //todo spinner out
        } )
    }
  },
  modules: {
  }
})
