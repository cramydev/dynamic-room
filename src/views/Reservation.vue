<template>
  <div id="p-reservation">
    <div class="my-20">
      <div class="inside-content box-properties p-20 mb-20 text-left">
        <p class="info bold mb-10">🎥 {{ room.name }}</p>

        <div class="small-divider"></div>

        <div class="align-left-center">
          <div class="indicator indicator-3 mr-10"></div>
          <p class="small-info"><strong>Seleccionado</strong> para reservar.</p>
        </div>
        <div class="align-left-center">
          <div class="indicator indicator-1 mr-10"></div>
          <p class="small-info"><strong>Disponible</strong> para seleccionar.</p>
        </div>
        <div class="align-left-center">
          <div class="indicator indicator-2 mr-10"></div>
          <p class="small-info"><strong>No disponible</strong> para seleccionar.</p>
        </div>

        <div class="small-divider"></div>

        <p class="small-info">⚠️ Esto es una simulación de como se comportaría el mapa al querer reservar un puesto.</p>
      </div>

      <Map 
        :drawMap="room.drawMap"
        :reservation="true"
      />

      <div class="align-center-center mt-20">
        <button @click="cancel">Volver</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// interface
import { Room } from '@/public/interface/room'

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

    const getRoom = onBeforeMount(() => {
      let rooms: string | null = window.localStorage.getItem('localRooms')

      if (rooms) {
        room.value = JSON.parse(rooms).find((item: Room) => item.slug == route.params.roomName)
      }

      console.log('room.value', room.value)
    })

    function cancel(e: any) {
      e.preventDefault();
      router.go(-1)
    }

    return {
      getRoom,
      cancel,
      room,
    }
  },
})
</script>

<style lang="scss">
#p-reservation {  
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
  .indicator-3 {
    background: #FCC21B;
  }
}
</style>
