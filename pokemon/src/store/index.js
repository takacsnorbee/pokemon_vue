import { createStore } from 'vuex'
import axios from 'axios'
import router from '@/router';

export default createStore({
  state: {
    types: [],
    pokemons: [],
    selectedPokemon: [],
    catchedPokemons: ['ivysaur', 'beedrill'],
  },
  getters: {
    getTypes: state => state.types,
    getPokemons: state => state.pokemons,
    getSelectedPokemon: state => state.selectedPokemon,
    getCatchedPokemon: state => state.catchedPokemons,
    getPokemonsFilteredByCatch: state => {
      let tempCatchedPokemons = state.catchedPokemons;
      let tempPokemons = [];
      tempCatchedPokemons.forEach( e => {
        state.pokemons.filter( f => {
          if (f.pokemon.name == e) {
            tempPokemons.push(f);
          }
        })
      })
      return tempPokemons;
    },
    getPokemonsFilteredByName: state => {
      console.log(state)
    }
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
    setCatchedPokemon(state, payload) {
      state.catchedPokemons.push(payload.pokemonName);
    },
    setReleasedPokemon(state, payload) {
      state.catchedPokemons = Object.values(state.catchedPokemons).filter( e => e !== payload.pokemonName);
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
