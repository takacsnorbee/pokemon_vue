import { createStore } from 'vuex'
import axios from 'axios'
import router from '@/router';

export default createStore({
  state: {
    isLoading: false,
    types: [],
    pokemons: [],
    selectedPokemon: [],
    catchedPokemons: [],
    searchedPokemonName: '',
  },
  getters: {
    getIsLoading: state => state.isLoading,
    getTypes: state => state.types,
    getPokemons: state => state.pokemons,
    getSelectedPokemon: state => state.selectedPokemon,
    getCatchedPokemon: state => state.catchedPokemons,
    getPokemonsFilteredByCatch: state => {
      let tempPokemons = [];
      state.catchedPokemons.forEach( e => {
        state.pokemons.filter( f => {
          if (f.pokemon.name === e) {
            tempPokemons.push(f);
          }
        })
      })
      return tempPokemons;
    },
    getAllPokemonsFilteredByName: state => {
      return state.pokemons.filter( e => e.pokemon.name.includes(state.searchedPokemonName));
    },
    getCatchedPokemonsFilteredByName: (state, getters) => {
      return getters.getPokemonsFilteredByCatch.filter( e => e.pokemon.name.includes(state.searchedPokemonName));
    }
  },
  mutations: {
    setIsLoading(state, payload) {
      state.isLoading = payload;
    },
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
    setCatchedPokemon(state, payload) {
      state.catchedPokemons.push(payload.pokemonName);
    },
    setReleasedPokemon(state, payload) {
      state.catchedPokemons = Object.values(state.catchedPokemons).filter( e => e !== payload.pokemonName);
    },
    setSearchedPokemonName(state, payload) {
      state.searchedPokemonName = payload.pokemonName;
    }
  },
  actions: {
    fetchType({commit}) {
      commit('setIsLoading', true);
      axios.get('https://pokeapi.co/api/v2/type')
        .then( data => {
          let tempTypes = data.data.results.map((e)=> e.name);
          commit('setTypes', tempTypes)
        })
        .catch( err => console.log(err))
        .finally( () => {
            commit('setIsLoading', false);
          })
      },
      fetchPokemons({commit}, payload) {
        commit('setIsLoading', true);
        axios.get(`https://pokeapi.co/api/v2/type/${payload.typeName}`)
          .then( data => {
            commit('setPokemons', data.data.pokemon)
          })
          .catch( err => console.log(err) )
          .finally( () => {
            commit('setIsLoading', false);
          })
    },
    fetchSelected({commit}, payload) {
      commit('setIsLoading', true);
      axios.get(`https://pokeapi.co/api/v2/pokemon/${payload.selectedName}`)
        .then( data => {
          commit('setSelectedPokemon', data.data)
        } )
        .catch( err => console.log(err) )
        .finally( () => {
          router.push('/pokemon')
          commit('setIsLoading', false);
        } )
    }
  },
  modules: {
  }
})
