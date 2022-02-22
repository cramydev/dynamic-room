<template>
  <div id="p-room">
    <div class="my-20">
      <div class="inside-content box-properties p-20 mb-20 text-left">
        <div class="align-left flex-col mb-10 text-left">
          <label class="info mr-5">Nombre de la sala: </label>
          <input type="text" v-model="room.name" />
        </div>

        <div class="small-divider"></div>

        <div class="align-left-center">
          <div class="indicator indicator-1 mr-10"></div>
          <p class="small-info"><strong>Disponible</strong> para seleccionar.</p>
        </div>
        <div class="align-left-center">
          <div class="indicator indicator-2 mr-10"></div>
          <p class="small-info"><strong>No disponible</strong> para seleccionar.</p>
        </div>
      </div>

      <Map 
        :drawMap="room.drawMap"
        :edit="true"
        @handlePlace="handlePlace"
      />

      <p class="error-message my-10" v-if="errorMessage">{{ errorMessage }}</p>

      <div class="align-center-center mt-20">
        <button class="mr-10" @click="cancel">Volver</button>
        <button class="button-primary" @click="saveRoom">Guardar</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// interface
import { MapParams, Room } from '@/public/interface/room'

// components
import Map from '@/components/Map/Map.vue'

export default defineComponent({
  components: {
    Map
  },

  setup() {
    const route = useRoute()
    const router = useRouter()
    let room = ref({} as Room)
    let errorMessage = ref('')

    const getRoom = onBeforeMount(() => {
      let rooms: string | null = window.localStorage.getItem('localRooms')

      if (rooms) {
        room.value = JSON.parse(rooms).find((item: Room) => item.slug == route.params.roomName)
      }
    })

    function cancel(e: any) {
      e.preventDefault();
      router.go(-1)
    }

    function handlePlace(params: MapParams) {
      room.value.places.filter(item => item.placeName == params.placeName)[0].available = !room.value.places.filter(item => item.placeName == params.placeName)[0].available

      room.value.drawMap[params.index][params.subindex].available = !room.value.drawMap[params.index][params.subindex].available
    }

    function saveRoom() {
      if (!room.value.name) {
        errorMessage.value = "Debes indicar un nombre a la sala."
      } else {
        errorMessage.value = ''

        let rooms: string | null = window.localStorage.getItem('localRooms')
  
        if (rooms) {
          let filteredRooms = JSON.parse(rooms).filter((item: Room) => item.slug !== route.params.roomName)
  
          filteredRooms.push(room.value)
          window.localStorage.removeItem('localRooms')
          window.localStorage.setItem('localRooms', JSON.stringify(filteredRooms))
        } else {
          let currentData = []
          currentData.push(room.value)
          window.localStorage.setItem('localRooms', JSON.stringify(currentData))
        }

        router.go(-1)
      }

    }

    return {
      getRoom,
      handlePlace,
      cancel,
      saveRoom,
      room,
      errorMessage
    }
  },
})
</script>

<style lang="scss">
#p-room {  
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
}
</style>
