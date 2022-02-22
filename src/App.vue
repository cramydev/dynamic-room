<template>
  <div class="app">
    <Header />

    <router-view class="content py-20 md-px-10"/>
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue'

// components
import Header from '@/components/Header/Header.vue'

export default defineComponent({
  components: {
    Header
  },
})
</script>


<style lang="scss">
#app {
  font-family: 'Open Sans', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;
}
</style>
