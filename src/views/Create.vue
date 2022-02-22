<template>
  <div id="p-create">
    <div class="small-form box-properties p-20">
      <div class="align-left flex-col mb-10 text-left">
        <label class="info mr-5">Nombre de la sala: </label>
        <input type="text" v-model="room.name" />
      </div>

      <div class="align-center-center mb-10">
        <div class="align-left flex-col text-left full-width mr-5">
          <label class="info mr-5">Filas: </label>
          <input type="number" :min="rowsMax / 2" :max="rowsMax" v-model="room.rows" />
        </div>

        <div class="align-left flex-col text-left full-width ml-5">
          <label class="info mr-5">Columnas: </label>
          <input type="number" :min="columnsMax / 2" :max="columnsMax" v-model="room.columns" />
        </div>
      </div>

      <p class="error-message my-10" v-if="errorMessage">{{ errorMessage }}</p>

      <div class="align-center-center mt-20">
        <button class="mr-10" @click="$router.push({name: 'Rooms'})">Volver</button>
        <button class="button-primary" @click="nextStep">Continuar</button>
      </div>
    </div>

    <div v-if="room.drawMap.length > 0" class="my-20">
      <div class="inside-content box-properties p-20 mb-20 text-left">
        <p class="info bold mb-10">Leyenda</p>
        <div class="align-left-center">
          <div class="indicator indicator-1 mr-10"></div>
          <p class="small-info"><strong>Disponible</strong> para seleccionar.</p>
        </div>
        <div class="align-left-center">
          <div class="indicator indicator-2 mr-10"></div>
          <p class="small-info"><strong>No disponible</strong> para seleccionar.</p>
        </div>

        <div class="small-divider"></div>

        <p class="small-info">⚠️ Por defecto todos los puestos están marcados como <strong>Disponible</strong>.</p>
      </div>

      <Map 
        :drawMap="room.drawMap"
        @handlePlace="handlePlace"
      />

      <!-- <div class="room-places my-40">
        <div class="align-center-center mb-10" v-for="(row, index) in room.drawMap" :key="index">

          <div class="place" v-for="(place, subindex) in row" :key="subindex">
            <div class="place-item mx-5 align-center-center flex-col pointer" @click="handlePlace(place.placeName, index, subindex)">
              <img src="../assets/icons/available-chair-icon.svg" alt="chair-icon" v-if="place.available"/>
              <img src="../assets/icons/unavailable-chair-icon.svg" alt="chair-icon" v-else-if="!place.available"/>
              <p class="small-info bold">{{ place.placeName }}</p>
            </div>
          </div>
        </div>

        <div class="room-screen">
          <p class="info bold uppercase text-center">Pantalla</p>
        </div>
      </div> -->

      <p class="error-message my-10" v-if="errorMessage">{{ errorMessage }}</p>

      <div class="align-center-center mt-20">
        <button class="mr-10" @click="cancel">Cancelar</button>
        <button class="button-primary" @click="createRoom">Crear sala</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue';
import slugify from 'slugify'

// interface
import { MapParams, Place, Room } from '@/public/interface/room';

// data
import { alphabet } from '@/public/data/alphabet.json'

// components
import Map from '@/components/Map/Map.vue'

export default defineComponent({
  name: 'Create',

  components: {
    Map
  },

  setup(){
    let rowsMax = ref(10)
    let columnsMax = ref(20)
    // let drawMap = ref([] as [Place][])
    let drawMap = ref([] as any[])
    let errorMessage = ref('')

    const state = reactive({
      room: {
        name: '',
        slug: '',
        rows: rowsMax.value,
        columns: columnsMax.value,
        places: [] as Place[],
        drawMap: [] as any[],
        available: true
      } as Room
    })
    
    function resetValues() {
      state.room.places = []
      state.room.rows = rowsMax.value
      state.room.columns = columnsMax.value
      state.room.drawMap = []
      errorMessage.value = ''
    }

    function cancel(e: any) {
      e.preventDefault();
      resetValues()
      state.room.name = ''
      state.room.slug = ''
    }

    function nextStep(e: any) {
      e.preventDefault();

      if (!state.room.name) {
        errorMessage.value = "Debes indicar un nombre a la sala."
      } else {
        state.room.places = []
        state.room.drawMap = []
        // state.room.name = ''
        // state.room.slug = ''
        errorMessage.value = ''

        state.room.slug = slugify(state.room.name.trim(), {
          replacement: '-',
          lower: true,
          trim: true
        })
  
        let auxPlace = [] as Place[]
        
        for (let index = 1; index <= state.room.rows; index++) {
          let letter = alphabet[index - 1]
  
          for (let subindex = 1; subindex <= state.room.columns; subindex++) {
            state.room.places.push({
              positionX: index,
              positionY: subindex,
              available: true,
              placeName: `${letter}-${subindex}`
            });
  
            auxPlace.push({
              positionX: index,
              positionY: subindex,
              available: true,
              placeName: `${letter}-${subindex}`,
              letter: letter
            });
          }
  
          state.room.drawMap.push(auxPlace)
          auxPlace = []
        }
      }
    }

    function handlePlace(params: MapParams) {
      state.room.places.filter(item => item.placeName == params.placeName)[0].available = !state.room.places.filter(item => item.placeName == params.placeName)[0].available

      state.room.drawMap[params.index][params.subindex].available = !state.room.drawMap[params.index][params.subindex].available
    }

    function createRoom(e:any) {
      e.preventDefault();

      if (state.room.places.length == 0) {
        errorMessage.value = "No puedes crear una sala sin puestos."
      } else {
        let savedRooms: string | null = window.localStorage.getItem('localRooms')

        if (savedRooms) {
          let currentData = JSON.parse(savedRooms)
          currentData.push(state.room)
          window.localStorage.removeItem('localRooms')
          window.localStorage.setItem('localRooms', JSON.stringify(currentData))
        } else {
          let currentData = []
          currentData.push(state.room)
          window.localStorage.setItem('localRooms', JSON.stringify(currentData))
        }

        resetValues()
        state.room.name = ''
      }
    }
    
    return {
      ...toRefs(state),
      rowsMax,
      columnsMax,
      drawMap,
      errorMessage,
      nextStep,
      handlePlace,
      cancel,
      createRoom
    }
  },
});
</script>

<style lang="scss">
#p-create {  
  .indicator {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
  .indicator-1 {
    background: #6D38B1;
  }
  .indicator-2 {
    background: #c4c4c4;
  }

  // .room-places {
  //   width: 100%;
  //   // .place-letter {
  //   //   width: 20px;
  //   //   height: 100%;
  //   // }
  
  //   .place {
  //     width: 50px;
  //     height: 50px;
  
  //     .place-item {
  //       img {
  //         width: 100%;
  //         height: 100%;
  //       }
  //     }
  //   }

  //   .room-screen {
  //     width: 90%;
  //     height: 70px;
  //     background: #ccc;
  //     margin: 40px auto 0 auto;
  //     @include alignCenterCenter;

  //     p {
  //       letter-spacing: 5px;
  //     }
  //   }
  // }
}
</style>