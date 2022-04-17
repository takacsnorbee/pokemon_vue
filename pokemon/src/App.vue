<template>
  <div>
    <loading-comp v-show="isLoading" />
    <router-view/>
  </div>
</template>

<script>

import LoadingComp from './components/LoadingComp.vue'

export default {
  components: { LoadingComp },
  computed: {
    isLoading() {
      return this.$store.getters.getIsLoading;
    }
  },
  mounted() {
    let pokemonsInLocalStorage = localStorage.getItem('catchedPokemons');
    if(pokemonsInLocalStorage) {
      pokemonsInLocalStorage.split(',').forEach( e => this.$store.commit('setCatchedPokemon', {pokemonName: e}));
    }
  },
}

</script>

<style>

#app {
  height: 100vh;
  width: 100%;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

#app > div {
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
}

/* Default transition */

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

</style>
