<template>
  <div id="c-place">
    <div v-if="reservation">
      <img class="place-chair" src="../../assets/icons/selected-chair-icon.svg" alt="chair-icon" v-if="localAvailable && localSelected && localIndex == index && localSubindex == subindex"/>
      <img class="place-chair" src="../../assets/icons/available-chair-icon.svg" alt="chair-icon" v-else-if="localAvailable"/>
      <img class="place-chair" src="../../assets/icons/unavailable-chair-icon.svg" alt="chair-icon" v-else-if="!localAvailable"/>
    </div>

    <div v-else>
      <img class="place-chair" src="../../assets/icons/available-chair-icon.svg" alt="chair-icon" v-if="localAvailable"/>
      <img class="place-chair" src="../../assets/icons/unavailable-chair-icon.svg" alt="chair-icon" v-else-if="!localAvailable"/>
    </div>
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
    reservation: {
      type: Boolean,
      required: false,
      default: (() => false)
    },
    selected: {
      type: Boolean,
      required: false,
      default: (() => false)
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
      required: false,
      default: (() => 0)
    },
    currentSubindex: {
      type: Number,
      required: false,
      default: (() => 0)
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
      localAvailable.value = newValue
    })
    const checkSelected = watch(() => props.selected, (newValue, oldValue) => {
      localSelected.value = newValue
    })
    const checkIndex = watch(() => props.currentIndex, (newValue, oldValue) => {
      localIndex.value = newValue
    })
    const checkSubindex = watch(() => props.currentSubindex, (newValue, oldValue) => {
      localSubindex.value = newValue
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