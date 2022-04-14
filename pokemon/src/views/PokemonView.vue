<template>
  <div v-if="pokemonToShow" class="pokemon-wrapper">
    <h1>This is a pokemon page</h1>
    <img :src="pokemonToShow.sprites.front_default" :alt="pokemonToShow.name">
    <router-link to="/">Back</router-link>
    <div v-if="isCatched(pokemonToShow.name)" @click="releasePokemon(pokemonToShow.name)" class="release-btn">Release</div>
    <div v-else @click="catchPokemon(pokemonToShow.name)" class="catch-btn">Catch</div>
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
      console.log('catch pokemon')
      console.log(pokemonName)
      this.$store.commit('setCatchedPokemon', {pokemonName: pokemonName})
    },
    releasePokemon(pokemonName) {
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

.name {
  text-transform: capitalize;
}

</style>