<template>
  <div id="c-menu" class="align-around-center">
    <router-link class="mr-10" to="/">Inicio</router-link>
    <router-link class="mr-10" to="/rooms">Salas</router-link>
    <router-link to="/create-room">Crear</router-link>
  </div>
</template>

<style lang="scss">
#c-menu {
  a {
    color: #fff !important;
    text-decoration: none !important;
    font-size: $smallInfoFont;
  }
}
</style>