<template>
  <div v-if="pokemonToShow" class="pokemon-wrapper">
    <h1>{{ pokemonToShow.name }}</h1>
    <img :src="pokemonToShow.sprites.front_default" :alt="pokemonToShow.name">
    <div class="buttons">
      <router-link to="/" class="back-btn">Back</router-link>
      <transition mode="out-in">
        <a v-if="isCatched(pokemonToShow.name)" 
          @click="releasePokemon(pokemonToShow.name)" 
          class="release-btn">Release</a>
        <a v-else 
          @click="catchPokemon(pokemonToShow.name)" 
          class="catch-btn">Catch</a>
      </transition>
    </div>
    <div class="name">Name: {{pokemonToShow.name}}</div>
    <div class="weight">Weight: {{pokemonToShow.weight}}</div>
    <div class="height">Height: {{pokemonToShow.height}}</div>
    <div class="abilities">Abilities: {{ abilities }}</div>
  </div>
  <div v-else>
    <h1>No selected Pokemon</h1>
    <router-link to="/">Back to home</router-link>
  </div>
</template>

<script>
export default {
  name: 'PokemonView',
  data() {
    return {
    }
  },
  computed: {
    pokemonToShow() {
      if(Object.keys(this.$store.getters.getSelectedPokemon).length === 0) {
        return false;
      } else {
        return this.$store.getters.getSelectedPokemon;
      }
    },
    abilities() {
      let abilities = this.$store.getters.getSelectedPokemon.abilities.map( e => e.ability.name)
      return abilities.join(', ')
    }
  },
  methods: {
    catchPokemon(pokemonName) {
      let pokemonsInLocalStorage = localStorage.getItem('catchedPokemons');
      pokemonsInLocalStorage = pokemonsInLocalStorage ? pokemonsInLocalStorage.split(',') : [];
      pokemonsInLocalStorage.push(pokemonName);
      localStorage.setItem('catchedPokemons', pokemonsInLocalStorage);
      this.$store.commit('setCatchedPokemon', {pokemonName: pokemonName})
    },
    releasePokemon(pokemonName) {
      let pokemonsInLocalStorage = localStorage.getItem('catchedPokemons');
      let filteredPokemons = pokemonsInLocalStorage.split(',').filter( e => e != pokemonName)
      localStorage.setItem('catchedPokemons', filteredPokemons);
      this.$store.commit('setReleasedPokemon', {pokemonName: pokemonName})
    },
    isCatched(pokemonName) {
      let catchedPokemons = this.$store.getters.getCatchedPokemon;
      return Object.values(catchedPokemons).includes(pokemonName) ? true : false;
    }
  },
  mounted() {
  },
  components: {
  }
}
</script>


<style scoped>

.pokemon-wrapper {
  width: 100vw;
  text-align: center;
}

.pokemon-wrapper h1 {
  padding: 10px 0;
}

.pokemon-wrapper img {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
}

.pokemon-wrapper div, .buttons a {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.25rem;
  box-shadow: rgb(0 0 0 / 2%) 0 1px 3px 0;
  color: rgba(0, 0, 0, 0.85);
  line-height: 1.25;
  text-transform: capitalize;
  padding: 10px 0;
}

.pokemon-wrapper div {
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.buttons {
  width: 100%;
  display: flex;
  justify-content: space-around;
}

.buttons a {
  text-decoration: none;
  background-color: rgba(0, 0, 0, 0.1);
  cursor: pointer;
  max-width: 300px;
}

.buttons a:hover,
.buttons a:focus {
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  color: rgba(0, 0, 0, 0.65);
}

.buttons a:hover{
  transform: translateY(-1px);
}

.buttons a:active {
  background-color: #F0F0F1;
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
  color: rgba(0, 0, 0, 0.65);
  transform: translateY(0);
}

.release-btn, .catch-btn, .back-btn {
  display: inline-block;
  width: 40%;
}

.release-btn {
  background-color: rgb(255, 76, 76, 0.6)!important;
}

.name, .pokemon-wrapper > h1 {
  text-transform: capitalize;
}

</style>