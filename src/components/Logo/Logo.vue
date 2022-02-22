<template>
  <div id="c-logo">
    <img src="../../assets/images/cramy-modules-logo-white.svg" alt="logo" />
  </div>
</template>

<style lang="scss">
#c-logo {
  // width: 40%;
  width: 180px;
  height: 100%;
  // background: red;
  
  img {
    width: 100%;
    @include alignLeft;
  }
}

@media (max-width: $screenSize_medium) {
  #c-logo {
    img {
      width: 80%
    }
  }
}
</style>