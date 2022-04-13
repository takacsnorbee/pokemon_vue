<template>
  <div>
    <!-- <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/pokemon">About</router-link>
    </nav> -->
    <router-view/>
  </div>
</template>

<style>

#app {
  height: auto;
  width: 100%;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

#app > div {
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
}

</style>
