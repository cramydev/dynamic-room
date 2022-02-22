<template>
  <div id="c-place">
    <!-- <div class="desktop-element"> -->
      <img class="place-chair" src="../../assets/icons/selected-chair-icon.svg" alt="chair-icon" v-if="localAvailable && localSelected && localIndex == index && localSubindex == subindex"/>
      <img class="place-chair" src="../../assets/icons/available-chair-icon.svg" alt="chair-icon" v-else-if="localAvailable"/>
      <img class="place-chair" src="../../assets/icons/unavailable-chair-icon.svg" alt="chair-icon" v-else-if="!localAvailable"/>
    <!-- </div> -->

    <!-- <div class="responsive-element">
      <div class="indicator indicator-1" v-if="localAvailable && localSelected && localIndex == index && localSubindex == subindex"></div>
      <div class="indicator indicator-2" v-else-if="localAvailable"></div>
      <div class="indicator indicator-3" v-else-if="!localAvailable"></div>
    </div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onBeforeMount } from 'vue'

export default defineComponent({
  props: {
    available: {
      type: Boolean,
      required: true
    },
    selected: {
      type: Boolean,
      required: false
    },
    index: {
      type: Number,
      required: true
    },
    subindex: {
      type: Number,
      required: true
    },
    currentIndex: {
      type: Number,
      required: false
    },
    currentSubindex: {
      type: Number,
      required: false
    }
  },  
  
  setup(props) {
    let localAvailable = ref(false)
    let localSelected = ref(false)
    let localIndex = ref(0)
    let localSubindex = ref(0)

    onBeforeMount(() => {
      localAvailable.value = props.available
      localSelected.value = props.selected
    })

    const checkAvailable = watch(() => props.available, (newValue, oldValue) => {
      if (newValue) {
        localAvailable.value = newValue
      }
    })
    const checkSelected = watch(() => props.selected, (newValue, oldValue) => {
      if (newValue) {
        localSelected.value = newValue
      }
    })
    const checkIndex = watch(() => props.currentIndex, (newValue, oldValue) => {
      if (newValue) {
        localIndex.value = newValue
      }
    })
    const checkSubindex = watch(() => props.currentSubindex, (newValue, oldValue) => {
      if (newValue) {
        localSubindex.value = newValue
      }
    })

    return {
      localIndex,
      localSubindex,
      localAvailable,
      localSelected,
      checkAvailable,
      checkSelected,
      checkIndex,
      checkSubindex,
    }
  },
})
</script>

<style lang="scss">
#c-place {
  // width: 50px;
  // height: 60px;
  // background: green;

  // .responsive-element {
  .indicator {
    width: 50px !important;
    height: 60px !important;
    background: red;
  }
  .indicator-1 {
    background: #FCC21B;
  }
  .indicator-2 {
    background: #6D38B1;
  }
  .indicator-3 {
    background: #c4c4c4;
  }
  // }

}
</style>