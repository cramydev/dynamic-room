<template>
  <div id="c-header">
    <div class="responsive-element sub-header">
      <p class="text-center info">
        <a class="font-white" href="https://cramydev.netlify.app" target="_blank" rel="noopener noreferrer nofollow">Visita mi sitio web 😁</a>
      </p>
    </div>

    <div class="align-around-center main-header py-10 md-px-10">
      <div class="left-side align-left-center">
        <router-link to="/" class="lg-mr-40 md-mr-10" >
          <Logo />
        </router-link>

      </div>

      <Menu />

      <div class="right-side desktop-element">
        <p class="text-center info">
          <a class="font-white" href="https://cramydev.netlify.app" target="_blank" rel="noopener noreferrer nofollow">Visita mi sitio web 😁</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

// components
import Menu from '@/components/Menu/Menu.vue'
import Logo from '@/components/Logo/Logo.vue'

export default defineComponent({
  components: {
    Menu,
    Logo
  },
})
</script>

<style lang="scss">
#c-header {
  .sub-header {
    background: $blue2;
    width: 100%;
    height: 40px;
    @include alignCenterCenter;
  }
  .main-header {
    background: $blue3;
    box-shadow: 0px 5px 15px $blue3;  
  }
}
</style>