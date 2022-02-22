<template>
  <div id="p-not-found">
    <div class="align-center-center flex-col">
      <div class="not-found-image align-center-center">
        <img alt="404-image" src="../assets/images/404-image.svg" />
      </div>

      <div class="my-20 text-center">
        <p class="title bold uppercase">Mira no!</p>
        <p class="info">No se que buscas pero aquí no está 🤷‍♂️.</p>
      </div>

      <p class="info">
        Tal vez debas 
        <span>
          <router-link to="/" class="bold pointer">
            volver 😬.
          </router-link>
        </span>
      </p>
    </div>
  </div>
</template>

<style lang="scss">
#p-not-found {
  margin-top: 15%;

  .not-found-image {
    width: 400px;
    height: 100%;

    img {
      width: 100%;
    }
  }
}

@media (max-width: $screenSize_medium) {
  #p-not-found {
    margin-top: 40%;

    .not-found-image {
      width: 80%
    }
  }
}
</style>