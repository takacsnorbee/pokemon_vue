<template>
  <div class="home-wrapper">
    <div class="search-wrapper">
      <h1>Pokemons</h1>
      <select v-model="selectedType" name="pokemon-type-selector" id="pokemon-type-selector">
        <option value="" selected disabled>Choose Pokemon type</option>
        <option v-for="type in types" :key="type" :value="type">{{ type }}</option>
      </select>
      <input type="text" v-model="findPokemonByName" placeholder="Search by name">
      <div class="show-catched-btn" @click="showCatched = !showCatched">{{ showCatched ? 'Show catched only':'Show all'}}</div>
      <transition>
        <h2 v-if="showResult">Result:</h2>
      </transition>
    </div>
        <div class="pokemon-tiles-wrapper">
          <transition-group mode="in-out" name="list">
          
          <div v-for="pokemon in pokemons"
              :key="pokemon.pokemon.url" 
              @click="selectPokemon(pokemon.pokemon.name)" 
              :class="isCatched(pokemon.pokemon.name) ? 'catched-div' : ''" >
            {{pokemon.pokemon.name}}
          </div>
          </transition-group>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'HomeView',
  data() {
    return {
      showCatched: false,
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
      if(this.findPokemonByName.length >= 2) {
        this.$store.commit('setSearchedPokemonName', {pokemonName: this.findPokemonByName})
        if(this.showCatched) {
          return this.$store.getters.getCatchedPokemonsFilteredByName;
        } else {
          return this.$store.getters.getAllPokemonsFilteredByName;
        }
      } else {
        if(this.showCatched) {
          return this.$store.getters.getPokemonsFilteredByCatch;
        } else {
          return this.$store.getters.getPokemons;
        }
      }
    }
  },
  methods: {
    selectPokemon(name) {
      this.$store.dispatch('fetchSelected', {selectedName: name});
    },
    isCatched(name) {
      let tempCatchedPokemon = this.$store.getters.getCatchedPokemon;
      return tempCatchedPokemon.includes(name) ? true : false;
    }
  },
  watch: {
    selectedType() {
      this.showResult = true;
      this.$store.dispatch('fetchPokemons', {typeName: this.selectedType});
    },
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
  justify-content: center;
  width: 100%;
  height: 270px;
}

.search-wrapper input {
  margin: 10px 0;
  padding: 5px;
}

.search-wrapper input, .search-wrapper select {
  min-height: 1.5rem;
}

.search-wrapper input, .search-wrapper select,
.show-catched-btn, .pokemon-tiles-wrapper div {
  background-color: #FFFFFF;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: .25rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  color: rgba(0, 0, 0, 0.85);
  line-height: 1.25;
  text-transform: capitalize;
}

.search-wrapper > h1, .search-wrapper > h2 {
  text-align: center;
  margin: 20px auto;
}

.search-wrapper > h2 {
  font-size: 1.2rem;
}

.pokemon-tiles-wrapper {
  height: calc(100vh - 300px);
  min-height: 300px;
  overflow: auto;
}

.show-catched-btn {
  align-items: center;
  cursor: pointer;
  display: inline-flex;
  font-weight: 600;
  justify-content: center;
  margin: 0;
  min-height: 3rem;
  padding: calc(.875rem - 1px) calc(1.5rem - 1px);
  position: relative;
  text-decoration: none;
  transition: all 250ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  width: auto;
}

.show-catched-btn:hover,
.show-catched-btn:focus, .pokemon-tiles-wrapper div:hover {
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  color: rgba(0, 0, 0, 0.65);
}

.show-catched-btn:hover, .pokemon-tiles-wrapper div:hover {
  transform: translateY(-1px);
}

.show-catched-btn:active {
  background-color: #F0F0F1;
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
  color: rgba(0, 0, 0, 0.65);
  transform: translateY(0);
}

.pokemon-tiles-wrapper div{
  margin-bottom: 10px;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.pokemon-tiles-wrapper div:nth-child(odd){
  background-color: rgba(0, 0, 0, 0.1);
}

.catched-div {
  border: 1px solid green!important;
  background-color: rgb(137, 255, 211, 0.3)!important;
}

/* List transition */

.list-move, 
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
}

.list-leave-active {
  position: absolute;
}

</style>
