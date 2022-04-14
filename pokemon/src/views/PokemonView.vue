<template>
  <div v-if="pokemonToShow" class="pokemon-wrapper">
    <h1>This is a pokemon page</h1>
    <img :src="pokemonToShow.sprites.front_default" :alt="pokemonToShow.name">
    <router-link to="/">Back</router-link>
    <div @click="pokemonIsCatched = !pokemonIsCatched" class="catch-btn">{{ pokemonIsCatched ? 'Release':'Catch' }}</div>
    <div class="name">{{pokemonToShow.name}}</div>
    <div class="weight">{{pokemonToShow.weight}}</div>
    <div class="height">{{pokemonToShow.height}}</div>
    <div class="abilities">{{ abilities }}</div>
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
      pokemonIsCatched: false,
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
  mounted() {
    console.log('mounted')
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