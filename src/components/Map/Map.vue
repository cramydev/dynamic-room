<template>
  <div id="c-map">
    <div class="room-places my-40">
      <div class="align-center-center mb-10" v-for="(row, index) in currentMap" :key="index">
        <!-- <p class="info bold place-letter">{{ row[index].letter }}</p> -->

        <div class="place" v-for="(place, subindex) in row" :key="subindex">
          <div 
            class="place-item mx-5 align-center-center flex-col pointer" 
            @click="reservation ? handleReservationPlace(place.placeName, index, subindex) : handlePlace(place.placeName, index, subindex)"
          >
            <div class="m-0 p-0" v-if="reservation">
              <Place 
                :available="place.available"
                :selected="selectedPlace"
                :index="index"
                :subindex="subindex"
                :currentIndex="currentIndex"
                :currentSubindex="currentSubindex"
              />
              <!-- <img src="../../assets/icons/selected-chair-icon.svg" alt="chair-icon" v-if="place.available && selectedPlace && currentIndex == index && currentSubindex == subindex"/>
              <img src="../../assets/icons/available-chair-icon.svg" alt="chair-icon" v-else-if="place.available"/>
              <img src="../../assets/icons/unavailable-chair-icon.svg" alt="chair-icon" v-else-if="!place.available"/> -->
            </div>
            <div class="m-0 p-0" v-else>
              <Place 
                :available="place.available"
                :selected="selectedPlace"
                :index="index"
                :subindex="subindex"
              />
              <!-- <img src="../../assets/icons/available-chair-icon.svg" alt="chair-icon" v-if="place.available"/>
              <img src="../../assets/icons/unavailable-chair-icon.svg" alt="chair-icon" v-else-if="!place.available"/> -->
            </div>
            
            <p class="place-name small-info bold text-center desktop-element">{{ place.placeName }}</p>
          </div>
        </div>
      </div>

      <p class="text-center" v-if="currentPlaceName">
        <strong>Lugar seleccionado: </strong>
        {{ currentPlaceName }}
      </p>

      <div class="room-screen">
        <p class="info bold uppercase text-center">Pantalla</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref, watch } from 'vue'

// components
import Place from '@/components/Map/Place.vue'

export default defineComponent({
  props: {
    drawMap: {
      type: Array as any,
      required: true
    },
    edit: {
      type: Boolean,
      required: false,
      default: (() => false)
    },
    reservation: {
      type: Boolean,
      required: false,
      default: (() => false)
    }
  },

  components: {
    Place
  },
  
  setup(props, context) {
    const { edit, reservation } = props
    let currentIndex = ref(0)
    let currentSubindex = ref(0)
    let selectedPlace = ref(false)
    let currentPlaceName = ref('')
    let currentMap = ref([] as any[])

    onBeforeMount(() => {
      currentMap.value = props.drawMap
    })

    const checkMap = watch(() => props.drawMap, (newValue, oldValue) => {
      console.log('newValue', newValue)

      if (newValue) {
        currentMap.value = newValue
      }
    })
    
    function handleReservationPlace(placeName: string, index: number, subindex: number) {
      if (currentIndex.value == index && currentSubindex.value == subindex) {
        selectedPlace.value = false
        currentPlaceName.value = ''
      } else {
        selectedPlace.value = true
        currentPlaceName.value = placeName
      }

      currentIndex.value = index
      currentSubindex.value = subindex
    }

    function handlePlace(placeName: string, index: number, subindex: number) {
      context.emit('handlePlace', {
        placeName,
        index,
        subindex
      })
    }

    return {
      edit,
      reservation,
      currentMap,
      handlePlace,
      handleReservationPlace,
      checkMap,
      currentIndex,
      currentSubindex,
      selectedPlace,
      currentPlaceName
    }
  },
})
</script>

<style lang="scss">
#c-map {
  .room-places {
    width: 100%;

    .place {
      width: 50px;
      height: 60px;
      // width: 100%;
      // height: 100%;
  
      .place-item {
        div {
          width: 100%;
          height: 100%;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .place-name {
          margin-top: -5px;
        }
      }
    }

    .room-screen {
      width: 90%;
      height: 70px;
      background: #ccc;
      margin: 40px auto 0 auto;
      @include alignCenterCenter;

      p {
        letter-spacing: 5px;
      }
    }
  }
}

@media (max-width: $screenSize_medium) {
  #c-map {
    .room-places {
      // max-width: 300px;
      // height: 100%;
      // margin-left: auto;
      // margin-right: auto;
      // overflow: scroll;

      .place {
        // width: 40px;
        // height: 100%;;
        width: 100%;
        height: 100%;
      }

      .room-screen {
        width: 100%;
      }
    }
  }
}
</style>