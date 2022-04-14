<template>
  <div class="home-wrapper">
    <div class="search-wrapper">
      <h1>Pokemons</h1>
      <select v-model="selectedType" name="pokemon-type-selector" id="pokemon-type-selector">
        <option value="" selected disabled>Choose Pokemon type</option>
        <option v-for="type in types" :key="type" :value="type">{{ type }}</option>
      </select>
      <input type="text" v-model="findPokemonByName">
      <div class="show-catched-btn" @click="showCatched = !showCatched">{{ showCatched ? 'Show catched only':'Show all'}}</div>
      <h2 v-if="showResult">Result:</h2>
    </div>
    <div class="pokemon-tiles-wrapper">
      <div v-for="pokemon in pokemons" 
          :key="pokemon.pokemon.url" 
          @click="selectPokemon(pokemon.pokemon.name)" 
          :class="pokemon.pokemon.catched?'catched-div':''" >
        {{pokemon.pokemon.name}}
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
  },
  data() {
    return {
      showCatched: true,
      selectedType: '',
      findPokemonByName: '',
      showResult: false,
    }
  },
  computed: {
    types() {
      return this.$store.getters.getTypes;
    },
    pokemons() {
      let pokemons = this.$store.getters.getPokemons;
      let catchedPokemons = this.$store.getters.getCatchedPokemon;
      pokemons.map( (e) => {
        catchedPokemons.map( f => {
          if(f === e.pokemon.name) {
            console.log('megegyező név')
            e.pokemon.catched = true;
          } else {
            e.pokemon.catched = false;
          }
        })
      })
            console.log(catchedPokemons)
            console.log(pokemons)
      return pokemons;
    }
  },
  methods: {
    selectPokemon(name) {
      console.log(name)
      this.$store.dispatch('fetchSelected', {selectedName: name});
    }
  },
  watch: {
    selectedType() {
      this.showResult = true;
      this.$store.dispatch('fetchPokemons', {typeName: this.selectedType});
    }
  },
  mounted() {
    this.$store.dispatch('fetchType');
  },
}
</script>

<style scoped>

.home-wrapper {
  width: 80%;
}

.search-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 200px;
}

.search-wrapper > h1, .search-wrapper > h2 {
  text-align: center;
}

.pokemon-tiles-wrapper {
  height: calc(100vh - 300px);
  overflow: scroll;
}

.show-catched-btn {
  background-color: aqua;
}

.pokemon-tiles-wrapper div{
  margin-bottom: 10px;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  border: 1px solid transparent;
}

.pokemon-tiles-wrapper div:hover{
  border: 1px solid green;
}

.pokemon-tiles-wrapper div:nth-child(odd){
  background-color: brown;
}

.pokemon-tiles-wrapper div:nth-child(even){
  background-color: yellow;
}

.catched-div {
  border: 1px solid green!important;
}

</style>
