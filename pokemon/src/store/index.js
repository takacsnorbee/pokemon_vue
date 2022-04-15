import { createStore } from 'vuex'
import axios from 'axios'
import router from '@/router';

export default createStore({
  state: {
    types: [],
    pokemons: [],
    selectedPokemon: [],
    catchedPokemons: ['ivysaur', 'beedrill'],
    searchedPokemonName: '',
  },
  getters: {
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
      let tempPokemons = state.pokemons.filter( e => e.pokemon.name.includes(state.searchedPokemonName));
      return tempPokemons;
    },
    getCatchedPokemonsFilteredByName: (state, getters) => {
      let tempPokemons = getters.getPokemonsFilteredByCatch.filter( e => e.pokemon.name.includes(state.searchedPokemonName));
      return tempPokemons;
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
    setSearchedPokemonName(state, payload) {
      state.searchedPokemonName = payload.pokemonName;
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
